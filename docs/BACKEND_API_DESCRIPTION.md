# ZZAN API 명세서

> Base URL: https://zzan.app/api  
> API Version: v1  
> Last Updated: 2026-01-17

<br>

## 공통 사항

### 응답 형식

모든 API 응답은 다음 형식을 따릅니다:

```json
{
    "success": true,
    "timestamp": 1705471200000,
    "message": null,
    "data": {
        ...
    }
}
```

<br>

| 필드        | 타입    | 설명                       |
| ----------- | ------- | -------------------------- |
| `success`   | boolean | 요청 성공 여부             |
| `timestamp` | number  | 응답 시간 (Unix timestamp) |
| `message`   | string? | 에러 메세지 (실패 시)      |
| `data`      | any?    | 응답 데이터                |

<br>

### 인증 헤더

```
Authorization: Bearer {accessToken}
```

<br>

### 커서 기반 페이지네이션

#### 요청 파라미터

| 파라미터 | 타입   | 필수 | 기본값 | 설명               |
| -------- | ------ | ---- | ------ | ------------------ |
| `size`   | int    | X    | 10     | 페이지 크기 (1~20) |
| `cursor` | string | X    | null   | 다음 페이지 커서   |

<br>

#### 사용 방법

1. 첫 번째 페이지: `cursor` 생략 또는 `null`

```
GET /liquors/{liquorId}/reviews?size=10
```

2.다음 페이지: 이전 응답의 `nextCursor` 값 사용

```
GET /liquors/{liquorId}/reviews?size=10&cursor=01HQXYZ123456789ABCDEF
```

3. 마지막 페이지: `hasNext: false`이면 더 이상 데이터 없음

<br>

#### 응답 형식

```json
{
    "items": [
        ...
    ],
    "nextCursor": "01HQXYZ123456789ABCDEF",
    "hasNext": true
}
```

<br>

| 필드         | 타입    | 설명                           |
| ------------ | ------- | ------------------------------ |
| `items`      | array   | 데이터 목록                    |
| `nextCursor` | string? | 다음 페이지 커서 (없으면 null) |
| `hasNext`    | boolean | 다음 페이지 존재 여부          |

<br>

### 공통 에러 응답

```json
{
  "success": false,
  "timestamp": 1705471200000,
  "message": "에러 메시지",
  "data": null
}
```

<br>

| HTTP 상태 | 에러 유형             | 설명                     |
| --------- | --------------------- | ------------------------ |
| 400       | Bad Request           | 잘못된 요청 파라미터     |
| 401       | Unauthorized          | 인증 필요 또는 토큰 만료 |
| 403       | Forbidden             | 권한 없음                |
| 404       | Not Found             | 리소스를 찾을 수 없음    |
| 500       | Internal Server Error | 서버 내부 오류           |

<br>

## 1. 인증 (Auth)

### 1.1 소셜 로그인 URL 조회

소셜 로그인 페이지 URL을 가져옵니다.

```
GET /users/auth/{provider}/login-url
```

#### Path Paramteres

| 파라미터   | 타입   | 필수 | 설명                                     |
| ---------- | ------ | ---- | ---------------------------------------- |
| `provider` | string | O    | 소셜 제공자 (`kakao`, `google`, `apple`) |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "url": "https://kauth.kakao.com/oauth/authorize?client_id=..."
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건                   | 메세지                                       |
| ---- | ---------------------- | -------------------------------------------- |
| 400  | 지원하지 않는 provider | "지원하지 않는 소셜 제공자입니다: {provider} |

---

### 1.2 소셜 로그인 콜백 처리

소셜 로그인 후 리다이렉트되는 콜백을 처리합니다.

```
GET /users/auth/{provider}/callback?code={code}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명        |
| ---------- | ------ | ---- | ----------- |
| `provider` | string | O    | 소셜 제공자 |

<br>

#### Query Parameters

| 파라미터 | 타입   | 필수 | 설명           |
| -------- | ------ | ---- | -------------- |
| `code`   | string | O    | 소셜 인가 코드 |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건                   | 메시지                                        |
| ---- | ---------------------- | --------------------------------------------- |
| 400  | 지원하지 않는 provider | "지원하지 않는 소셜 제공자입니다: {provider}" |
| 401  | 유효하지 않은 code     | "인가 코드가 유효하지 않습니다"               |

<br>

---

### 1.3 소셜 토큰으로 로그인

클라이언트에서 직접 받은 소셜 액세스 토큰으로 로그읺바니다.

```
POST /users/auth/{provider}/login
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명        |
| ---------- | ------ | ---- | ----------- |
| `provider` | string | O    | 소셜 제공자 |

