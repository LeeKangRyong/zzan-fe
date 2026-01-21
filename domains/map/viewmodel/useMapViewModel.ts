import * as Location from "expo-location";
import { useState } from "react";
import { placeApi } from "../api/placeApi";
import {
  MapMarker,
  MapRegion,
  searchResultToMapMarker,
  toMapMarker,
} from "../model/mapModel";
import {
  filterMarkersInRegion,
  mockPlacesWithCoordinates,
} from "../model/mock";

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === "true";

const initialRegion: MapRegion = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export const useMapViewModel = () => {
  const [region, setRegion] = useState<MapRegion>(initialRegion);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<MapMarker[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedMarkerId, setFocusedMarkerId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<MapMarker | null>(null);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleMarkerPress = (markerId: string) => {
    if (focusedMarkerId === markerId) {
      setSelectedPlace(null);
      setFocusedMarkerId(null);
      return;
    }

    const place = findPlaceById(markerId);
    if (!place) return;

    setSelectedPlace(place);
    setFocusedMarkerId(markerId);
  };

  // 영역 내 장소 로드 (지도가 이동할 때마다 호출됨)
  const loadPlacesInRegion = async (regionToLoad: MapRegion) => {
    setIsLoadingPlaces(true);
    let newMarkers: MapMarker[] = [];

    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      newMarkers = filterMarkersInRegion(
        mockPlacesWithCoordinates,
        regionToLoad,
      );
    } else {
      setError(null);
      try {
        const minLatitude =
          regionToLoad.latitude - regionToLoad.latitudeDelta / 2;
        const maxLatitude =
          regionToLoad.latitude + regionToLoad.latitudeDelta / 2;
        const minLongitude =
          regionToLoad.longitude - regionToLoad.longitudeDelta / 2;
        const maxLongitude =
          regionToLoad.longitude + regionToLoad.longitudeDelta / 2;

        const result = await placeApi.getPlacesInRegion({
          minLatitude,
          maxLatitude,
          minLongitude,
          maxLongitude,
        });
        newMarkers = result.map(toMapMarker);
      } catch (err) {
        setError("장소를 불러오는 중 오류가 발생했습니다.");
      }
    }

    setMarkers((prev) => {
      if (selectedPlace) {
        const exists = newMarkers.some((m) => m.id === selectedPlace.id);
        return exists ? newMarkers : [...newMarkers, selectedPlace];
      }
      return newMarkers;
    });

    setIsLoadingPlaces(false);
  };

  const searchPlaces = async (keyword: string, page: number = 1) => {
    if (!keyword.trim()) return;

    setIsLoadingPlaces(true);
    setError(null);

    if (USE_MOCK_DATA) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const normalizedKeyword = keyword
          .trim()
          .toLowerCase()
          .replace(/\s/g, "");
        const filtered = mockPlacesWithCoordinates.filter((place) => {
          const name = place.name.toLowerCase().replace(/\s/g, "");
          const address = place.address.toLowerCase().replace(/\s/g, "");
          return (
            name.includes(normalizedKeyword) ||
            address.includes(normalizedKeyword)
          );
        });
        setSearchResults(filtered);
        setSearchPage(1);
      } catch (err) {
        setError("검색 중 오류가 발생했습니다.");
      } finally {
        setIsLoadingPlaces(false);
      }
      return;
    }

    try {
      const result = await placeApi.searchPlaces({ keyword, page, size: 15 });
      const newMarkers = result.map(searchResultToMapMarker);
      setSearchResults(newMarkers);
      setSearchPage(page);
    } catch (err) {
      setError("장소 검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    if (!searchText.trim()) return;
    searchPlaces(searchText, 1);
    setShowSearchResults(true);
  };

  // 검색 결과 리스트에서 항목 클릭 시 처리
  const handleSearchResultPress = (placeId: string) => {
    const place = searchResults.find((marker) => marker.id === placeId);
    if (!place) return;

    // 1. 선택된 장소 상태 업데이트 (상세창 노출 및 마커 유지용)
    setSelectedPlace(place);
    setFocusedMarkerId(placeId);

    // 2. 지도의 현재 마커 리스트를 해당 장소 하나로 즉시 변경 (마커가 바로 보이게 함)
    setMarkers([place]);

    // 3. 지도 이동
    moveToPlace(place);

    // 4. 검색 UI 정리
    setShowSearchResults(false);
    setSearchText("");
    setSearchResults([]);
  };

  const findPlaceById = (placeId: string) => {
    return (
      markers.find((marker) => marker.id === placeId) ||
      searchResults.find((marker) => marker.id === placeId)
    );
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
    if (location) updateRegionToLocation(location);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return null;
      return await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
    } catch (error) {
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
  };

  const handleMapPress = () => {
    setSelectedPlace(null);
    setFocusedMarkerId(null);
    setShowSearchResults(false);
    setSearchText("");
    setSearchResults([]);
  };

  const handleSearchInRegion = (requestCurrentRegion: () => void) => {
    requestCurrentRegion();
  };

  const handleCurrentRegion = (currentRegion: MapRegion) => {
    loadPlacesInRegion(currentRegion);
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
    searchPage,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
    handleSearchInRegion,
    handleCurrentRegion,
    loadPlacesInRegion,
  };
};
