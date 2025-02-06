import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, createContext, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

//custom imports
// import NoInternetConnection from "@mobile/src/components/common/no-internet-connection";
// import NoSocketConnection from "@mobile/src/components/common/no-socket-connection";
// import useAppQuickActions from "@mobile/src/components/hooks/useAppQuickActions";
// import useGetCameraPermissions from "@mobile/src/components/hooks/useGetCameraPermissions";
// import useGetMediaLibraryPermissions from "@mobile/src/components/hooks/useGetMediaLibraryPermissions";
// import useGetUpdates from "@mobile/src/components/hooks/useGetUpdates";
// import useSocket from "@mobile/src/components/hooks/useSocket";
import { colorScheme, theme } from "@mobile/src/lib/colors";
// import usePushNotifications from "@mobile/src/lib/notifications";
import { queryClient } from "@mobile/src/lib/tanstack-query";
import { toastConfig } from "@mobile/src/lib/toast";
// import CheckForPlayStoreUpdates from "@mobile/src/components/common/updates";
import { ShareIntentProvider } from "expo-share-intent";
import { router } from "expo-router";

interface IGlobalContext {
  authUser?: any | undefined;
  // handleAuthChange: (data: IData) => void;
}

export const GlobalContext = createContext({
  // authUser: undefined,
  // handleAuthChange: (data: IData) => undefined,
} as IGlobalContext);

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  // const [authUser, setAuthUser] = useState(parsedItem);

  const handleResetShareIntent = useCallback(() => {
    router?.replace({
      pathname: "/",
    });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContext.Provider value={{}}>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={theme.card}
        />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <QueryClientProvider client={queryClient}>
            <ShareIntentProvider
              options={{
                debug: true,
                resetOnBackground: true,
                onResetShareIntent: handleResetShareIntent,
              }}
            >
              {children}
            </ShareIntentProvider>
            <Toast config={toastConfig} />
            {/* <NoInternetConnection /> */}
            {/* <NoSocketConnection /> */}
            {/* <CheckForPlayStoreUpdates /> */}
          </QueryClientProvider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