<br>

#### Request Body

```json
{
  "accessToken": "소셜_액세스_토큰"
}
```

| 필드          | 타입   | 필수 | 설명                                 |
| ------------- | ------ | ---- | ------------------------------------ |
| `accessToken` | string | O    | 소셜 제공자에서 발급받은 액세스 토큰 |

<br>

#### Responst (200 OK)

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건                    | 메시지                                      |
| ---- | ----------------------- | ------------------------------------------- |
| 400  | accessToken 누락        | 액세스 토큰은 비어 있을 수 없습니다.        |
| 400  | 지원하지 않는 provider  | 지원하지 않는 소셜 제공자입니다: {provider} |
| 401  | 유효하지 않은 소셜 토큰 | 소셜 액세스 토큰이 유효하지 않습니다        |

<br>

---

### 1.4 토큰 갱신

리프레시 토큰으로 새 액세스 토큰을 발급받습니다.

```
POST /users/auth/token/refresh
```

<br>

#### Request Body

```
(plain text) refreshToken값
```

<br>

#### Responst (200 Ok)

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건                 | 메시지                             |
| ---- | -------------------- | ---------------------------------- |
| 401  | 만료된 리프레시 토큰 | 리프레시 토큰이 유효하지 않습니다. |
| 401  | 잘못된 토큰 형식     | 리프레시 토큰이 유효하지 않습니다. |

<br>

---

### 1.5 로그아웃 (리프레시 토큰 삭제)

```
DELETE /users/auth/token/refresh
```

<br>

#### Headers

```
Authorization: Bearer {accessToken}
```

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

---

## 2. 사용자 (User)

### 2.1 내 정보 조회

🔐 인증 필요

```
GET /users/me
```

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "profileImageUrl": "https://cdn.zzan.com/user-profile-images/...",
    "name": "홍길동",
    "role": "USER",
    "birth": "1990-01-15",
    "email": "user@example.com",
    "phone": "010-1234-5678"
  }
}
```

| 필드              | 타입    | 설명                              |
| ----------------- | ------- | --------------------------------- |
| `id`              | string  | 사용자 ID (ULID)                  |
| `profileImageUrl` | string? | 프로필 이미지 URL                 |
| `name`            | string? | 이름                              |
| `role`            | string  | 역할 (`USER`, `PREMIUM`, `ADMIN`) |
| `birth`           | string? | 생년월일 (YYYY-MM-DD)             |
| `email`           | string? | 이메일                            |
| `phone`           | string? | 전화번호                          |

<br>

#### 실패 케이스

| 상태 | 조건           | 메시지    |
| ---- | -------------- | --------- |
| 401  | 토큰 없음/만료 | 인증 필요 |

<br>

### 2.2 내 정보 수정

````
PUT /users/me
---

<br>

#### Request Body
```json
{
  "name": "홍길동",
  "profileImageUrl": "user-profile/profile.jpg",
  "birth": "1995-03-15",
  "email": "hong@example.com",
  "phone": "01012345678"
}
````

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "timestamp": 1768893040143,
  "message": null,
  "data": {}
}
```

<br>

## 3. 주류 (Liquor)

### 3.1 주류 상세 조회

```
GET /liquors/{liquorId}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "name": "느린마을 막걸리",
    "type": "탁주",
    "imageUrl": "https://cdn.zzan.com/liquor-images/...",
    "score": 4.5,
    "description": "[{\"header\": \"양조장\", \"content\": \"밀양클래식술도가에서 만들었어요.\"}, {\"header\": \"맛\", \"content\": \"탄산감, 깔끔함이 느껴져요.\"}]",
    "foodPairing": "파전, 김치전, 보쌈",
    "volume": "750ml",
    "content": "6%",
    "awards": "2023 대한민국 주류품평회 대상",
    "etc": "무감미료, 생막걸리",
    "brewery": "배상면주가"
  }
}
```

| 필드         | 타입    | 설명                         |
| ------------ | ------- | ---------------------------- |
| `id`         | string  | 주류 ID                      |
| `name`       | string  | 주류 이름                    |
| `type`       | string? | 종류 (탁주, 약주, 증류주 등) |
| `imageUrl`   | string? | 이미지 URL                   |
| `score`      | number? | 평균 평점 (0.0 ~ 5.0)        |
| `header`     | string? | 기본 정보 제목               |
| `content`    | string? | header에 대한 내용           |
| `foodParing` | string? | 어울리는 음식                |
| `volume`     | string? | 용량                         |
| `content`    | string? | 도수                         |
| `awards`     | string? | 수상 내역                    |
| `etc`        | string? | 기타 정보                    |
| `brewery`    | string? | 양조장                       |

<br>

#### 실패 케이스

| 상태 | 조건               | 메시지                      |
| ---- | ------------------ | --------------------------- |
| 404  | 존재하지 않는 주류 | 존재하지 않는 아이템입니다. |

<br>

---

### 3.2 주류 검색

```
GET /liquors/search?keyword={keyword}&page={page}&size={size}
```

<br>

#### Query Paramters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| `keyword` | string | O | - | 검색 키워드
| `page` | int | X | 1 | 페이지 번호 (1부터 시작)
| `size` | int | X | 10 | 페이지 크기

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "01HQ1234567890ABCDEF",
        "liquorName": "느린마을 막걸리",
        "liquorScore": 4.5,
        "liquorImageUrl": "https://cdn.zzan.com/liquor-images/...",
        "liquorType": "탁주"
      }
    ],
    "nextCursor": null,
    "hasNext": false
  }
}
```

