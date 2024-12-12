import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/Text';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioGroupItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownSubMenu,
  DropdownSubMenuBackTrigger,
  DropdownSubMenuContent,
  DropdownSubMenuHeader,
  DropdownSubMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';

export default function Page() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>Menu representing a set of actions, triggered by a button.</Text>
      <MyDropdownMenu />
      <Text variant="labelMd">With sub menu</Text>
      <MyDropdownMenuWithSubMenu />
    </View>
  );
}

const MyDropdownMenu = () => {
  const [includeHiddenFiles, setIncludeHiddenFiles] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('name');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon="ellipsis-vertical"
          variant="soft"
          accessibilityLabel="Open Dropdown Menu"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent placement="bottom-start" minWidth={200}>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioGroupItem value="name">
            Name
          </DropdownMenuRadioGroupItem>
          <DropdownMenuRadioGroupItem value="date">
            Date
          </DropdownMenuRadioGroupItem>
          <DropdownMenuRadioGroupItem value="size">
            Size
          </DropdownMenuRadioGroupItem>
          <DropdownMenuRadioGroupItem value="tags">
            Tags
          </DropdownMenuRadioGroupItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={includeHiddenFiles}
          onCheckedChange={setIncludeHiddenFiles}>
          Include hidden files
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Other actions</DropdownMenuLabel>
        <DropdownMenuItem color="red" startIcon="trash-outline">
          Move to trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MyDropdownMenuWithSubMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon="ellipsis-vertical"
          variant="soft"
          accessibilityLabel="Open Dropdown Menu"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent minWidth={240} placement="bottom-start">
        <DropdownMenuItem startIcon="eye-outline">View Post</DropdownMenuItem>
        <DropdownMenuItem startIcon="bookmark-outline">
          Add to list
        </DropdownMenuItem>
        <DropdownMenuItem startIcon="return-up-forward-outline">
          Forward
        </DropdownMenuItem>
        <DropdownMenuItem startIcon="flag-outline">Report</DropdownMenuItem>
        <DropdownMenuItem startIcon="ban-outline">Block</DropdownMenuItem>
        <DropdownMenuItem startIcon="notifications-off-outline">
          Mute notifications
        </DropdownMenuItem>

        {/* Sub menu */}
        <DropdownSubMenu>
          <DropdownSubMenuTrigger asChild>
            <DropdownMenuItem
              startIcon="ellipsis-vertical-circle-outline"
              endIcon="chevron-forward-outline"
              closeOnPress={false}>
              More
            </DropdownMenuItem>
          </DropdownSubMenuTrigger>
          <DropdownSubMenuContent>
            <DropdownSubMenuHeader>
              <DropdownSubMenuBackTrigger asChild>
                <IconButton
                  icon="chevron-back-outline"
                  variant="soft"
                  color="neutral"
                  size="sm"
                  accessibilityLabel="Go Back"
                />
              </DropdownSubMenuBackTrigger>
              <Text variant="bodyMd" highContrast>
                More actions
              </Text>
            </DropdownSubMenuHeader>
            <DropdownMenuItem startIcon="share-outline">Share</DropdownMenuItem>
            <DropdownMenuItem startIcon="link-outline">
              Copy link
            </DropdownMenuItem>
          </DropdownSubMenuContent>
        </DropdownSubMenu>
      </DropdownMenuContent>
    </DropdownMenu>
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
