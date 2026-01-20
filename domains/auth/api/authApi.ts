import { apiClient } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/types/api';
import type { AuthTokens, KakaoLoginUrl } from '../model/authModel';

export type SocialProvider = 'kakao' | 'google' | 'apple';

export const authApi = {
  async getLoginUrl(provider: SocialProvider = 'kakao'): Promise<string> {
    const endpoint = API_ENDPOINTS.AUTH.LOGIN_URL.replace(':provider', provider);
    const response = await apiClient<ApiResponse<KakaoLoginUrl>>(
      endpoint,
      { method: 'GET' }
    );
    return response.data.url;
  },

  async handleCallback(provider: SocialProvider, code: string): Promise<AuthTokens> {
    const endpoint = API_ENDPOINTS.AUTH.CALLBACK.replace(':provider', provider);
    const response = await apiClient<ApiResponse<AuthTokens>>(
      `${endpoint}?code=${encodeURIComponent(code)}`,
      { method: 'GET' }
    );
    return response.data;
  },

  async loginWithSocialToken(provider: SocialProvider, accessToken: string): Promise<AuthTokens> {
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

  // Deprecated: Use getLoginUrl('kakao') instead
  async getKakaoLoginUrl(): Promise<string> {
    return this.getLoginUrl('kakao');
  },

  // Deprecated: Use handleCallback('kakao', code) instead
  async handleKakaoCallback(code: string): Promise<AuthTokens> {
    return this.handleCallback('kakao', code);
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
