import SearchIcon from '@/assets/icons/search_small.svg';
import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, TextInput, View } from 'react-native';

export const MapSearch = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="전통주를 즐길 장소를 검색해주세요!"
        placeholderTextColor={Colors.black}
      />
      <SearchIcon width={22} height={22} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    height: 38,
    backgroundColor: Colors.white,
    borderBottomWidth: 2,
    borderColor: Colors.black,
  },
  input: {
    flex: 1,
    fontSize: 10,
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    color: Colors.black,
    opacity: 0.7,
  },
});