- **첫 페이지**: `page` 생략 또는 1
- **응답의 `nextCursor`**: **다음 페이지 번호**
  - `"nextCursor": "2"`

- **다음 페이지**: `nextCursor` 값을 `page`에 넣어서 요청
  - `GET /....&page=2&size=10`

- **마지막 페이지**: `hasNext: false`, `nextCursor: null`

<br>

---

## 4. 주류 리뷰 (Liquor Review)

### 4.1 내 리뷰 조회

🔐 **인증 필요**

해당 주류에 대한 내 리뷰를 조회합니다.

```
GET /liquors/{liquorId}/reviews/me
```

<br>

#### Query Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK) - 리뷰 있음

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "userId": "01HQUSER123456789ABC",
    "username": "홍길동",
    "userProfileImage": "https://cdn.zzan.com/...",
    "liquorId": "01HQLIQUOR1234567890",
    "liquorName": "느린마을 막걸리",
    "score": 4.5,
    "text": "부드럽고 맛있어요!",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

<br>

#### Response (200 OK) - 리뷰 없음

```json
{
  "success": true,
  "data": null
}
```

<br>

### 4.2 리뷰 목록 조호

```
GET /liquors/{liquorId}/reviews?size={size}&cursor={cursor}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Query Paramters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "01HQ1234567890ABCDEF",
        "userId": "01HQUSER123456789ABC",
        "username": "홍길동",
        "userProfileImage": "https://cdn.zzan.com/...",
        "liquorId": "01HQLIQUOR1234567890",
        "liquorName": "느린마을 막걸리",
        "score": 4.5,
        "text": "부드럽고 맛있어요!",
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "nextCursor": "01HQ0987654321FEDCBA",
    "hasNext": true
  }
}
```

<br>

### 4.3 리뷰 작성

🔐 인증 필요

```
POST /liquors/{liquorId}/reviews
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Request Body

```json
{
  "score": 4.5,
  "text": "부드럽고 맛있어요!"
}
```

| 필드 | 타입 | 필수 | 설명 |
| `score` | number | O | 평점 (0.0 ~ 5.0)
| `text` | string | X | 리뷰 내용

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

#### 실패 케이스

| 상태 | 조건               | 메시지                                  |
| ---- | ------------------ | --------------------------------------- |
| 400  | score 누락         | 점수는 필수로 입력해야 합니다.          |
| 400  | score 범위 초과    | 점수는 0.0~5.0 사이여야 합니다: {value} |
| 401  | 인증 필요          | 인증 필요                               |
| 404  | 존재하지 않는 주류 | 존재하지 않는 아이템입니다.             |

<br>

### 4.4 리뷰 수정

🔐 인증 필요

```
PUT /liquors/{liquorId}/reviews
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Request Body

```json
{
  "score": 5.0,
  "text": "다시 먹어보니 더 맛있네요!"
}
```

| 필드   | 타입   | 필수 | 설명      |
| ------ | ------ | ---- | --------- |
| `text` | string | X    | 리뷰 내용 |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

#### 실패 케이스

| 상태 | 조건            | 메시지                                  |
| ---- | --------------- | --------------------------------------- |
| 400  | score 누락      | 점수는 필수로 입력해야 합니다.          |
| 400  | score 범위 초과 | 점수는 0.0~5.0 사이여야 합니다: {value} |
| 401  | 인증 필요       | 인증 필요                               |
| 404  | 리뷰 없음       | 리뷰가 존재하지 않습니다.               |

