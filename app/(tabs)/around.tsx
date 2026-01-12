import { Colors } from "@/shared/constants"
import { StyleSheet, Text, View } from "react-native"

// 주변 피드 보는 UI
export default function AroundTab() {
  return (
    <View style={styles.container}>
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

