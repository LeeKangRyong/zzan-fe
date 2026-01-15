import { ImageSourcePropType } from 'react-native';

export interface FeedImage {
  uri: string;
  id: string;
}

export interface FeedPost {
  images: FeedImage[];
  alcoholIds: string[];
  placeId?: string;
  review: string;
}

export interface Alcohol {
  id: string;
  imageUrl: ImageSourcePropType;
  name: string;
  type: string;
}

export interface Place {
  id: string;
  imageUrl: ImageSourcePropType;
  name: string;
  address: string;
}

export type AddType = 'alcohol' | 'place';
