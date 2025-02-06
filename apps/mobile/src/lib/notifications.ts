// // usePushNotifications.ts
// import Constants from "expo-constants";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import {router } from "expo-router";
// import { useEffect, useRef } from "react";
// import { Platform } from "react-native";
// import { useShallow } from "zustand/react/shallow";

// //custom imports
// import { formatJson } from "@mobile/src/lib/helpers";
// import { AuthNetworkService } from "@mobile/src/services/api/auth-service";
// import useAuthStore from "@mobile/src/store/slices/auth";
// import useSystemStore from "@mobile/src/store/slices/system";
// import { showToast } from "./toast";

// // Configure notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     priority: Notifications.AndroidNotificationPriority.HIGH,
//   }),
// });

// // Register for Push Notifications and get the token
// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });

//     await Notifications.setNotificationCategoryAsync("LIVECHAT", [
//       {
//         identifier: "REPLY",
//         buttonTitle: "Reply",
//         textInput: {
//           placeholder: "Type your message",
//           submitButtonTitle: "Send",
//         },
//         options: {
//           opensAppToForeground: false, //BUG: removing this will result into getting userText undefined
//         },
//       },
//       {
//         identifier: "MARK_AS_READ",
//         buttonTitle: "Mark as Read",
//         options: {
//           opensAppToForeground: false,
//         },
//       },
//     ]);
//   }
//   // Ensure it's running on a physical device
//   if (!Device.isDevice) {
//     console.warn("Error", "Must use physical device for Push Notifications");
//     return;
//   }
//   // Check for existing permissions
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   // If permissions are not granted, request them
//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   // If the final permission status is not granted, show an alert
//   if (finalStatus !== "granted") {
//     console.warn("Failed to get push token for push notification!");
//     return;
//   }
//   try {
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ??
//       Constants?.easConfig?.projectId;
//     if (!projectId) {
//       throw new Error("Project ID not found");
//     }
//     // Ensure the correct projectId is set for EAS services
//     // token = (
//     //   await Notifications.getExpoPushTokenAsync({
//     //     projectId,
//     //   })
//     // ).data; //expoPushToken
//     token = (await Notifications.getDevicePushTokenAsync()).data; //fcmtoken
//     if (__DEV__) console.log("Push Token:", token);
//   } catch (e) {
//     token = `${e}`;
//     if (__DEV__) console.log("Error fetching push token:", e);
//   }

//   return token;
// }

// async function unregisterForNotificationsAsync(token: string | undefined) {

//   if (!token) return;

//   try {
//     await Notifications?.unregisterForNotificationsAsync();
//     if (__DEV__) console.log("unregistered for notifications:");
//     // AuthNetworkService.unregisterDevicePushToken({
//     //   token: token,
//     //   // platform: Platform.OS,
//     // })
//     //   .then((res) => {
//     //     if (!res?.status) {
//     //       showToast({
//     //         message: "Failed to unregister push token",
//     //         type: "error",
//     //       });
//     //       throw new Error("Invalid status");
//     //     }
//     //     if (__DEV__) console.log("Device Push Token unregistered", res);
//     //   })
//     //   .catch((e) => {
//     //     if (__DEV__) console.log("Error in unregistering push token", e);
//     //     // showToast({
//     //     //   message: "Failed to register push token",
//     //     //   type: "error",
//     //     // });
//     //   });

//   } catch (e) {
//     if (__DEV__) console.log("Error unregistering for notifications:", e);
//   }
// }

// async function registerTokenServer(token: string | undefined) {
//   if (!token) return;
//   AuthNetworkService.registerDevicePushToken({
//     token: token,
//     platform: Platform.OS,
//   })
//     .then((res) => {
//       if (!res?.status) {
//         showToast({
//           message: "Failed to register push token",
//           type: "error",
//         });
//         throw new Error("Invalid status");
//       }
//       if (__DEV__) console.log("Device Push Token Registered", res);
//     })
//     .catch((e) => {
//       if (__DEV__) console.log("Error in registering push token", e);
//       // showToast({
//       //   message: "Failed to register push token",
//       //   type: "error",
//       // });
//     });
// }

// const usePushNotifications = () => {
//   const token = useSystemStore(useShallow((state) => state.token));
//   const setToken = useSystemStore(useShallow((state) => state.setToken));
//   const authSession = useAuthStore(useShallow((state) => state.authSession));

//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     if (!authSession?.id) {
//       unregisterForNotificationsAsync(token ?? '');
//       return;
//     }
//     // Register for push notifications and set the push token
//     registerForPushNotificationsAsync().then((data) => {
//       if (data) {
//         setToken(data);
//         registerTokenServer(data);
//       }
//     });

//     let isMounted = true;

//     // Function to handle redirection based on notification data
//     function redirect(notification: Notifications.Notification) {
//       const data = notification.request.content?.data as { url: string };
//       const url = data?.url as any;
//       if (url) {
//         router.push(url);
//       }
//     }
//     // Listen for incoming notifications (foreground)
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         if (__DEV__)
//           console.log(
//             "Notification Received (foreground):",
//             formatJson(notification)
//           );
//         // Optional: Handle notification when app is in foreground
//       });
//     // Handle when user interacts with a notification (background and killed mode)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         if (__DEV__)
//           console.log(
//             "User interacted with notification (background):",
//             formatJson(response)
//           );

//         const { actionIdentifier } = response;

//         // Check which action button was pressed
//         if (actionIdentifier === "REPLY") {
//           // Handle the reply action
//           const replyText = response?.userText; // Capture the reply text

//           if (__DEV__)
//             console.log(`You pressed Reply!: `, replyText, replyText?.trim());
//           // Dismiss the notification
//           Notifications.dismissNotificationAsync(
//             response?.notification?.request?.identifier
//           );
//           // Implement logic to capture the reply text if needed
//         } else if (actionIdentifier === "MARK_AS_READ") {
//           // Handle the mark as read action
//           if (__DEV__) console.log("You marked the notification as read!");
//           // Dismiss the notification
//           Notifications.dismissNotificationAsync(
//             response?.notification?.request?.identifier
//           );
//         } else {
//           // Handle other actions or default behavior
//           redirect(response.notification); // Redirect based on notification data
//         }

//         // redirect(response.notification); // Redirect based on notification data
//       });
//     // Handle notifications in killed state (app not running)
//     Notifications.getLastNotificationResponseAsync().then((response) => {
//       if (isMounted && response?.notification) {
//         if (__DEV__)
//           console.log(
//             "User interacted with notification (killed):",
//             formatJson(response)
//           );
//         redirect(response.notification);
//       }
//     });

//     return () => {
//       // Clean up listeners when component is unmounted
//       isMounted = false;
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//         notificationListener.current = undefined;
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//         responseListener.current = undefined;
//       }
//     };
//   }, [authSession]);
//   return { token };
// };

// export default usePushNotifications;
