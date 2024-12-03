import { View, ViewProps } from 'react-native';
import { forwardRef } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Color, ColorStep } from '@/styles/tokens/colors';

type SeparatorProps = ViewProps & {
  color?: Color;
  colorStep?: ColorStep;
  orientation?: 'horizontal' | 'vertical';
  type?: 'hairline' | 'pixel' | 'cell' | 'section';
};

const Separator = forwardRef<View, SeparatorProps>(
  (
    {
      color = 'neutral',
      colorStep = '6',
      orientation = 'horizontal',
      style,
      type = 'cell',
    }: SeparatorProps,
    forwardedRef,
  ) => {
    const { styles } = useStyles(stylesheet, {
      type,
    });
    return (
      <View
        ref={forwardedRef}
        style={[styles.separator(color, colorStep, orientation), style]}
      />
    );
  },
);

Separator.displayName = 'Separator';

export const stylesheet = createStyleSheet(({ colors }, rt) => ({
  separator: (
    color: Color,
    colorStep: ColorStep,
    orientation: SeparatorProps['orientation'],
  ) => {
    const isHorizontal = orientation === 'horizontal';
    return {
      flexShrink: 1,
      backgroundColor: colors[`${color}${colorStep}`],
      variants: {
        type: {
          hairline: {
            width: isHorizontal ? '100%' : rt.hairlineWidth,
            height: isHorizontal ? rt.hairlineWidth : '100%',
          },
          pixel: {
            width: isHorizontal ? '100%' : 1,
            height: isHorizontal ? 1 : '100%',
          },
          cell: {
            width: isHorizontal ? '100%' : 2,
            height: isHorizontal ? 2 : '100%',
          },
          section: {
            width: isHorizontal ? '100%' : 6,
            height: isHorizontal ? 6 : '100%',
          },
        },
      },
    };
  },
}));

export { Separator };
export type { SeparatorProps };
