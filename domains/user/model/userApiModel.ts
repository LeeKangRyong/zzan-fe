import type { UserFeed } from './userModel';

export interface UserFeedSummary {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
}

export interface UserFeedsResponse {
  items: UserFeedSummary[];
  nextCursor: string | null;
  hasNext: boolean;
}

export const mapUserFeedApiToDomain = (api: UserFeedSummary): UserFeed => ({
  id: api.id,
  imageUrl: { uri: api.imageUrl },
  placeName: api.placeName || '',
  address: api.placeAddress || '',
  alcoholCount: api.liquorCount,
});
