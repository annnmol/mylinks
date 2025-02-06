/*
  1. Create the config
  2. Pass the config as prop to the Toast component instance
*/

import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Toast, { ToastShowParams } from "react-native-toast-message";
//custom imports
import Icons from "./icons";

//custom imports

type ToastProps = ToastShowParams & {
  message: string | undefined;
};

export function showToast(params: ToastProps) {
  return Toast.show({
    ...params,
    text1: params.message,
    type: params?.type ?? "default", // 'success | 'error' | 'info'
    position: "bottom",
    bottomOffset: params?.bottomOffset ?? 100,
    visibilityTime: params?.visibilityTime ?? 3000, // 3 seconds
    autoHide: true, // Automatically dismiss the toast
  }); //do not modify these props without consulting the team
}

export const toastConfig = {
  success: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        {/* <Image
          source={Icons.checkCircle}
          style={styles.logo}
          contentFit="contain"
        /> */}
        <Text style={[styles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },

  error: ({ text1 }: any) => {
    return (
      <View style={[styles.container]}>
        {/* <Image
          source={Icons.banCircle}
          style={styles.logo}
          contentFit="contain"
        /> */}
        <Text style={[styles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },

  info: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        {/* <Image
          source={Icons.infoCircle}
          style={styles.logo}
          contentFit="contain"
        /> */}
        <Text style={[styles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },

  default: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require("@mobile/assets/favicon.png")}
          style={styles.logo}
          contentFit="contain"
        /> */}
        <Text style={[styles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },
};
const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    minWidth: "50%", // Prevent it from being too small
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    flexShrink: 1, // Allow shrinking if needed
  },
  text1: {
    color: "#fff",
    flexShrink: 1, // Prevents overflow by shrinking text if needed
    flexWrap: "wrap", // Ensures text wraps properly
  },
  logo: {
    width: 20,
    height: 20,
  },
  success: {
    backgroundColor: "#03A65A",
  },
  error: {
    backgroundColor: "#F64646",
  },
  info: {
    backgroundColor: "#739BE5",
  },
  caption: {
    fontSize: 15,
    lineHeight: 20,
  },
});
