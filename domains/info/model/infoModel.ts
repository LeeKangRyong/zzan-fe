import type { ImageSourcePropType } from 'react-native';

export interface PlaceInfo {
  id: string;
  name: string;
  category: string;
  images: ImageSourcePropType[];
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isBookmarked: boolean;
  rating: number;
  reviews: PlaceReview[];
  description: string;
}

export interface PlaceReview {
  id: string;
  userName: string;
  rating: number;
  content: string;
  imageUrl?: ImageSourcePropType;
  createdAt: string;
}

export interface InfoBox {
  label: string;
  value: string;
}

export interface AlcoholInfo {
  id: string;
  name: string;
  category: string;
  images: ImageSourcePropType[];
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isBookmarked: boolean;
  rating: number;
  reviews: PlaceReview[];
  description: string;
  recommendTitle: string;
  recommendDescription: string;
  galleryImages?: ImageSourcePropType[];
}
