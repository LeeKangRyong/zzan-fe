import { apiClient } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/types/api';
import type { AuthTokens, KakaoLoginUrl } from '../model/authModel';

export const authApi = {
  async getKakaoLoginUrl(): Promise<string> {
    const response = await apiClient<ApiResponse<KakaoLoginUrl>>(
      API_ENDPOINTS.AUTH.KAKAO_LOGIN_URL,
      { method: 'GET' }
    );
    return response.data.url;
  },

  async handleKakaoCallback(code: string): Promise<AuthTokens> {
    const response = await apiClient<ApiResponse<AuthTokens>>(
      `${API_ENDPOINTS.AUTH.KAKAO_CALLBACK}?code=${encodeURIComponent(code)}`,
      { method: 'GET' }
    );
    return response.data;
  },

  async loginWithSocialToken(provider: string, accessToken: string): Promise<AuthTokens> {
    const endpoint = API_ENDPOINTS.AUTH.SOCIAL_LOGIN.replace(':provider', provider);
    const response = await apiClient<ApiResponse<AuthTokens>>(
      endpoint,
      {
        method: 'POST',
        body: { accessToken },
      }
    );
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient<ApiResponse<AuthTokens>>(
      API_ENDPOINTS.AUTH.TOKEN_REFRESH,
      {
        method: 'POST',
        body: { refreshToken },
      }
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient(
      API_ENDPOINTS.AUTH.LOGOUT,
      {
        method: 'DELETE',
        requireAuth: true,
      }
    );
  },
};
