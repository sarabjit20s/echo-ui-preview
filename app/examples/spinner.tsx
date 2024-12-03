import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Spinner } from '@/components/ui/Spinner';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <SpinnerSizeExample />
        <SpinnerColorExample />
      </ScrollView>
    </View>
  );
}

function SpinnerSizeExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </View>
    </View>
  );
}

function SpinnerColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <View style={styles.rowGroup}>
          <Spinner color="neutral" />
          <Spinner color="primary" />
          <Spinner color="green" />
          <Spinner color="red" />
        </View>
      </View>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors (high contrast)
        </Text>
        <View style={styles.rowGroup}>
          <Spinner color="neutral" highContrast />
          <Spinner color="primary" highContrast />
          <Spinner color="green" highContrast />
          <Spinner color="red" highContrast />
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
    gap: theme.space[16],
  },
}));
