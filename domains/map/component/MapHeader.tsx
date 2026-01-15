import UserIcon from '@/assets/icons/user.svg';
import LogoSmall from '@/assets/logo/logo_small.svg';
import { Colors, Layout } from '@/shared/constants';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapSearch } from './MapSearch';
import { MapSearchResult } from './MapSearchResults';

interface MapHeaderProps {
  onProfilePress: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  showSearchResults: boolean;
  onSearchResultPress?: (placeId: string) => void;
}

export const MapHeader = ({
  onProfilePress,
  searchText,
  onSearchTextChange,
  showSearchResults,
  onSearchResultPress
}: MapHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      {renderHeaderBar(insets.top, onProfilePress, searchText, onSearchTextChange)}
      {showSearchResults && (
        <MapSearchResult onResultPress={onSearchResultPress} />
      )}
    </View>
  );
};

const renderHeaderBar = (
  topInset: number,
  onPress: () => void,
  searchText: string,
  onSearchTextChange: (text: string) => void
) => {
  return (
    <View style={[styles.container, { paddingTop: topInset + 12 }]}>
      <LogoSmall width={60} height={13} />
      <MapSearch value={searchText} onChangeText={onSearchTextChange} />
      <TouchableOpacity onPress={onPress}>
        <UserIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
});
