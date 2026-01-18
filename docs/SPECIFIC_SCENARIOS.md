### map.tsx 수정사항

장소가 아니라, 피드가 있는 장소들 목록을 보여주는 형식

<br>

### 피드 작성 flow

```
1. add?type=alcohol: 술 검색 → 선택 → 가져오기
2. add?type=place: 장소 검색 → 선택 → 가져오기 → 장소 별점 입력
3. post.tsx '다음' 버튼: API 호출 없이 /rate로 이동만
4. rate.tsx: 각 술에 대해 별점 입력 (text=""), 아직 API 호출 없음
5. 마지막 술 '저장하기': 모든 API를 한 번에 호출
   POST /feeds (피드 작성)
   POST /liquors/{liquorId}/reviews (각 술마다 리뷰 작성, 여러 번)
```

=> 즉, 아래 시나리오에 별점 매기고 한번에 피드 작성하는 식으로 하기!

```
1. POST /storage/feed-images/presigned-url (인증)
   → 이미지 업로드 URL 및 key 획득

2. PUT {presigned_url} (S3 직접 업로드)
   → 이미지 업로드

3. GET /infra/places/search?keyword=전통주
   → 장소 검색

4. GET /liquors/search?keyword=느린마을
   → 태그할 주류 검색

5. POST /feeds (인증)
   → 피드 생성 (images[].imageUrl에 step 1의 key 사용)
```

<br>

### 장소 선택 flow

```
1. GET /places?minLongitude=126.9&maxLongitude=127.0&minLatitude=37.5&maxLatitude=37.6
   → 현재 지도 영역의 장소 목록 가져오기

2. 뜨는 info block을 선택하여 장소의 상세 정보 보기

3. 해당 장소 detail.tsx 들어감

4. detail 정보를 보고, 아래에는 해당 장소인 피드 목록이 있음

5. 해당 피드 누르면 피드 상세로 들어감. feed.tsx
```

<br>

### 술, 장소 검색 시 (add?type=alchol, add?type=place)

```
page는 그냥 빼고 전체 검색!
```
