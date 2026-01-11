import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../assets/icons/back.svg";
import { Colors } from "../constants/Colors";

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

export const Header = ({ title, onBackPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <BackIcon width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    alignItems: "center",
    top: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    top: 5,
  },
  placeholder: {
    width: 40,
  },
});