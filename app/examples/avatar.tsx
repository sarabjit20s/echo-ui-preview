import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '@/components/ui/Text';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@/components/ui/Avatar';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <AvatarSizeExample />
        <AvatarVariantExample />
      </ScrollView>
    </View>
  );
}

function AvatarSizeExample() {
  const { styles } = useStyles(stylesheet);

  type AvatarExample = {
    size: AvatarProps['size'];
    uri: string;
    fallback: string;
    textVariant: TextProps['variant'];
  };
  const avatars: AvatarExample[] = [
    {
      size: 'xs',
      uri: 'https://avatar.iran.liara.run/public?username=Harry+Osborne',
      fallback: 'HO',
      textVariant: 'labelSm',
    },
    {
      size: 'sm',
      uri: 'https://avatar.iran.liara.run/public?username=John+Doe',
      fallback: 'JD',
      textVariant: 'labelSm',
    },
    {
      size: 'md',
      uri: 'https://avatar.iran.liara.run/public?username=Maria+Watson',
      fallback: 'MW',
      textVariant: 'labelSm',
    },
    {
      size: 'lg',
      uri: 'https://avatar.iran.liara.run/public?username=Scott+Land',
      fallback: 'SL',
      textVariant: 'labelLg',
    },
    {
      size: 'xl',
      uri: 'https://avatar.iran.liara.run/public?username=David+Matt',
      fallback: 'DM',
      textVariant: 'labelLg',
    },
    {
      size: '2xl',
      uri: 'https://avatar.iran.liara.run/public?username=Sam+Doe',
      fallback: 'SD',
      textVariant: 'headingSm',
    },
  ];

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      <ScrollView contentContainerStyle={styles.rowGroup} horizontal>
        {avatars.map(({ size, uri, fallback, textVariant }) => (
          <Avatar key={size} size={size}>
            <AvatarImage src={uri} />
            <AvatarFallback>
              <Text variant={textVariant} color="primary">
                {fallback}
              </Text>
            </AvatarFallback>
          </Avatar>
        ))}
      </ScrollView>
    </View>
  );
}

function AvatarVariantExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Variant
        </Text>
        <View style={styles.rowGroup}>
          <Avatar size="md" variant="solid">
            <AvatarImage src="" />
            <AvatarFallback>
              <Text variant="labelSm" color="primary" colorStep="Contrast">
                MW
              </Text>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md" variant="soft">
            <AvatarImage src="" />
            <AvatarFallback>
              <Text variant="labelSm" color="primary">
                SL
              </Text>
            </AvatarFallback>
          </Avatar>
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
