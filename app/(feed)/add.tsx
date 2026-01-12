import { Header } from '@/shared/components';
import { Colors } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// 전통주를 검색해서 추가하는 UI
export default function AddTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="전통주 추가하기" onBackPress={() => router.back() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})