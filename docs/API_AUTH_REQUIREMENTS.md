# API 인증 요구사항 정리

## 📋 요약

ZZAN 앱의 백엔드 API는 크게 두 가지로 분류됩니다:
- **인증 필요** (🔐): 사용자가 로그인한 상태에서만 호출 가능
- **인증 불필요** (🌐): 누구나 호출 가능

---

## 🔐 인증이 필요한 API

### 1. 인증 (Auth)
- `DELETE /users/auth/token/refresh` - 로그아웃 (리프레시 토큰 삭제)

### 2. 사용자 (User)
- `GET /users/me` - 내 정보 조회
- `GET /feeds/me` - 내 피드 목록 조회

### 3. 주류 리뷰 (Liquor Review)
- `GET /liquors/{liquorId}/reviews/me` - 내 리뷰 조회
- `POST /liquors/{liquorId}/reviews` - 리뷰 작성
- `PUT /liquors/{liquorId}/reviews` - 리뷰 수정
- `DELETE /liquors/{liquorId}/reviews` - 리뷰 삭제

### 4. 주류 스크랩 (Liquor Scrap)
- `GET /liquors/scraps` - 스크랩 목록 조회
- `GET /liquors/scraps/{liquorId}` - 스크랩 여부 확인
- `POST /liquors/scraps/{liquorId}` - 스크랩 추가
- `DELETE /liquors/scraps/{liquorId}` - 스크랩 삭제

### 5. 피드 (Feed)
- `POST /feeds` - 피드 작성
- `DELETE /feeds/{feedId}` - 피드 삭제

### 6. 피드 스크랩 (Feed Scrap)
- `GET /feeds/scraps` - 스크랩 목록 조회
- `GET /feeds/scraps/{feedId}` - 스크랩 여부 확인
- `POST /feeds/scraps/{feedId}` - 스크랩 추가
- `DELETE /feeds/scraps/{feedId}` - 스크랩 삭제

### 7. 스토리지 (Storage)
- `POST /storage/{prefix}/presigned-url` - Presigned URL 발급

---

## 🌐 인증이 필요 없는 API

### 1. 인증 (Auth)
- `GET /users/auth/{provider}/login-url` - 소셜 로그인 URL 조회
- `GET /users/auth/{provider}/callback` - 소셜 로그인 콜백 처리
- `POST /users/auth/{provider}/login` - 소셜 토큰으로 로그인
- `POST /users/auth/token/refresh` - 토큰 갱신

### 2. 주류 (Liquor)
- `GET /liquors/{liquorId}` - 주류 상세 조회
- `GET /liquors/search` - 주류 검색

### 3. 주류 리뷰 (Liquor Review)
- `GET /liquors/{liquorId}/reviews` - 리뷰 목록 조회

### 4. 피드 (Feed)
- `GET /feeds/{feedId}` - 피드 상세 조회
- `GET /feeds/places/{kakaoPlaceId}` - 장소별 피드 목록 조회
- `GET /feeds/recent` - 최근 피드 목록 조회

### 5. 장소 (Place)
- `GET /places` - 지도 영역 내 장소 목록 조회
- `GET /places/{placeId}` - 장소 상세 조회 (ID)
- `GET /places/kakao/{kakaoPlaceId}` - 장소 상세 조회 (카카오 ID)

### 6. 장소 검색 (Place Search - 외부 API)
- `GET /infra/places/search` - 장소 키워드 검색

### 7. 채팅
- `POST /chat` - 채팅 메시지 전송 (다른 BASE_URL 사용: `EXPO_PUBLIC_CHATBOT_URL`)

---

## 📱 구현 코드 분석

### 코드에서 `requireAuth: true` 사용하는 API

#### authApi.ts
```typescript
// 로그아웃
async logout(): Promise<void> {
  await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
    method: 'DELETE',
    requireAuth: true, // ✅ 인증 필요
  });
}
```

#### userApi.ts
```typescript
// 내 정보 조회
async getCurrentUser(): Promise<UserApiResponse> {
  const response = await apiClient<ApiResponse<UserApiResponse>>(
    API_ENDPOINTS.USER.ME,
    { requireAuth: true } // ✅ 인증 필요
  );
  return response.data;
}

// 내 피드 목록
async getMyFeeds(params: { size?: number; cursor?: string | null }): Promise<UserFeedsResponse> {
  const response = await apiClient<ApiResponse<UserFeedsResponse>>(
    `${API_ENDPOINTS.USER.MY_FEEDS}?${queryParams}`,
    {
      method: 'GET',
      requireAuth: true, // ✅ 인증 필요
    }
  );
  return response.data;
}
```

