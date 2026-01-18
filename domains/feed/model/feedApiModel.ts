import type { Alcohol } from './feedModel';

export interface LiquorSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export interface LiquorApiResponse {
  id: string;
  liquorName: string;
  liquorScore: number;
  liquorImageUrl: string;
  liquorType: string;
}

export interface LiquorSearchResponse {
  items: LiquorApiResponse[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  objectKey: string;
  expiresIn: number;
}

export interface FeedImageTag {
  liquorId: string;
  liquorName: string;
  x: number;
  y: number;
}

export interface FeedImageRequest {
  imageUrl: string;
  tags: FeedImageTag[];
}

export interface CreateFeedRequest {
  score: number;
  text: string;
  images: FeedImageRequest[];
  kakaoPlaceId?: string;
  placeName?: string;
  placePhone?: string;
  placeAddress?: string;
  longitude?: number;
  latitude?: number;
}

export interface CreateFeedResponse {
  feedId: string;
  createdAt: string;
}

export interface CreateLiquorReviewRequest {
  score: number;
  text: string;
}

export interface CreateLiquorReviewResponse {
  reviewId: string;
  createdAt: string;
}

export interface FeedDetailTag {
  id: string;
  liquorId: string;
  liquorName: string;
  x: number;
  y: number;
}

export interface FeedDetailImage {
  id: string;
  imageUrl: string;
  tags: FeedDetailTag[];
}

export interface FeedDetailApiResponse {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  imageUrl: string;
  images: FeedDetailImage[];
  score: number;
  liquorCount: number;
  text: string;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
  createdAt: string;
}

export const mapLiquorApiToAlcohol = (liquor: LiquorApiResponse): Alcohol => ({
  id: liquor.id,
  imageUrl: liquor.liquorImageUrl || '',
  name: liquor.liquorName,
  type: liquor.liquorType,
  score: liquor.liquorScore,
});
