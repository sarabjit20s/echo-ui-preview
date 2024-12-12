import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Alert,
  AlertDescription,
  AlertHeader,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from '@/components/ui/Alert';

const title = `Your build is ready to deploy`;
const description = `Your application has been successfully compiled and packaged, and is now ready to be deployed to your production environment.`;

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <AlertSizeExample />
        <AlertVariantExample />
        <AlertColorExample />
        <AlertWithDescriptionExample />
      </ScrollView>
    </View>
  );
}

function AlertSizeExample() {
  const { styles } = useStyles(stylesheet);

  const sizes: AlertProps['size'][] = ['sm', 'md', 'lg'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      {sizes.map((size, i) => (
        <Alert key={i} size={size}>
          <AlertHeader>
            <AlertIcon name="checkmark-circle" />
            <AlertTitle>{title}</AlertTitle>
          </AlertHeader>
        </Alert>
      ))}
    </View>
  );
}

function AlertVariantExample() {
  const { styles } = useStyles(stylesheet);

  const variants: AlertProps['variant'][] = ['soft', 'outline'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Variants
      </Text>
      {variants.map((variant, i) => (
        <Alert key={i} variant={variant}>
          <AlertHeader>
            <AlertIcon name="checkmark-circle" />
            <AlertTitle>{title}</AlertTitle>
          </AlertHeader>
        </Alert>
      ))}
    </View>
  );
}

function AlertColorExample() {
  const { styles } = useStyles(stylesheet);

  const colors: AlertProps['color'][] = ['primary', 'neutral', 'red', 'green'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Colors
      </Text>
      {colors.map((color, i) => (
        <Alert key={i} color={color}>
          <AlertHeader>
            <AlertIcon name="checkmark-circle" />
            <AlertTitle>{title}</AlertTitle>
          </AlertHeader>
        </Alert>
      ))}
    </View>
  );
}

function AlertWithDescriptionExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        With description
      </Text>
      <Alert color="green">
        <AlertHeader>
          <AlertIcon name="checkmark-circle" />
          <AlertTitle>{title}</AlertTitle>
        </AlertHeader>
        <AlertDescription isPadding>{description}</AlertDescription>
      </Alert>
    </View>
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
