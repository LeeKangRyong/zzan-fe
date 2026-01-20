import type { ImageSourcePropType } from "react-native";
import type { AlcoholInfo, PlaceInfo, PlaceReview } from "./infoModel";

const exampleImage = require("@/assets/images/example_image.png");

export interface LiquorComment {
  id: string;
  userId: string;
  username: string;
  userProfileImage: ImageSourcePropType;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

const MOCK_REVIEWS: PlaceReview[] = [
  {
    id: "review1",
    userName: "홍길동",
    rating: 5,
    content: "전통주 종류가 다양하고 분위기가 좋아요!",
    imageUrl: exampleImage,
    createdAt: "2024-01-15",
  },
  {
    id: "review2",
    userName: "김철수",
    rating: 4,
    content: "안주도 맛있고 직원분들이 친절해요.",
    imageUrl: exampleImage,
    createdAt: "2024-01-10",
  },
  {
    id: "review3",
    userName: "이영희",
    rating: 5,
    content: "데이트 코스로 추천합니다.",
    imageUrl: exampleImage,
    createdAt: "2024-01-05",
  },
];

export const MOCK_PLACE_INFO: PlaceInfo = {
  id: "01HQPLACE123456789ABC",
  name: "전통주 카페 짠",
  category: "탁주(고도)",
  images: [exampleImage, exampleImage, exampleImage],
  option1: "서울시 강남구 역삼동 02-123-4567",
  option2: "연중무휴",
  option3: "11:00 - 22:00",
  option4: "가능",
  isBookmarked: false,
  rating: 4.7,
  reviews: MOCK_REVIEWS,
  description:
    "전통주 카페 짠은 우리 술의 깊은 맛과 멋을 현대적인 감각으로 재해석한 특별한 공간입니다. 전국 각지의 양조장에서 엄선해 온 다채로운 전통주 라인업을 갖추고 있어, 평소 접하기 힘들었던 귀한 술들을 한자리에서 만나보실 수 있습니다. 따뜻하고 세련된 인조 조명과 편안한 원목 인테리어가 어우러진 분위기 속에서, 소중한 친구나 연인, 그리고 가족과 함께 여유로운 시간을 가져보세요. 각 전통주와 완벽한 조화를 이루는 '짠'만의 수제 안주 페어링은 술의 풍미를 한층 더 끌어올려 줍니다 전통주는 어렵다는 편견을 깨고 누구나 쉽게 즐길 수 있도록 친절한 큐레이션 서비스도 제공해 드리고 있습니다. 도심 속 소음에서 벗어나 우리 술 향기에 취하며 일상의 스트레스를 잠시 내려놓으시길 바랍니다. 계절마다 새롭게 선보이는 시즌 한정 전통주와 함께 매번 새로운 즐거움을 경험해 보세요. 오늘 저녁, 소중한 사람들과 함께 잔을 맞대며 기분 좋은 '짠' 소리를 나누어 보는 건 어떨까요? 여러분의 소중한 순간이 더욱 빛날 수 있도록 정성을 다해 모시겠습니다. 전통주의 매력에 흠뻑 빠질 수 있는 이곳, 짠에서 잊지 못할 추억을 만들어보세요.",
};

export const getMockPlaceInfo = (): PlaceInfo => {
  return MOCK_PLACE_INFO;
};

const MOCK_ALCOHOL_REVIEWS: PlaceReview[] = [
  {
    id: "alcohol_review1",
    userName: "전통주애호가",
    rating: 5,
    content: "부드럽고 깔끔한 맛이 일품이에요!",
    imageUrl: exampleImage,
    createdAt: "2024-01-15",
  },
  {
    id: "alcohol_review2",
    userName: "막걸리러버",
    rating: 5,
    content: "탄산이 적당하고 목넘김이 좋습니다.",
    imageUrl: exampleImage,
    createdAt: "2024-01-12",
  },
  {
    id: "alcohol_review3",
    userName: "김소믈리에",
    rating: 4,
    content: "전통 방식 그대로의 깊은 풍미가 느껴져요.",
    imageUrl: exampleImage,
    createdAt: "2024-01-08",
  },
];

export const MOCK_ALCOHOL_INFO: AlcoholInfo = {
  id: "01HQLIQUOR1234567890",
  name: "서울 탁주",
  category: "탁주(저도)",
  images: [
    {
      image: exampleImage,
      descriptionTitle: "전통 방식 그대로",
      descriptionCategory: "유기농 생막걸리",
    },
    {
      image: exampleImage,
      descriptionTitle: "부드러운 감칠맛",
      descriptionCategory: "프리미엄 탁주",
    },
    {
      image: exampleImage,
      descriptionTitle: "살아있는 유산균",
      descriptionCategory: "건강한 발효주",
    },
  ],
  option1: "750ml",
  option2: "6%",
  option3: "서울양조장",
  option4: "유기농 쌀 100%",
  isBookmarked: false,
  rating: 4.8,
  reviews: MOCK_ALCOHOL_REVIEWS,
  recommendTitle: "페어링 안주 추천",
  recommendDescription:
    "알콜올 도수가 14%로 일반 막걸리의 2배가 넘는 만큼 한여름에는 얼음을 넣어 온더록스로 한잔해도 충분히 제 역할을 하는 제품입니다.",
};

export const getMockAlcoholInfo = (): AlcoholInfo => {
  return MOCK_ALCOHOL_INFO;
};

export const MOCK_CURRENT_USER_ID = "user1";

export const MOCK_MY_REVIEW: LiquorComment = {
  id: "comment1",
  userId: "user1",
  username: "이도훈",
  userProfileImage: exampleImage,
  rating: 4,
  comment: "조금 씁슬한 맛이 조금 불호였지만 그래도 달콤하고 맛있었어요",
  date: "2026/12/12",
  likes: 0,
};

export const MOCK_LIQUOR_COMMENTS: LiquorComment[] = [
  MOCK_MY_REVIEW,
  {
    id: "comment2",
    userId: "user2",
    username: "도선빈",
    userProfileImage: exampleImage,
    rating: 4,
    comment: "저랑은 살짝 안맞아요..",
    date: "2026/12/12",
    likes: 0,
  },
  {
    id: "comment3",
    userId: "user3",
    username: "김병수",
    userProfileImage: exampleImage,
    rating: 4,
    comment: "조금 씁슬한 맛이 조금 불호였지만 그래도 달콤하고 맛있었어요",
    date: "2026/12/12",
    likes: 0,
  },
];
