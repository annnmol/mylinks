import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import GlobalContextProvider from "../store/context/global";

//custom imports

// LogBox.ignoreLogs([
//   '[Reanimated] Reduced motion setting is enabled on this device.',
// ]);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

function RootLayout() {
  const [loaded] = useFonts({
    InterLight: require("../../assets/fonts/Inter-Light.ttf"),
    Inter: require("../../assets/fonts/Inter-Regular.ttf"),
    InterBold: require("../../assets/fonts/Inter-Medium.ttf"),
    InterItalic: require("../../assets/fonts/Inter-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <ErrorBoundary> */}
      <GlobalContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GlobalContextProvider>
      {/* </ErrorBoundary> */}
    </>
  );
}

export const unstable_settings = {
  initialRouteName: "index",
};

export default RootLayout;
