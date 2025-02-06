// import { useNavigationContainerRef } from "expo-router";
// import { useEffect } from "react";
// import * as Sentry from "@sentry/react-native";

// const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || "";
// const SENTRY_ENV = process.env.EXPO_PUBLIC_SENTRY_ENV || "";

// // Construct a new integration instance. This is needed to communicate between the integration and React
// const navigationIntegration = Sentry.reactNavigationIntegration({
//   enableTimeToInitialDisplay: true,
// });

// export const initSentry = () => {
//   Sentry.init({
//     dsn: SENTRY_DSN,
//     debug: false,
//     tracesSampleRate: 0.1,
//     integrations: [navigationIntegration],
//     enableNativeFramesTracking: true,
//     environment: SENTRY_ENV,
//   });
// };

// export const useSentryNavigationConfig = () => {
//   const ref = useNavigationContainerRef();

//   useEffect(() => {
//     if (ref?.current) {
//       navigationIntegration.registerNavigationContainer(ref);
//     }
//   }, [ref]);

//   return null;
// };
