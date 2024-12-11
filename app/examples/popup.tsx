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
    </View>
  );
}

const MyPopup = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <Popup>
      <PopupTrigger asChild>
        <Button size="md">Open Popup</Button>
      </PopupTrigger>
      <PopupPortal>
        <PopupOverlay style={styles.popupOverlay} />
        <PopupContent
          maxWidth={260}
          placement={'bottom'}
          avoidCollisions={true}
          style={styles.popupContent}>
          <PopupArrow />
          <Text variant="bodySm">
            Popup is a{' '}
            <Text fontFamily="interBold" inherit>
              primitive
            </Text>{' '}
            which can be used to build components like Popover, Dropdown, etc.
          </Text>
        </PopupContent>
      </PopupPortal>
    </Popup>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    gap: theme.space[12],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[12],
  },
  popupOverlay: {
    backgroundColor: theme.colors.overlay,
  },
  popupContent: {
    padding: theme.space[16],
  },
}));
