import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Popup,
  PopupArrow,
  PopupContent,
  PopupOverlay,
  PopupPortal,
  PopupTrigger,
} from '@/components/ui/Popup';
import { Button } from '@/components/ui/Button';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>
        Popup is a <Text fontFamily="interBold">primitive</Text> which can be
        used to build components like Popover, Dropdown, etc.
      </Text>
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
      <MyPopup />
    </View>
  );
}

const MyPopup = () => {
  const { theme } = useStyles();
  return (
    <Popup>
      <PopupTrigger asChild>
        <Button size="sm">Open Popup</Button>
      </PopupTrigger>
      <PopupPortal>
        <PopupOverlay style={{ backgroundColor: theme.colors.overlay }} />
        <PopupContent
          maxWidth={260}
          placement={'bottom-start'}
          avoidCollisions={true}>
          <PopupArrow />
          <Text variant="bodySm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
            neque. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quibusdam, ducimus? Lorem ipsum dolor sit, amet consectetur
          </Text>
        </PopupContent>
      </PopupPortal>
    </Popup>
  );
};

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    gap: theme.space[12],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[12],
  },
}));
