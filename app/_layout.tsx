import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { UnistylesProvider } from 'react-native-unistyles';

import '@/styles/unistyles';

export default function RootLayout() {
  return (
    <UnistylesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <StatusBar backgroundColor="transparent" translucent />
    </UnistylesProvider>
  );
}
