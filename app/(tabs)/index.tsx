import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function MainScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/chat" asChild>
        <Text style={{ color: 'blue', fontSize: 20, marginTop: 20 }}>
          채팅창으로 가기 (탭 바 없음)
        </Text>
      </Link>
    </View>
  );
}