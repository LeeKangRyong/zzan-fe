import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function MainScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/chat" asChild>
        <Text style={{ color: 'blue', fontSize: 20, marginTop: 20 }}>
          채팅창으로 가기
        </Text>
      </Link>
      
      <Link href="/place" asChild>
        <Text style={{ color: 'red', fontSize: 20, marginTop: 20 }}>
          짠플레이스로 가기
        </Text>
      </Link>

      <Link href="/alchol" asChild>
        <Text style={{ color: 'green', fontSize: 20, marginTop: 20 }}>
          전통주로 가기
        </Text>
      </Link>
    </View>
  );
}