import * as Location from 'expo-location';
import { useState, useEffect, useRef } from 'react';
import {
  MapMarker,
  MapRegion,
  PlaceSearchMeta,
  toMapMarker,
  searchResultToMapMarker,
} from '../model/mapModel';
import { mockPlacesWithCoordinates, filterMarkersInRegion } from '../model/mock';
import { placeApi } from '../api/placeApi';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

const initialRegion: MapRegion = {
  latitude: 37.5665,
  longitude: 126.9780,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export const useMapViewModel = () => {
  const [region, setRegion] = useState<MapRegion>(initialRegion);
  const regionRef = useRef<MapRegion>(initialRegion);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<MapMarker[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedMarkerId, setFocusedMarkerId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<MapMarker | null>(null);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchMeta, setSearchMeta] = useState<PlaceSearchMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 초기에는 마커를 로드하지 않음 - 버튼 클릭 시에만 로드
  }, []);

  const handleMarkerPress = (markerId: string) => {
    console.log('[MapViewModel] Marker pressed:', markerId);

    if (focusedMarkerId === markerId) {
      setSelectedPlace(null);
      setFocusedMarkerId(null);
      return;
    }

    const place = findPlaceById(markerId);

    if (!place) {
      return;
    }

    setSelectedPlace(place);
    setFocusedMarkerId(markerId);
  };

  const loadPlacesInRegion = async (regionToLoad: MapRegion) => {
    if (USE_MOCK_DATA) {
      // Mock 모드에서도 범위 필터링 수행
      setIsLoadingPlaces(true);

      // 실제 API 호출처럼 약간의 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 300));

      const filteredMarkers = filterMarkersInRegion(mockPlacesWithCoordinates, regionToLoad);
      setMarkers(filteredMarkers);
      setIsLoadingPlaces(false);
      return;
    }

    setIsLoadingPlaces(true);
    setError(null);

    try {
      const minLatitude = regionToLoad.latitude - regionToLoad.latitudeDelta / 2;
      const maxLatitude = regionToLoad.latitude + regionToLoad.latitudeDelta / 2;
      const minLongitude = regionToLoad.longitude - regionToLoad.longitudeDelta / 2;
      const maxLongitude = regionToLoad.longitude + regionToLoad.longitudeDelta / 2;

      const result = await placeApi.getPlacesInRegion({
        minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude,
      });

      const newMarkers = result.map(toMapMarker);
      setMarkers(newMarkers);
    } catch (err) {
      setError('장소를 불러오는 중 오류가 발생했습니다.');
      console.error('[MapViewModel] Failed to load places:', err);
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  const searchPlaces = async (keyword: string, page: number = 1) => {
    if (!keyword.trim()) {
      return;
    }

    setIsLoadingPlaces(true);
    setError(null);

    try {
      const result = await placeApi.searchPlaces({
        keyword,
        page,
        size: 15,
      });

      const newMarkers = result.map(searchResultToMapMarker);
      setSearchResults(newMarkers);
      setSearchPage(page);

      if (newMarkers.length > 0) {
        moveToPlace(newMarkers[0]);
      }
    } catch (err) {
      setError('장소 검색 중 오류가 발생했습니다.');
      console.error('[MapViewModel] Failed to search places:', err);
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    if (!searchText.trim()) {
      return;
    }

    searchPlaces(searchText, 1);
    setShowSearchResults(true);
  };

  const handleSearchResultPress = (placeId: string) => {
    const place = searchResults.find((marker) => marker.id === placeId);

    if (!place) {
      return;
    }

    moveToPlace(place);
    setFocusedMarkerId(placeId);
    setShowSearchResults(false);
    setSearchText('');
    setSearchResults([]);
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

  const handleMapPress = () => {
    setSelectedPlace(null);
    setFocusedMarkerId(null);
    setShowSearchResults(false);
    setSearchText('');
    setSearchResults([]);
  };

  const handleRegionChange = (newRegion: MapRegion) => {
    setRegion(newRegion);
    regionRef.current = newRegion;
  };

  const handleSearchInRegion = () => {
    loadPlacesInRegion(regionRef.current);
  };

  return {
    region,
    markers,
    searchText,
    searchResults,
    showSearchResults,
    focusedMarkerId,
    selectedPlace,
    isLoadingPlaces,
    error,
    searchMeta,
    searchPage,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
    handleRegionChange,
    handleSearchInRegion,
    loadPlacesInRegion,
  };
};