<br>

### 4.5 리뷰 삭제

🔐 인증 필요

```
DELETE /liquors/{liquorId}/reviews
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

| 상태 | 조건      | 메시지                    |
| ---- | --------- | ------------------------- |
| 401  | 인증 필요 | 인증 필요                 |
| 404  | 리뷰 없음 | 리뷰가 존재하지 않습니다. |

<br>

---

## 5, 주류 스크랩 (Liquor Scrap)

### 5.1 스크랩 목록 조회

🔐 인증 필요

```
GET /liquors/scraps?size={size}&cursor={cursor}
```

<br>

#### Query Parameters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "01HQ1234567890ABCDEF",
        "liquorName": "느린마을 막걸리",
        "liquorScore": 4.5,
        "liquorImageUrl": "https://cdn.zzan.com/liquor-images/...",
        "liquorType": "탁주"
      }
    ],
    "nextCursor": "01HQ0987654321FEDCBA",
    "hasNext": true
  }
}
```

<br>

### 5.2 스크랩 여부 확인

🔐 인증 필요

```
GET /liquors/scraps/{liquorId}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "exist": true
  }
}
```

<br>

### 5.3 스크랩 추가

🔐 인증 필요

```
POST /liquors/scraps/{liquorId}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

### 5.4 스크랩 삭제

🔐 인증 필요

```
DELETE /liquors/scraps/{liquorId}
```

<br>

#### Path Parameters

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `liquorId` | string | O    | 주류 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

---

## 6. 피드 (Feed)

### 6.1 피드 상세 조회

```
GET /feeds/{feedId}
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명    |
| -------- | ------ | ---- | ------- |
| `feedId` | string | O    | 피드 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "userId": "01HQUSER123456789ABC",
    "userName": "홍길동",
    "userProfileImage": "https://cdn.zzan.com/...",
    "imageUrl": "https://cdn.zzan.com/feed-images/...",
    "images": [
      {
        "id": "01HQIMG123456789ABCD",
        "imageUrl": "https://cdn.zzan.com/feed-images/...",
        "tags": [
          {
            "id": "01HQTAG123456789ABCD",
            "liquorId": "01HQLIQUOR1234567890",
            "liquorName": "느린마을 막걸리",
            "x": 0.35,
            "y": 0.48
          }
        ]
      }
    ],
    "score": 4.5,
    "liquorCount": 2,
    "text": "오늘 회식에서 마신 막걸리! 정말 맛있었어요 🍶",
    "kakaoPlaceId": "12345678",
    "placeName": "전통주 갤러리",
    "placeAddress": "서울시 종로구 인사동길 12",
    "createdAt": "2025-01-15T19:30:00Z"
  }
}
```

| 필드                | 타입   | 설명                                    |
| ------------------- | ------ | --------------------------------------- |
| `images[].tags[].x` | number | 태그 X 좌표 (0.0~1.0, 이미지 너비 비율) |
| `images[].tags[].y` | number | 태그 Y 좌표 (0.0~1.0, 이미지 높이 비율) |

<br>

#### 실패 케이스

| 상태 | 조건               | 메시지                   |
| ---- | ------------------ | ------------------------ |
| 404  | 존재하지 않는 피드 | 피드를 찾을 수 없습니다. |

<br>

### 6.2 장소별 피드 목록 조회

```
GET /feeds/places/{kakaoPlaceId}?size={size}&cursor={cursor}
```

<br>

#### Path Parameters

| 파라미터       | 타입   | 필수 | 설명           |
| -------------- | ------ | ---- | -------------- |
| `kakaoPlaceId` | string | O    | 카카오 장소 ID |

<br>

#### Query Parameters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "01HQ1234567890ABCDEF",
        "imageUrl": "https://cdn.zzan.com/feed-images/...",
        "userName": "홍길동",
        "userProfileImage": "~~",
        "score": 4.5,
        "liquorCount": 2,
        "kakaoPlaceId": "12345678",
        "placeName": "전통주 갤러리",
        "placeAddress": "서울시 종로구 인사동길 12"
      }
    ],
    "nextCursor": "01HQ0987654321FEDCBA",
    "hasNext": true
  }
}
```

<br>

### 6.3 피드 작성

🔐 인증 필요

> ⚠️ 선행 작업: 이미지 업로드가 필요합니다.
>
> 1.  10.1 Presigned URL 발급으로 업로드 URL 획득
> 2.  해당 URL로 이미지 직접 업로드
> 3.  반환받은 key를 imageUrl로 사용

