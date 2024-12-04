import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { IconButton, IconButtonProps } from '@/components/ui/IconButton';
import LogoIcon from '@/components/LogoIcon';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

const icon: IconButtonProps['icon'] = 'accessibility';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <IconButtonSizeExample />
        <IconButtonVariantExample />
        <IconButtonColorExample />
        <IconButtonHighContrastExample />
        <IconButtonCustomIconExample />
        <IconButtonLoadingExample />
        <IconButtonDisabledExample />
      </ScrollView>
    </View>
  );
}

function IconButtonSizeExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        <IconButton icon={icon} size="xs" />
        <IconButton icon={icon} size="sm" />
        <IconButton icon={icon} size="md" />
        <IconButton icon={icon} size="lg" />
      </View>
    </View>
  );
}

function IconButtonVariantExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Variants
        </Text>
        <View style={styles.rowGroup}>
          <IconButton icon={icon} variant="solid" />
          <IconButton icon={icon} variant="soft" />
          <IconButton icon={icon} variant="outline" />
          <IconButton icon={icon} variant="ghost" />
          <IconButton icon={icon} variant="text" />
        </View>
      </View>
    </>
  );
}

function IconButtonColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <View style={styles.rowGroup}>
          <IconButton icon={icon} color="primary" />
          <IconButton icon={icon} color="neutral" />
          <IconButton icon={icon} color="red" />
          <IconButton icon={icon} color="green" />
        </View>
      </View>
    </>
  );
}

function IconButtonLoadingExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Loading
        </Text>
        <View style={styles.rowGroup}>
          <IconButton icon={icon} loading />
        </View>
      </View>
    </>
  );
}

function IconButtonHighContrastExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          High contrast
        </Text>
        <Text variant="labelMd" highContrast>
          True
        </Text>
        <ButtonGroup variant="soft" gap={8} isAttached={false} highContrast>
          <IconButton icon={icon} color="primary" />
          <IconButton icon={icon} color="neutral" />
        </ButtonGroup>
        <Text variant="labelMd" highContrast>
          False
        </Text>
        <ButtonGroup variant="soft" gap={8} isAttached={false}>
          <IconButton icon={icon} color="primary" />
          <IconButton icon={icon} color="neutral" />
        </ButtonGroup>
      </View>
    </>
  );
}

function IconButtonCustomIconExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Custom icon
        </Text>
        <ButtonGroup variant="soft">
          <IconButton icon={<LogoIcon size="xxs" colorStep="11" />} />
        </ButtonGroup>
      </View>
    </>
  );
}

function IconButtonDisabledExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Disabled
        </Text>
        <View style={styles.rowGroup}>
          <IconButton icon={icon} disabled />
        </View>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
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
    gap: theme.space[12],
    flexWrap: 'wrap',
  },
}));
