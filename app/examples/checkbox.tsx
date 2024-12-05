import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxProps,
} from '@/components/ui/Checkbox';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <CheckboxSizeExample />
        <CheckboxVariantExample />
        <CheckboxColorExample />
        <CheckboxHightContrastExample />
        <CheckboxDisabledExample />
        <CheckboxWithLabelExample />
      </ScrollView>
    </View>
  );
}

function CheckboxSizeExample() {
  const { styles } = useStyles(stylesheet);

  const sizes: CheckboxProps['size'][] = ['sm', 'md', 'lg'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        {sizes.map((size, i) => {
          return (
            <Checkbox key={i} size={size} defaultChecked>
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
            </Checkbox>
          );
        })}
      </View>
    </View>
  );
}

function CheckboxVariantExample() {
  const { styles } = useStyles(stylesheet);

  const variants: CheckboxProps['variant'][] = [
    'solid',
    'soft',
    'outline',
    'ghost',
  ];

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Variants
        </Text>
        <View style={styles.rowGroup}>
          {variants.map((variant, i) => {
            return (
              <Checkbox key={i} variant={variant} defaultChecked>
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
              </Checkbox>
            );
          })}
        </View>
      </View>
    </>
  );
}

function CheckboxColorExample() {
  const { styles } = useStyles(stylesheet);
  const colors: CheckboxProps['color'][] = [
    'primary',
    'neutral',
    'red',
    'green',
  ];
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <View style={styles.rowGroup}>
          {colors.map((color, i) => {
            return (
              <Checkbox key={i} color={color} defaultChecked>
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
              </Checkbox>
            );
          })}
        </View>
      </View>
    </>
  );
}

function CheckboxHightContrastExample() {
  const { styles } = useStyles(stylesheet);
  const colors: CheckboxProps['color'][] = [
    'primary',
    'neutral',
    'red',
    'green',
  ];
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors (high contrast)
        </Text>
        <View style={styles.rowGroup}>
          {colors.map((color, i) => {
            return (
              <Checkbox
                key={i}
                color={color}
                variant="soft"
                defaultChecked
                highContrast>
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
              </Checkbox>
            );
          })}
        </View>
      </View>
    </>
  );
}

function CheckboxDisabledExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Disabled
        </Text>
        <View style={styles.rowGroup}>
          <Checkbox defaultChecked disabled>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
          </Checkbox>
        </View>
      </View>
    </>
  );
}

function CheckboxWithLabelExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          With label
        </Text>
        <View style={styles.rowGroup}>
          <Checkbox style={styles.checkboxWithLabel}>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <Text variant="labelMd" highContrast>
              I agree to the terms and conditions.
            </Text>
          </Checkbox>
        </View>
      </View>
    </>
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
  checkboxWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
}));
