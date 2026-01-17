import { ImageSourcePropType } from 'react-native';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
  timestamp?: number; // 상태 업데이트 트리거를 위한 필드
}

export interface MapMarker extends Coordinate {
  id: string;
  name: string;
  address: string;
  imageUrl?: ImageSourcePropType;
  feedCount: number;
  rating: number;
}

export interface PlaceResponse {
  placeId: number;
  kakaoPlaceId: string;
  name: string;
  categoryName: string;
  roadAddress: string;
  longitude: number;
  latitude: number;
  feedCount: number;
  averageRating: number;
}

export interface PlaceSearchResponse {
  kakaoPlaceId: string;
  name: string;
  categoryName: string;
  roadAddress: string;
  phone?: string;
  longitude: number;
  latitude: number;
}

export interface PlaceSearchMeta {
  totalCount: number;
  pageableCount: number;
  isEnd: boolean;
  currentPage: number;
  size: number;
}

export const toMapMarker = (place: PlaceResponse): MapMarker => ({
  id: place.placeId.toString(),
  name: place.name,
  address: place.roadAddress,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: place.feedCount,
  rating: place.averageRating,
});

export const searchResultToMapMarker = (place: PlaceSearchResponse): MapMarker => ({
  id: place.kakaoPlaceId,
  name: place.name,
  address: place.roadAddress,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: 0,
  rating: 0,
});