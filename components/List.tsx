import React from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Separator } from './ui/Separator';

type ListProps = ScrollViewProps;

const List = React.forwardRef<React.ElementRef<typeof ScrollView>, ListProps>(
  ({ contentContainerStyle, ...restProps }, forwardedRef) => {
    const { styles } = useStyles(stylesheet);
    return (
      <ScrollView
        ref={forwardedRef}
        contentContainerStyle={[styles.list, contentContainerStyle]}
        {...restProps}
      />
    );
  },
);

List.displayName = 'List';

type ListGroupProps = ViewProps;

const ListGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ListGroupProps
>(({ children, style, ...restProps }, forwardedRef) => {
  const { styles } = useStyles(stylesheet);

  const arrChildren = Array.isArray(children) ? children : [children];
  const childrenCount = arrChildren.length;

  return (
    <View ref={forwardedRef} style={[styles.listGroup, style]} {...restProps}>
      {arrChildren.map((child, index) => {
        const value =
          childrenCount === 1
            ? 'single'
            : index === 0
              ? 'first'
              : index === childrenCount - 1
                ? 'last'
                : 'middle';
        return (
          <React.Fragment key={index}>
            {child}
            {value === 'first' || value === 'middle' ? (
              <Separator
                type="hairline"
                color="neutral"
                orientation="horizontal"
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
});

ListGroup.displayName = 'ListGroup';

type ListItemProps = PressableProps;

const ListItem = React.forwardRef<React.ElementRef<typeof View>, ListItemProps>(
  ({ style, ...restProps }, forwardedRef) => {
    const { styles } = useStyles(stylesheet);

    const itemStyle = (state: PressableStateCallbackType) => {
      return [
        styles.listItem(state.pressed),
        typeof style === 'function' ? style(state) : style,
      ];
    };
    return <Pressable ref={forwardedRef} style={itemStyle} {...restProps} />;
  },
);

ListItem.displayName = 'ListItem';

const stylesheet = createStyleSheet(({ colors, radius, space }) => ({
  list: {
    gap: space[16],
    paddingHorizontal: space[16],
    paddingTop: space[8],
  },
  listGroup: {
    borderRadius: radius.md,
    backgroundColor: colors.neutral2,
    overflow: 'hidden',
  },
  listItem: (pressed: boolean) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[12],
    paddingVertical: space[12],
    paddingHorizontal: space[20],
    backgroundColor: pressed ? colors.neutral3 : colors.neutral2,
  }),
}));

export { List, ListGroup, ListItem };
export type { ListProps, ListGroupProps, ListItemProps };
