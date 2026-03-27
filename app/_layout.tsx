import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
      {/* Versteckt den Header nur für die index-Seite */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
}
