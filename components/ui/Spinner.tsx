import { ViewStyle } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useStyles } from 'react-native-unistyles';

import { Color, ColorStep } from '@/styles/tokens/colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type SpinnerProps = {
  color?: Color;
  colorStep?: ColorStep;
  highContrast?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  style?: ViewStyle;
};

const spinnerSizeMap: Record<NonNullable<SpinnerProps['size']>, number> = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
};

const Spinner = React.forwardRef<React.ElementRef<typeof Svg>, SpinnerProps>(
  (
    {
      color: colorProp = 'neutral',
      colorStep,
      highContrast = false,
      loading = true,
      size: sizeProp = 'md',
      style,
    }: SpinnerProps,
    forwardedRef,
  ) => {
    const { theme } = useStyles();

    const color =
      theme.colors[`${colorProp}${colorStep ?? (highContrast ? 12 : 11)}`];

    const strokeWidth = 3;
    const size = spinnerSizeMap[sizeProp];
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const rotation = useSharedValue(0);

    React.useEffect(() => {
      if (!loading) {
        return;
      }
      rotation.value = withRepeat(
        withTiming(360, { duration: 600, easing: Easing.linear }),
        -1,
      );
    }, [rotation, loading]);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    if (!loading) {
      return null;
    }

    return (
      <AnimatedSvg
        ref={forwardedRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={[animatedStyles, style]}>
        <Circle
          r={radius}
          cx={center}
          cy={center}
          fill={theme.colors.transparent}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference / 1.5} ${circumference}`} // Single dash
          strokeLinecap="round"
        />
      </AnimatedSvg>
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner };
export type { SpinnerProps };
