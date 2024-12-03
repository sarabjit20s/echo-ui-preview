import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextVariantExample />
        <TextColorExample />
        <TextFontFamilyExample />
      </ScrollView>
    </View>
  );
}

function TextVariantExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Variants
      </Text>

      <Text variant="displayLg">
        Display<Text>{'  '}Large</Text>
      </Text>
      <Text variant="displayMd">
        Display<Text>{'  '}Medium</Text>
      </Text>
      <Text variant="displaySm">
        Display<Text>{'  '}Small</Text>
      </Text>
      <Text variant="displayXs">
        Display<Text>{'  '}Extra Small</Text>
      </Text>
      <Text variant="headingLg">
        Heading<Text>{'  '}Large</Text>
      </Text>
      <Text variant="headingSm">
        Heading<Text>{'  '}Medium</Text>
      </Text>
      <Text variant="headingSm">
        Heading<Text>{'  '}Small</Text>
      </Text>
      <Text variant="headingXs">
        Heading<Text>{'  '}Extra Small</Text>
      </Text>
      <Text variant="labelLg">Label Large</Text>
      <Text variant="labelMd">Label Medium</Text>
      <Text variant="labelSm">Label Small</Text>
      <Text variant="labelXs">Label Extra Small</Text>
      <Text variant="bodyLg">Body Large</Text>
      <Text variant="bodyMd">Body Medium</Text>
      <Text variant="bodySm">Body Small</Text>
      <Text variant="bodyXs">Body Extra Small</Text>
    </View>
  );
}

function TextColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <Text color="neutral">Neutral</Text>
        <Text color="primary">Primary</Text>
        <Text color="green">Green</Text>
        <Text color="red">Red</Text>
      </View>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors (high contrast)
        </Text>
        <Text color="neutral" highContrast>
          Neutral
        </Text>
        <Text color="primary" highContrast>
          Primary
        </Text>
        <Text color="green" highContrast>
          Green
        </Text>
        <Text color="red" highContrast>
          Red
        </Text>
      </View>
    </>
  );
}

function TextFontFamilyExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Font families
      </Text>
      <Text fontFamily="interRegular">Inter Regular</Text>
      <Text fontFamily="interMedium">Inter Medium</Text>
      <Text fontFamily="interSemiBold">Inter Semi Bold</Text>
      <Text fontFamily="interBold">Inter Bold</Text>
      <Text fontFamily="interDisplayExtraBold">Inter Display Extra Bold</Text>
      <Text fontFamily="spaceMonoRegular">Spacemono Regular</Text>
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
}));
