import { Layout } from '@/shared/constants';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
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

      <Link href="/detail" asChild>
        <Text style={{ color: 'purple', fontSize: 20, marginTop: 20 }}>
          피드 상세로 가기
        </Text>
      </Link>

      <Link href="/post" asChild>
        <Text style={{ color: 'black', fontSize: 20, marginTop: 20 }}>
          피드 작성으로 가기
        </Text>
      </Link>

      <Link href="/add?type=alcohol" asChild>
        <Text style={{ color: 'red', fontSize: 20, marginTop: 20 }}>
          전통주 추가하기로 가기
        </Text>
      </Link>

      <Link href="/add?type=place" asChild>
        <Text style={{ color: 'blue', fontSize: 20, marginTop: 20 }}>
          장소 추가하기로 가기
        </Text>
      </Link>

      <Link href="/map" asChild>
        <Text style={{ color: 'pink', fontSize: 20, marginTop: 20 }}>
          지도 가기
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});