import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Animated, {
  Easing,
  LinearTransition,
  Keyframe,
  runOnJS,
  ReduceMotion,
} from 'react-native-reanimated';

import {
  Popup,
  PopupArrow,
  PopupClose,
  PopupCloseProps,
  PopupContent,
  PopupContentProps,
  PopupOverlay,
  PopupPortal,
  PopupProps,
  PopupTrigger,
  PopupTriggerProps,
  usePopupContext,
} from './Popup';
import { Separator, SeparatorProps } from './Separator';
import { Text, TextProps } from './Text';
import { Icon, IconProps } from './Icon';
import { Checkbox, CheckboxIndicator, CheckboxProps } from './Checkbox';
import {
  RadioGroupItem,
  RadioGroup,
  RadioGroupProps,
  RadioGroupItemProps,
  useRadioGroupContext,
  RadioGroupIndicator,
} from './RadioGroup';
import { Slot } from '@/utils/slot';
import { Color } from '@/styles/tokens/colors';
import { TimingConfig } from '@/types/animation';

type DropdownMenuProps = PopupProps;

const DropdownMenu = Popup;

DropdownMenu.displayName = 'DropdownMenu';

type DropdownMenuTriggerProps = PopupTriggerProps;

const DropdownMenuTrigger = PopupTrigger;

type SubMenu = {
  id: string;
  Component: React.ElementType;
};
type DropdownMenuContentContextValue = {
  addSubMenu: (menu: SubMenu) => void;
  onSubMenuTriggerPress: (id: string) => void;
  onSubMenuBackPress: () => void;
};

const DropdownMenuContentContext =
  React.createContext<DropdownMenuContentContextValue | null>(null);

const useDropdownMenuContentContext = () => {
  const context = React.useContext(DropdownMenuContentContext);
  if (context === null) {
    throw new Error(
      'useDropdownMenuContentContext must be used within a DropdownMenuContent',
    );
  }
  return context;
};

