import type { UserFeed, UserScrapAlcohol } from './userModel';

export interface FeedScrapApiResponse {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  kakaoPlaceId: string;
  placeName: string;
  placeAddress: string;
}

export interface LiquorScrapApiResponse {
  id: string;
  liquorName: string;
  liquorScore: number;
  liquorImageUrl: string;
  liquorType: string;
}

export interface ScrapCheckResponse {
  exist: boolean;
}

export interface ScrapListResponse<T> {
  items: T[];
  nextCursor: string;
  hasNext: boolean;
}

export const mapFeedScrapApiToUserFeed = (
  api: FeedScrapApiResponse
): UserFeed => {
  return {
    id: api.id,
    imageUrl: { uri: api.imageUrl },
    placeName: api.placeName,
    address: api.placeAddress,
    alcoholCount: api.liquorCount,
  };
};

export const mapLiquorScrapApiToUserScrapAlcohol = (
  api: LiquorScrapApiResponse
): UserScrapAlcohol => {
  return {
    id: api.id,
    imageUrl: { uri: api.liquorImageUrl },
    name: api.liquorName,
    type: api.liquorType,
    rating: api.liquorScore,
    reviewCount: 0,
  };
};