```
POST /feeds
```

<br>

#### Request Body

```json
{
  "score": 4.5,
  "text": "오늘 회식에서 마신 막걸리! 정말 맛있었어요 🍶",
  "images": [
    {
      "imageUrl": "feed-images/abc123.jpg",
      "tags": [
        {
          "liquorId": "01HQLIQUOR1234567890",
          "liquorName": "느린마을 막걸리",
          "x": 0.35,
          "y": 0.48
        }
      ]
    }
  ],
  "kakaoPlaceId": "12345678",
  "placeName": "전통주 갤러리",
  "placePhone": "02-1234-5678",
  "placeAddress": "서울시 종로구 인사동길 12",
  "longitude": 126.985302,
  "latitude": 37.571625
}
```

| 필드                         | 타입   | 필수 | 설명                      |
| ---------------------------- | ------ | ---- | ------------------------- |
| `score`                      | number | X    | 평점 (0.0~5.0)            |
| `text`                       | string | O    | 피드 내용                 |
| `images`                     | array  | O    | 이미지 목록               |
| `images[].imageUrl`          | string | O    | 이미지 경로 (Storage key) |
| `images[].tags`              | array  | O    | 이미지 내 주류 태그 목록  |
| `images[].tags[].liquorId`   | string | O    | 주류 ID                   |
| `images[].tags[].liquorName` | string | O    | 주류 이름                 |
| `images[].tags[].x`          | number | O    | X 좌표 (0.0~1.0)          |
| `images[].tags[].y`          | number | O    | Y 좦 (0.0~1.0)            |
| `kakaoPlaceId`               | string | X    | 카카오 장소 ID            |
| `placeName`                  | string | X    | 장소 이름                 |
| `placePhone`                 | string | X    | 장소 전화번호             |
| `placeAddress`               | string | X    | 장소 주소                 |
| `longitude`                  | number | X    | 경도                      |
| `latitude`                   | number | X    | 위도                      |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF"
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건                | 메시지                                       |
| ---- | ------------------- | -------------------------------------------- |
| 400  | score 누락          | 점수는 필수로 입력해야 합니다.               |
| 400  | score 범위 초과     | 점수는 0.0~5.0 사이여야 합니다: {value}      |
| 400  | imageUrl 누락       | 이미지 URL이 존재하지 않습니다               |
| 400  | x, y 좌표 범위 추가 | 상대 좌표는 0.0~1.0 사이여야 합니다: {value} |
| 401  | 인증 필요           | 인증 필요                                    |

<br>

### 6.4 피드 삭제

🔐 인증 필요

```
DELETE /feeds/{feedId}
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명    |
| -------- | ------ | ---- | ------- |
| `feedId` | string | O    | 피드 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

#### 실패 케이스

| 상태 | 조건               | 메시지                   |
| ---- | ------------------ | ------------------------ |
| 401  | 인증 필요          | 인증 필요                |
| 403  | 다른 사용자의 피드 | 삭제 권한이 없습니다.    |
| 404  | 존재하지 않는 피드 | 피드를 찾을 수 없습니다. |

<br>

### 6.5 내 피드 목록 조회

🔐 인증 필요

```
GET /feeds/me?size={size}&cursor={cursor}
```

<br>

#### Query Paramters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "timestamp": 1768844593573,
  "message": null,
  "data": {
    "items": [
      {
        "id": "01KFB6VH01N7KQVXCX4PTQQHH7",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      },
      {
        "id": "01KF52S2E204CZMPZFNHYWJP9N",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      },
      {
        "id": "01KF4ZTVJWZRQAPNCG72ZJRSGC",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      }
    ],
    "nextCursor": null,
    "hasNext": false
  }
}
```

<br>

### 6.6 최근 피드 목록 조회

```
GET /feeds/recent&cursor={cursor}
```

<br>

