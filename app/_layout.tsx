import { StackNavigator } from '@/navigation/StackNavigator';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// 폰트 로딩 중에 스플래시 화면을 유지하도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 1. 폰트 불러오기
  const [loaded, error] = useFonts({
    'KakaoBigSans-Bold': require('../assets/fonts/KakaoBigSans-Bold.ttf'),
    'KakaoBigSans-ExtraBold': require('../assets/fonts/KakaoBigSans-ExtraBold.ttf'),
    'KakaoBigSans-Regular': require('../assets/fonts/KakaoBigSans-Regular.ttf'),
    'KakaoSmallSans-Bold': require('../assets/fonts/KakaoSmallSans-Bold.ttf'),
    'KakaoSmallSans-Light': require('../assets/fonts/KakaoSmallSans-Light.ttf'),
    'KakaoSmallSans-Regular': require('../assets/fonts/KakaoSmallSans-Regular.ttf'),
  });

  // 2. 폰트 로딩 완료 또는 에러 발생 시 스플래시 화면 숨기기
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // 3. 폰트 로딩 중에는 아무것도 렌더링하지 않음 (스플래시 유지)
  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <StackNavigator />
      <StatusBar style="dark" /> 
    </ThemeProvider>
  );
}