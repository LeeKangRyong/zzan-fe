export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN_URL: "/users/auth/kakao/login-url",
    KAKAO_CALLBACK: "/users/auth/kakao/callback",
    TOKEN_REFRESH: "/users/auth/token/refresh",
    LOGOUT: "/users/auth/token/refresh",
  },
  USER: {
    ME: "/users/me",
  },
  PLACE: {
    GET_PLACES_IN_REGION: "/places",
    GET_PLACE_BY_ID: "/places/:placeId",
    GET_KAKAO_PLACE: "/places/kakao/:kakaoPlaceId",
  },
  INFRA: {
    SEARCH_PLACES: "/infra/places/search",
  },
} as const;
