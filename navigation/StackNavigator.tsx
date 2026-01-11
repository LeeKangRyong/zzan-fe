import { Stack } from 'expo-router';

export function StackNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" /> 

      <Stack.Screen 
        name="chatScreen" 
        options={{ 
          headerShown: false,
          title: 'AI 챗봇' 
        }} 
      />
    </Stack>
  );
}