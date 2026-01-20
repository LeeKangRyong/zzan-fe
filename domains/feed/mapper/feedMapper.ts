import type { RecentFeedApiResponse } from '../model/feedApiModel';
import type { MockFeedDetail } from '../model/mock';

export const mapMockFeedDetailToRecentFeed = (
  mockFeed: MockFeedDetail
): RecentFeedApiResponse => ({
  id: mockFeed.id,
  imageUrl: mockFeed.imageUrl,
  score: mockFeed.score,
  liquorCount: mockFeed.liquorCount,
  userId: mockFeed.userId,
  userName: mockFeed.userName,
  userProfileImage: mockFeed.userProfileImage,
  kakaoPlaceId: mockFeed.kakaoPlaceId || '',
  placeName: mockFeed.placeName || '',
  placeAddress: mockFeed.placeAddress || '',
});
