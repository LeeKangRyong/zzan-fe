import type {
  AlcoholInfo,
  InfoBox,
  PlaceInfo,
} from '@/domains/info/model/infoModel';
import { MOCK_ALCOHOL_INFO, MOCK_PLACE_INFO } from '@/domains/info/model/mock';
import {
  mapLiquorApiToAlcoholInfo,
  mapPlaceApiToPlaceInfo,
} from '@/domains/info/model/infoApiModel';
import { infoApi } from '@/shared/api/infoApi';
import { scrapApi } from '@/shared/api/scrapApi';
import { feedApi } from '@/domains/feed/api/feedApi';
import { mockNearbyFeeds } from '@/domains/feed/model/mock';
import { isMockEnabled } from '@/shared/utils/env';
import { useState, useEffect, useCallback } from 'react';
import type { FeedWithUser } from '@/domains/feed/model/feedModel';

const createInfoBoxes = (placeInfo: PlaceInfo): InfoBox[] => {
  return [
    { label: '문의 및 안내', value: placeInfo.option1 },
    { label: '쉬는날', value: placeInfo.option2 },
    { label: '이용시간', value: placeInfo.option3 },
    { label: '주차시설', value: placeInfo.option4 },
  ];
};

const createAlcoholInfoBoxes = (alcoholInfo: AlcoholInfo): InfoBox[] => {
  return [
    { label: '용량', value: alcoholInfo.option1 },
    { label: '도수', value: alcoholInfo.option2 },
    { label: '양조장', value: alcoholInfo.option3 },
    { label: '기타정보', value: alcoholInfo.option4 },
  ];
};

export const useInfoViewModel = (placeId?: string) => {
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [infoBoxes, setInfoBoxes] = useState<InfoBox[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placeFeeds, setPlaceFeeds] = useState<Partial<FeedWithUser>[]>([]);
  const [isFeedsLoading, setIsFeedsLoading] = useState(false);

  const loadMockPlaceInfo = useCallback(() => {
    setPlaceInfo(MOCK_PLACE_INFO);
    setIsBookmarked(MOCK_PLACE_INFO.isBookmarked);
    setInfoBoxes(createInfoBoxes(MOCK_PLACE_INFO));
    setIsLoading(false);
  }, []);

  const fetchPlaceInfo = useCallback(async () => {
    if (!placeId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockPlaceInfo();
      return;
    }

    try {
      const response = await infoApi.getPlaceDetail(placeId);
      const mappedPlace = mapPlaceApiToPlaceInfo(response.data);
      setPlaceInfo(mappedPlace);
      setIsBookmarked(mappedPlace.isBookmarked);
      setInfoBoxes(createInfoBoxes(mappedPlace));
    } catch (err) {
      console.error('[InfoViewModel] Failed to load place:', err);
      setError('장소 정보를 불러오는데 실패했습니다');
      loadMockPlaceInfo();
    } finally {
      setIsLoading(false);
    }
  }, [placeId, loadMockPlaceInfo]);

  useEffect(() => {
    fetchPlaceInfo();
  }, [fetchPlaceInfo]);

  const fetchPlaceFeeds = useCallback(async () => {
    if (!placeInfo?.kakaoPlaceId) {
      return;
    }

    setIsFeedsLoading(true);

    if (isMockEnabled()) {
      setPlaceFeeds(mockNearbyFeeds as Partial<FeedWithUser>[]);
      setIsFeedsLoading(false);
      return;
    }

    try {
      const response = await feedApi.getPlaceFeeds(placeInfo.kakaoPlaceId);
      const mapped = response.items.map((item) => ({
        id: item.id,
        imageUrl: { uri: item.imageUrl },
        placeName: item.placeName,
        address: item.placeAddress,
        alcoholCount: item.liquorCount,
      }));
      setPlaceFeeds(mapped);
    } catch (error) {
      console.error('[InfoViewModel] Failed to load place feeds:', error);
      setPlaceFeeds(mockNearbyFeeds as Partial<FeedWithUser>[]);
    } finally {
      setIsFeedsLoading(false);
    }
  }, [placeInfo?.kakaoPlaceId]);

  useEffect(() => {
    fetchPlaceFeeds();
  }, [fetchPlaceFeeds]);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleAlcholButtonPress = () => {
    console.log('Alchol button pressed');
  };

  return {
    placeInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleShare,
    handleAlcholButtonPress,
  };
};

export const useAlcoholViewModel = (liquorId?: string) => {
  const [alcoholInfo, setAlcoholInfo] = useState<AlcoholInfo | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [infoBoxes, setInfoBoxes] = useState<InfoBox[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMockAlcoholInfo = useCallback(() => {
    setAlcoholInfo(MOCK_ALCOHOL_INFO);
    setIsBookmarked(MOCK_ALCOHOL_INFO.isBookmarked);
    setInfoBoxes(createAlcoholInfoBoxes(MOCK_ALCOHOL_INFO));
    setIsLoading(false);
  }, []);

  const fetchAlcoholInfo = useCallback(async () => {
    if (!liquorId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockAlcoholInfo();
      return;
    }

    try {
      const response = await infoApi.getLiquorDetail(liquorId);
      const mappedAlcohol = mapLiquorApiToAlcoholInfo(response.data);
      setAlcoholInfo(mappedAlcohol);
      setIsBookmarked(mappedAlcohol.isBookmarked);
      setInfoBoxes(createAlcoholInfoBoxes(mappedAlcohol));
    } catch (err) {
      console.error('[InfoViewModel] Failed to load liquor:', err);
      setError('주류 정보를 불러오는데 실패했습니다');
      loadMockAlcoholInfo();
    } finally {
      setIsLoading(false);
    }
  }, [liquorId, loadMockAlcoholInfo]);

  useEffect(() => {
    fetchAlcoholInfo();
  }, [fetchAlcoholInfo]);

  const checkLiquorBookmarkStatus = useCallback(async () => {
    if (isMockEnabled() || !liquorId) {
      return;
    }

    try {
      const response = await scrapApi.liquor.check(liquorId);
      setIsBookmarked(response.data.exist);
    } catch (error) {
      console.error('[InfoViewModel] Failed to check liquor bookmark:', error);
    }
  }, [liquorId]);

  const toggleBookmark = useCallback(async () => {
    if (isMockEnabled()) {
      setIsBookmarked((prev) => !prev);
      return;
    }

    if (!liquorId) {
      return;
    }

    try {
      if (isBookmarked) {
        await scrapApi.liquor.delete(liquorId);
      } else {
        await scrapApi.liquor.add(liquorId);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.error('[InfoViewModel] Failed to toggle liquor bookmark:', error);
      setIsBookmarked((prev) => !prev);
    }
  }, [liquorId, isBookmarked]);

  useEffect(() => {
    checkLiquorBookmarkStatus();
  }, [checkLiquorBookmarkStatus]);

  const handleShare = () => {
    console.log('Share alcohol pressed');
  };

  return {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    toggleBookmark,
    handleShare,
  };
};
