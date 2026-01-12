import { Stack } from 'expo-router';

export function StackNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" /> 

      <Stack.Screen 
        name="(chat)"
        options={{ 
          headerShown: false
        }} 
      />

      <Stack.Screen
        name="(info)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}