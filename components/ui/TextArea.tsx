import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Color } from '@/styles/tokens/colors';

type TextAreaProps = Omit<RNTextInputProps, 'style'> & {
  color?: Color;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'soft';
  textInputStyle?: RNTextInputProps['style'];
  containerStyle?: ViewProps['style'];
};

const TextArea = React.forwardRef<
  React.ElementRef<typeof RNTextInput>,
  TextAreaProps
>(
  (
    {
      cursorColor,
      multiline = true,
      placeholderTextColor,
      selectionColor,
      color = 'primary',
      size = 'md',
      variant = 'outline',
      textAlignVertical = 'top',
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      textInputStyle: textInputStyleProp,
      containerStyle,
      ...restProps
    }: TextAreaProps,
    forwardedRef,
  ) => {
    const [focused, setFocused] = React.useState<boolean>(false);

    const { styles, theme } = useStyles(stylesheet, {
      size,
      variant,
    });

    const onFocus = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocusProp?.(e);
      },
      [onFocusProp],
    );
    const onBlur = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlurProp?.(e);
      },
      [onBlurProp],
    );

    return (
      <View style={[styles.container(color, focused), containerStyle]}>
        <RNTextInput
          {...restProps}
          ref={forwardedRef}
          cursorColor={cursorColor || theme.colors[`${color}8`]}
          placeholderTextColor={placeholderTextColor || theme.colors.neutral10}
          selectionColor={selectionColor || theme.colors[`${color}8`]}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          onBlur={onBlur}
          onFocus={onFocus}
          style={[styles.textInput(color), textInputStyleProp]}
        />
      </View>
    );
  },
);

TextArea.displayName = 'TextArea';

export const stylesheet = createStyleSheet(
  ({ colors, radius, space, typography }) => ({
    container: (color: Color, focused: boolean) => ({
      width: '100%',
      flexDirection: 'row',
      borderRadius: radius.md,
      borderCurve: 'continuous',
      variants: {
        size: {
          sm: {
            height: 64,
          },
          md: {
            height: 96,
          },
          lg: {
            height: 128,
          },
        },
        variant: {
          outline: {
            borderWidth: 1,
            borderColor: focused ? colors[`${color}8`] : colors.neutral7,
            backgroundColor: colors.transparent,
          },
          soft: {
            backgroundColor: colors[`${color}3`],
          },
          ghost: {
            backgroundColor: colors.transparent,
          },
        },
      },
    }),
    textInput: (color: Color) => ({
      width: '100%',
      flexShrink: 1,
      fontFamily: typography.fontFamilies.interRegular,
      variants: {
        size: {
          sm: {
            fontSize: typography.fontSizes[14],
            padding: space[8],
          },
          md: {
            fontSize: typography.fontSizes[16],
            padding: space[12],
          },
          lg: {
            fontSize: typography.fontSizes[18],
            padding: space[16],
          },
        },
        variant: {
          outline: {
            color: colors.neutral12,
          },
          soft: {
            color: colors[`${color}12`],
          },
          ghost: {
            color: colors.neutral12,
          },
        },
      },
    }),
  }),
);

export { TextArea };
export type { TextAreaProps };
