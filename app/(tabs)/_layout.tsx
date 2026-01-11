import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      { /* tabBarStyle을 'none'으로 설정하면 이 화면에서만 탭 바가 사라집니다.
        tabBarStyle: { display: 'none' },
      */}
    </Tabs>
  );
}