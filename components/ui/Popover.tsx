import React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  Keyframe,
  ReduceMotion,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  Popup,
  PopupAnchor,
  PopupAnchorProps,
  PopupArrow,
  PopupArrowProps,
  PopupClose,
  PopupCloseProps,
  PopupContent,
  PopupContentProps,
  PopupOverlay,
  PopupPortal,
  PopupProps,
  PopupTrigger,
  PopupTriggerProps,
} from './Popup';
import { TimingConfig } from '@/types/animation';

type PopoverProps = PopupProps;

const Popover = Popup;

Popover.displayName = 'Popover';

type PopoverTriggerProps = PopupTriggerProps;

const PopoverTrigger = PopupTrigger;

PopoverTrigger.displayName = 'PopoverTrigger';

type PopoverAnchorProps = PopupAnchorProps;

const PopoverAnchor = PopupAnchor;

PopoverAnchor.displayName = 'PopoverAnchor';

const animConfig: TimingConfig = {
  duration: 200,
  easing: Easing.inOut(Easing.ease),
  reduceMotion: ReduceMotion.System,
};

const AnimatedPopupContent = Animated.createAnimatedComponent(PopupContent);

type PopoverContentProps = PopupContentProps;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  PopoverContentProps
>(({ children, style, ...restProps }, ref) => {
  const { styles } = useStyles(stylesheet);

  return (
    <PopupPortal>
      <PopupOverlay />
      <AnimatedPopupContent
        ref={ref}
        entering={EntryKeyframe.duration(animConfig.duration).reduceMotion(
          animConfig.reduceMotion,
        )}
        exiting={ExitKeyframe.duration(animConfig.duration).reduceMotion(
          animConfig.reduceMotion,
        )}
        style={[styles.content, style]}
        {...restProps}>
        {children}
      </AnimatedPopupContent>
    </PopupPortal>
  );
});

PopoverContent.displayName = 'PopoverContent';

type PopoverArrowProps = PopupArrowProps;

const PopoverArrow = PopupArrow;

PopoverArrow.displayName = 'PopoverArrow';

type PopoverCloseProps = PopupCloseProps;

const PopoverClose = PopupClose;

PopoverClose.displayName = 'PopoverClose';

// Animations
const EntryKeyframe = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0.75 }],
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: animConfig.easing,
  },
});
const ExitKeyframe = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  100: {
    opacity: 0,
    transform: [{ scale: 0.75 }],
    easing: animConfig.easing,
  },
});

const stylesheet = createStyleSheet(({ colors, space, radius }) => ({
  content: {
    backgroundColor: colors.neutral2,
    padding: space[16],
    borderRadius: radius.md,
    borderCurve: 'continuous',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 24,
  },
}));

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverArrow,
  PopoverClose,
};

export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverArrowProps,
  PopoverCloseProps,
};
