import { Header } from '@/shared/components';
import { Colors } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// 작성된 Feed 상세 UI
export default function DetailTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="피드" onBackPress={() => router.back() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})