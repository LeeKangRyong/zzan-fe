import { Header } from '@/shared/components';
import { Colors } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// Feed 작성하는 UI
export default function PostTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="피드 작성" onBackPress={() => router.back() } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})