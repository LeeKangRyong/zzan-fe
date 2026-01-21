import { useQuery } from '@tanstack/react-query';
import { placeApi } from '../api/placeApi';
import { toMapMarker } from '../model/mapModel';
import type { MapMarker } from '../model/mapModel';
import {
  filterMarkersInRegion,
  mockPlacesWithCoordinates,
} from '../model/mock';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

interface PlaceBounds {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
}

const createPlacesQueryKey = (bounds: PlaceBounds | null) => {
  if (!bounds) return ['places', 'empty'];

  return [
    'places',
    'region',
    {
      minLat: bounds.minLatitude.toFixed(3),
      maxLat: bounds.maxLatitude.toFixed(3),
      minLng: bounds.minLongitude.toFixed(3),
      maxLng: bounds.maxLongitude.toFixed(3),
    },
  ];
};

const fetchPlacesInRegion = async (
  bounds: PlaceBounds
): Promise<MapMarker[]> => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockRegion = {
      latitude: (bounds.minLatitude + bounds.maxLatitude) / 2,
      longitude: (bounds.minLongitude + bounds.maxLongitude) / 2,
      latitudeDelta: bounds.maxLatitude - bounds.minLatitude,
      longitudeDelta: bounds.maxLongitude - bounds.minLongitude,
    };

    return filterMarkersInRegion(mockPlacesWithCoordinates, mockRegion);
  }

  const result = await placeApi.getPlacesInRegion({
    minLatitude: bounds.minLatitude,
    maxLatitude: bounds.maxLatitude,
    minLongitude: bounds.minLongitude,
    maxLongitude: bounds.maxLongitude,
  });

  return result
    .filter((place) => place.feedCount > 0)
    .map(toMapMarker);
};

export const usePlacesQuery = (bounds: PlaceBounds | null) => {
  return useQuery({
    queryKey: createPlacesQueryKey(bounds),
    queryFn: () => {
      if (!bounds) {
        throw new Error('Bounds are required');
      }
      return fetchPlacesInRegion(bounds);
    },
    enabled: bounds !== null,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
