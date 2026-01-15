import { useState } from 'react';
import { MapMarker, MapRegion } from '../model/mapModel';
import { mockPlacesWithCoordinates } from '../model/mock';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

const initialRegion: MapRegion = {
  latitude: 37.5665,
  longitude: 126.9780,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const useMapViewModel = () => {
  const [region] = useState<MapRegion>(initialRegion);
  const [markers] = useState<MapMarker[]>(
    USE_MOCK_DATA ? mockPlacesWithCoordinates : []
  );

  const handleMarkerPress = (markerId: string) => {
    console.log('[MapViewModel] Marker pressed:', markerId);
  };

  return {
    region,
    markers,
    handleMarkerPress,
  };
};