#### Query Parameters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "timestamp": 1768844443552,
  "message": null,
  "data": {
    "items": [
      {
        "id": "01KFB6VH01N7KQVXCX4PTQQHH7",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      },
      {
        "id": "01KF52S2E204CZMPZFNHYWJP9N",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      },
      {
        "id": "01KF4ZTVJWZRQAPNCG72ZJRSGC",
        "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
        "score": 1,
        "liquorCount": 4,
        "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
        "userName": "도선빈",
        "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "kakaoPlaceId": "string",
        "placeName": "string",
        "placeAddress": "string"
      }
    ],
    "nextCursor": null,
    "hasNext": false
  }
}
```

<br>

### 6.7 전통주 아이디로 피드 목록 조회

🔐 인증 필요

```
GET /feeds/liquors/{liquorId}?size=10
```

<br>

#### Query Parameters

size

<br>

#### Response (200 OK)

```json
{
    "success": true,
    "timestamp": 1768940235979,
    "message": null,
    "data": {
        "items": [
            {
                "id": "01KFEGV75SASWFMXMD3SRMX8AN",
                "imageUrl": "https://zzan-liquor-bucket.s3.amazonaws.com/string",
                "score": 1,
                "liquorCount": 4,
                "userId": "01KF4ZCJVW9BN5P3RDKND2N87Y",
                "userName": "도선빈",
                "userProfileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
                "kakaoPlaceId": "string",
                "placeName": "string",
                "placeAddress": "string"
            }
        ],
        "nextCursor": null,
        "hasNext": false
    }
}

<br>

---

## 7. 피드 스크랩 (Feed Scrap)

### 7.1 스크랩 목록 조회

🔐 인증 필요

```

GET /feeds/scraps?size={size}&cursor={cursor}

````

<br>

#### Query Parameters

**커서 기반 페이지네이션** 참조

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "01HQ1234567890ABCDEF",
        "imageUrl": "https://cdn.zzan.com/feed-images/...",
        "userId": "asd",
        "userName": "홍길동",
        "userProfileImage": "~~",
        "score": 4.5,
        "liquorCount": 2,
        "kakaoPlaceId": "12345678",
        "placeName": "전통주 갤러리",
        "placeAddress": "서울시 종로구 인사동길 12"
      }
    ],
    "nextCursor": "01HQ0987654321FEDCBA",
    "hasNext": true
  }
}
````

<br>

### 7.2 스크랩 여부 확인

🔐 인증 필요

```
GET /feeds/scraps/{feedId}
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명    |
| -------- | ------ | ---- | ------- |
| `feedId` | string | O    | 피드 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "exist": true
  }
}
```

<br>

### 7.3 스크랩 추가

🔐 인증 필요

```
POST /feeds/scraps/{feedId}
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명    |
| -------- | ------ | ---- | ------- |
| `feedId` | string | O    | 피드 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

### 7.4 스크랩 삭제

🔐 인증 필요

```
DELETE /feeds/scraps/{feedId}
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명    |
| -------- | ------ | ---- | ------- |
| `feedId` | string | O    | 피드 ID |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": null
}
```

<br>

---

## 8. 장소 (Place)

### 8.1 지도 영역 내 장소 목록 조회

```
GET /places?minLongitude={}&maxLongitude={}&minLatitude={}&maxLatitude={}
```

<br>

#### Query Parameters

| 파라미터       | 타입   | 필수 | 설명      |
| -------------- | ------ | ---- | --------- |
| `minLongitude` | number | O    | 최소 경도 |
| `maxLongitude` | number | O    | 최대 경도 |
| `minLatitude`  | number | O    | 최소 위도 |
| `maxLatitude`  | number | O    | 최대 위도 |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "01HQ1234567890ABCDEF",
      "name": "전통주 갤러리",
      "feedCount": 42,
      "score": 4.3,
      "address": "서울시 종로구 인사동길 12",
      "phone": "02-1234-5678",
      "longitude": 126.985302,
      "latitude": 37.571625
    }
  ]
}
```

<br>

#### 실패 케이스

| 상태 | 조건 | 메시지 |
| 400 | 경도 범위 초과 | 경도는 -180도에서 180도 사이의 값이어야 합니다: {value} |
| 400 | 위도 범위 초과 | 위도는 -90도에서 90도 사이여야 합니다: {value} |

<br>

### 8.2 장소 상세 조회 (ID)

```
GET /places/{placeId}
```

<br>

#### Path Paramters

| 파라미터  | 타입   | 필수 | 설명                   |
| --------- | ------ | ---- | ---------------------- |
| `placeId` | string | O    | 장소 ID (ZZAN 내부 ID) |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "name": "전통주 갤러리",
    "averageScore": 4.3,
    "feedCount": 42,
    "kakaoPlaceId": "12345678",
    "address": "서울시 종로구 인사동길 12",
    "phone": "02-1234-5678",
    "longitude": 126.985302,
    "latitude": 37.571625
  }
}
```

<br>

#### 실패 케이스

| 상태 | 조건 | 메시지 |
| 404 | 존재하지 않는 장소 | 존재하지 않는 장소입니다. |

<br>