#### liquorApi.ts
```typescript
// 내 리뷰 조회
async getMyReview(liquorId: string): Promise<LiquorReviewApiResponse | null> {
  const endpoint = API_ENDPOINTS.LIQUOR.GET_MY_REVIEW.replace(':liquorId', liquorId);
  const response = await apiClient<ApiResponse<LiquorReviewApiResponse | null>>(
    endpoint,
    { requireAuth: true } // ✅ 인증 필요
  );
  return response.data;
}

// 리뷰 작성
async createReview(liquorId: string, request: CreateLiquorReviewRequest): Promise<void> {
  const endpoint = API_ENDPOINTS.LIQUOR.CREATE_REVIEW.replace(':liquorId', liquorId);
  await apiClient<ApiResponse<null>>(endpoint, {
    method: 'POST',
    body: request,
    requireAuth: true, // ✅ 인증 필요
  });
}

// 리뷰 수정
async updateReview(liquorId: string, request: UpdateLiquorReviewRequest): Promise<void> {
  const endpoint = API_ENDPOINTS.LIQUOR.UPDATE_REVIEW.replace(':liquorId', liquorId);
  await apiClient<ApiResponse<null>>(endpoint, {
    method: 'PUT',
    body: request,
    requireAuth: true, // ✅ 인증 필요
  });
}

// 리뷰 삭제
async deleteReview(liquorId: string): Promise<void> {
  const endpoint = API_ENDPOINTS.LIQUOR.DELETE_REVIEW.replace(':liquorId', liquorId);
  await apiClient<ApiResponse<null>>(endpoint, {
    method: 'DELETE',
    requireAuth: true, // ✅ 인증 필요
  });
}
```

#### scrapApi.ts
```typescript
// 피드 스크랩 관련
feed: {
  getList: async (size = 20, cursor?: string) => {
    return apiClient<ApiResponse<ScrapListResponse<FeedScrapApiResponse>>>(
      endpoint,
      { requireAuth: true } // ✅ 인증 필요
    );
  },

  check: async (feedId: string) => {
    return apiClient<ApiResponse<ScrapCheckResponse>>(endpoint, {
      requireAuth: true, // ✅ 인증 필요
    });
  },

  add: async (feedId: string) => {
    return apiClient<ApiResponse<null>>(endpoint, {
      method: 'POST',
      requireAuth: true, // ✅ 인증 필요
    });
  },

  delete: async (feedId: string) => {
    return apiClient<ApiResponse<null>>(endpoint, {
      method: 'DELETE',
      requireAuth: true, // ✅ 인증 필요
    });
  },
},

// 주류 스크랩 관련
liquor: {
  getList: async (size = 20, cursor?: string) => {
    return apiClient<ApiResponse<ScrapListResponse<LiquorScrapApiResponse>>>(
      endpoint,
      { requireAuth: true } // ✅ 인증 필요
    );
  },

  check: async (liquorId: string) => {
    return apiClient<ApiResponse<ScrapCheckResponse>>(endpoint, {
      requireAuth: true, // ✅ 인증 필요
    });
  },

  add: async (liquorId: string) => {
    return apiClient<ApiResponse<null>>(endpoint, {
      method: 'POST',
      requireAuth: true, // ✅ 인증 필요
    });
  },

  delete: async (liquorId: string) => {
    return apiClient<ApiResponse<null>>(endpoint, {
      method: 'DELETE',
      requireAuth: true, // ✅ 인증 필요
    });
  },
},
```

#### feedApi.ts
```typescript
// Presigned URL 발급
async getPresignedUrl(
  request: PresignedUrlRequest,
  prefix: 'liquor-images' | 'feed-images' | 'user-profile-images' = 'feed-images'
): Promise<PresignedUrlResponse> {
  const endpoint = API_ENDPOINTS.STORAGE.PRESIGNED_URL.replace(':prefix', prefix);
  const response = await apiClient<ApiResponse<PresignedUrlResponse>>(
    endpoint,
    {
      method: 'POST',
      body: request,
      requireAuth: true, // ✅ 인증 필요
    }
  );
  return response.data;
}

// 피드 작성
async createFeed(request: CreateFeedRequest): Promise<CreateFeedResponse> {
  const response = await apiClient<ApiResponse<CreateFeedResponse>>(
    API_ENDPOINTS.FEED.CREATE,
    {
      method: 'POST',
      body: request,
      requireAuth: true, // ✅ 인증 필요
    }
  );
  return response.data;
}

// 피드 삭제
async deleteFeed(feedId: string): Promise<void> {
  const endpoint = API_ENDPOINTS.FEED.DELETE.replace(':feedId', feedId);
  await apiClient<ApiResponse<null>>(endpoint, {
    method: 'DELETE',
    requireAuth: true, // ✅ 인증 필요
  });
}
```

### 코드에서 `requireAuth: true` 없이 호출하는 API

#### authApi.ts
```typescript
// 로그인 URL 조회, 콜백 처리, 소셜 토큰 로그인, 토큰 갱신
// ❌ requireAuth 없음 - 인증 불필요
```

