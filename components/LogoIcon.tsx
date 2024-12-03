import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { useStyles } from 'react-native-unistyles';

import { Color, ColorStep } from '@/styles/tokens/colors';

type LogoIconProps = {
  color?: Color;
  colorStep?: ColorStep;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizeMap: Record<NonNullable<LogoIconProps['size']>, number> = {
  xxs: 20,
  xs: 28,
  sm: 36,
  md: 44,
  lg: 56,
  xl: 64,
};

const LogoIcon = React.forwardRef<React.ElementRef<typeof Svg>, LogoIconProps>(
  (
    { size: sizeProp = 'md', color: colorProp = 'primary', colorStep = '9' },
    forwardedRef,
  ) => {
    const { theme } = useStyles();
    const size = sizeMap[sizeProp];
    const strokeWidth = size / 12;
    const radius = size / 2 - strokeWidth / 2;
    const center = size / 2;

    const color = theme.colors[`${colorProp}${colorStep}`];

    return (
      <Svg
        ref={forwardedRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none">
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill={theme.colors.transparent}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <Circle cx={center} cy={center} r={radius / 2} fill={color} />
      </Svg>
    );
  },
);

LogoIcon.displayName = 'LogoIcon';

export default LogoIcon;
