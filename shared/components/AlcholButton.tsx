// title, onPress arguments 사용

import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AlcholButtonProps {
  title: string;
  onPress: () => void;
}

export const AlcholButton = ({ title, onPress }: AlcholButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    gap: 8,
  },
  title: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.yellow,
  },
});
