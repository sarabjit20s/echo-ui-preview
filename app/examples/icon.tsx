import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Icon, IconProps } from '@/components/ui/Icon';

const iconName: IconProps['name'] = 'add-circle-outline';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <IconSizeExample />
        <IconColorExample />
      </ScrollView>
    </View>
  );
}

function IconSizeExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <View style={styles.rowGroup}>
        <Icon name={iconName} size="xs" />
        <Icon name={iconName} size="sm" />
        <Icon name={iconName} size="md" />
        <Icon name={iconName} size="lg" />
        <Icon name={iconName} size="xl" />
      </View>
    </View>
  );
}

function IconColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <View style={styles.rowGroup}>
          <Icon name={iconName} color="neutral" />
          <Icon name={iconName} color="primary" />
          <Icon name={iconName} color="green" />
          <Icon name={iconName} color="red" />
        </View>
      </View>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors (high contrast)
        </Text>
        <View style={styles.rowGroup}>
          <Icon name={iconName} color="neutral" highContrast />
          <Icon name={iconName} color="primary" highContrast />
          <Icon name={iconName} color="green" highContrast />
          <Icon name={iconName} color="red" highContrast />
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
