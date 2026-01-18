import {
  Alcohol,
  FeedImage,
  FeedWithUser,
  Place,
  PlaceWithRating,
} from "./feedModel";

export const mockFeedImages: FeedImage[] = [
  {
    id: "1",
    uri: require("@/assets/images/example_image.png"),
  },
];

export const mockAlcohols: Alcohol[] = [
  {
    id: "1",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "연천 율무 동동주",
    type: "탁주(고도)",
    score: 4.2,
  },
  {
    id: "2",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "가평 잣막걸리",
    type: "탁주",
    score: 4.5,
  },
  {
    id: "3",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "오곡 진상주",
    type: "약주",
    score: 4.0,
  },
  {
    id: "4",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "안동소주",
    type: "증류주",
    score: 4.8,
  },
  {
    id: "5",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "문배주",
    type: "증류주",
    score: 4.6,
  },
  {
    id: "6",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "복분자주",
    type: "과실주",
    score: 4.3,
  },
  {
    id: "7",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "이강주",
    type: "약주",
    score: 4.1,
  },
  {
    id: "8",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "백세주",
    type: "약주",
    score: 3.9,
  },
];

export const mockPlaces: Place[] = [
  {
    id: "1",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "울산 문화의 거리",
    address: "울산광역시 중구 성남동 329-5",
  },
  {
    id: "2",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "서울 종로 전통주 거리",
    address: "서울특별시 종로구 종로3가 112",
  },
  {
    id: "3",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "전주 한옥마을",
    address: "전라북도 전주시 완산구 기린대로 99",
  },
  {
    id: "4",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "경주 교동법주마을",
    address: "경상북도 경주시 교동 69",
  },
  {
    id: "5",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "부산 광안리 해변",
    address: "부산광역시 수영구 광안해변로 219",
  },
  {
    id: "6",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "대전 으능정이 거리",
    address: "대전광역시 중구 은행동 145",
  },
  {
    id: "7",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "강릉 경포대",
    address: "강원도 강릉시 경포로 365",
  },
  {
    id: "8",
    imageUrl: require("@/assets/images/example_image.png"),
    name: "인천 차이나타운",
    address: "인천광역시 중구 차이나타운로 12",
  },
];

export const mockSelectedPlace: PlaceWithRating = {
  id: "1",
  imageUrl: require("@/assets/images/example_image.png"),
  name: "울산 문화의 거리",
  address: "울산광역시 중구 성남동 329-5",
  feedCount: 12,
  rating: 4,
};

