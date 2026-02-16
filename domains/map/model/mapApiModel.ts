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
