import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>Modal dialog window displayed above the screen.</Text>
      <MyDialog />
    </View>
  );
}

const MyDialog = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Delete Content</DialogTitle>
          <DialogDescription style={styles.dialogDescription}>
            Are you sure to remove this content? You can access this file for 7
            days in your trash.
          </DialogDescription>
          <ButtonGroup gap={10} isAttached={false} fill>
            <DialogClose asChild>
              <Button color="neutral" variant="soft">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </ButtonGroup>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    gap: theme.space[12],
    paddingHorizontal: theme.space[16],
    paddingTop: theme.space[12],
  },
  dialogDescription: {
    marginBottom: theme.space[20],
  },
}));
