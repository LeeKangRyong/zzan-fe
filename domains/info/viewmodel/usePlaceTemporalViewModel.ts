import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { infoApi } from '@/shared/api/infoApi';
import { feedApi } from '@/domains/feed/api/feedApi';
import { useDistance } from '@/shared/hooks/useDistance';
import { isMockEnabled } from '@/shared/utils/env';
import type { PlaceDetailApiResponse } from '@/domains/info/model/infoApiModel';

interface PlaceTemporalInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  feedCount: number;
  kakaoPlaceId: string;
  latitude: number;
  longitude: number;
}

interface PlaceFeedWithProfile {
  id: string;
  imageUrl: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  placeName: string;
  placeAddress: string;
  alcoholCount: number;
  score: number;
}

interface UsePlaceTemporalViewModelParams {
  placeId: string;
  userLatitude?: number;
  userLongitude?: number;
}

const mapApiToPlaceTemporalInfo = (
  api: PlaceDetailApiResponse
): PlaceTemporalInfo => ({
  id: api.id,
  name: api.name,
  address: api.address,
  phone: api.phone || '',
  rating: api.averageScore || 0,
  feedCount: api.feedCount || 0,
  kakaoPlaceId: api.kakaoPlaceId,
  latitude: api.latitude,
  longitude: api.longitude,
});

export const usePlaceTemporalViewModel = ({
  placeId,
  userLatitude,
  userLongitude,
}: UsePlaceTemporalViewModelParams) => {
  const router = useRouter();
  const { calculateDistance, formatDistance } = useDistance();

  const [placeInfo, setPlaceInfo] = useState<PlaceTemporalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [kakaoPlaceId, setKakaoPlaceId] = useState<string | null>(null);

  const [distance, setDistance] = useState<string | null>(null);
  const [isDistanceLoading, setIsDistanceLoading] = useState(true);

  const [placeFeeds, setPlaceFeeds] = useState<PlaceFeedWithProfile[]>([]);
  const [isFeedsLoading, setIsFeedsLoading] = useState(true);

  const loadMockData = useCallback(() => {
    const mockKakaoPlaceId = 'mock-kakao-place-1';
    setPlaceInfo({
      id: 'mock-place-1',
      name: '울산 문화의거리',
      address: '울산광역시 중구 성남동 329-5',
      phone: '052-290-3660',
      rating: 4.6,
      feedCount: 123,
      kakaoPlaceId: mockKakaoPlaceId,
      latitude: 35.5384,
      longitude: 129.3114,
    });
    setKakaoPlaceId(mockKakaoPlaceId);
    setIsLoading(false);
  }, []);

  const fetchPlaceInfo = useCallback(async () => {
    if (!placeId) return;

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockData();
      return;
    }

    try {
      const response = await infoApi.getPlaceDetail(placeId);
      if (response.data) {
        setPlaceInfo(mapApiToPlaceTemporalInfo(response.data));
        setKakaoPlaceId(response.data.kakaoPlaceId);
      } else {
        setError('장소 정보를 찾을 수 없습니다');
        loadMockData();
      }
    } catch (err) {
      console.error('[PlaceTemporalViewModel] Failed to load place:', err);
      setError('장소 정보를 불러오는데 실패했습니다');
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  }, [placeId, loadMockData]);

  const computeDistance = useCallback(async () => {
    setIsDistanceLoading(true);

    try {
      let userLat = userLatitude;
      let userLng = userLongitude;

      if (!userLat || !userLng) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setDistance(null);
          setIsDistanceLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        userLat = location.coords.latitude;
        userLng = location.coords.longitude;
      }

      if (!placeInfo) {
        setIsDistanceLoading(false);
        return;
      }

      const distanceKm = calculateDistance(
        userLat,
        userLng,
        placeInfo.latitude,
        placeInfo.longitude
      );

      setDistance(formatDistance(distanceKm));
    } catch (err) {
      console.error('[PlaceTemporalViewModel] Failed to calculate distance:', err);
      setDistance(null);
    } finally {
      setIsDistanceLoading(false);
    }
  }, [userLatitude, userLongitude, placeInfo, calculateDistance, formatDistance]);

  const fetchPlaceFeeds = useCallback(async () => {
    if (!kakaoPlaceId) return;

    setIsFeedsLoading(true);

    if (isMockEnabled()) {
      setPlaceFeeds([
        {
          id: 'feed-1',
          imageUrl: '',
          userId: 'user-1',
          userName: '도선빈',
          userProfileImage: '',
          placeName: '울산 문화의거리',
          placeAddress: '울산광역시 중구 성남동 329-5',
          alcoholCount: 4,
          score: 4,
        },
        {
          id: 'feed-2',
          imageUrl: '',
          userId: 'user-2',
          userName: '김철수',
          userProfileImage: '',
          placeName: '울산 문화의거리',
          placeAddress: '울산광역시 중구 성남동 329-5',
          alcoholCount: 2,
          score: 5,
        },
      ]);
      setIsFeedsLoading(false);
      return;
    }

    try {
      const response = await feedApi.getPlaceFeeds(kakaoPlaceId);
      const mapped = response.items.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        userId: '',
        userName: '',
        userProfileImage: '',
        placeName: item.placeName,
        placeAddress: item.placeAddress,
        alcoholCount: item.liquorCount,
        score: item.score,
      }));
      setPlaceFeeds(mapped);
    } catch (err) {
      console.error('[PlaceTemporalViewModel] Failed to load feeds:', err);
      setPlaceFeeds([]);
    } finally {
      setIsFeedsLoading(false);
    }
  }, [kakaoPlaceId]);

  useEffect(() => {
    fetchPlaceInfo();
  }, [fetchPlaceInfo]);

  useEffect(() => {
    if (kakaoPlaceId) {
      fetchPlaceFeeds();
    }
  }, [kakaoPlaceId, fetchPlaceFeeds]);

  useEffect(() => {
    if (placeInfo) {
      computeDistance();
    }
  }, [placeInfo, computeDistance]);

  const toggleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
    console.log('Share pressed');
  }, []);

  const handleAlcholButtonPress = useCallback(() => {
    router.push({
      pathname: '/write',
      params: { kakaoPlaceId },
    });
  }, [router, kakaoPlaceId]);

  return {
    placeInfo,
    isLoading,
    error,
    isBookmarked,
    distance,
    isDistanceLoading,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleShare,
    handleAlcholButtonPress,
  };
};
