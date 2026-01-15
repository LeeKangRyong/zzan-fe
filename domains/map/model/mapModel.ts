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
}