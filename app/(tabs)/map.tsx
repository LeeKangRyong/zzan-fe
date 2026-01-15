import { ChatBot, CurrentPosition, KakaoMapWebView, MapHeader } from "@/domains/map/component";
import { useMapViewModel } from '@/domains/map/viewmodel/useMapViewModel';
import { Layout } from "@/shared/constants";
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapTab() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const {
    region,
    markers,
    searchText,
    showSearchResults,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchResultPress,
    handleCurrentPositionPress,
  } = useMapViewModel();
  const apiKey = Constants.expoConfig?.extra?.kakaoJavascriptKey ?? '';

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <MapHeader
        onProfilePress={handleProfilePress}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        showSearchResults={showSearchResults}
        onSearchResultPress={handleSearchResultPress}
      />
      <View style={styles.mapWrapper}>
        <KakaoMapWebView
          region={region}
          markers={markers}
          onMarkerPress={handleMarkerPress}
          apiKey={apiKey}
        />
        <View style={styles.floatingButtons}>
          <View style={styles.rightTop}>
            <CurrentPosition onPress={handleCurrentPositionPress} />
          </View>
          <View style={styles.rightBottom}>
            <ChatBot />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapWrapper: {
    flex: 1,
  },
  floatingButtons: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
    paddingVertical: Layout.SECTION_SPACING,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    pointerEvents: 'box-none',
  },
  rightTop: {
    alignItems: 'flex-end',
    pointerEvents: 'box-none',
  },
  rightBottom: {
    alignItems: 'flex-end',
    pointerEvents: 'box-none',
  },
});
