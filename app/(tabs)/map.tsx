import { ChatBot, CurrentPosition, KakaoMapWebView, MapHeader, PlaceDetail } from "@/domains/map/component";
import { useMapViewModel } from '@/domains/map/viewmodel/useMapViewModel';
import { Colors, Layout } from "@/shared/constants";
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function MapTab() {
  const insets = useSafeAreaInsets();
  
  const TAB_BAR_HEIGHT = 10;
  const bottomSpace = (insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK) + TAB_BAR_HEIGHT;

  const {
    region,
    markers,
    searchText,
    showSearchResults,
    focusedMarkerId,
    selectedPlace,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
  } = useMapViewModel();
  const apiKey = Constants.expoConfig?.extra?.kakaoJavascriptKey ?? '';

  const handleProfilePress = () => {
    router.push('/mypage');
  };

  const handlePlaceDetailPress = () => {
    router.push('/place');
  };

  return (
    <View style={styles.container}>
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
          onMapPress={handleMapPress}
          apiKey={apiKey}
          focusedMarkerId={focusedMarkerId}
        />
        
        <View style={[styles.floatingButtons, { paddingBottom: bottomSpace }]}>
          <View style={styles.rightTop}>
            <CurrentPosition onPress={handleCurrentPositionPress} />
          </View>
          <View style={styles.rightBottom}>
            <ChatBot />
          </View>
        </View>

        {selectedPlace && (
          <View style={[styles.placeDetailContainer, { bottom: bottomSpace }]}>
            <PlaceDetail place={selectedPlace} onPlacePress={handlePlaceDetailPress} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  placeDetailContainer: {
    position: 'absolute',
    left: Layout.SCREEN_HORIZONTAL,
    right: Layout.SCREEN_HORIZONTAL,
  },
});