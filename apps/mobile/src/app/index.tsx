import { Text, View } from "react-native";
import Dummy from "../components/dummy";
import { useShareIntentContext } from "expo-share-intent";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  const { hasShareIntent,shareIntent } = useShareIntentContext();

  useEffect(() => {
    if (hasShareIntent) {
      // we want to handle share intent event in a specific page
      console.debug("[expo-router-index] redirect to ShareIntent screen");
      router?.replace({
        pathname: "/shareintent" as any,
      });
    }
  }, [hasShareIntent]);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Dummy /> */}
    </View>
  );
}