### 8.3 장소 상세 조회 (카카오 ID)

```
GET /places/kakao/{kakaoPlaceId}
```

<br>

#### Path Paramters

| 파라미터       | 타입   | 필수 | 설명           |
| -------------- | ------ | ---- | -------------- |
| `kakaoPlaceId` | string | O    | 카카오 장소 ID |

<br>

#### Response (200 OK) - 장소 있음

```json
{
  "success": true,
  "data": {
    "id": "01HQ1234567890ABCDEF",
    "name": "전통주 갤러리",
    "averageScore": 4.3,
    "feedCount": 42,
    "kakaoPlaceId": "12345678",
    "address": "서울시 종로구 인사동길 12",
    "phone": "02-1234-5678",
    "longitude": 126.985302,
    "latitude": 37.571625
  }
}
```

<br>

#### Response (200 OK) - 장소 없음

```json
{
  "success": true,
  "data": null
}
```

<br>

---

## 9. 장소 검색 (Place Search - 외부 API)

### 9.1 장소 키워드 검색

카카오 지도 API를 통해 장소를 검색합니다.

```
GET /infra/places/search?keyword={keyword}&page={page}&size={size}
```

<br>

#### Query Parameters

| 파라미터  | 타입   | 필수 | 기본값 | 설명        |
| --------- | ------ | ---- | ------ | ----------- |
| `keyword` | string | O    | -      | 검색 키워드 |
| `page`    | int    | X    | 1      | 페이지 번호 |
| `size`    | int    | X    | 10     | 페이지 크기 |

<br>

#### Response (200 OK)

```json
{
  "success": true,
  "timestamp": 1768963124552,
  "message": null,
  "data": {
    "items": [
      {
        "id": "884654846",
        "placeName": "옵티멈존PC카페 오즈리저브 강남역점",
        "categoryName": "가정,생활 > 여가시설 > 게임방,PC방 > 옵티멈존PC카페",
        "phone": "0507-1329-1467",
        "addressName": "서울 강남구 역삼동 819",
        "roadAddressName": "서울 강남구 강남대로94길 10",
        "longitude": 127.028226866339,
        "latitude": 37.4991954216359
      },
      {
        "id": "21161042",
        "placeName": "강남구청역 7호선",
        "categoryName": "교통,수송 > 지하철,전철 > 수도권7호선",
        "phone": "02-6311-7301",
        "addressName": "서울 강남구 삼성동 111-44",
        "roadAddressName": "서울 강남구 학동로 지하 346",
        "longitude": 127.0413109462156,
        "latitude": 37.51721617197854
      },
      {
        "id": "12639300",
        "placeName": "강남역아이파크1차오피스텔",
        "categoryName": "부동산 > 주거시설 > 오피스텔",
        "phone": "02-6247-8010",
        "addressName": "서울 서초구 서초동 1303-16",
        "roadAddressName": "서울 서초구 서초대로77길 62",
        "longitude": 127.02391028474402,
        "latitude": 37.502750842674814
      },
      {
        "id": "7987280",
        "placeName": "신한은행 강남역금융센터",
        "categoryName": "금융,보험 > 금융서비스 > 은행 > 신한은행",
        "phone": "",
        "addressName": "서울 서초구 서초동 1321",
        "roadAddressName": "서울 서초구 서초대로 396",
        "longitude": 127.02476662249526,
        "latitude": 37.49656255595339
      }
    ],
    "nextCursor": null,
    "hasNext": false
  }
}
```

- **첫 페이지**: `page` 생략 또는 1

- **응답의 `nextCursor`**: **다음 페이지 번호**
  - `"nextCursor": "2"`

- **다음 페이지**: `nextCursor` 값을 `page`에 넣어서 요청
  - `GET /....&page=2&size=10`

- **마지막 페이지**: `hasNext: false`, `nextCursor: null`

<br>

---

## 10. 스토리지 (Storage)

### 10.1 Presigned URL 발급

🔐 **인증 필요**

S3 직접 업로드를 위한 Presigned URL을 발급받습니다.

```
POST /storage/{prefix}/presigned-url
```

<br>

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명                                                                |
| -------- | ------ | ---- | ------------------------------------------------------------------- |
| `prefix` | string | O    | 이미지 종류 (`liquor-images`, `feed-images`, `user-profile-images`) |

<br>

#### Request Body

```json
{
  "fileName": "photo.jpg"
}
```

| 필드       | 타입   | 필수 | 설명                          |
| ---------- | ------ | ---- | ----------------------------- |
| `fileName` | string | O    | 업로드할 파일명 (확장자 포함) |

