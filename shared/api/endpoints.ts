export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: '/users/auth/kakao',
    KAKAO_CALLBACK: '/users/auth/kakao/callback',
    TOKEN_REFRESH: '/users/auth/token/refresh',
    LOGOUT: '/users/auth/token/refresh',
  },
  USER: {
    ME: '/users/me',
  },
} as const;