#### infoApi.ts
```typescript
// 주류 상세, 장소 상세 조회
getLiquorDetail: async (liquorId: string) => {
  return apiClient<ApiResponse<LiquorDetailApiResponse>>(endpoint);
  // ❌ requireAuth 없음 - 인증 불필요
},

getPlaceDetail: async (placeId: string) => {
  return apiClient<ApiResponse<PlaceDetailApiResponse>>(endpoint);
  // ❌ requireAuth 없음 - 인증 불필요
},
```

#### feedApi.ts
```typescript
// 주류 검색
async searchLiquors(params: LiquorSearchParams): Promise<LiquorSearchResponse> {
  const response = await apiClient<ApiResponse<LiquorSearchResponse>>(
    `${API_ENDPOINTS.LIQUOR.SEARCH}?${queryString}`,
    { method: 'GET' } // ❌ requireAuth 없음 - 인증 불필요
  );
  return response.data;
}

// 피드 상세 조회
async getFeedDetail(feedId: string): Promise<FeedDetailApiResponse> {
  const endpoint = API_ENDPOINTS.FEED.DETAIL.replace(':feedId', feedId);
  const response = await apiClient<ApiResponse<FeedDetailApiResponse>>(
    endpoint,
    { method: 'GET' } // ❌ requireAuth 없음 - 인증 불필요
  );
  return response.data;
}

// 장소별 피드, 최근 피드 조회
async getPlaceFeeds(kakaoPlaceId: string, size = 20, cursor?: string): Promise<...> {
  const response = await apiClient<...>(`${endpoint}?${params}`);
  // ❌ requireAuth 없음 - 인증 불필요
  return response.data;
}

async getRecentFeeds(size = 20, cursor?: string): Promise<...> {
  const response = await apiClient<...>(`${API_ENDPOINTS.FEED.RECENT_FEEDS}?${params}`);
  // ❌ requireAuth 없음 - 인증 불필요
  return response.data;
}
```

#### placeApi.ts
```typescript
// 지도 영역 내 장소 조회, 장소 검색
async getPlacesInRegion(params: GetPlacesInRegionParams): Promise<PlaceResponse[]> {
  const response = await apiClient<{ data: PlaceResponse[] }>(
    `${API_ENDPOINTS.PLACE.GET_PLACES_IN_REGION}?${queryString}`,
    { method: 'GET' } // ❌ requireAuth 없음 - 인증 불필요
  );
  return response.data;
}

async searchPlaces(params: SearchPlacesParams): Promise<PlaceSearchResponse[]> {
  const response = await apiClient<...>(
    `${API_ENDPOINTS.INFRA.SEARCH_PLACES}?${queryString}`,
    { method: 'GET' } // ❌ requireAuth 없음 - 인증 불필요
  );
  return response.data.places;
}
```

#### chatApi.ts
```typescript
// 채팅 메시지 전송
async sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const baseUrl = getChatBotBaseUrl();

  const response = await fetch(`${baseUrl}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  // ❌ Authorization 헤더 없음 - 인증 불필요
  // 주의: 이 API는 다른 BASE_URL을 사용합니다 (EXPO_PUBLIC_CHATBOT_URL)

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
```

---

## 🔑 인증 구현 방식

### client.ts에서의 인증 처리

```typescript
const buildAuthHeaders = (): Record<string, string> => {
  ensureAuthTokenGetterInitialized();
  const token = getAuthTokenFn();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` }; // ✅ Bearer 토큰 방식
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, requireAuth = false } = options;

  const authHeaders = requireAuth ? buildAuthHeaders() : {}; // ✅ requireAuth가 true일 때만 헤더 추가

  const allHeaders: Record<string, string> = {
    ...authHeaders,
    ...headers,
  };

  // ... fetch 호출

  if (!response.ok && response.status === 401) {
    // ✅ 401 에러 시 자동으로 토큰 갱신 시도
    const refreshed = await attemptTokenRefresh();

    if (refreshed) {
      return apiClient<T>(endpoint, options); // ✅ 갱신 성공 시 재시도
    }

    throw new ApiClientError(401, 'Authentication failed');
  }

  // ...
};
```

---

## 📝 정리

### 인증 필요 패턴
1. **내 정보 관련**: 내 정보, 내 피드, 내 리뷰, 내 스크랩
2. **작성/수정/삭제**: 피드, 리뷰 작성/수정/삭제
3. **스크랩**: 스크랩 추가/삭제/조회
4. **파일 업로드**: Presigned URL 발급
5. **로그아웃**: 리프레시 토큰 삭제

### 인증 불필요 패턴
1. **조회**: 주류, 장소, 피드 상세 조회
2. **검색**: 주류 검색, 장소 검색
3. **목록**: 리뷰 목록, 장소별 피드 목록, 최근 피드 목록
4. **인증**: 로그인 URL, 로그인, 토큰 갱신
5. **챗봇**: 채팅 메시지 전송 (별도 BASE_URL)

### 주의사항
- 채팅 API는 다른 BASE_URL(`EXPO_PUBLIC_CHATBOT_URL`)을 사용
- 401 에러 발생 시 자동으로 토큰 갱신 시도
- 토큰 갱신 실패 시 로그아웃 처리
