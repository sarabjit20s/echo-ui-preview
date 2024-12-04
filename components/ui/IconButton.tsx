import {
  Pressable,
  PressableStateCallbackType,
  PressableProps,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  useButtonGroupButtonContext,
  useButtonGroupContext,
} from './ButtonGroup';
import { Icon, IconProps } from './Icon';
import { Spinner, SpinnerProps } from './Spinner';
import { Color, ColorStep } from '@/styles/tokens/colors';

type IconButtonProps = PressableProps & {
  icon: IconProps['name'] | React.ReactElement;
  color?: Color;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline' | 'ghost' | 'text';
  fullWidth?: boolean;
  loading?: boolean;
  highContrast?: boolean;
};

const iconSizeMap: Record<
  NonNullable<IconButtonProps['size']>,
  IconProps['size']
> = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};
const spinnerSizeMap: Record<
  NonNullable<IconButtonProps['size']>,
  SpinnerProps['size']
> = {
  xs: 'xxs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

const IconButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  IconButtonProps
>(
  (
    {
      accessibilityState,
      children,
      icon,
      color: colorProp,
      size: sizeProp,
      variant: variantProp,
      fullWidth: fullWidthProp,
      disabled: disabledProp,
      loading,
      highContrast: highContrastProp,
      style,
      ...restProps
    }: IconButtonProps,
    forwardedRef,
  ) => {
    const buttonGroupCtx = useButtonGroupContext();
    const buttonPosition = useButtonGroupButtonContext();
    const isGroupButton = buttonGroupCtx !== undefined;

    // props priorty: IconButtonProps > ButtonGroupProps
    const color = colorProp ?? buttonGroupCtx?.color ?? 'primary';
    const disabled = disabledProp ?? loading ?? buttonGroupCtx?.disabled;
    const fullWidth = fullWidthProp ?? buttonGroupCtx?.fullWidth ?? false;
    const size = sizeProp ?? buttonGroupCtx?.size ?? 'md';
    const variant = variantProp ?? buttonGroupCtx?.variant ?? 'solid';
    const highContrast =
      highContrastProp ?? buttonGroupCtx?.highContrast ?? false;

    const { styles } = useStyles(stylesheet, {
      fullWidth,
      size,
      variant,
    });

    const colorStep: ColorStep =
      variant === 'solid' ? 'Contrast' : highContrast ? '12' : '11';

    const groupButtonStyle =
      isGroupButton && buttonPosition && buttonGroupCtx?.isAttached
        ? styles.attachedButton(buttonPosition, buttonGroupCtx.orientation)
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
        {!loading ? (
          typeof icon === 'string' ? (
            <Icon
              name={icon}
              size={iconSizeMap[size]}
              color={color}
              colorStep={colorStep}
              disabled={disabled}
            />
          ) : (
            icon
          )
        ) : null}
      </Pressable>
    );
  },
);

IconButton.displayName = 'IconButton';

export const stylesheet = createStyleSheet(({ colors, radius }) => ({
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
          width: 28,
        },
        sm: {
          height: 36,
          width: 36,
        },
        md: {
          height: 44,
          width: 44,
        },
        lg: {
          height: 52,
          width: 52,
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
          borderColor: colors[`${color}8`],
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
        borderBottomEndRadius: isFirst || isMiddle ? 0 : radius.md,
        borderStartEndRadius: isFirst || isMiddle ? 0 : radius.md,
        borderStartStartRadius: isLast || isMiddle ? 0 : radius.md,
        borderEndStartRadius: isLast || isMiddle ? 0 : radius.md,
        variants: {
          variant: {
            outline: {
              borderEndWidth: isFirst || isMiddle ? 0 : 1,
              borderStartWidth: isLast || isMiddle ? 0 : 1,
            },
          },
        },
      };
    } else {
      return {
        borderBottomEndRadius: isFirst || isMiddle ? 0 : radius.md,
        borderBottomStartRadius: isFirst || isMiddle ? 0 : radius.md,
        borderTopStartRadius: isLast || isMiddle ? 0 : radius.md,
        borderTopEndRadius: isLast || isMiddle ? 0 : radius.md,
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
}));

export { IconButton };
export type { IconButtonProps };