type DropdownMenuContentProps = PopupContentProps & {
  showArrow?: boolean;
};

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuContentProps
>((props, forwardedRef) => {
  const { styles } = useStyles(stylesheet);

  return (
    <PopupPortal>
      <PopupOverlay style={styles.overlay} />
      <DropdownMenuContentImpl ref={forwardedRef} {...props} />
    </PopupPortal>
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

const animConfig: TimingConfig = {
  duration: 200,
  easing: Easing.out(Easing.ease),
  reduceMotion: ReduceMotion.System,
};

const AnimatedPopupContent = Animated.createAnimatedComponent(PopupContent);

type DropdownMenuContentImplProps = PopupContentProps & {
  showArrow?: boolean;
};

const DropdownMenuContentImpl = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuContentImplProps
>(({ children, showArrow = false, style, ...restProps }, forwardedRef) => {
  const { styles, theme } = useStyles(stylesheet);

  const subMenusRef = React.useRef<Map<string, SubMenu>>(new Map());
  const subMenuHistoryRef = React.useRef<string[]>([]);
  const [activeSubMenu, setActiveSubMenu] = React.useState<SubMenu | null>();

  const [layoutAnimProps, setLayoutAnimProps] = React.useState<{
    layout: React.ComponentProps<typeof AnimatedPopupContent>['layout'];
  } | null>(null);
  const [isEnteringAnimFinished, setIsEnteringAnimFinished] =
    React.useState(false);

  const addSubMenu = React.useCallback((subMenu: SubMenu) => {
    subMenusRef.current?.set(subMenu.id, subMenu);
  }, []);

  const onSubMenuTriggerPress = React.useCallback((id: string) => {
    const subMenu = subMenusRef.current?.get(id);
    if (subMenu) {
      subMenuHistoryRef.current.push(id);
      setActiveSubMenu(subMenu);
    }
  }, []);

  const onSubMenuBackPress = React.useCallback(() => {
    subMenuHistoryRef.current.pop();
    const nextId =
      subMenuHistoryRef.current[subMenuHistoryRef.current.length - 1];
    if (nextId) {
      const subMenu = subMenusRef.current?.get(nextId);
      if (subMenu) {
        setActiveSubMenu(subMenu);
      } else {
        setActiveSubMenu(null);
      }
    } else {
      setActiveSubMenu(null);
    }
  }, []);

  const enteringAnimCallback = React.useCallback((finished: boolean) => {
    'worklet';
    if (finished) {
      // add layout animation after the entering animation finishes
      // on Android directly assigning the 'LinearTransition' to the `layout` prop
      // interupts the `entering` animation
      runOnJS(setIsEnteringAnimFinished)(true);
    }
  }, []);

  React.useEffect(() => {
    if (isEnteringAnimFinished) {
      setLayoutAnimProps({
        layout: LinearTransition.duration(animConfig.duration).easing(
          Easing.out(Easing.ease),
        ),
      });
    }
  }, [isEnteringAnimFinished]);

  return (
    <AnimatedPopupContent
      ref={forwardedRef}
      minWidth={112}
      entering={EntryKeyframe.duration(animConfig.duration)
        .reduceMotion(animConfig.reduceMotion)
        .withCallback(enteringAnimCallback)}
      exiting={ExitKeyframe.duration(animConfig.duration).reduceMotion(
        animConfig.reduceMotion,
      )}
      style={[styles.menuContainer, style]}
      {...layoutAnimProps}
      {...restProps}>
      {showArrow && (
        <PopupArrow arrowColor={theme.colors.neutral2} arrowSize={6} />
      )}
      <DropdownMenuContentContext.Provider
        value={{
          addSubMenu,
          onSubMenuTriggerPress,
          onSubMenuBackPress,
        }}>
        {activeSubMenu ? (
          <activeSubMenu.Component />
        ) : (
          <View accessibilityRole="menu" style={styles.menu}>
            {children}
          </View>
        )}
      </DropdownMenuContentContext.Provider>
    </AnimatedPopupContent>
  );
});

DropdownMenuContentImpl.displayName = 'DropdownMenuContentImpl';

type DropdownMenuLabelProps = TextProps;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  DropdownMenuLabelProps
>(({ children, style, ...restProps }, forwardedRef) => {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <Text
        ref={forwardedRef}
        variant="labelSm"
        style={[styles.label, style]}
        {...restProps}>
        {children}
      </Text>
    </>
  );
});

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

type DropdownMenuItemProps = Omit<PressableProps, 'children'> & {
  children: React.ReactNode;
  color?: Color;
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  closeOnPress?: boolean;
};

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownMenuItemProps
>(
  (
    {
      accessibilityState,
      children,
      color = 'neutral',
      startIcon,
      endIcon,
      disabled = false,
      closeOnPress = true,
      onPress: onPressProp,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { onClose } = usePopupContext();

    const { styles } = useStyles(stylesheet);

    const onPress = React.useCallback(
      (e: GestureResponderEvent) => {
        onPressProp?.(e);
        if (closeOnPress) {
          onClose();
        }
      },
      [onPressProp, onClose, closeOnPress],
    );

    const itemStyle = (state: PressableStateCallbackType) => {
      return [
        styles.item(state.pressed, color),
        typeof style === 'function' ? style(state) : style,
      ];
    };

    return (
      <>
        <Pressable
          ref={forwardedRef}
          accessibilityRole="menuitem"
          accessibilityState={{
            ...accessibilityState,
            disabled: disabled ?? accessibilityState?.disabled,
          }}
          disabled={disabled}
          onPress={onPress}
          style={itemStyle}
          {...restProps}>
          {startIcon && (
            <Icon
              name={startIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
            />
          )}
          <Text
            variant="bodyMd"
            color={color}
            highContrast={color === 'neutral'}
            disabled={!!disabled}>
            {children}
          </Text>
          {endIcon && (
            <Icon
              name={endIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
              style={styles.endIcon}
            />
          )}
        </Pressable>
      </>
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

type DropdownMenuCheckboxItemProps = Omit<
  CheckboxProps,
  'children' | 'size' | 'variant'
> & {
  children: React.ReactNode;
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  closeOnPress?: boolean;
};

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownMenuCheckboxItemProps
>(
  (
    {
      children,
      color = 'neutral',
      startIcon,
      endIcon,
      closeOnPress = true,
      disabled = false,
      onPress: onPressProp,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { onClose } = usePopupContext();

    const { styles } = useStyles(stylesheet);

    const onPress = React.useCallback(
      (e: GestureResponderEvent) => {
        onPressProp?.(e);
        if (closeOnPress) {
          onClose();
        }
      },
      [onPressProp, onClose, closeOnPress],
    );

    const itemStyle = (state: PressableStateCallbackType) => {
      return [
        styles.item(state.pressed, color),
        styles.checkboxItem,
        typeof style === 'function' ? style(state) : style,
      ];
    };

    return (
      <>
        <Checkbox
          ref={forwardedRef}
          accessibilityRole="menuitem"
          disabled={disabled}
          color={color}
          variant="ghost"
          size="lg"
          highContrast={color === 'neutral'}
          onPress={onPress}
          style={itemStyle}
          {...restProps}>
          <CheckboxIndicator />
          {startIcon && (
            <Icon
              name={startIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
            />
          )}
          <Text
            variant="bodyMd"
            color={color}
            highContrast={color === 'neutral'}
            disabled={!!disabled}>
            {children}
          </Text>
          {endIcon && (
            <Icon
              name={endIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
              style={styles.endIcon}
            />
          )}
        </Checkbox>
      </>
    );
  },
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

type DropdownMenuRadioGroupProps = Omit<RadioGroupProps, 'size' | 'variant'>;

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuRadioGroupProps
>(
  (
    { children, color = 'neutral', disabled = false, ...restProps },
    forwardedRef,
  ) => {
    return (
      <RadioGroup
        ref={forwardedRef}
        color={color}
        size="md"
        variant="ghost"
        highContrast={color === 'neutral'}
        disabled={disabled}
        {...restProps}>
        {children}
      </RadioGroup>
    );
  },
);

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

type DropdownMenuRadioGroupItemProps = RadioGroupItemProps & {
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  closeOnPress?: boolean;
};

const DropdownMenuRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownMenuRadioGroupItemProps
>(
  (
    {
      children,
      startIcon,
      endIcon,
      closeOnPress = true,
      disabled = false,
      onPress: onPressProp,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { color } = useRadioGroupContext();
    const { onClose } = usePopupContext();

    const { styles } = useStyles(stylesheet);

    const onPress = React.useCallback(
      (e: GestureResponderEvent) => {
        onPressProp?.(e);
        onClose();
      },
      [onPressProp, onClose],
    );

    const itemStyle = (state: PressableStateCallbackType) => {
      return [
        styles.item(state.pressed, color),
        styles.checkboxItem,
        typeof style === 'function' ? style(state) : style,
      ];
    };

    return (
      <>
        <RadioGroupItem
          ref={forwardedRef}
          accessibilityRole="menuitem"
          disabled={disabled}
          onPress={onPress}
          style={itemStyle}
          {...restProps}>
          <RadioGroupIndicator />
          {startIcon && (
            <Icon
              name={startIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
            />
          )}
          <Text
            variant="bodyMd"
            color={color}
            highContrast={color === 'neutral'}
            disabled={!!disabled}>
            {children}
          </Text>
          {endIcon && (
            <Icon
              name={endIcon}
              size="lg"
              color={color}
              highContrast={color === 'neutral'}
              disabled={!!disabled}
              style={styles.endIcon}
            />
          )}
        </RadioGroupItem>
      </>
    );
  },
);

DropdownMenuRadioGroupItem.displayName = 'DropdownMenuRadioGroupItem';

type DropdownMenuCloseProps = PopupCloseProps;

const DropdownMenuClose = PopupClose;

DropdownMenuClose.displayName = 'DropdownMenuClose';

type DropdownMenuSeparatorProps = SeparatorProps;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuSeparatorProps
>(({ style, ...restProps }, forwardedRef) => {
  const { styles } = useStyles(stylesheet);
  return (
    <Separator
      ref={forwardedRef}
      type="pixel"
      orientation="horizontal"
      style={[styles.separator, style]}
      {...restProps}
    />
  );
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

type DropdownSubMenuContextValue = {
  id: string;
};

const DropdownSubMenuContext =
  React.createContext<DropdownSubMenuContextValue | null>(null);

const useDropdownSubMenuContext = () => {
  const context = React.useContext(DropdownSubMenuContext);
  if (!context) {
    throw new Error(
      'useDropdownSubMenuContext must be used within a DropdownSubMenu',
    );
  }
  return context;
};

type DropdownSubMenuProps = {
  children: React.ReactNode;
};

const DropdownSubMenu = ({ children }: DropdownSubMenuProps) => {
  const id = React.useId();
  return (
    <DropdownSubMenuContext.Provider value={{ id }}>
      {children}
    </DropdownSubMenuContext.Provider>
  );
};

DropdownSubMenu.displayName = 'DropdownSubMenu';

type DropdownSubMenuTriggerProps = PressableProps & {
  asChild?: boolean;
};

const DropdownSubMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownSubMenuTriggerProps
>(({ asChild = false, onPress: onPressProp, ...restProps }, forwardedRef) => {
  const { onSubMenuTriggerPress } = useDropdownMenuContentContext();
  const { id } = useDropdownSubMenuContext();

  const onPress = React.useCallback(
    (e: GestureResponderEvent) => {
      onSubMenuTriggerPress(id);
      onPressProp?.(e);
    },
    [onPressProp, id, onSubMenuTriggerPress],
  );

  const Comp = asChild ? Slot : Pressable;
  return (
    <>
      <Comp
        ref={forwardedRef}
        accessibilityRole="menuitem"
        onPress={onPress}
        {...restProps}
      />
    </>
  );
});

DropdownSubMenuTrigger.displayName = 'DropdownSubMenuTrigger';

type DropdownSubMenuContentProps = Omit<ViewProps, 'children'> & {
  children: React.ReactNode;
};

const DropdownSubMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownSubMenuContentProps
>(({ children, style, ...restProps }, forwardedRef) => {
  const { addSubMenu } = useDropdownMenuContentContext();
  const { id } = useDropdownSubMenuContext();
  const { styles } = useStyles(stylesheet);

  React.useEffect(() => {
    const menu = {
      id,
      Component: () => (
        <View
          ref={forwardedRef}
          accessibilityRole="menu"
          style={[styles.menu, style]}
          {...restProps}>
          {children}
        </View>
      ),
    };
    addSubMenu(menu);
  }, [addSubMenu, children, forwardedRef, id, restProps, style, styles.menu]);
  return null;
});

DropdownSubMenuContent.displayName = 'DropdownSubMenuContent';

type DropdownSubMenuHeaderProps = ViewProps;

/**
 * It should be rendered inside `DropdownSubMenuContent`
 */
const DropdownSubMenuHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownSubMenuHeaderProps
>(({ style, ...restProps }, forwardedRef) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View
      ref={forwardedRef}
      style={[styles.subMenuHeader, style]}
      {...restProps}
    />
  );
});

DropdownSubMenuHeader.displayName = 'DropdownSubMenuHeader';

type DropdownSubMenuBackTriggerProps = PressableProps & {
  asChild?: boolean;
};

const DropdownSubMenuBackTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DropdownSubMenuBackTriggerProps
>(({ asChild, onPress: onPressProp, ...restProps }, forwardedRef) => {
  const { onSubMenuBackPress } = useDropdownMenuContentContext();

  const onPress = React.useCallback(
    (e: GestureResponderEvent) => {
      onSubMenuBackPress();
      onPressProp?.(e);
    },
    [onPressProp, onSubMenuBackPress],
  );

  const Comp = asChild ? Slot : Pressable;
  return (
    <Comp
      ref={forwardedRef}
      accessibilityRole="menuitem"
      onPress={onPress}
      {...restProps}
    />
  );
});

DropdownSubMenuBackTrigger.displayName = 'DropdownSubMenuBackTrigger';

// Custom animations
const EntryKeyframe = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0.25 }],
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
    transform: [{ scale: 0.25 }],
    easing: animConfig.easing,
  },
});

const stylesheet = createStyleSheet(({ colors, radius, space }) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparent,
  },
  menuContainer: {
    padding: 0,
    backgroundColor: colors.neutral2,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.3,
    shadowRadius: 64,
    elevation: 24,
  },
  menu: {
    paddingVertical: space[8],
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  label: {
    textAlign: 'left',
    paddingHorizontal: space[20],
    paddingVertical: space[8],
  },
  item: (pressed: boolean, color: Color) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[16],
    paddingHorizontal: space[20],
    paddingVertical: space[12],
    backgroundColor: pressed ? colors[`${color}3`] : colors.transparent,
  }),
  endIcon: {
    flexGrow: 1,
    textAlign: 'right',
  },
  checkboxItem: {
    gap: space[12],
  },
  separator: {
    marginVertical: space[8],
  },
  subMenuTrigger: {
    justifyContent: 'space-between',
  },
  subMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[12],
    paddingHorizontal: space[12],
    paddingTop: space[4],
    paddingBottom: space[8],
  },
}));

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioGroupItem,
  DropdownMenuClose,
  DropdownMenuSeparator,
  DropdownSubMenu,
  DropdownSubMenuTrigger,
  DropdownSubMenuContent,
  DropdownSubMenuHeader,
  DropdownSubMenuBackTrigger,
};
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuLabelProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioGroupItemProps,
  DropdownMenuCloseProps,
  DropdownMenuSeparatorProps,
  DropdownSubMenuProps,
  DropdownSubMenuTriggerProps,
  DropdownSubMenuContentProps,
  DropdownSubMenuHeaderProps,
  DropdownSubMenuBackTriggerProps,
};
