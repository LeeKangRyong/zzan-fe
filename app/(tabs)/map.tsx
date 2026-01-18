import { ChatBot, CurrentPosition, KakaoMapWebView, MapHeader, PlaceDetail } from "@/domains/map/component";
import { useMapViewModel } from '@/domains/map/viewmodel/useMapViewModel';
import { Colors, Layout } from "@/shared/constants";
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function MapTab() {
  const insets = useSafeAreaInsets();

  const TAB_BAR_HEIGHT = 10;
  const bottomSpace = (insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK) + TAB_BAR_HEIGHT;

  const {
    region,
    markers,
    searchText,
    searchResults,
    showSearchResults,
    focusedMarkerId,
    selectedPlace,
    isLoadingPlaces,
    error,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
    handleRegionChange,
    loadPlacesInRegion,
  } = useMapViewModel();
  const apiKey = Constants.expoConfig?.extra?.kakaoJavascriptKey ?? '';

  const handleProfilePress = () => {
    router.push('/mypage');
  };

  const handlePlaceDetailPress = () => {
    if (selectedPlace) {
      router.push({
        pathname: '/place',
        params: { placeId: selectedPlace.id },
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapHeader
        onProfilePress={handleProfilePress}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearchSubmit={handleSearchSubmit}
        showSearchResults={showSearchResults}
        searchResults={searchResults}
        onSearchResultPress={handleSearchResultPress}
      />
      <View style={styles.mapWrapper}>
        <KakaoMapWebView
          region={region}
          markers={markers}
          onMarkerPress={handleMarkerPress}
          onMapPress={handleMapPress}
          onRegionChange={handleRegionChange}
          apiKey={apiKey}
          focusedMarkerId={focusedMarkerId}
        />

        {isLoadingPlaces && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.purple} />
          </View>
        )}

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => loadPlacesInRegion(region)}>
              <Text style={styles.retryText}>다시 시도</Text>
            </TouchableOpacity>
          </View>
        )}

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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
  errorBanner: {
    position: 'absolute',
    top: 20,
    left: Layout.SCREEN_HORIZONTAL,
    right: Layout.SCREEN_HORIZONTAL,
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  errorText: {
    color: Colors.white,
    flex: 1,
    fontSize: 14,
  },
  retryText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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