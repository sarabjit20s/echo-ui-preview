import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Color, ColorStep } from '@/styles/tokens/colors';
import {
  fontFamilies,
  FontSize,
  TextVariants,
} from '@/styles/tokens/typography';

type TextProps = RNTextProps & {
  color?: Color;
  colorStep?: ColorStep;
  fontFamily?: keyof typeof fontFamilies;
  fontSize?: FontSize;
  textAlign?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  highContrast?: boolean;
  /**
   * Set `true` to inherit the styles from parent Text component instead of using default values
   */
  inherit?: boolean;
  variant?: keyof TextVariants;
};

const defaultColor: Color = 'neutral';
const defaultVariant: keyof TextVariants = 'bodyMd';

const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      color,
      colorStep,
      disabled,
      fontFamily,
      fontSize,
      highContrast = false,
      textAlign = 'auto',
      style,
      inherit = false,
      variant,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { styles } = useStyles(stylesheet);
    const defaultStyles = !inherit
      ? [
          styles.color(color || defaultColor, highContrast, colorStep),
          styles.variant(variant || defaultVariant),
          fontSize && styles.fontSize(fontSize),
          fontFamily && styles.fontFamily(fontFamily),
          textAlign && styles.textAlign(textAlign),
        ]
      : null;

    return (
      <RNText
        ref={forwardedRef}
        disabled={disabled}
        style={[defaultStyles, disabled && styles.disabled, style]}
        {...restProps}
      />
    );
  },
);

Text.displayName = 'Text';

const stylesheet = createStyleSheet(theme => ({
  color: (color: Color, highContrast: boolean, colorStep?: ColorStep) => ({
    color: theme.colors[`${color}${colorStep ?? (highContrast ? '12' : '11')}`],
  }),
  variant: (variant: keyof TextVariants) => ({
    ...theme.typography.textVariants[variant],
  }),
  fontSize: (fontSize: FontSize) => ({
    fontSize: theme.typography.fontSizes[fontSize],
  }),
  fontFamily: (fontFamily: keyof typeof fontFamilies) => ({
    fontFamily: theme.typography.fontFamilies[fontFamily],
  }),
  textAlign: (textAlign: 'auto' | 'left' | 'center' | 'right' | 'justify') => ({
    textAlign,
  }),
  disabled: {
    color: theme.colors.neutral8,
  },
}));

export { Text };
export type { TextProps };