<br>

#### Resonse (200 OK)

```json
{
  "success": true,
  "data": {
    "url": "https://s3.ap-northeast-2.amazonaws.com/bucket/feed-images/abc123.jpg?X-Amz-...",
    "key": "feed-images/abc123.jpg"
  }
}
```

| 필드  | 타입   | 설명                                                |
| ----- | ------ | --------------------------------------------------- |
| `url` | string | 이미지 업로드용 Presigned URL (PUT 요청으로 업로드) |
| `key` | string | 업로드 후 사용할 이미지 경로 (피드 생성 시 사용)    |

<br>

#### 실패 케이스

| 상태 | 조건          | 메시지                            |
| ---- | ------------- | --------------------------------- |
| 400  | 잘못된 prefix | 알 수 없는 image prefix: {prefix} |
| 401  | 인증 필요     | 인증 필요                         |

<br>

#### 이미지 업로드 방법

```bash
# Presigned URL로 직접 PUT 요청
curl -X PUT \
  -H "Content-Type: image/jpeg" \
  --data-binary @photo.jpg \
  "{presigned_url}"
```

<br>

---

## 11. 채팅

```
POST /chat
```

BASE_URL은 `EXPO_PUBLIC_CHATBOT_URL` 사용!

<br>

#### Request Body

```
{
    "query": "제주 감귤주에 대해 더 알고 싶어요",
    "history": [
        {
            "role": "user",
            "content": "냠냠붕어"
        },
        {
            "role": "assistant",
            "content": "냠냠붕어는 전통주가 아니라 일반적인 음식 이름으로 보입니다. 어떤 전통주를 찾고 계신지에 대한 정보가 필요합니다. 전통주에 대한 질문이시라면 더 다양한 정보를 제공해 드릴 수 있습니다. 예를 들어, 어떤 종류의 전통주를 선호하시나요?"
        },
        {
            "role": "user",
            "content": "궁금한 전통주 종류가 있을까요"
        },
        {
            "role": "assistant",
            "content": "전통주에는 다양한 종류가 있습니다. 예를 들어, 제주 감귤주와 같은 증류주는 제주산 감귤을 활용하여 만든 술로, 50도의 높은 도수를 자랑합니다. 또한, 진도홍주와 같은 리큐르는 홍국으로 제조되어 독특한 향과 맛이 특징입니다. 이 외에도 자주와 귀감 같은 약주와 증류주도 있습니다. 이처럼 각 전통주는 고유의 재료와 제조 방식으로 차별화된 맛을 가지고 있습니다. 이 외에 어떤 전통주에 대해 더 알고 싶으신가요?"
        }
    ]
}
```

history는 그냥 [] 빈 배열도 가능!

<br>

#### Response (200 OK)

```
{
    "answer": "제주 감귤주는 제주도에서 재배된 감귤을 원료로 만든 전통주입니다. 대표적으로 제주 감귤주는 50도의 높은 도수를 자랑하는 증류주로, 감귤의 상큼함과 풍미를 잘 담고 있습니다. 또한, 저온 발효 후 참나무통에 숙성하여 깊은 맛을 더한 곳이 특징입니다. 이런 제주 감귤주는 활어회, 치즈, 육회와 잘 어울리며, 그 자체로도 즐기기 좋습니다. 더불어, 제주 감귤주와 함께 조금 더 부드러운 맛을 원하신다면, 혼디주를 추천드립니다. 혼디주는 감귤의 단맛과 신맛이 조화를 이루며, 누룩을 사용하지 않아 산뜻한 과실향을 느낄 수 있는 매력이 있습니다. [ITEM:01K3VHDGD3S8XKPC29JQNJBV42]",
    "sources": [
        {
            "id": "01K3VHDGD3S8XKPC29JQNJBV42",
            "name": "제주 감귤주",
            "type": "증류주",
            "alcohol": "50%",
            "volume": "750ml",
            "brewery": "시트러스",
            "image_url": "https://zzan-liquor-bucket.s3.amazonaws.com/liquor-images/01K3VH3M7PQJKA921ZKZK9CAVA.png"
        }
    ],
    "suggested_questions": [
        "제주 감귤주보다 도수가 낮은 전통주도 궁금해요",
        "제주 감귤주와 잘 어울리는 안주가 있을까요",
        "제주에서 유명한 다른 전통주도 알고 싶어요"
    ]
}
```

<br>

#### 주의사항

**프론트에서 입력 글자를 최대 20자로 설정하기!**
