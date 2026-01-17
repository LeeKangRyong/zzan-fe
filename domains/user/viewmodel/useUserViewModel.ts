import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import type { User, UserApiResponse } from '../model/userModel';
import { mockUser } from '../model/mock';
import { mapApiUserToUser } from '../model/userMapper';
import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { ApiResponse } from '@/shared/types/api';

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

export const useUserViewModel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      setUser(mockUser);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient<ApiResponse<UserApiResponse>>(
        API_ENDPOINTS.USER.ME,
        { requireAuth: true }
      );
      setUser(mapApiUserToUser(response.data));
    } catch (err) {
      setError('사용자 정보를 불러오는데 실패했습니다');
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchCurrentUser,
  };
};
