import {
  AccessibilityInfo,
  BackHandler,
  findNodeHandle,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  ReduceMotion,
} from 'react-native-reanimated';

import { Text, TextProps } from './Text';
import { Portal, PortalProps } from '@/utils/portal';
import { useControllableState } from '@/hooks/useControllableState';
import { Slot } from '@/utils/slot';
import { useComposedRefs } from '@/utils/composeRefs';
import { useInsets } from '@/hooks/useInsets';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { TimingConfig } from '@/types/animation';

// animation config
const animConfig: TimingConfig = {
  duration: 200,
  easing: Easing.out(Easing.ease),
  reduceMotion: ReduceMotion.System,
};

type DialogContextValue = {
  closeOnPressOutside: boolean;
  closeOnBackPress: boolean;
  defaultOpen: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  triggerRef: React.RefObject<View>;
  titleId: string;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a Dialog');
  }
  return context;
};

type DialogProps = {
  children: React.ReactNode;
  closeOnPressOutside?: boolean;
  closeOnBackPress?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Dialog = ({
  children,
  closeOnPressOutside = true,
  closeOnBackPress = true,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: DialogProps) => {
  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    controlledValue: openProp,
    onControlledChange: onOpenChange,
  });

  const triggerRef = React.useRef<View>(null);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = React.useCallback(() => {
    setOpen(false);
    // move accessibility focus back to the trigger
    if (triggerRef.current) {
      const reactTag = findNodeHandle(triggerRef.current);
      if (reactTag === null) {
        return;
      }
      // BUG(react-native): 'setAccessibilityFocus' is not working on iOS
      AccessibilityInfo.setAccessibilityFocus(reactTag);
    }
  }, [setOpen]);

  return (
    <DialogContext.Provider
      value={{
        closeOnPressOutside,
        closeOnBackPress,
        defaultOpen,
        open,
        onOpen,
        onClose,
        triggerRef,
        titleId: React.useId(),
      }}>
      {children}
    </DialogContext.Provider>
  );
};

Dialog.displayName = 'Dialog';

