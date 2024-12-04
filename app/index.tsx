import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import ExampleList from '@/components/ExampleList';
import LogoIcon from '@/components/LogoIcon';

export default function Index() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <LogoIcon size="xs" color="primary" colorStep="11" />
          <Text variant="headingSm" color="primary">
            EchoUI
          </Text>
        </View>
        <Text variant="labelLg" highContrast>
          Browse components
        </Text>
      </View>
      <ExampleList />
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.statusBar.height + theme.space[12],
    backgroundColor: theme.colors.background,
  },
  header: {
    gap: theme.space[16],
    paddingBottom: theme.space[4],
    paddingHorizontal: theme.space[16],
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
}));
