import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';

import '@/styles/unistyles';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <StatusBar backgroundColor="transparent" translucent />
    </>
  );
}
