import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import LogoIcon from '@/components/LogoIcon';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <ButtonSizeExample />
        <ButtonVariantExample />
        <ButtonColorExample />
        <ButtonWithIconExample />
        <ButtonHighContrastExample />
        <ButtonLoadingExample />
        <ButtonDisabledExample />
      </ScrollView>
    </View>
  );
}

function ButtonSizeExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </View>
    </View>
  );
}

function ButtonVariantExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Variants
        </Text>
        <View style={styles.rowGroup}>
          <Button variant="solid">Solid</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="text">Text</Button>
        </View>
      </View>
    </>
  );
}

function ButtonColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <View style={styles.rowGroup}>
          <Button color="primary">Primary</Button>
          <Button color="neutral">Neutral</Button>
          <Button color="red">Red</Button>
          <Button color="green">Green</Button>
        </View>
      </View>
    </>
  );
}

function ButtonWithIconExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          With icon
        </Text>
        <View style={styles.rowGroup}>
          <Button variant="soft" color="neutral" startIcon={'copy-outline'}>
            Copy
          </Button>
          <Button variant="soft" color="neutral" endIcon={'chevron-down'}>
            Show more
          </Button>
          <Button
            variant="soft"
            color="neutral"
            startIcon={<LogoIcon size="xxs" color="neutral" colorStep="11" />}>
            Custom Icon
          </Button>
        </View>
      </View>
    </>
  );
}

function ButtonLoadingExample() {
  const { styles } = useStyles(stylesheet);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Loading
        </Text>
        <View style={styles.rowGroup}>
          <Button loading={loading} loadingText="Loading">
            Button
          </Button>
          <Button variant="soft" onPress={() => setLoading(!loading)}>
            Toggle
          </Button>
        </View>
      </View>
    </>
  );
}

function ButtonHighContrastExample() {
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
          <Button color="primary">Primary</Button>
          <Button color="neutral">Neutral</Button>
        </ButtonGroup>
        <Text variant="labelMd" highContrast>
          False
        </Text>
        <ButtonGroup variant="soft" gap={8} isAttached={false}>
          <Button color="primary">Primary</Button>
          <Button color="neutral">Neutral</Button>
        </ButtonGroup>
      </View>
    </>
  );
}

function ButtonDisabledExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Disabled
        </Text>
        <View style={styles.rowGroup}>
          <Button disabled>Disabled</Button>
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
