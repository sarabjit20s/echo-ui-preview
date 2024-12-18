import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <AccordionVariantExample />
      </ScrollView>
    </View>
  );
}

const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam placeat laudantium minus asperiores distinctio optio libero commodi eos modi aliquid, ullam ex ea dolorum porro.`;

const data = [
  {
    id: '1',
    title: 'Accordion 1',
    content,
  },
  {
    id: '2',
    title: 'Accordion 2',
    content,
  },
  {
    id: '3',
    title: 'Accordion 3',
    content,
  },
];

function AccordionVariantExample() {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <View style={styles.group}>
        <Text variant="headingSm" highContrast>
          Variants
        </Text>

        <Text variant="labelMd" highContrast>
          Soft
        </Text>
        <Accordion variant="soft">
          {data.map(({ id, title, content }) => {
            return (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                  <Text>{content}</Text>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Text variant="labelMd" highContrast>
          Ghost
        </Text>
        <Accordion variant="ghost">
          {data.map(({ id, title, content }) => {
            return (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                  <Text>{content}</Text>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
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
  capitalize: {
    textTransform: 'capitalize',
  },
}));
