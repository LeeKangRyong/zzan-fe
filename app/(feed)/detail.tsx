import { Header } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 작성된 Feed 상세 UI
export default function DetailTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
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