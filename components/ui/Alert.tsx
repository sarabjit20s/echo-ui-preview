import React from 'react';
import { View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from './Text';
import { Icon, IconProps } from './Icon';
import { Color } from '@/styles/tokens/colors';

type AlertSize = 'sm' | 'md' | 'lg';
type AlertVariant = 'soft' | 'outline';

type AlertContextProps = {
  color: Color;
  size: AlertSize;
  variant: AlertVariant;
  highContrast: boolean;
};

const AlertContext = React.createContext<AlertContextProps | undefined>(
  undefined,
);

const useAlertContext = () => {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      'useAlertContext must be used within a AlertContextProvider',
    );
  }
  return context;
};

type AlertProps = ViewProps & {
  color?: Color;
  highContrast?: boolean;
  size?: AlertSize;
  variant?: AlertVariant;
};

const Alert = React.forwardRef<React.ElementRef<typeof View>, AlertProps>(
  (
    {
      color = 'primary',
      size = 'md',
      variant = 'soft',
      highContrast = false,
      style,
      ...restProps
    }: AlertProps,
    forwardedRef,
  ) => {
    const { styles } = useStyles(stylesheet, {
      size,
      variant,
    });
    return (
      <AlertContext.Provider value={{ color, highContrast, size, variant }}>
        <View
          ref={forwardedRef}
          accessibilityRole="alert"
          style={[styles.alert(color), style]}
          {...restProps}
        />
      </AlertContext.Provider>
    );
  },
);

Alert.displayName = 'Alert';

type AlertHeaderProps = ViewProps;

const AlertHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  AlertHeaderProps
>(({ style, ...restProps }: AlertProps, forwardedRef) => {
  const { size, variant } = useAlertContext();
  const { styles } = useStyles(stylesheet, {
    size,
    variant,
  });
  return (
    <View
      ref={forwardedRef}
      accessibilityRole="alert"
      style={[styles.header, style]}
      {...restProps}
    />
  );
});

AlertHeader.displayName = 'AlertHeader';

type AlertTitleProps = TextProps;

const titleVariantMap: Record<AlertSize, TextProps['variant']> = {
  sm: 'labelSm',
  md: 'labelMd',
  lg: 'labelLg',
};

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  AlertTitleProps
>((props: AlertTitleProps, forwardedRef) => {
  const { color, highContrast, size } = useAlertContext();
  return (
    <Text
      ref={forwardedRef}
      color={color}
      variant={titleVariantMap[size]}
      highContrast={highContrast}
      {...props}
    />
  );
});

AlertTitle.displayName = 'AlertTitle';

type AlertDescriptionProps = TextProps & {
  startMargin?: boolean;
};

const descriptionVariantMap: Record<AlertSize, TextProps['variant']> = {
  sm: 'bodySm',
  md: 'bodyMd',
  lg: 'bodyLg',
};

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  AlertDescriptionProps
>(
  (
    { startMargin = true, style, ...restProps }: AlertDescriptionProps,
    forwardedRef,
  ) => {
    const { color, highContrast, size, variant } = useAlertContext();
    const { styles } = useStyles(stylesheet, {
      size,
      variant,
    });
    return (
      <Text
        ref={forwardedRef}
        color={color}
        variant={descriptionVariantMap[size]}
        highContrast={highContrast}
        style={[startMargin && styles.description, style]}
        {...restProps}
      />
    );
  },
);

AlertDescription.displayName = 'AlertDescription';

type AlertIconProps = IconProps;

const iconSizeMap: Record<AlertSize, IconProps['size']> = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};

const AlertIcon = React.forwardRef<
  React.ElementRef<typeof Icon>,
  AlertIconProps
>(({ ...restProps }: AlertIconProps, forwardedRef) => {
  const { color, highContrast, size } = useAlertContext();
  return (
    <Icon
      ref={forwardedRef}
      color={color}
      size={iconSizeMap[size]}
      highContrast={highContrast}
      {...restProps}
    />
  );
});

AlertIcon.displayName = 'AlertIcon';

export const stylesheet = createStyleSheet(({ colors, radius, space }) => ({
  alert: (color: Color) => ({
    width: '100%',
    borderRadius: radius.md,
    borderCurve: 'continuous',
    variants: {
      size: {
        sm: {
          gap: space[4],
          padding: space[12],
        },
        md: {
          gap: space[8],
          padding: space[16],
        },
        lg: {
          gap: space[12],
          padding: space[20],
        },
      },
      variant: {
        soft: {
          backgroundColor: colors[`${color}3`],
        },
        outline: {
          backgroundColor: colors.transparent,
          borderWidth: 1,
          borderColor: colors[`${color}7`],
        },
      },
    },
  }),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    variants: {
      size: {
        sm: {
          gap: space[8],
        },
        md: {
          gap: space[10],
        },
        lg: {
          gap: space[12],
        },
      },
    },
  },
  description: {
    variants: {
      size: {
        sm: {
          marginStart: space[24],
        },
        md: {
          marginStart: 30,
        },
        lg: {
          marginStart: space[36],
        },
      },
    },
  },
}));

export { Alert, AlertHeader, AlertTitle, AlertIcon, AlertDescription };
export type {
  AlertProps,
  AlertHeaderProps,
  AlertTitleProps,
  AlertIconProps,
  AlertDescriptionProps,
};
