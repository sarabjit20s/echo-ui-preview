import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>Displays rich content in a portal, triggered by a button.</Text>
      <MyPopover />
    </View>
  );
}

const MyPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent maxWidth={260}>
        <PopoverArrow />
        <Text variant="bodySm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          cupiditate sed quia neque earum eligendi atque deserunt deleniti minus
          laborum?
        </Text>
      </PopoverContent>
    </Popover>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    gap: theme.space[12],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[12],
  },
}));
