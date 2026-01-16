import { Stack } from 'expo-router';

export function StackNavigator() {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
      />

      <Stack.Screen
        name="(tabs)"
      />

      <Stack.Screen
        name="(feed)"
        options={{
          headerShown: false
        }}
      />

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

      <Stack.Screen
        name="(user)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}