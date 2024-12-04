import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './Text';
import { Icon } from './Icon';
import { useControllableState } from '@/hooks/useControllableState';
import { Color } from '@/styles/tokens/colors';

const ANIMATION_DURATION = 200;
const EASING = Easing.inOut(Easing.ease);
const animationTimingConfig: WithTimingConfig = {
  duration: ANIMATION_DURATION,
  easing: EASING,
};

type AccordionVariant = 'soft' | 'ghost';

type AccordionContextProps = {
  disabled?: boolean;
  onValueChange: (value: string) => void | ((value: string[]) => void);
  type: 'single' | 'multiple';
  value: string | string[];
  color: Color;
  variant: AccordionVariant;
};

const AccordionContext = React.createContext<AccordionContextProps | null>(
  null,
);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (context === null) {
    throw new Error(
      'useAccordionContext must be used within a AccordionContextProvider',
    );
  }
  return context;
};

type AccordionCommonProps = Omit<ViewProps, 'children'> & {
  children: React.ReactNode;
  disabled?: boolean;
  color?: Color;
  variant?: AccordionVariant;
};

type AccordionSingleProps = AccordionCommonProps & {
  type?: 'single';
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

type AccordionMultipleProps = AccordionCommonProps & {
  type?: 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionProps
>((props: AccordionProps, forwardedRef) => {
  const {
    type = 'multiple',
    color = 'neutral',
    variant = 'soft',
    disabled,
    defaultValue = [],
    value: valueProp,
    onValueChange: onValueChangeProp,
    style,
    ...restProps
  } = props;
  const { styles } = useStyles(stylesheet);

  const [value, setValue] = useControllableState<string | string[]>({
    defaultValue,
    controlledValue: valueProp,
    onControlledChange: onValueChangeProp as
      | ((value: string | string[]) => void)
      | undefined,
  });

  return (
    <AccordionContext.Provider
      value={{
        disabled,
        onValueChange: setValue,
        type,
        value,
        color,
        variant,
      }}>
      <View
        ref={forwardedRef}
        style={[styles.accordion, style]}
        {...restProps}
      />
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

type AccordionItemContextProps = {
  disabled?: boolean;
  triggerId: string;
  value: string;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextProps | null>(null);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (context === null) {
    throw new Error(
      'useAccordionItemContext must be used within a AccordionItemContextProvider',
    );
  }
  return context;
};

type AccordionItemProps = ViewProps & {
  children: React.ReactNode;
  disabled?: boolean;
  value: string;
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionItemProps
>(
  (
    { disabled: disabledProp, value, style, ...restProps }: AccordionItemProps,
    forwardedRef,
  ) => {
    const { disabled: rootDisabled, color, variant } = useAccordionContext();
    const { styles } = useStyles(stylesheet, {
      variant,
    });
    // priority: rootDisabled > disabledProp
    const disabled = rootDisabled ?? disabledProp ?? false;

    const triggerId = React.useId();

    return (
      <AccordionItemContext.Provider value={{ disabled, triggerId, value }}>
        <View
          ref={forwardedRef}
          style={[styles.accordionItem(color), style]}
          {...restProps}
        />
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = Omit<PressableProps, 'children' | 'nativeId'> & {
  children:
    | React.ReactNode
    | (({
        state,
        expanded,
      }: {
        state: PressableStateCallbackType;
        expanded: boolean;
      }) => React.ReactNode);
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  AccordionTriggerProps
>(
  (
    {
      children,
      disabled: disabledProp,
      onPress: onPressProp,
      style,
      ...restProps
    }: AccordionTriggerProps,
    forwardedRef,
  ) => {
    const {
      disabled: rootDisabled,
      type,
      color,
      variant,
      value: rootValue,
      onValueChange,
    } = useAccordionContext();
    const {
      disabled: itemDisabled,
      triggerId,
      value: itemValue,
    } = useAccordionItemContext();
    const rootSingleValue = rootValue as string;
    const rootMultipleValue = rootValue as string[];
    const expanded =
      type === 'single'
        ? rootSingleValue === itemValue
        : rootMultipleValue.includes(itemValue);

    const disabled = itemDisabled ?? rootDisabled ?? disabledProp ?? false;

    const { styles } = useStyles(stylesheet, {
      variant,
    });

    const derivedValue = useDerivedValue(() => {
      return expanded
        ? withTiming(-180, animationTimingConfig)
        : withTiming(0, animationTimingConfig);
    });

    const iconAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: derivedValue.value + 'deg',
        },
      ],
    }));

    function onPress(e: GestureResponderEvent) {
      if (disabled) {
        return;
      }
      if (type === 'single') {
        onValueChange(expanded ? '' : itemValue);
      } else {
        onValueChange(
          // @ts-ignore
          expanded
            ? rootMultipleValue.filter(v => v !== itemValue)
            : [...rootMultipleValue, itemValue],
        );
      }
      onPressProp?.(e);
    }

    const accordionTriggerStyle: PressableProps['style'] = state => {
      return [
        styles.accordionTrigger(state.pressed, color),
        typeof style === 'function' ? style(state) : style,
      ];
    };

    return (
      <View accessibilityRole="header">
        <Pressable
          ref={forwardedRef}
          nativeID={triggerId}
          accessibilityRole="button"
          accessibilityState={{
            disabled,
            expanded,
          }}
          disabled={disabled}
          onPress={onPress}
          style={accordionTriggerStyle}
          {...restProps}>
          {state =>
            typeof children === 'function' ? (
              children({ state, expanded })
            ) : typeof children !== 'string' ? (
              children
            ) : (
              <>
                <Text
                  variant="labelMd"
                  color="neutral"
                  disabled={disabled}
                  highContrast>
                  {children}
                </Text>
                <Animated.View style={iconAnimatedStyle}>
                  <Icon
                    name={'chevron-down'}
                    color="neutral"
                    size="md"
                    disabled={disabled}
                  />
                </Animated.View>
              </>
            )
          }
        </Pressable>
      </View>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionContentProps = Omit<ViewProps, 'accessibilityLabelledBy'>;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionContentProps
>(
  (
    {
      accessibilityRole = 'summary',
      style,
      ...restProps
    }: AccordionContentProps,
    forwardedRef,
  ) => {
    const { value, variant } = useAccordionContext();
    const { triggerId, value: itemValue } = useAccordionItemContext();
    const expanded = value.includes(itemValue);

    const { styles } = useStyles(stylesheet, {
      variant,
    });

    const height = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: expanded
          ? withTiming(height.value, animationTimingConfig)
          : withTiming(0, animationTimingConfig),
        overflow: 'hidden',
      };
    });

    const onLayout = React.useCallback(
      (e: LayoutChangeEvent) => {
        height.value = e.nativeEvent.layout.height;
      },
      [height],
    );

    return (
      <Animated.View style={animatedStyle}>
        {expanded && (
          <Animated.View
            entering={FadeIn.duration(ANIMATION_DURATION).easing(EASING)}
            exiting={FadeOut.duration(ANIMATION_DURATION).easing(EASING)}
            onLayout={onLayout}
            style={styles.accordionContentContainer}>
            <View
              ref={forwardedRef}
              accessibilityRole={accessibilityRole}
              accessibilityLabelledBy={triggerId}
              style={[styles.accordionContent, style]}
              {...restProps}
            />
          </Animated.View>
        )}
      </Animated.View>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';

export const stylesheet = createStyleSheet(({ colors, radius, space }) => ({
  accordion: {
    borderRadius: radius.md,
    overflow: 'hidden',
    gap: space[8],
  },
  accordionItem: (color: Color) => ({
    borderRadius: radius.md,
    borderCurve: 'continuous',
    variants: {
      variant: {
        soft: {
          backgroundColor: colors[`${color}2`],
        },
        ghost: {
          backgroundColor: colors.transparent,
        },
      },
    },
  }),
  accordionTrigger: (pressed: boolean, color: Color) => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: space[8],
    paddingHorizontal: space[16],
    paddingVertical: space[12],
    borderRadius: radius.md,
    variants: {
      variant: {
        soft: {
          backgroundColor: pressed ? colors[`${color}3`] : colors[`${color}2`],
        },
        ghost: {
          backgroundColor: pressed ? colors[`${color}3`] : colors.transparent,
        },
      },
    },
  }),
  accordionContentContainer: {
    position: 'absolute',
  },
  accordionContent: {
    paddingBottom: space[16],
    paddingHorizontal: space[16],
  },
}));

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
};
