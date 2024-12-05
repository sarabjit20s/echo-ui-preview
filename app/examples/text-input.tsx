import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  TextInput,
  TextInputAdornment,
  TextInputProps,
} from '@/components/ui/TextInput';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Spinner } from '@/components/ui/Spinner';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInputSizeExample />
        <TextInputVariantExample />
        <TextInputColorExample />
        <TextInputWithAdornmentExample />
        <TextInputReadOnlyExample />
      </ScrollView>
    </View>
  );
}

function TextInputSizeExample() {
  const { styles } = useStyles(stylesheet);

  const sizes: TextInputProps['size'][] = ['sm', 'md', 'lg'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Sizes
      </Text>
      {sizes.map((size, i) => {
        return <TextInput key={i} size={size} placeholder={`Size ${size}`} />;
      })}
    </View>
  );
}

function TextInputVariantExample() {
  const { styles } = useStyles(stylesheet);

  const variants: TextInputProps['variant'][] = ['outline', 'soft', 'ghost'];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Variants
      </Text>
      {variants.map((variant, i) => {
        return (
          <TextInput
            key={i}
            variant={variant}
            placeholder={`Variant ${variant}`}
          />
        );
      })}
    </View>
  );
}

function TextInputColorExample() {
  const { styles } = useStyles(stylesheet);

  const colors: TextInputProps['color'][] = [
    'primary',
    'neutral',
    'red',
    'green',
  ];
  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Colors
      </Text>
      {colors.map((color, i) => {
        return (
          <TextInput
            key={i}
            color={color}
            variant="soft"
            placeholder={`Color ${color}`}
          />
        );
      })}
    </View>
  );
}

function TextInputWithAdornmentExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        With Adornment
      </Text>
      <Text variant="labelMd" highContrast>
        Start adornment
      </Text>
      <TextInput
        placeholder="example@mail.com"
        textContentType="emailAddress"
        autoCapitalize="none"
        startAdornment={
          <TextInputAdornment>
            <Icon name="mail-outline" size="lg" />
          </TextInputAdornment>
        }
      />
      <TextInput
        placeholder="Search"
        color="neutral"
        variant="soft"
        startAdornment={
          <TextInputAdornment>
            <Icon name="search" size="lg" />
          </TextInputAdornment>
        }
      />
      <Text variant="labelMd" highContrast>
        End adornment
      </Text>
      <TextInput
        placeholder="Message"
        color="neutral"
        variant="soft"
        endAdornment={
          <TextInputAdornment type="action">
            <IconButton icon="mic" size="md" color="neutral" variant="text" />
          </TextInputAdornment>
        }
      />
      <TextInput
        placeholder="Username"
        defaultValue="john_doe"
        endAdornment={
          <TextInputAdornment>
            <Spinner loading />
          </TextInputAdornment>
        }
      />
    </View>
  );
}

function TextInputReadOnlyExample() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.group}>
      <Text variant="headingSm" highContrast>
        Read only
      </Text>
      <TextInput
        placeholder="example@mail.com"
        defaultValue="example@mail.com"
        textContentType="emailAddress"
        autoCapitalize="none"
        readOnly
        startAdornment={
          <TextInputAdornment>
            <Icon name="mail-outline" size="lg" />
          </TextInputAdornment>
        }
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
    gap: theme.space[20],
    flexWrap: 'wrap',
  },
  radioGroup: {
    gap: theme.space[8],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
}));
