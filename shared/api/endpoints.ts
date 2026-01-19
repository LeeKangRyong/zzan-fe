export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN_URL: "/users/auth/kakao/login-url",
    KAKAO_CALLBACK: "/users/auth/kakao/callback",
    SOCIAL_LOGIN: "/users/auth/:provider/login",
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
    DETAIL: "/liquors/:liquorId",
    CREATE_REVIEW: "/liquors/:liquorId/reviews",
    GET_MY_REVIEW: "/liquors/:liquorId/reviews/me",
    GET_REVIEWS: "/liquors/:liquorId/reviews",
    UPDATE_REVIEW: "/liquors/:liquorId/reviews",
    DELETE_REVIEW: "/liquors/:liquorId/reviews",
    GET_SCRAPS: "/liquors/scraps",
    CHECK_SCRAP: "/liquors/scraps/:liquorId",
    ADD_SCRAP: "/liquors/scraps/:liquorId",
    DELETE_SCRAP: "/liquors/scraps/:liquorId",
  },
  FEED: {
    CREATE: "/feeds",
    DETAIL: "/feeds/:feedId",
    DELETE: "/feeds/:feedId",
    GET_SCRAPS: "/feeds/scraps",
    CHECK_SCRAP: "/feeds/scraps/:feedId",
    ADD_SCRAP: "/feeds/scraps/:feedId",
    DELETE_SCRAP: "/feeds/scraps/:feedId",
    GET_PLACE_FEEDS: "/feeds/places/:kakaoPlaceId",
  },
  STORAGE: {
    PRESIGNED_URL: "/storage/feed-images/presigned-url",
  },
} as const;
