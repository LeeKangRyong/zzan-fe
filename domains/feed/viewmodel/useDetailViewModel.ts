import { useState, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { isMockEnabled } from '@/shared/utils/env';
import { feedApi } from '../api/feedApi';
import { scrapApi } from '@/shared/api/scrapApi';
import { mockAlcohols, mockFeedDetails, type MockFeedDetail } from '../model/mock';
import type { FeedDetailApiResponse } from '../model/feedApiModel';
import type { Alcohol } from '../model/feedModel';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const useDetailViewModel = (feedId?: string) => {
  const [focusedAlcoholId, setFocusedAlcoholId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedData, setFeedData] = useState<FeedDetailApiResponse | MockFeedDetail | null>(null);

  useEffect(() => {
    if (!feedId) {
      return;
    }

    if (isMockEnabled()) {
      const mockData = mockFeedDetails.find(f => f.id === feedId);
      if (mockData) {
        setFeedData(mockData);
      } else {
        setError('피드를 찾을 수 없습니다.');
      }
      return;
    }

    const fetchFeedDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await feedApi.getFeedDetail(feedId);
        setFeedData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load feed';
        setError(errorMessage);
        console.error('[Feed Detail Error]', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedDetail();
  }, [feedId]);

  const handleTagPress = (alcoholId: string) => {
    setFocusedAlcoholId(alcoholId);
  };

  const handleAlcoholPress = (alcoholId: string) => {
    console.log('Navigate to alcohol detail:', alcoholId);
  };

  const handlePlacePress = () => {
    if (isMockEnabled()) {
      const mockData = feedData as MockFeedDetail | null;
      if (mockData?.kakaoPlaceId) {
        console.log('Navigate to place detail:', mockData.kakaoPlaceId);
      }
      return;
    }

    const apiData = feedData as FeedDetailApiResponse | null;
    if (apiData?.kakaoPlaceId) {
      console.log('Navigate to place detail:', apiData.kakaoPlaceId);
    }
  };

  const handleShare = () => {
    console.log('Share feed');
  };

  const checkBookmarkStatus = useCallback(async () => {
    if (isMockEnabled() || !feedId) {
      return;
    }

    try {
      const response = await scrapApi.feed.check(feedId);
      setIsBookmarked(response.data.exist);
    } catch (error) {
      console.error('[DetailViewModel] Failed to check bookmark:', error);
    }
  }, [feedId]);

  const handleBookmark = useCallback(async () => {
    if (isMockEnabled()) {
      setIsBookmarked((prev) => !prev);
      return;
    }

    if (!feedId) {
      return;
    }

    try {
      if (isBookmarked) {
        await scrapApi.feed.delete(feedId);
      } else {
        await scrapApi.feed.add(feedId);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.error('[DetailViewModel] Failed to toggle bookmark:', error);
      setIsBookmarked((prev) => !prev);
    }
  }, [feedId, isBookmarked]);

  useEffect(() => {
    checkBookmarkStatus();
  }, [checkBookmarkStatus]);

  if (isMockEnabled()) {
    const mockData = feedData as MockFeedDetail | null;

    if (!mockData) {
      return {
        user: null,
        images: [],
        alcohols: [],
        alcoholRatings: {},
        alcoholTagMappings: [],
        place: null,
        placeRating: 0,
        review: '',
        focusedAlcoholId,
        isBookmarked,
        isLoading: false,
        error: error || '피드를 찾을 수 없습니다.',
        handleTagPress,
        handleAlcoholPress,
        handlePlacePress,
        handleShare,
        handleBookmark,
      };
    }

    const mockAlcoholTagMappings = mockData.images.flatMap((img, imageIndex) =>
      img.tags.map(tag => ({
        alcoholId: tag.liquorId,
        imageIndex,
        tagPosition: { x: tag.x, y: tag.y },
      }))
    );

    const uniqueLiquorIds = [...new Set(mockAlcoholTagMappings.map(m => m.alcoholId))];

    const selectedAlcohols = uniqueLiquorIds
      .map(id => mockAlcohols.find(a => a.id === id))
      .filter(Boolean) as Alcohol[];

    const mockAlcoholRatings: Record<string, number> =
      Object.fromEntries(selectedAlcohols.map(a => [a.id, a.score || 4.0]));

    return {
      user: {
        id: mockData.userId,
        username: mockData.userName,
        imageUrl: mockData.userProfileImage,
      },
      images: mockData.images.map(img => ({
        uri: img.imageUrl,
        id: img.id,
      })),
      alcohols: selectedAlcohols,
      alcoholRatings: mockAlcoholRatings,
      alcoholTagMappings: mockAlcoholTagMappings,
      place: mockData.kakaoPlaceId ? {
        id: mockData.kakaoPlaceId,
        name: mockData.placeName || '',
        address: mockData.placeAddress || '',
        imageUrl: require('@/assets/images/example_image.png'),
        feedCount: mockData.liquorCount,
        rating: mockData.score,
      } : null,
      placeRating: mockData.score,
      review: mockData.text,
      focusedAlcoholId,
      isBookmarked,
      isLoading: false,
      error: null,
      handleTagPress,
      handleAlcoholPress,
      handlePlacePress,
      handleShare,
      handleBookmark,
    };
  }

  if (isLoading || !feedData) {
    return {
      user: null,
      images: [],
      alcohols: [],
      alcoholRatings: {},
      alcoholTagMappings: [],
      place: null,
      placeRating: 0,
      review: '',
      focusedAlcoholId,
      isBookmarked,
      isLoading,
      error,
      handleTagPress,
      handleAlcoholPress,
      handlePlacePress,
      handleShare,
      handleBookmark,
    };
  }

  const apiAlcoholTagMappings = feedData.images.flatMap((img, imageIndex) =>
    img.tags.map(tag => ({
      alcoholId: tag.liquorId,
      imageIndex,
      tagPosition: { x: tag.x, y: tag.y },
    }))
  );

  const uniqueLiquorIds = [...new Set(apiAlcoholTagMappings.map(m => m.alcoholId))];

  const apiAlcohols: Alcohol[] = uniqueLiquorIds.map(liquorId => {
    const tag = feedData.images
      .flatMap(img => img.tags)
      .find(t => t.liquorId === liquorId);
    return {
      id: liquorId,
      name: tag?.liquorName || '',
      imageUrl: '',
      type: '',
    };
  });

  const apiAlcoholRatings: Record<string, number> = {};

  return {
    user: {
      id: feedData.userId,
      username: feedData.userName,
      imageUrl: { uri: feedData.userProfileImage },
    },
    images: feedData.images.map(img => ({
      uri: { uri: img.imageUrl },
      id: img.id,
    })),
    alcohols: apiAlcohols,
    alcoholRatings: apiAlcoholRatings,
    alcoholTagMappings: apiAlcoholTagMappings,
    place: {
      id: feedData.kakaoPlaceId || '',
      name: feedData.placeName || '',
      address: feedData.placeAddress || '',
      imageUrl: '',
      feedCount: feedData.liquorCount,
      rating: feedData.score,
    },
    placeRating: feedData.score,
    review: feedData.text,
    focusedAlcoholId,
    isBookmarked,
    isLoading,
    error,
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  };
};
