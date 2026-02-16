import { MapMarker, MapRegion } from './mapModel';
import { PLACE_DATA } from '@/domains/feed/model/mock';
import { PLACE_KAKAO_MAP } from '@/domains/info/model/placeKakaoMapping';

export const filterMarkersInRegion = (
  markers: MapMarker[],
  region: MapRegion
): MapMarker[] => {
  const minLatitude = region.latitude - region.latitudeDelta / 2;
  const maxLatitude = region.latitude + region.latitudeDelta / 2;
  const minLongitude = region.longitude - region.longitudeDelta / 2;
  const maxLongitude = region.longitude + region.longitudeDelta / 2;

  return markers.filter(marker =>
    marker.latitude >= minLatitude &&
    marker.latitude <= maxLatitude &&
    marker.longitude >= minLongitude &&
    marker.longitude <= maxLongitude
  );
};

// ===== HELPER FUNCTIONS =====

const generateRandomRating = (): number => {
  const rating = 3.0 + Math.random() * 2.0;
  return Math.round(rating);
};

const generateRandomFeedCount = (): number => {
  return Math.floor(Math.random() * 50) + 1;
};

// ===== MOCK DATA =====

export const mockPlacesWithCoordinates: MapMarker[] = Array.from({ length: 100 }, (_, i) => {
  const placeId = String(i + 1);
  const place = PLACE_DATA[i % PLACE_DATA.length];

  return {
    id: placeId,
    kakaoPlaceId: PLACE_KAKAO_MAP[placeId],
    name: place.name,
    address: place.address,
    latitude: place.lat,
    longitude: place.lng,
    feedCount: generateRandomFeedCount(),
    rating: generateRandomRating(),
  };
});