export const mockNearbyFeeds: FeedWithUser[] = [
  {
    id: "nearby1",
    userId: "user1",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
  {
    id: "nearby2",
    userId: "user2",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
  {
    id: "nearby3",
    userId: "user3",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
  {
    id: "nearby4",
    userId: "user4",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
  {
    id: "nearby5",
    userId: "user5",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
  {
    id: "nearby6",
    userId: "user6",
    username: "도선빈",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    placeName: "울산 문화의거리",
    address: "울산광역시 중구 성남동 329-5",
    alcoholCount: 4,
  },
];

export interface MockFeedDetail {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: any;
  imageUrl: any;
  images: {
    id: string;
    imageUrl: any;
    tags: {
      id: string;
      liquorId: string;
      liquorName: string;
      x: number;
      y: number;
    }[];
  }[];
  score: number;
  liquorCount: number;
  text: string;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
  createdAt: string;
}

export const mockFeedDetails: MockFeedDetail[] = [
  {
    id: "feed1",
    userId: "user1",
    userName: "코코몽",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img1",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag1",
            liquorId: "1",
            liquorName: "연천 율무 동동주",
            x: 0.4,
            y: 0.35,
          },
          {
            id: "tag2",
            liquorId: "2",
            liquorName: "가평 잣막걸리",
            x: 0.65,
            y: 0.48,
          },
          {
            id: "tag3",
            liquorId: "3",
            liquorName: "오곡 진상주",
            x: 0.53,
            y: 0.68,
          },
          {
            id: "tag4",
            liquorId: "4",
            liquorName: "안동소주",
            x: 0.75,
            y: 0.53,
          },
        ],
      },
    ],
    score: 4.5,
    liquorCount: 4,
    text: "서울 익선동 한식주점에서 막걸리를 마셨는데, 달콤하면서도 진한 곡물 향이 느껴져 좋았어요. 함께 나온 파전이랑 먹으니까 궁합이 딱 맞아서 술맛이 배가되더라고요. 분위기도 전통적이면서 아늑해서, 오래 기억에 남을 술자리가 되었어요.",
    kakaoPlaceId: "1",
    placeName: "울산 문화의 거리",
    placeAddress: "울산광역시 중구 성남동 329-5",
    createdAt: "2025-01-15T19:30:00Z",
  },
  {
    id: "feed2",
    userId: "user2",
    userName: "김철수",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img2",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          { id: "tag5", liquorId: "5", liquorName: "문배주", x: 0.38, y: 0.45 },
          {
            id: "tag6",
            liquorId: "6",
            liquorName: "복분자주",
            x: 0.62,
            y: 0.6,
          },
        ],
      },
    ],
    score: 3.8,
    liquorCount: 2,
    text: "전주 한옥마을에서 전통주를 맛봤는데 정말 인상 깊었습니다. 특히 문배주의 깔끔한 맛이 일품이었어요!",
    kakaoPlaceId: "3",
    placeName: "전주 한옥마을",
    placeAddress: "전라북도 전주시 완산구 기린대로 99",
    createdAt: "2025-01-14T18:20:00Z",
  },
  {
    id: "feed3",
    userId: "user3",
    userName: "이영희",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img3",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag7",
            liquorId: "1",
            liquorName: "연천 율무 동동주",
            x: 0.5,
            y: 0.5,
          },
        ],
      },
    ],
    score: 4.2,
    liquorCount: 1,
    text: "경주에서 전통주 한 잔. 역사와 함께 마시는 술은 특별했어요.",
    kakaoPlaceId: "4",
    placeName: "경주 교동법주마을",
    placeAddress: "경상북도 경주시 교동 69",
    createdAt: "2025-01-13T20:15:00Z",
  },
  {
    id: "feed4",
    userId: "user1",
    userName: "코코몽",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img4",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          { id: "tag8", liquorId: "7", liquorName: "이강주", x: 0.35, y: 0.4 },
          { id: "tag9", liquorId: "8", liquorName: "백세주", x: 0.65, y: 0.55 },
          {
            id: "tag10",
            liquorId: "2",
            liquorName: "가평 잣막걸리",
            x: 0.5,
            y: 0.68,
          },
        ],
      },
    ],
    score: 4.8,
    liquorCount: 3,
    text: "부산 광안리에서 바다 보며 마신 전통주. 분위기 최고!",
    kakaoPlaceId: "5",
    placeName: "부산 광안리 해변",
    placeAddress: "부산광역시 수영구 광안해변로 219",
    createdAt: "2025-01-12T17:00:00Z",
  },
  {
    id: "feed5",
    userId: "user4",
    userName: "박민수",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img5",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag11",
            liquorId: "3",
            liquorName: "오곡 진상주",
            x: 0.45,
            y: 0.38,
          },
          {
            id: "tag12",
            liquorId: "4",
            liquorName: "안동소주",
            x: 0.6,
            y: 0.62,
          },
        ],
      },
    ],
    score: 4.0,
    liquorCount: 2,
    text: "대전에서 친구들과 모여 전통주 시음. 즐거운 시간이었어요!",
    kakaoPlaceId: "6",
    placeName: "대전 으능정이 거리",
    placeAddress: "대전광역시 중구 은행동 145",
    createdAt: "2025-01-11T19:45:00Z",
  },
  {
    id: "feed6",
    userId: "user5",
    userName: "최지은",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img6",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          { id: "tag13", liquorId: "5", liquorName: "문배주", x: 0.4, y: 0.5 },
        ],
      },
    ],
    score: 3.5,
    liquorCount: 1,
    text: "강릉 경포대 근처 전통주점에서 문배주 한 잔. 바다 내음과 어우러져 좋았어요.",
    kakaoPlaceId: "7",
    placeName: "강릉 경포대",
    placeAddress: "강원도 강릉시 경포로 365",
    createdAt: "2025-01-10T16:30:00Z",
  },
  {
    id: "scrapfeed1",
    userId: "user6",
    userName: "정수현",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img7",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag14",
            liquorId: "1",
            liquorName: "연천 율무 동동주",
            x: 0.35,
            y: 0.35,
          },
          {
            id: "tag15",
            liquorId: "6",
            liquorName: "복분자주",
            x: 0.65,
            y: 0.65,
          },
        ],
      },
    ],
    score: 4.3,
    liquorCount: 2,
    text: "인천 차이나타운에서 이색적인 전통주 체험!",
    kakaoPlaceId: "8",
    placeName: "인천 차이나타운",
    placeAddress: "인천광역시 중구 차이나타운로 12",
    createdAt: "2025-01-09T15:00:00Z",
  },
  {
    id: "scrapfeed2",
    userId: "user2",
    userName: "김철수",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img8",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag16",
            liquorId: "2",
            liquorName: "가평 잣막걸리",
            x: 0.5,
            y: 0.4,
          },
          { id: "tag17", liquorId: "7", liquorName: "이강주", x: 0.5, y: 0.68 },
        ],
      },
    ],
    score: 4.7,
    liquorCount: 2,
    text: "",
    kakaoPlaceId: "2",
    placeName: "서울 종로 전통주 거리",
    placeAddress: "서울특별시 종로구 종로3가 112",
    createdAt: "2025-01-08T18:00:00Z",
  },
  {
    id: "scrapfeed3",
    userId: "user7",
    userName: "윤서연",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img9",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          { id: "tag18", liquorId: "8", liquorName: "백세주", x: 0.6, y: 0.5 },
        ],
      },
    ],
    score: 3.2,
    liquorCount: 1,
    text: "대구 동성로에서 술 한 잔.",
    createdAt: "2025-01-07T14:20:00Z",
  },
  {
    id: "scrapfeed4",
    userId: "user8",
    userName: "강동욱",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img10",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag19",
            liquorId: "3",
            liquorName: "오곡 진상주",
            x: 0.38,
            y: 0.45,
          },
          {
            id: "tag20",
            liquorId: "4",
            liquorName: "안동소주",
            x: 0.62,
            y: 0.55,
          },
          { id: "tag21", liquorId: "5", liquorName: "문배주", x: 0.5, y: 0.72 },
        ],
      },
    ],
    score: 5.0,
    liquorCount: 3,
    text: "광주 양동시장에서 다양한 전통주를 맛봤어요. 시장 분위기와 어우러진 술맛이 일품이었습니다!",
    createdAt: "2025-01-06T13:00:00Z",
  },
  {
    id: "scrapfeed5",
    userId: "user9",
    userName: "한지민",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img11",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag22",
            liquorId: "6",
            liquorName: "복분자주",
            x: 0.4,
            y: 0.6,
          },
        ],
      },
    ],
    score: 4.1,
    liquorCount: 1,
    text: "평창 올림픽 타운에서 마신 복분자주. 추운 날씨에 딱 좋았어요!",
    createdAt: "2025-01-05T12:00:00Z",
  },
  {
    id: "scrapfeed6",
    userId: "user10",
    userName: "오태양",
    userProfileImage: require("@/assets/images/example_image.png"),
    imageUrl: require("@/assets/images/example_image.png"),
    images: [
      {
        id: "img12",
        imageUrl: require("@/assets/images/example_image.png"),
        tags: [
          {
            id: "tag23",
            liquorId: "1",
            liquorName: "연천 율무 동동주",
            x: 0.3,
            y: 0.38,
          },
          {
            id: "tag24",
            liquorId: "2",
            liquorName: "가평 잣막걸리",
            x: 0.5,
            y: 0.5,
          },
          { id: "tag25", liquorId: "7", liquorName: "이강주", x: 0.7, y: 0.62 },
        ],
      },
    ],
    score: 4.6,
    liquorCount: 3,
    text: "여수 엑스포에서 전통주 시음 이벤트에 참여했어요. 바다 풍경과 함께한 술맛이 기억에 남네요.",
    createdAt: "2025-01-04T11:00:00Z",
  },
];
