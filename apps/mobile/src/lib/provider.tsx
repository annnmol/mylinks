import { router } from "expo-router";
import { ShareIntentProvider } from "expo-share-intent";
import { PropsWithChildren } from "react";

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
        onResetShareIntent: () =>
          // used when app going in background and when the reset button is pressed
          router?.replace({
            pathname: "/",
          }),
      }}
    >
      {children}
    </ShareIntentProvider>
  );
};

export default GlobalProvider;
