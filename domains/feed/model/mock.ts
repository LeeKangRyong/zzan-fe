import { Alcohol, FeedImage, FeedWithUser, Place, PlaceWithRating } from './feedModel';

export const mockFeedImages: FeedImage[] = [
  {
    id: '1',
    uri: require('@/assets/images/example_image.png'),
  },
];

export const mockAlcohols: Alcohol[] = [
  {
    id: '1',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '연천 율무 동동주',
    type: '탁주(고도)',
    score: 4.2,
  },
  {
    id: '2',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '가평 잣막걸리',
    type: '탁주',
    score: 4.5,
  },
  {
    id: '3',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '오곡 진상주',
    type: '약주',
    score: 4.0,
  },
  {
    id: '4',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '안동소주',
    type: '증류주',
    score: 4.8,
  },
  {
    id: '5',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '문배주',
    type: '증류주',
    score: 4.6,
  },
  {
    id: '6',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '복분자주',
    type: '과실주',
    score: 4.3,
  },
  {
    id: '7',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '이강주',
    type: '약주',
    score: 4.1,
  },
  {
    id: '8',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '백세주',
    type: '약주',
    score: 3.9,
  },
];

export const mockPlaces: Place[] = [
  {
    id: '1',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '울산 문화의 거리',
    address: '울산광역시 중구 성남동 329-5',
  },
  {
    id: '2',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '서울 종로 전통주 거리',
    address: '서울특별시 종로구 종로3가 112',
  },
  {
    id: '3',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '전주 한옥마을',
    address: '전라북도 전주시 완산구 기린대로 99',
  },
  {
    id: '4',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '경주 교동법주마을',
    address: '경상북도 경주시 교동 69',
  },
  {
    id: '5',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '부산 광안리 해변',
    address: '부산광역시 수영구 광안해변로 219',
  },
  {
    id: '6',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '대전 으능정이 거리',
    address: '대전광역시 중구 은행동 145',
  },
  {
    id: '7',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '강릉 경포대',
    address: '강원도 강릉시 경포로 365',
  },
  {
    id: '8',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '인천 차이나타운',
    address: '인천광역시 중구 차이나타운로 12',
  },
];

export const mockSelectedPlace: PlaceWithRating = {
  id: '1',
  imageUrl: require('@/assets/images/example_image.png'),
  name: '울산 문화의 거리',
  address: '울산광역시 중구 성남동 329-5',
  feedCount: 12,
  rating: 4,
};

export const mockNearbyFeeds: FeedWithUser[] = [
  {
    id: 'nearby1',
    userId: 'user1',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'nearby2',
    userId: 'user2',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'nearby3',
    userId: 'user3',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'nearby4',
    userId: 'user4',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'nearby5',
    userId: 'user5',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'nearby6',
    userId: 'user6',
    username: '도선빈',
    userProfileImage: require('@/assets/images/example_image.png'),
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
];
