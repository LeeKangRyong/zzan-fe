import Constants from 'expo-constants';
import { useCallback, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { mockAuthTokens } from '../model/mock';
import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { ApiResponse } from '@/shared/types/api';
import type { AuthTokens, KakaoLoginUrl } from '../model/authModel';

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

export const useAuthViewModel = () => {
  const { setTokens, clearTokens, setLoading, isAuthenticated, isLoading } =
    useAuthStore();
  const [error, setError] = useState<string | null>(null);

  // 1. 카카오 로그인 URL 획득
  const getKakaoLoginUrl = useCallback(async (): Promise<string | null> => {
    if (isMockEnabled()) {
      return 'mock://kakao-login';
    }

    try {
      const response = await apiClient<ApiResponse<KakaoLoginUrl>>(
        API_ENDPOINTS.AUTH.KAKAO_LOGIN_URL,
        { method: 'GET' }
      );
      return response.data.url;
    } catch (err) {
      setError('카카오 로그인 URL을 가져올 수 없습니다');
      return null;
    }
  }, []);

  // 2. 카카오 콜백 처리 (code → tokens)
  const handleKakaoCallback = useCallback(async (code: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient<ApiResponse<AuthTokens>>(
        `${API_ENDPOINTS.AUTH.KAKAO_CALLBACK}?code=${encodeURIComponent(code)}`,
        { method: 'GET' }
      );
      setTokens(response.data.accessToken, response.data.refreshToken);
      return true;
    } catch (err) {
      setError('카카오 로그인에 실패했습니다');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setTokens, setLoading]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const { refreshToken: currentRefreshToken } = useAuthStore.getState();
    if (!currentRefreshToken) return false;

    try {
      const response = await apiClient<ApiResponse<AuthTokens>>(
        API_ENDPOINTS.AUTH.TOKEN_REFRESH,
        { method: 'POST', body: { refreshToken: currentRefreshToken } }
      );
      setTokens(response.data.accessToken, response.data.refreshToken);
      return true;
    } catch (err) {
      clearTokens();
      return false;
    }
  }, [setTokens, clearTokens]);

  const logout = useCallback(async (): Promise<void> => {
    if (isMockEnabled()) {
      clearTokens();
      return;
    }

    try {
      await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'DELETE',
        requireAuth: true,
      });
    } finally {
      clearTokens();
    }
  }, [clearTokens]);

  const loginWithMock = useCallback((): void => {
    setTokens(mockAuthTokens.accessToken, mockAuthTokens.refreshToken);
  }, [setTokens]);

  return {
    isAuthenticated,
    isLoading,
    error,
    getKakaoLoginUrl,
    handleKakaoCallback,
    refreshToken,
    logout,
    loginWithMock,
  };
};
