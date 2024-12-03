import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import { Separator } from '@/components/ui/Separator';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <SepartorTypeExample />
        <SepartorOrientationExample />
        <SeparatorColorExample />
      </ScrollView>
    </View>
  );
}

function SepartorTypeExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Types
      </Text>
      <Text variant="labelMd" highContrast>
        Hairline
      </Text>
      <Separator type="hairline" />
      <Text variant="labelMd" highContrast>
        Pixel
      </Text>
      <Separator type="pixel" />
      <Text variant="labelMd" highContrast>
        Cell
      </Text>
      <Separator type="cell" />
      <Text variant="labelMd" highContrast>
        Section
      </Text>
      <Separator type="section" />
    </View>
  );
}

function SepartorOrientationExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Orientation
      </Text>
      <Text variant="labelMd" highContrast>
        Horizontal
      </Text>
      <Separator orientation="horizontal" type="hairline" />
      <Separator orientation="horizontal" type="pixel" />
      <Separator orientation="horizontal" type="cell" />
      <Separator orientation="horizontal" type="section" />
      <Text variant="labelMd" highContrast>
        Vertical
      </Text>
      <View style={styles.verticalSeparatorContainer}>
        <Separator orientation="vertical" type="hairline" />
        <Separator orientation="vertical" type="pixel" />
        <Separator orientation="vertical" type="cell" />
        <Separator orientation="vertical" type="section" />
      </View>
    </View>
  );
}

function SeparatorColorExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Colors
        </Text>
        <Separator color="neutral" />
        <Separator color="primary" />
        <Separator color="green" />
        <Separator color="red" />
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
  verticalSeparatorContainer: {
    height: 100,
    flexDirection: 'row',
    gap: theme.space[32],
  },
}));
