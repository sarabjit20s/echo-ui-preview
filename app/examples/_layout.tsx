import { View } from 'react-native';
import { Link, Slot, useUnstableGlobalHref } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { IconButton } from '@/components/ui/IconButton';

export default function ComponentLayout() {
  const { styles } = useStyles(stylesheet);

  const globalHref = useUnstableGlobalHref();
  const title =
    globalHref.split('/').pop()?.split('-').join(' ') ?? 'Component';

  return (
    <View style={styles.layout}>
      <View style={styles.header}>
        <Link href={'..'} asChild>
          <IconButton
            icon="chevron-back"
            color="neutral"
            variant="text"
            highContrast
            accessibilityLabel="Go back"
          />
        </Link>
        <Text variant="labelMd" highContrast style={styles.title}>
          {title}
        </Text>
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
    paddingHorizontal: theme.space[8],
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
  title: {
    textTransform: 'capitalize',
  },
}));
