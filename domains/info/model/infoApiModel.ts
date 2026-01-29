import type { ImageSourcePropType } from 'react-native';

import type { AlcoholInfo, ImageWithDescription, PlaceInfo } from './infoModel';

const exampleImage = require('@/assets/images/example_image.png');

const HEADER_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  양조장: require('@/assets/basic_mock_images/brewery.png'),
  원재료: require('@/assets/basic_mock_images/ingredients.png'),
  외관: require('@/assets/basic_mock_images/looking.png'),
  향: require('@/assets/basic_mock_images/smell.png'),
  맛: require('@/assets/basic_mock_images/taste.png'),
  특징: require('@/assets/basic_mock_images/feature.png'),
};

const getImageForHeader = (header: string): ImageSourcePropType => {
  return HEADER_IMAGE_MAP[header] || exampleImage;
};

export interface LiquorDescriptionItem {
  header: string;
  content: string;
}

export interface LiquorDetailApiResponse {
  id: string;
  name: string;
  type: string | null;
  imageUrl: string | null;
  score: number | null;
  description: LiquorDescriptionItem[] | null;
  foodPairing: string | null;
  volume: string | null;
  content: string | null;
  awards: string | null;
  etc: string | null;
  brewery: string | null;
}

export interface PlaceDetailApiResponse {
  id: string;
  name: string;
  averageScore: number;
  feedCount: number;
  kakaoPlaceId: string;
  address: string;
  phone: string;
  longitude: number;
  latitude: number;
}

export interface LiquorReviewApiResponse {
  id: string;
  userId: string;
  username: string;
  userProfileImageUrl: string | null;
  liquorId: string;
  liquorName: string;
  score: number;
  text: string | null;
  createdAt: string;
}

export interface LiquorReviewsListResponse {
  items: LiquorReviewApiResponse[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface CreateLiquorReviewRequest {
  score: number;
  text?: string;
}

export interface UpdateLiquorReviewRequest {
  score: number;
  text?: string;
}

const createImageWithDescription = (
  imageUrl: string
): ImageWithDescription => ({
  image: { uri: imageUrl },
  descriptionTitle: '',
  descriptionCategory: '',
});

const createDefaultImage = (): ImageWithDescription => ({
  image: exampleImage,
  descriptionTitle: '',
  descriptionCategory: '',
});

export const mapLiquorApiToAlcoholInfo = (
  api: LiquorDetailApiResponse
): AlcoholInfo => {
  const images = api.imageUrl
    ? [createImageWithDescription(api.imageUrl)]
    : [createDefaultImage()];

  const galleryImages: ImageWithDescription[] = (api.description || []).map(
    item => ({
      image: getImageForHeader(item.header),
      descriptionTitle: item.header,
      descriptionCategory: item.content?.trim() || '... ',
    })
  );

  return {
    id: api.id,
    name: api.name,
    category: api.type || '',
    images,
    option1: api.volume || '',
    option2: api.content || '',
    option3: api.brewery || '',
    option4: api.etc || '',
    isBookmarked: false,
    rating: api.score || 0,
    reviews: [],
    recommendTitle: '페어링 안주 추천',
    recommendDescription: api.foodPairing || '',
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
  };
};

export const mapPlaceApiToPlaceInfo = (
  api: PlaceDetailApiResponse
): PlaceInfo => {
  const phoneAddress = `${api.phone ? api.phone + ' ' : ''}${api.address}`;

  return {
    id: api.id,
    name: api.name,
    category: '',
    images: [],
    option1: phoneAddress,
    option2: '정보 없음',
    option3: '정보 없음',
    option4: '정보 없음',
    isBookmarked: false,
    rating: api.averageScore || 0,
    reviews: [],
    description: api.address,
    kakaoPlaceId: api.kakaoPlaceId,
  };
};