type DialogTriggerProps = PressableProps & {
  asChild?: boolean;
};

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DialogTriggerProps
>(
  (
    {
      asChild = false,
      children,
      accessibilityState,
      disabled,
      onPress: onPressProp,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { open, onOpen, triggerRef } = useDialogContext();

    const composedRefs = useComposedRefs(triggerRef, forwardedRef);

    const onPress = React.useCallback(
      (e: GestureResponderEvent) => {
        onOpen();
        onPressProp?.(e);
      },
      [onPressProp, onOpen],
    );

    const Comp = asChild ? Slot : Pressable;

    return (
      <Comp
        ref={composedRefs}
        accessibilityRole="button"
        accessibilityState={{
          ...accessibilityState,
          disabled: disabled ?? accessibilityState?.disabled,
          expanded: open,
        }}
        disabled={disabled}
        onPress={onPress}
        {...restProps}>
        {children}
      </Comp>
    );
  },
);

DialogTrigger.displayName = 'DialogTrigger';

type DialogPortalProps = PortalProps;

const DialogPortal = ({ children, containerId }: DialogPortalProps) => {
  const ctx = useDialogContext();
  if (!ctx.open) return;
  return (
    <Portal containerId={containerId}>
      <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>
    </Portal>
  );
};

DialogPortal.displayName = 'DialogPortal';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type DialogOverlayProps = Omit<PressableProps, 'style'> & {
  asChild?: boolean;
  // callback as a style prop is not working with AnimatedPressable
  style?: StyleProp<ViewStyle>;
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DialogOverlayProps
>(({ asChild, onPress: onPressProp, style, ...restProps }, forwardedRef) => {
  const { onClose, closeOnPressOutside } = useDialogContext();

  const { styles } = useStyles(stylesheet);

  const onPress = React.useCallback(
    (e: GestureResponderEvent) => {
      if (closeOnPressOutside) onClose();
      onPressProp?.(e);
    },
    [closeOnPressOutside, onClose, onPressProp],
  );

  const Comp = asChild ? Slot : AnimatedPressable;
  const animProps = asChild
    ? null
    : {
        entering: FadeIn.duration(animConfig.duration)
          .easing(animConfig.easing)
          .reduceMotion(animConfig.reduceMotion),
        exiting: FadeOut.duration(animConfig.duration)
          .easing(animConfig.easing)
          .reduceMotion(animConfig.reduceMotion),
      };
  return (
    <Comp
      ref={forwardedRef}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onPress={onPress}
      style={[styles.overlay, style]}
      {...animProps}
      {...restProps}
    />
  );
});

DialogOverlay.displayName = 'DialogOverlay';

type DialogContentProps = ViewProps & {
  asChild?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DialogContentProps
>(
  (
    {
      children,
      asChild,
      width,
      minWidth,
      maxWidth = 600,
      height,
      minHeight,
      maxHeight: maxHeightProp,
      contentContainerStyle: contentContainerStyleProp,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { titleId, onClose, closeOnBackPress } = useDialogContext();

    const { styles } = useStyles(stylesheet);
    const { height: screenHeight } = useScreenDimensions();
    const insets = useInsets();
    const maxHeight =
      maxHeightProp ?? screenHeight - insets.top - insets.bottom;

    React.useEffect(() => {
      const listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (closeOnBackPress) {
          onClose();
        }
        return true;
      });
      return () => listener.remove();
    }, [closeOnBackPress, onClose]);

    const Comp = asChild ? Slot : Animated.View;
    const animProps = asChild
      ? null
      : {
          entering: FadeIn.duration(animConfig.duration)
            .easing(animConfig.easing)
            .reduceMotion(animConfig.reduceMotion),
          exiting: FadeOut.duration(animConfig.duration)
            .easing(animConfig.easing)
            .reduceMotion(animConfig.reduceMotion),
        };
    return (
      <View
        pointerEvents="box-none"
        style={[styles.contentContainerStyle, contentContainerStyleProp]}>
        <Comp
          ref={forwardedRef}
          accessibilityLabelledBy={titleId}
          accessibilityViewIsModal
          accessibilityLiveRegion="polite"
          importantForAccessibility="yes"
          onAccessibilityEscape={onClose}
          style={[
            styles.content,
            style,
            {
              width,
              minWidth,
              maxWidth,
              height,
              minHeight,
              maxHeight,
            },
          ]}
          {...animProps}
          {...restProps}>
          {children}
        </Comp>
      </View>
    );
  },
);

DialogContent.displayName = 'DialogContent';

// nativeId is used for accessibility
type DialogTitleProps = Omit<TextProps, 'nativeID'> & {
  asChild?: boolean;
};

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  DialogTitleProps
>(({ asChild, ...restProps }, forwardedRef) => {
  const { titleId } = useDialogContext();
  const Comp = asChild ? Slot : Text;
  return (
    <Comp
      ref={forwardedRef}
      nativeID={titleId}
      variant="headingSm"
      highContrast
      {...restProps}
    />
  );
});

DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionProps = Omit<TextProps, 'nativeID'> & {
  asChild?: boolean;
};

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  DialogDescriptionProps
>(({ asChild, ...restProps }, forwardedRef) => {
  const { titleId } = useDialogContext();
  const Comp = asChild ? Slot : Text;
  return (
    <Comp
      ref={forwardedRef}
      nativeID={titleId}
      variant="bodyMd"
      {...restProps}
    />
  );
});

DialogDescription.displayName = 'DialogDescription';

type DialogCloseProps = PressableProps & {
  asChild?: boolean;
};

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DialogCloseProps
>(({ asChild, onPress: onPressProp, ...restProps }, forwardedRef) => {
  const { onClose } = useDialogContext();

  const onPress = React.useCallback(
    (e: GestureResponderEvent) => {
      onClose();
      onPressProp?.(e);
    },
    [onClose, onPressProp],
  );

  const Comp = asChild ? Slot : Pressable;
  return (
    <Comp
      ref={forwardedRef}
      accessibilityRole="button"
      onPress={onPress}
      {...restProps}
    />
  );
});

DialogClose.displayName = 'DialogClose';

export const stylesheet = createStyleSheet(({ colors, radius, space }, rt) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  contentContainerStyle: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingHorizontal: space[16],
  },
  content: {
    width: '100%',
    gap: space[8],
    padding: space[20],
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.neutral2,
  },
}));

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  useDialogContext,
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
};
