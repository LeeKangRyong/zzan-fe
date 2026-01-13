import { Colors, Layout } from "@/shared/constants"
import { StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// 주변 피드 보는 UI
export default function AroundTab() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <Text>주변 피드입니다~</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})

