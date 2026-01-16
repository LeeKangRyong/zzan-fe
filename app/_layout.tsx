import { StackNavigator } from '@/navigation/StackNavigator';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SystemBars } from 'react-native-edge-to-edge';
import 'react-native-reanimated';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'KakaoBigSans-Bold': require('../assets/fonts/KakaoBigSans-Bold.ttf'),
    'KakaoBigSans-ExtraBold': require('../assets/fonts/KakaoBigSans-ExtraBold.ttf'),
    'KakaoBigSans-Regular': require('../assets/fonts/KakaoBigSans-Regular.ttf'),
    'KakaoSmallSans-Bold': require('../assets/fonts/KakaoSmallSans-Bold.ttf'),
    'KakaoSmallSans-Light': require('../assets/fonts/KakaoSmallSans-Light.ttf'),
    'KakaoSmallSans-Regular': require('../assets/fonts/KakaoSmallSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider value={DefaultTheme}>
          <StackNavigator />
          <SystemBars style="dark" hidden={{ navigationBar: true }} />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}