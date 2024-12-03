import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

import { Color, ColorStep } from '@/styles/tokens/colors';

type IconProps = Omit<
  React.ComponentProps<typeof Ionicons>,
  'color' | 'size'
> & {
  color?: Color;
  colorStep?: ColorStep;
  highContrast?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const Icon = React.forwardRef<React.ElementRef<typeof Ionicons>, IconProps>(
  (
    {
      name,
      color = 'neutral',
      colorStep: colorStepProp,
      highContrast = false,
      size = 'md',
      disabled,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { styles, theme } = useStyles(stylesheet, {
      size,
    });

    const colorStep: ColorStep = colorStepProp ?? (highContrast ? '12' : '11');

    const iconColor = disabled
      ? theme.colors.neutral8
      : theme.colors[`${color}${colorStep}`];

    return (
      <Ionicons
        ref={forwardedRef}
        name={name}
        color={iconColor}
        disabled={disabled}
        style={[styles.icon, style]}
        {...restProps}
      />
    );
  },
);

Icon.displayName = 'Icon';

const stylesheet = createStyleSheet(({ space }) => ({
  icon: {
    variants: {
      size: {
        xs: {
          fontSize: space[12],
        },
        sm: {
          fontSize: space[14],
        },
        md: {
          fontSize: space[16],
        },
        lg: {
          fontSize: space[20],
        },
        xl: {
          fontSize: space[24],
        },
      },
    },
  },
}));

export { Icon };
export { IconProps };
