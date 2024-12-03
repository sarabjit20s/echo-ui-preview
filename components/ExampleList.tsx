import { ScrollView, TouchableOpacity } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './ui/Text';
import { Icon } from './ui/Icon';

type Example = {
  name: string;
  href: LinkProps['href'];
};

const examples: Example[] = [
  {
    name: 'Text',
    href: '/examples/text',
  },
  {
    name: 'Icon',
    href: '/examples/icon',
  },
  {
    name: 'Spinner',
    href: '/examples/spinner',
  },
  {
    name: 'Separator',
    href: '/examples/separator',
  },
];

export default function ExampleList() {
  const { styles } = useStyles(stylesheet);
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {examples
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ name, href }, i) => {
          return <LinkCard key={i} title={name} href={href} />;
        })}
    </ScrollView>
  );
}

function LinkCard({ title, href }: { title: string; href: LinkProps['href'] }) {
  const { styles } = useStyles(stylesheet);
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.linkCard}>
        <Text variant="labelMd" highContrast>
          {title}
        </Text>
        <Icon name="chevron-forward" />
      </TouchableOpacity>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  list: {
    gap: theme.space[8],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[8],
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.space[16],
    paddingHorizontal: theme.space[20],
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral3,
  },
}));
