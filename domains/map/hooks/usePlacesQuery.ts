import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { isMockEnabled } from '@/shared/utils';
import { placeApi } from '../api/placeApi';
import { toMapMarker, filterMarkersInRegion } from '../mapper';
import type { MapMarker, PlaceBounds } from '../model/mapModel';
import { mockPlacesWithCoordinates } from '../model/mock';

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
  if (isMockEnabled()) {
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
    placeholderData: keepPreviousData,
  });
};
