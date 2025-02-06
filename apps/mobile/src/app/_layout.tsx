import { Stack } from "expo-router";
import GlobalProvider from "../lib/provider";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack />
    </GlobalProvider>
  );
}
