import { View, ViewProps } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ButtonProps } from './Button';
import { Color } from '@/styles/tokens/colors';
import { Space } from '@/styles/tokens/space';
import { Separator } from './Separator';

type ButtonGroupOrientation = 'horizontal' | 'vertical';
type ButtonGroupSize = ButtonProps['size'];
type ButtonGroupVariant = ButtonProps['variant'];

type ButtonGroupContextValue = {
  disabled?: boolean;
  fill: boolean;
  gap: Space;
  isAttached: boolean;
  orientation: ButtonGroupOrientation;
  color: Color;
  size: ButtonGroupSize;
  variant: ButtonGroupVariant;
  highContrast: boolean;
};

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null,
);

const useButtonGroupContext = () => React.useContext(ButtonGroupContext);

type ButtonPosition = 'first' | 'middle' | 'last' | 'single';

const ButtonGroupButtonContext = React.createContext<ButtonPosition | null>(
  null,
);

const useButtonGroupButtonContext = () =>
  React.useContext(ButtonGroupButtonContext);

type ButtonGroupProps = ViewProps & {
  disabled?: boolean;
  fill?: boolean;
  gap?: Space;
  /**
   * Attach the buttons to each other
   */
  isAttached?: boolean;
  orientation?: ButtonGroupOrientation;
  color?: Color;
  size?: ButtonGroupSize;
  variant?: ButtonGroupVariant;
  highContrast?: boolean;
};

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ButtonGroupProps
>(
  (
    {
      children,
      disabled,
      fill = false,
      gap = 0,
      isAttached = true,
      orientation = 'horizontal',
      color = 'primary',
      size = 'md',
      variant = 'solid',
      highContrast = false,
      style,
      ...restProps
    }: ButtonGroupProps,
    forwardedRef,
  ) => {
    const { styles } = useStyles(stylesheet, {
      fill,
    });

    const arrChildren = Array.isArray(children) ? children : [children];
    const childrenCount = arrChildren.length;

    return (
      <ButtonGroupContext.Provider
        value={{
          disabled,
          fill,
          gap,
          isAttached,
          orientation,
          color,
          size,
          variant,
          highContrast,
        }}>
        <View
          ref={forwardedRef}
          style={[styles.buttonGroup(gap, orientation), style]}
          {...restProps}>
          {arrChildren.map((child, index) => {
            const value: ButtonPosition =
              childrenCount === 1
                ? 'single'
                : index === 0
                  ? 'first'
                  : index === childrenCount - 1
                    ? 'last'
                    : 'middle';
            return (
              <ButtonGroupButtonContext.Provider key={index} value={value}>
                {child}
                {value === 'first' || value === 'middle' ? (
                  <Separator
                    type="pixel"
                    color={disabled ? 'neutral' : color}
                    colorStep={
                      variant === 'solid' || variant === 'soft' ? 'A1' : '8'
                    }
                    orientation={
                      orientation === 'horizontal' ? 'vertical' : 'horizontal'
                    }
                  />
                ) : null}
              </ButtonGroupButtonContext.Provider>
            );
          })}
        </View>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

const stylesheet = createStyleSheet(theme => ({
  buttonGroup: (gap: Space, orientation: ButtonGroupProps['orientation']) => ({
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    gap: theme.space[gap],
    variants: {
      fill: {
        true: {
          width: '100%',
        },
        false: {
          width: 'auto',
        },
      },
    },
  }),
}));

export { ButtonGroup, useButtonGroupButtonContext, useButtonGroupContext };
export type { ButtonGroupProps };
