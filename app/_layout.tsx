import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// 앱이 준비될 때까지 스플래시 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, error] = useFonts({
    "KakaoBigSans-Bold": require("../assets/fonts/KakaoBigSans-Bold.ttf"),
    "KakaoBigSans-ExtraBold": require("../assets/fonts/KakaoBigSans-ExtraBold.ttf"),
    "KakaoBigSans-Regular": require("../assets/fonts/KakaoBigSans-Regular.ttf"),
    "KakaoSmallSans-Bold": require("../assets/fonts/KakaoSmallSans-Bold.ttf"),
    "KakaoSmallSans-Light": require("../assets/fonts/KakaoSmallSans-Light.ttf"),
    "KakaoSmallSans-Regular": require("../assets/fonts/KakaoSmallSans-Regular.ttf"),
  });

  useEffect(() => {
    // 폰트 로드가 완료되었거나 에러가 발생했다면(fallback 처리를 위해) 준비 완료
    if (loaded || error) {
      setAppIsReady(true);
    }
  }, [loaded, error]);

  useEffect(() => {
    if (appIsReady) {
      // 💡 네이티브 레이어가 완전히 준비될 시간을 벌기 위해 미세한 지연 후 스플래시 숨김
      const timer = setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  // 💡 [중요] null 대신 배경색이 있는 빈 View를 반환하여 New Architecture 엔진 중단 방지
  if (!appIsReady) {
    return <View style={{ flex: 1, backgroundColor: "#ffffff" }} />;
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* initialRouteName에 의존하기보다 파일 구조상 index.tsx가 login으로 보내게 하는 것이 안정적입니다. */}
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(feed)" />
            <Stack.Screen name="(chat)" />
            <Stack.Screen name="(info)" />
            <Stack.Screen name="(user)" />
          </Stack>
          <SystemBars style="dark" hidden={{ navigationBar: true }} />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
