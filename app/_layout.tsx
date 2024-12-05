import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { UnistylesProvider } from 'react-native-unistyles';

import '@/styles/unistyles';
import { PortalProvider } from '@/utils/portal';

export default function RootLayout() {
  return (
    <UnistylesProvider>
      <PortalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <StatusBar backgroundColor="transparent" translucent />
      </PortalProvider>
    </UnistylesProvider>
  );
}
