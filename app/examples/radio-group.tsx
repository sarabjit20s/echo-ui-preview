import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupProps,
} from '@/components/ui/RadioGroup';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <RadioGroupSizeExample />
        <RadioGroupVariantExample />
        <RadioGroupColorExample />
        <RadioGroupHightContrastExample />
        <RadioGroupDisabledExample />
      </ScrollView>
    </View>
  );
}

function RadioGroupSizeExample() {
  const { styles } = useStyles(stylesheet);

  const sizes: RadioGroupProps['size'][] = ['sm', 'md', 'lg'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        {sizes.map((size, i) => {
          return (
            <RadioGroup key={i} size={size} style={styles.radioGroup}>
              <RadioGroupItem value="1" style={styles.item}>
                <RadioGroupIndicator />
                <Text variant="labelMd" highContrast>
                  {size}
                </Text>
              </RadioGroupItem>
              <RadioGroupItem value="2" style={styles.item}>
                <RadioGroupIndicator />
                <Text variant="labelMd" highContrast>
                  {size}
                </Text>
              </RadioGroupItem>
            </RadioGroup>
          );
        })}
      </View>
    </View>
  );
}

function RadioGroupVariantExample() {
  const { styles } = useStyles(stylesheet);

  const variants: RadioGroupProps['variant'][] = [
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
              <RadioGroup key={i} variant={variant} style={styles.radioGroup}>
                <RadioGroupItem value="1" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {variant}
                  </Text>
                </RadioGroupItem>
                <RadioGroupItem value="2" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {variant}
                  </Text>
                </RadioGroupItem>
              </RadioGroup>
            );
          })}
        </View>
      </View>
    </>
  );
}

function RadioGroupColorExample() {
  const { styles } = useStyles(stylesheet);
  const colors: RadioGroupProps['color'][] = [
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
              <RadioGroup key={i} color={color} style={styles.radioGroup}>
                <RadioGroupItem value="1" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {color}
                  </Text>
                </RadioGroupItem>
                <RadioGroupItem value="2" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {color}
                  </Text>
                </RadioGroupItem>
              </RadioGroup>
            );
          })}
        </View>
      </View>
    </>
  );
}

function RadioGroupHightContrastExample() {
  const { styles } = useStyles(stylesheet);
  const colors: RadioGroupProps['color'][] = [
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
              <RadioGroup
                key={i}
                color={color}
                style={styles.radioGroup}
                variant="soft"
                highContrast>
                <RadioGroupItem value="1" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {color}
                  </Text>
                </RadioGroupItem>
                <RadioGroupItem value="2" style={styles.item}>
                  <RadioGroupIndicator />
                  <Text variant="labelMd" highContrast>
                    {color}
                  </Text>
                </RadioGroupItem>
              </RadioGroup>
            );
          })}
        </View>
      </View>
    </>
  );
}

function RadioGroupDisabledExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Disabled
        </Text>
        <View style={styles.rowGroup}>
          <RadioGroup style={styles.radioGroup}>
            <RadioGroupItem value="1" style={styles.item}>
              <RadioGroupIndicator />
              <Text variant="labelMd" highContrast>
                One
              </Text>
            </RadioGroupItem>
            <RadioGroupItem value="2" disabled style={styles.item}>
              <RadioGroupIndicator />
              <Text variant="labelMd" highContrast disabled>
                Two
              </Text>
            </RadioGroupItem>
          </RadioGroup>
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
  radioGroup: {
    gap: theme.space[8],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
}));
