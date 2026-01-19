import type { AlcoholInfo, ImageWithDescription, PlaceInfo } from './infoModel';

const exampleImage = require('@/assets/images/example_image.png');

export interface LiquorDetailApiResponse {
  id: string;
  name: string;
  type: string | null;
  imageUrl: string | null;
  score: number | null;
  description: string | null;
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
    galleryImages: undefined,
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

