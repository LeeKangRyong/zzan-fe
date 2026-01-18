export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN_URL: "/users/auth/kakao/login-url",
    KAKAO_CALLBACK: "/users/auth/kakao/callback",
    TOKEN_REFRESH: "/users/auth/token/refresh",
    LOGOUT: "/users/auth/token/refresh",
  },
  USER: {
    ME: "/users/me",
    MY_FEEDS: "/users/me/feeds",
  },
  PLACE: {
    GET_PLACES_IN_REGION: "/places",
    GET_PLACE_BY_ID: "/places/:placeId",
    GET_KAKAO_PLACE: "/places/kakao/:kakaoPlaceId",
  },
  INFRA: {
    SEARCH_PLACES: "/infra/places/search",
  },
  LIQUOR: {
    SEARCH: "/liquors/search",
    CREATE_REVIEW: "/liquors/:liquorId/reviews",
  },
  FEED: {
    CREATE: "/feeds",
    DETAIL: "/feeds/:feedId",
  },
  STORAGE: {
    PRESIGNED_URL: "/storage/feed-images/presigned-url",
  },
} as const;
