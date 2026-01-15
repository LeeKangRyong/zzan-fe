import { ImageSourcePropType } from 'react-native';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker extends Coordinate {
  id: string;
  name: string;
  address: string;
  imageUrl?: ImageSourcePropType;
}