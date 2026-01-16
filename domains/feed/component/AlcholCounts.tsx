import AlcholIcon from '@/assets/icons/alchol_left.svg';
import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface AlcholCountsProps {
  count: number;
}

export const AlcholCounts = ({ count }: AlcholCountsProps) => {
  return (
    <View style={styles.container}>
      <AlcholIcon width={20} height={18} />
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  countText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
});
