import { Colors, Layout } from '@/shared/constants';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SearchInRegionButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const SearchInRegionButton = ({ onPress, isLoading }: SearchInRegionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}
      accessibilityLabel="현 위치에서 피드 찾기"
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <Text style={styles.text}>현 위치에서 피드 찾기</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    height: 48,
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
