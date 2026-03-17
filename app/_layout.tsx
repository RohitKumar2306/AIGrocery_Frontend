import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { AppProviders } from "../src/providers/AppProviders";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style={Platform.OS === "web" ? "dark" : "auto"} />
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}

