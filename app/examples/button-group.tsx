import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { IconButton } from '@/components/ui/IconButton';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <ButtonGroupOrientationExample />
        <ButtonGroupAttachedExample />
        <ButtonGroupWithIconButtonExample />
      </ScrollView>
    </View>
  );
}

function ButtonGroupOrientationExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Orientation
        </Text>
        <Text variant="labelMd" highContrast>
          Horizontal
        </Text>
        <ButtonGroup variant="solid" orientation="horizontal">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        <Text variant="labelMd" highContrast>
          Vertical
        </Text>
        <ButtonGroup
          variant="solid"
          orientation="vertical"
          style={{ maxWidth: 200 }}>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
      </View>
    </>
  );
}

function ButtonGroupAttachedExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Attached
        </Text>
        <Text variant="labelMd" highContrast>
          True
        </Text>
        <ButtonGroup variant="solid" isAttached={true}>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        <Text variant="labelMd" highContrast>
          False
        </Text>
        <ButtonGroup variant="solid" isAttached={false} gap={8}>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
      </View>
    </>
  );
}

function ButtonGroupWithIconButtonExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          With Icon Button
        </Text>
        <ButtonGroup variant="solid" isAttached={true}>
          <Button>Save</Button>
          <IconButton icon="chevron-down-outline" />
        </ButtonGroup>
        <ButtonGroup
          variant="soft"
          color="neutral"
          gap={8}
          isAttached={false}
          fullWidth
          highContrast>
          <IconButton icon="logo-apple" />
          <IconButton icon="logo-github" />
          <IconButton icon="logo-google" />
        </ButtonGroup>
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
