import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useControllableState } from '@/hooks/useControllableState';
import { Color, ColorStep } from '@/styles/tokens/colors';

type RadioGroupSize = 'sm' | 'md' | 'lg';
type RadioGroupVariant = 'solid' | 'soft' | 'outline' | 'ghost';

type RadioGroupContextValue = {
  color: Color;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  size: RadioGroupSize;
  value: string;
  variant: RadioGroupVariant;
  highContrast: boolean;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);
  if (context === null) {
    throw new Error(
      'useRadioGroupContext must be used within a RadioGroupContextProvider',
    );
  }
  return context;
};

type RadioGroupProps = ViewProps & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  color?: Color;
  size?: RadioGroupSize;
  variant?: RadioGroupVariant;
  highContrast?: boolean;
};

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  RadioGroupProps
>(
  (
    {
      children,
      defaultValue,
      value: valueProp,
      onValueChange: onValueChangeProp,
      disabled,
      color = 'primary',
      size = 'md',
      variant = 'solid',
      highContrast = false,
      ...restProps
    }: RadioGroupProps,
    forwardedRef,
  ) => {
    const [value, onValueChange] = useControllableState({
      defaultValue: defaultValue ?? '',
      controlledValue: valueProp,
      onControlledChange: onValueChangeProp,
    });
    return (
      <RadioGroupContext.Provider
        value={{
          color,
          disabled,
          onValueChange,
          size,
          value,
          variant,
          highContrast,
        }}>
        <View ref={forwardedRef} accessibilityRole="radiogroup" {...restProps}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

type RadioGroupItemContextValue = {
  checked: boolean;
  disabled: boolean;
};

const RadioGroupItemContext =
  React.createContext<RadioGroupItemContextValue | null>(null);

const useRadioGroupItemContext = () => {
  const context = React.useContext(RadioGroupItemContext);
  if (context === null) {
    throw new Error(
      'useRadioGroupItemContext must be used within a RadioGroupItemContextProvider',
    );
  }
  return context;
};

type RadioGroupItemProps = Omit<PressableProps, 'children'> & {
  children?: React.ReactNode;
  value: string;
};

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  RadioGroupItemProps
>(
  (
    {
      accessibilityState,
      value,
      disabled: disabledProp,
      onPress: onPressProp,
      ...restProps
    }: RadioGroupItemProps,
    forwardedRef,
  ) => {
    const ctx = useRadioGroupContext();

    const checked = ctx.value === value;
    const disabled = disabledProp ?? ctx?.disabled;

    function handlePress(e: GestureResponderEvent) {
      ctx?.onValueChange?.(value);
      onPressProp?.(e);
    }

    return (
      <RadioGroupItemContext.Provider value={{ checked, disabled: !!disabled }}>
        <Pressable
          ref={forwardedRef}
          accessibilityRole="radio"
          accessibilityState={{ checked, disabled }}
          disabled={disabled}
          onPress={handlePress}
          {...restProps}
        />
      </RadioGroupItemContext.Provider>
    );
  },
);

RadioGroupItem.displayName = 'RadioGroupItem';

type RadioGroupIndicatorProps = ViewProps;

const RadioGroupIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  RadioGroupIndicatorProps
>(
  (
    { children: childrenProp, style, ...restProps }: RadioGroupIndicatorProps,
    forwardedRef,
  ) => {
    const { color, size, variant, highContrast } = useRadioGroupContext();
    const { checked, disabled } = useRadioGroupItemContext();

    const { styles } = useStyles(stylesheet, {
      size,
      variant,
    });
    const colorStep: ColorStep =
      variant === 'solid' ? 'Contrast' : highContrast ? '12' : '11';
    const children = childrenProp ?? (
      // default indicator
      <View
        style={[
          styles.innerCircle(color, colorStep),
          disabled && styles.innerCircleDisabled,
        ]}
      />
    );
    return (
      <View
        ref={forwardedRef}
        style={[
          styles.outerCircle(checked, color),
          disabled && styles.outerCircleDisabled,
          style,
        ]}
        {...restProps}>
        {checked && children}
      </View>
    );
  },
);

RadioGroupIndicator.displayName = 'RadioGroupIndicator';

export const stylesheet = createStyleSheet(({ colors, radius }) => ({
  outerCircle: (checked: boolean, color: Color) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.full,
    variants: {
      size: {
        sm: {
          width: 16,
          height: 16,
        },
        md: {
          width: 20,
          height: 20,
        },
        lg: {
          width: 24,
          height: 24,
        },
      },
      variant: {
        ghost: {},
        outline: {
          borderWidth: 1,
          borderColor: colors[`${color}7`],
          backgroundColor: colors.transparent,
        },
        soft: {
          backgroundColor: colors[`${color}4`],
        },
        solid: {
          borderWidth: 1,
          borderColor: checked ? colors[`${color}9`] : colors.neutral7,
          backgroundColor: checked ? colors[`${color}9`] : colors.transparent,
        },
      },
    },
  }),
  innerCircle: (color: Color, colorStep: ColorStep) => ({
    borderRadius: radius.full,
    variants: {
      size: {
        sm: {
          width: getInnerCircleSize(16),
          height: getInnerCircleSize(16),
        },
        md: {
          width: getInnerCircleSize(20),
          height: getInnerCircleSize(20),
        },
        lg: {
          width: getInnerCircleSize(24),
          height: getInnerCircleSize(24),
        },
      },
      variant: {
        ghost: {
          backgroundColor: colors[`${color}${colorStep}`],
        },
        outline: {
          backgroundColor: colors[`${color}${colorStep}`],
        },
        soft: {
          backgroundColor: colors[`${color}${colorStep}`],
        },
        solid: {
          backgroundColor: colors[`${color}${colorStep}`],
        },
      },
    },
  }),
  outerCircleDisabled: {
    borderColor: colors.neutral6,
    backgroundColor: colors.neutral3,
    variants: {
      variant: {
        ghost: {
          backgroundColor: colors.transparent,
        },
      },
    },
  },
  innerCircleDisabled: {
    backgroundColor: colors.neutral8,
  },
}));

function getInnerCircleSize(size: number) {
  return Math.floor(size / 2.5);
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
  useRadioGroupContext,
  useRadioGroupItemContext,
};
export type { RadioGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
