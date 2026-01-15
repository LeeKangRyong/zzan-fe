import { Colors } from "@/shared/constants";
import { StyleSheet, Text, View } from "react-native";

interface RateStyleButtonProps {
  title: string;
}

export const RateStyleButton = ({ title }: RateStyleButtonProps) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {/* RateButton component */}
      {/* CommonButton title="저장하기 textColor=Colors.yellow backColor=Colors.black */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.takju,
  },
})