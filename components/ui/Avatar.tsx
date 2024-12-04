import {
  Image,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProps,
  NativeSyntheticEvent,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Color } from '@/styles/tokens/colors';

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type AvatarContextProps = {
  fallbackStyle: ViewProps['style'];
  imageLoadingStatus: ImageLoadingStatus;
  imageStyle: ImageProps['style'];
  setImageLoadingStatus: React.Dispatch<
    React.SetStateAction<ImageLoadingStatus>
  >;
};

const AvatarContext = React.createContext<AvatarContextProps | null>(null);

const useAvatarContext = () => {
  const context = React.useContext(AvatarContext);
  if (context === null) {
    throw new Error(
      'useAvatarContext must be used within a AvatarContextProvider',
    );
  }
  return context;
};

type AvatarProps = ViewProps & {
  children: React.ReactNode;
  color?: Color;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'soft' | 'solid';
};

const Avatar = React.forwardRef<React.ElementRef<typeof View>, AvatarProps>(
  (
    {
      color = 'primary',
      size = 'md',
      variant = 'soft',
      style,
      ...restProps
    }: AvatarProps,
    forwardedRef,
  ) => {
    const { styles } = useStyles(stylesheet, {
      size,
      variant,
    });
    const [imageLoadingStatus, setImageLoadingStatus] =
      React.useState<ImageLoadingStatus>('idle');

    return (
      <AvatarContext.Provider
        value={{
          fallbackStyle: styles.fallback(color),
          imageLoadingStatus,
          imageStyle: styles.image,
          setImageLoadingStatus,
        }}>
        <View ref={forwardedRef} style={[styles.image, style]} {...restProps} />
      </AvatarContext.Provider>
    );
  },
);

Avatar.displayName = 'Avatar';

type AvatarImageProps = ImageProps;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  AvatarImageProps
>(
  (
    {
      onError: onErrorProp,
      onLoad: onLoadProp,
      onLoadStart: onLoadStartProp,
      style,
      ...restProps
    }: AvatarImageProps,
    forwardedRef,
  ) => {
    const { setImageLoadingStatus, imageStyle } = useAvatarContext();

    function onLoadStart() {
      setImageLoadingStatus('loading');
      onLoadStartProp?.();
    }
    function onLoad(e: NativeSyntheticEvent<ImageLoadEventData>) {
      setImageLoadingStatus('loaded');
      onLoadProp?.(e);
    }
    function onError(e: NativeSyntheticEvent<ImageErrorEventData>) {
      setImageLoadingStatus('error');
      onErrorProp?.(e);
    }

    return (
      <Image
        ref={forwardedRef}
        onError={onError}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        style={[imageStyle, style]}
        {...restProps}
      />
    );
  },
);

AvatarImage.displayName = 'AvatarImage';

type AvatarFallbackProps = ViewProps;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof View>,
  AvatarFallbackProps
>(({ style, ...restProps }: AvatarFallbackProps, forwardedRef) => {
  const { imageLoadingStatus, fallbackStyle, imageStyle } = useAvatarContext();
  return imageLoadingStatus !== 'loaded' ? (
    <View
      ref={forwardedRef}
      style={[imageStyle as ViewProps['style'], fallbackStyle, style]}
      {...restProps}
    />
  ) : null;
});

AvatarFallback.displayName = 'AvatarFallback';

export const stylesheet = createStyleSheet(({ colors, radius }) => ({
  image: {
    position: 'relative',
    borderRadius: radius.full,
    overflow: 'hidden',
    variants: {
      size: {
        xs: {
          width: 28,
          height: 28,
        },
        sm: {
          width: 36,
          height: 36,
        },
        md: {
          width: 44,
          height: 44,
        },
        lg: {
          width: 52,
          height: 52,
        },
        xl: {
          width: 64,
          height: 64,
        },
        '2xl': {
          width: 80,
          height: 80,
        },
      },
    },
  },
  fallback: (color: Color) => ({
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
      variant: {
        soft: {
          backgroundColor: colors[`${color}3`],
        },
        solid: {
          backgroundColor: colors[`${color}9`],
        },
      },
    },
  }),
}));

export { Avatar, AvatarImage, AvatarFallback, useAvatarContext };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
