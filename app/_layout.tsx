import { StackNavigator } from '@/navigation/StackNavigator';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <StackNavigator />
      <StatusBar style="light" /> 
    </ThemeProvider>
  );
}