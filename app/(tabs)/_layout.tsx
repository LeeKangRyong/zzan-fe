import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="main" />
      <Tabs.Screen name="around" />
    </Tabs>
  );
}