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

// API 문서 Section 8.1에 맞춘 타입
export interface PlaceResponse {
  id: string;
  name: string;
  feedCount: number;
  score: number;
  address: string;
  phone: string;
  longitude: number;
  latitude: number;
}

// API 문서 Section 9.1에 맞춘 타입
export interface PlaceSearchResponse {
  id: string;
  placeName: string;
  categoryName: string;
  phone: string;
  addressName: string;
  roadAddressName: string;
  longitude: number;
  latitude: number;
}

export const toMapMarker = (place: PlaceResponse): MapMarker => ({
  id: place.id,
  name: place.name,
  address: place.address,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: place.feedCount,
  rating: place.score,
});

export const searchResultToMapMarker = (place: PlaceSearchResponse): MapMarker => ({
  id: place.id,
  name: place.placeName,
  address: place.roadAddressName,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: 0,
  rating: 0,
});