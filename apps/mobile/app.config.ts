import { ConfigContext, ExpoConfig } from "expo/config";

const EAS_PROJECT_ID = "f99683b2-3d77-41e7-8e68-614a3347189f";
// const OWNER = "anmoltanwar";
const PROJECT_SLUG = "mylinks";

// App production config
const APP_NAME = "UrlSpace";
const APP_SCHEME = "urlspace";
const BUNDLE_IDENTIFIER = "com.anmoltanwar.urlspace";
const PACKAGE_NAME = "com.anmoltanwar.urlspace";
const APP_VERSION = "1.0.0";

// App assets
const ICON_IOS_LIGHT = "./assets/ios-light.png";
const ICON_IOS_DARK = "./assets/ios-dark.png";
const ICON_IOS_TINTED = "./assets/ios-tinted.png";
const ICON_ADAPTIVE = "./assets/adaptive-icon.png";
const SPLASH_ICON_LIGHT = "./assets/splash-icon-light.png";
const SPLASH_ICON_DARK = "./assets/splash-icon-dark.png";
const ICON_FAV = "./assets/favicon.png";
// const ICON_NOTIFICATION = "./assets/notification.png";

const APP_ENV =
  (process.env.APP_ENV as "development" | "preview" | "production") ||
  "development";

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name } = getDynamicAppConfig(APP_ENV);

  return {
    ...config,
    name: name,
    slug: PROJECT_SLUG,
    // owner: OWNER,
    version: APP_VERSION,
    orientation: "portrait",
    icon: ICON_ADAPTIVE,
    scheme: APP_SCHEME,
    userInterfaceStyle: "automatic",
    platforms: ["ios", "android"],
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      icon: {
        light: ICON_IOS_LIGHT,
        dark: ICON_IOS_DARK,
        tinted: ICON_IOS_TINTED,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: ICON_ADAPTIVE,
        monochromeImage: ICON_ADAPTIVE,
        backgroundColor: "#ffffff",
      },
      package: PACKAGE_NAME,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: ICON_FAV,
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: SPLASH_ICON_DARK,
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            image: SPLASH_ICON_LIGHT,
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-share-intent",
        {
          iosActivationRules: {
            NSExtensionActivationSupportsWebURLWithMaxCount: 1,
            NSExtensionActivationSupportsWebPageWithMaxCount: 1,
            NSExtensionActivationSupportsImageWithMaxCount: 1,
            NSExtensionActivationSupportsMovieWithMaxCount: 1,
          },
          androidIntentFilters: ["text/*", "image/*"],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
  };
};

// Dynamically configure the app based on the environment.
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
  };
};
