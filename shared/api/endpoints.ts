export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN_URL: '/users/auth/kakao/login-url',
    KAKAO_CALLBACK: '/users/auth/kakao/callback',
    TOKEN_REFRESH: '/users/auth/token/refresh',
    LOGOUT: '/users/auth/token/refresh',
  },
  USER: {
    ME: '/users/me',
  },
} as const;
