import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  useButtonGroupButtonContext,
  useButtonGroupContext,
} from './ButtonGroup';
import { Icon, IconProps } from './Icon';
import { Spinner, SpinnerProps } from './Spinner';
import { Text, TextProps } from './Text';
import { Color, ColorStep } from '@/styles/tokens/colors';

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  color?: Color;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline' | 'ghost' | 'text';
  startIcon?: IconProps['name'] | React.ReactElement;
  endIcon?: IconProps['name'] | React.ReactElement;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  highContrast?: boolean;
};

const buttonTextVariantMap: Record<
  NonNullable<ButtonProps['size']>,
  TextProps['variant']
> = {
  xs: 'labelXs',
  sm: 'labelSm',
  md: 'labelMd',
  lg: 'labelLg',
};

const spinnerSizeMap: Record<
  NonNullable<ButtonProps['size']>,
  SpinnerProps['size']
> = {
  xs: 'xxs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      accessibilityState,
      children,
      color: colorProp,
      size: sizeProp,
      variant: variantProp,
      disabled: disabledProp,
      fullWidth: fullWidthProp,
      loading,
      loadingText,
      highContrast: highContrastProp,
      startIcon,
      endIcon,
      style,
      ...restProps
    }: ButtonProps,
    forwardedRef,
  ) => {
    const buttonGroupCtx = useButtonGroupContext();
    const buttonPosition = useButtonGroupButtonContext();
    const isGroupButton = buttonGroupCtx !== null;

    // props priorty: ButtonProps > ButtonGroupProps
    const color = colorProp ?? buttonGroupCtx?.color ?? 'primary';
    const disabled =
      (loading || disabledProp) ?? buttonGroupCtx?.disabled ?? false;
    const fullWidth = fullWidthProp ?? buttonGroupCtx?.fullWidth ?? false;
    const size = sizeProp ?? buttonGroupCtx?.size ?? 'md';
    const variant = variantProp ?? buttonGroupCtx?.variant ?? 'solid';
    const highContrast =
      highContrastProp ?? buttonGroupCtx?.highContrast ?? false;

    const { styles } = useStyles(stylesheet, {
      size,
      variant,
      fullWidth,
    });

    const colorStep: ColorStep =
      variant === 'solid' ? 'Contrast' : highContrast ? '12' : '11';

    const groupButtonStyle =
      isGroupButton && buttonPosition && buttonGroupCtx?.isAttached
        ? styles.attachedButton(buttonPosition, buttonGroupCtx?.orientation)
        : undefined;

    function buttonStyle(state: PressableStateCallbackType) {
      return [
        styles.button(color, state.pressed),
        groupButtonStyle,
        disabled && styles.disabledButton,
        typeof style === 'function' ? style(state) : style,
      ];
    }

    return (
      <Pressable
        ref={forwardedRef}
        accessibilityRole="button"
        accessibilityState={{
          ...accessibilityState,
          disabled,
        }}
        disabled={disabled}
        style={buttonStyle}
        {...restProps}>
        <Spinner
          color="neutral"
          colorStep="8"
          size={spinnerSizeMap[size]}
          loading={!!loading}
        />
        {startIcon && typeof startIcon === 'string' ? (
          <Icon
            name={startIcon}
            size={size}
            color={color}
            colorStep={colorStep}
            disabled={disabled}
            style={loading && styles.hide}
          />
        ) : (
          startIcon
        )}
        <Text
          color={color}
          colorStep={colorStep}
          variant={buttonTextVariantMap[size]}
          disabled={disabled}>
          {loading ? (loadingText ?? children) : children}
        </Text>
        {endIcon && typeof endIcon === 'string' ? (
          <Icon
            name={endIcon}
            size={size}
            color={color}
            colorStep={colorStep}
            disabled={disabled}
            style={loading && styles.hide}
          />
        ) : (
          endIcon
        )}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

const stylesheet = createStyleSheet(({ colors, radius, space }) => ({
  button: (color: Color, pressed: boolean) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
    borderCurve: 'continuous',
    variants: {
      size: {
        xs: {
          height: 28,
          paddingHorizontal: space[8],
          gap: space[4],
        },
        sm: {
          height: 36,
          paddingHorizontal: space[12],
          gap: space[6],
        },
        md: {
          height: 44,
          paddingHorizontal: space[16],
          gap: space[8],
        },
        lg: {
          height: 52,
          paddingHorizontal: space[20],
          gap: space[12],
        },
      },
      variant: {
        solid: {
          backgroundColor: pressed ? colors[`${color}10`] : colors[`${color}9`],
        },
        soft: {
          backgroundColor: pressed ? colors[`${color}4`] : colors[`${color}3`],
        },
        outline: {
          borderWidth: 1,
          backgroundColor: pressed ? colors[`${color}3`] : colors.transparent,
          borderColor: pressed ? colors[`${color}8`] : colors[`${color}7`],
        },
        ghost: {
          backgroundColor: pressed ? colors[`${color}3`] : colors.transparent,
        },
        text: {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: colors.transparent,
        },
      },
      fullWidth: {
        true: {
          width: '100%',
          flexShrink: 1,
        },
        false: {},
      },
    },
  }),
  disabledButton: {
    borderColor: colors.neutral6,
    variants: {
      variant: {
        solid: {
          backgroundColor: colors.neutral3,
        },
        soft: {
          backgroundColor: colors.neutral3,
        },
        outline: {
          borderWidth: 1,
          backgroundColor: colors.transparent,
        },
        ghost: {
          backgroundColor: colors.transparent,
        },
        text: {
          backgroundColor: colors.transparent,
        },
      },
    },
  },
  attachedButton: (
    position: 'single' | 'first' | 'middle' | 'last',
    orientation: 'horizontal' | 'vertical',
  ) => {
    if (position === 'single') {
      return {};
    }
    const isFirst = position === 'first';
    const isMiddle = position === 'middle';
    const isLast = position === 'last';
    if (orientation === 'horizontal') {
      return {
        borderBottomRightRadius: isFirst || isMiddle ? 0 : radius.md,
        borderTopRightRadius: isFirst || isMiddle ? 0 : radius.md,
        borderTopLeftRadius: isLast || isMiddle ? 0 : radius.md,
        borderBottomLeftRadius: isLast || isMiddle ? 0 : radius.md,
        variants: {
          variant: {
            outline: {
              borderRightWidth: isFirst || isMiddle ? 0 : 1,
              borderLeftWidth: isLast || isMiddle ? 0 : 1,
            },
          },
        },
      };
    } else {
      return {
        borderBottomRightRadius: isFirst || isMiddle ? 0 : radius.md,
        borderBottomLeftRadius: isFirst || isMiddle ? 0 : radius.md,
        borderTopLeftRadius: isLast || isMiddle ? 0 : radius.md,
        borderTopRightRadius: isLast || isMiddle ? 0 : radius.md,
        variants: {
          variant: {
            outline: {
              borderBottomWidth: isFirst || isMiddle ? 0 : 1,
              borderTopWidth: isLast || isMiddle ? 0 : 1,
            },
          },
        },
      };
    }
  },
  hide: {
    opacity: 0,
  },
}));

export { Button };
export type { ButtonProps };
