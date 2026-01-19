import { apiClient } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/types/api';
import type { UserFeedsResponse } from '../model/userApiModel';
import type { UserApiResponse } from '../model/userModel';

export const userApi = {
  async getCurrentUser(): Promise<UserApiResponse> {
    const response = await apiClient<ApiResponse<UserApiResponse>>(
      API_ENDPOINTS.USER.ME,
      { requireAuth: true }
    );
    return response.data;
  },

  async getMyFeeds(params: { size?: number; cursor?: string | null }): Promise<UserFeedsResponse> {
    const { size = 10, cursor } = params;
    const queryParams = new URLSearchParams({
      size: size.toString(),
      ...(cursor && { cursor }),
    }).toString();

    const response = await apiClient<ApiResponse<UserFeedsResponse>>(
      `${API_ENDPOINTS.USER.MY_FEEDS}?${queryParams}`,
      {
        method: 'GET',
        requireAuth: true,
      }
    );

    return response.data;
  },
};
