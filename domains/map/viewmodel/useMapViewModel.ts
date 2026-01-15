import * as Location from 'expo-location';
import { useState } from 'react';
import { MapMarker, MapRegion } from '../model/mapModel';
import { mockPlacesWithCoordinates } from '../model/mock';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

const initialRegion: MapRegion = {
  latitude: 37.5665,
  longitude: 126.9780,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const useMapViewModel = () => {
  const [region, setRegion] = useState<MapRegion>(initialRegion);
  const [markers] = useState<MapMarker[]>(
    USE_MOCK_DATA ? mockPlacesWithCoordinates : []
  );
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedMarkerId, setFocusedMarkerId] = useState<string | null>(null);

  const handleMarkerPress = (markerId: string) => {
    console.log('[MapViewModel] Marker pressed:', markerId);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    setShowSearchResults(text.length > 0);
  };

  const handleSearchResultPress = (placeId: string) => {
    const place = findPlaceById(placeId);

    if (!place) {
      return;
    }

    moveToPlace(place);
    setFocusedMarkerId(placeId);
    setShowSearchResults(false);
    setSearchText('');
  };

  const findPlaceById = (placeId: string) => {
    return markers.find((marker) => marker.id === placeId);
  };

  const moveToPlace = (place: MapMarker) => {
    setRegion((prev) => ({
      ...prev,
      latitude: place.latitude,
      longitude: place.longitude,
      timestamp: Date.now(),
    }));
  };

  const handleCurrentPositionPress = async () => {
    const location = await getCurrentLocation();

    if (!location) {
      return;
    }

    updateRegionToLocation(location);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('[MapViewModel] Permission denied');
        return null;
      }

      return await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
    } catch (error) {
      console.error('[MapViewModel] Location error:', error);
      return null;
    }
  };

  const updateRegionToLocation = (location: Location.LocationObject) => {
    setRegion((prev) => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: Date.now(),
    }));

    console.log(
      '[MapViewModel] Updated Region:',
      location.coords.latitude,
      location.coords.longitude
    );
  };

  return {
    region,
    markers,
    searchText,
    showSearchResults,
    focusedMarkerId,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchResultPress,
    handleCurrentPositionPress,
  };
};