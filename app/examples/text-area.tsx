import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { TextArea, TextAreaProps } from '@/components/ui/TextArea';

let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate harum temporibus debitis qui dolores vel tempora nobis aut ipsa distinctio`;

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextAreaSizeExample />
        <TextAreaVariantExample />
        <TextAreaColorExample />
        <TextAreaReadOnlyExample />
      </ScrollView>
    </View>
  );
}

function TextAreaSizeExample() {
  const { styles } = useStyles(stylesheet);

  const sizes: TextAreaProps['size'][] = ['sm', 'md', 'lg'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      {sizes.map((size, i) => {
        return <TextArea key={i} size={size} placeholder={`Size ${size}`} />;
      })}
    </View>
  );
}

function TextAreaVariantExample() {
  const { styles } = useStyles(stylesheet);

  const variants: TextAreaProps['variant'][] = ['outline', 'soft', 'ghost'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Variants
      </Text>
      {variants.map((variant, i) => {
        return (
          <TextArea
            key={i}
            variant={variant}
            placeholder={`Variant ${variant}`}
          />
        );
      })}
    </View>
  );
}

function TextAreaColorExample() {
  const { styles } = useStyles(stylesheet);

  const colors: TextAreaProps['color'][] = [
    'primary',
    'neutral',
    'red',
    'green',
  ];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Colors
      </Text>
      {colors.map((color, i) => {
        return (
          <TextArea
            key={i}
            color={color}
            variant="soft"
            placeholder={`Color ${color}`}
          />
        );
      })}
    </View>
  );
}

function TextAreaReadOnlyExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Read only
      </Text>
      <TextArea value={content} readOnly />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
  },
  container: {
    gap: theme.space[12],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[8],
  },
  group: {
    marginVertical: theme.space[8],
    gap: theme.space[12],
  },
  rowGroup: {
    flexDirection: 'row',
    gap: theme.space[20],
    flexWrap: 'wrap',
  },
  radioGroup: {
    gap: theme.space[8],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
}));
