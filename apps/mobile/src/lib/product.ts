import { Platform } from "react-native";

const logo = require("@mobile/assets/images/logo.svg");

const identifier = process.env.EXPO_PUBLIC_PRODUCT_NAME ?? "product";
const productName = identifier?.charAt(0)?.toUpperCase() + identifier?.slice(1);

const productConfig = {
  name: productName,
  identifier: identifier,
  logo: logo,
  storeUrl:
    Platform.select({
      ios: `itms-apps://itunes.apple.com/app/com.${identifier}.app`,
      android: `market://details?id=com.${identifier}.app`,
    }) ?? "",
};

export default productConfig;
