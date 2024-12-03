import { TouchableOpacity, View } from 'react-native';
import { Link, Slot, useUnstableGlobalHref } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Icon } from '@/components/ui/Icon';

export default function ComponentLayout() {
  const { styles } = useStyles(stylesheet);

  const globalHref = useUnstableGlobalHref();
  const title = globalHref.split('/').pop() ?? 'Component';

  return (
    <View style={styles.layout}>
      <View style={styles.header}>
        <Link href={'..'} asChild>
          <TouchableOpacity style={styles.button}>
            <Icon name="chevron-back" color="primary" size="lg" />
            <Text variant="labelMd" color="primary" style={styles.text}>
              {title}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Slot />
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  layout: {
    flex: 1,
    paddingTop: rt.statusBar.height,
    paddingBottom: rt.insets.bottom,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.space[16],
    height: theme.space[56],
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
    height: theme.space[44],
  },
  text: {
    textTransform: 'capitalize',
  },
}));
