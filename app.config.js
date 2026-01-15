import 'dotenv/config';

export default {
  expo: {
    name: "zzan-fe",
    slug: "zzan-fe",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "zzanfe",
    userInterfaceStyle: "light", 
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "전통주 장소를 찾기 위해 현재 위치가 필요합니다."
      }
    },
    android: {
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      userInterfaceStyle: "light",
      // --- 화면 침범 방지 핵심 설정 ---
      edgeToEdgeEnabled: false, 
      statusBar: {
        barStyle: "dark-content",
        backgroundColor: "#FFFFFF",
        translucent: false 
      },
      navigationBar: {
        backgroundColor: "#FFFFFF",
        buttonColor: "dark"
      },
      // ----------------------------
      predictiveBackGestureEnabled: false,
      softInputMode: "adjustPan",
      "usesCleartextTraffic": true
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff" 
        }
      ],
      "expo-font"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      figmaAccessToken: process.env.EXPO_PUBLIC_FIGMA_TOKEN,
      useMockData: process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true',
      kakaoRestApiKey: process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY,
      kakaoJavascriptKey: process.env.EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY,
    }
  }
};