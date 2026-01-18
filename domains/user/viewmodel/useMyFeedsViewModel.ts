import { useState, useEffect } from 'react';
import { isMockEnabled } from '@/shared/utils/env';
import { userApi } from '../api/userApi';
import { mockUserFeeds } from '../model/mock';
import { mapUserFeedApiToDomain } from '../model/userApiModel';
import type { UserFeed } from '../model/userModel';

export const useMyFeedsViewModel = () => {
  const [feeds, setFeeds] = useState<UserFeed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeeds = async () => {
    if (isMockEnabled()) {
      setFeeds(mockUserFeeds);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await userApi.getMyFeeds({ size: 50 });
      const mappedFeeds = response.items.map(mapUserFeedApiToDomain);
      setFeeds(mappedFeeds);
    } catch (err) {
      setError('피드를 불러오는데 실패했습니다');
      console.error('[My Feeds Error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  return {
    feeds,
    isLoading,
    error,
  };
};
