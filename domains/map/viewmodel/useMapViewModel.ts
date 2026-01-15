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

  const handleMarkerPress = (markerId: string) => {
    console.log('[MapViewModel] Marker pressed:', markerId);
  };

  const handleCurrentPositionPress = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('[MapViewModel] Permission denied');
        return;
      }

      // 정확도를 위해 Accuracy.High 사용
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // 기존 prev 값을 spread 하여 유지하면서 새로운 좌표와 timestamp 부여
      setRegion(prev => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: Date.now(), 
      }));

      console.log('[MapViewModel] Updated Region:', location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('[MapViewModel] Location error:', error);
    }
  };

  return {
    region,
    markers,
    handleMarkerPress,
    handleCurrentPositionPress,
  };
};