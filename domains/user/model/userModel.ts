import { ImageSourcePropType } from 'react-native';

export interface User {
  id: string;
  name: string;
  profileImage: ImageSourcePropType;
  emptyAlcoholCount: number;
}

export interface UserFeed {
  id: string;
  imageUrl: ImageSourcePropType;
  placeName: string;
  address: string;
  alcoholCount: number;
}

export interface UserScrapAlcohol {
  id: string;
  imageUrl: ImageSourcePropType;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
}
