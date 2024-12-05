import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useControllableState } from '@/hooks/useControllableState';
import { Color, ColorStep } from '@/styles/tokens/colors';
import { Icon, IconProps } from './Icon';

type CheckboxContextValue = {
  checked: boolean;
  disabled: boolean;
  color: Color;
  size: 'sm' | 'md' | 'lg';
  variant: 'solid' | 'soft' | 'outline' | 'ghost';
  highContrast: boolean;
};

const CheckboxContext = React.createContext<CheckboxContextValue | null>(null);

const useCheckboxContext = () => {
  const context = React.useContext(CheckboxContext);
  if (context === null) {
    throw new Error(
      'useCheckboxContext must be used within a CheckboxProvider',
    );
  }
  return context;
};

type CheckboxProps = Omit<PressableProps, 'children'> & {
  children?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  color?: Color;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
  highContrast?: boolean;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(
  (
    {
      accessibilityState,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      onPress: onPressProp,
      disabled,
      color = 'primary',
      size = 'md',
      variant = 'solid',
      highContrast = false,
      ...restProps
    }: CheckboxProps,
    forwardedRef,
  ) => {
    const [checked, setChecked] = useControllableState({
      defaultValue: defaultChecked ?? false,
      controlledValue: checkedProp,
      onControlledChange: onCheckedChange,
    });

    const onPress = React.useCallback(
      (e: GestureResponderEvent) => {
        setChecked(prev => !prev);
        onPressProp?.(e);
      },
      [onPressProp, setChecked],
    );

    return (
      <CheckboxContext.Provider
        value={{
          checked,
          disabled: !!disabled,
          color,
          size,
          variant,
          highContrast,
        }}>
        <Pressable
          ref={forwardedRef}
          accessibilityRole="checkbox"
          accessibilityState={{
            ...accessibilityState,
            checked,
            disabled: !!disabled,
          }}
          disabled={disabled}
          onPress={onPress}
          {...restProps}
        />
      </CheckboxContext.Provider>
    );
  },
);

Checkbox.displayName = 'Checkbox';

type CheckboxIndicatorProps = ViewProps;

const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(
  (
    { children: childrenProp, style, ...restProps }: CheckboxIndicatorProps,
    forwardedRef,
  ) => {
    const { checked, disabled, color, size, variant, highContrast } =
      useCheckboxContext();
    const { styles } = useStyles(stylesheet, {
      size,
      variant,
    });
    const colorStep: ColorStep =
      variant === 'solid' ? 'Contrast' : highContrast ? '12' : '11';

    const children = childrenProp ?? (
      <CheckIcon
        size={size}
        color={color}
        colorStep={colorStep}
        disabled={disabled}
        highContrast={highContrast}
      />
    );

    return (
      <View
        ref={forwardedRef}
        style={[
          styles.checkboxIndicator(checked, color),
          disabled && styles.checkboxIndicatorDisabled,
          style,
        ]}
        {...restProps}>
        {checked && children}
      </View>
    );
  },
);

CheckboxIndicator.displayName = 'CheckboxIndicator';

type CheckboxIconProps = IconProps;

const CheckboxIcon = React.forwardRef<
  React.ElementRef<typeof Icon>,
  CheckboxIconProps
>(({ ...restProps }: CheckboxIconProps, forwardedRef) => {
  const { disabled, color, size, variant, highContrast } = useCheckboxContext();
  const colorStep: ColorStep =
    variant === 'solid' ? 'Contrast' : highContrast ? '12' : '11';

  return (
    <Icon
      ref={forwardedRef}
      size={size}
      color={color}
      colorStep={colorStep}
      disabled={disabled}
      highContrast={highContrast}
      {...restProps}
    />
  );
});

CheckboxIcon.displayName = 'CheckboxIcon';

type CheckIconProp = {
  color?: Color;
  colorStep?: ColorStep;
  size?: 'sm' | 'md' | 'lg';
  highContrast?: boolean;
  disabled?: boolean;
};

const iconSizeMap: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const CheckIcon = ({
  size: sizeProp = 'md',
  color: colorProp = 'neutral',
  colorStep: colorStepProp,
  highContrast = false,
  disabled = false,
}: CheckIconProp) => {
  const { theme } = useStyles();
  const size = iconSizeMap[sizeProp];
  const colorStep = colorStepProp ?? (highContrast ? '12' : '11');
  const color = disabled
    ? theme.colors.neutral8
    : theme.colors[`${colorProp}${colorStep}`];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round" // Rounded ends
      strokeLinejoin="round">
      <Path d="M5 13l5 5L20 7" />
    </Svg>
  );
};

const stylesheet = createStyleSheet(({ colors, radius }) => ({
  checkboxIndicator: (checked: boolean, color: Color) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.xs,
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
  checkboxIndicatorDisabled: {
    borderColor: colors.neutral6,
    backgroundColor: colors.neutral3,
    variants: {
      variant: {
        solid: {
          borderWidth: 0,
        },
        ghost: {
          backgroundColor: colors.transparent,
        },
      },
    },
  },
}));

export { Checkbox, CheckboxIndicator, CheckboxIcon, useCheckboxContext };
export type { CheckboxProps, CheckboxIndicatorProps, CheckboxIconProps };
