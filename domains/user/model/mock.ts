import { User, UserFeed, UserScrapAlcohol } from './userModel';

export const mockUser: User = {
  id: 'user1',
  name: '박준형',
  profileImage: require('@/assets/images/example_image.png'),
  emptyAlcoholCount: 4,
  birthDate: '2007.12.12',
  phone: '010-1111-1111',
  email: 'hello@gmail.com',
};

export const mockUserFeeds: UserFeed[] = [
  {
    id: 'feed1',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '울산 문화의거리',
    address: '울산광역시 중구 성남동 329-5',
    alcoholCount: 4,
  },
  {
    id: 'feed2',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '서울 종로 전통주 거리',
    address: '서울특별시 종로구 종로3가 112',
    alcoholCount: 3,
  },
  {
    id: 'feed3',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '전주 한옥마을',
    address: '전라북도 전주시 완산구 기린대로 99',
    alcoholCount: 5,
  },
  {
    id: 'feed4',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '경주 교동법주마을',
    address: '경상북도 경주시 교동 69',
    alcoholCount: 2,
  },
  {
    id: 'feed5',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '부산 광안리 해변',
    address: '부산광역시 수영구 광안해변로 219',
    alcoholCount: 4,
  },
  {
    id: 'feed6',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '대전 으능정이 거리',
    address: '대전광역시 중구 은행동 145',
    alcoholCount: 3,
  },
];

export const mockUserScrapFeeds: UserFeed[] = [
  {
    id: 'scrapfeed1',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '강릉 경포대',
    address: '강원도 강릉시 경포로 365',
    alcoholCount: 4,
  },
  {
    id: 'scrapfeed2',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '인천 차이나타운',
    address: '인천광역시 중구 차이나타운로 12',
    alcoholCount: 2,
  },
  {
    id: 'scrapfeed3',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '대구 동성로',
    address: '대구광역시 중구 동성로2가 82',
    alcoholCount: 3,
  },
  {
    id: 'scrapfeed4',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '광주 양동시장',
    address: '광주광역시 동구 금남로 245',
    alcoholCount: 5,
  },
  {
    id: 'scrapfeed5',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '평창 올림픽 타운',
    address: '강원도 평창군 대관령면 올림픽로 715',
    alcoholCount: 2,
  },
  {
    id: 'scrapfeed6',
    imageUrl: require('@/assets/images/example_image.png'),
    placeName: '여수 엑스포',
    address: '전라남도 여수시 박람회길 1',
    alcoholCount: 4,
  },
];

export const mockUserScrapAlcohols: UserScrapAlcohol[] = [
  {
    id: 'alcohol1',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '연천 율무 동동주',
    type: '탁주',
    rating: 4.6,
    reviewCount: 123,
  },
  {
    id: 'alcohol2',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '가평 잣막걸리',
    type: '탁주',
    rating: 4.2,
    reviewCount: 89,
  },
  {
    id: 'alcohol3',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '오곡 진상주',
    type: '약주',
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: 'alcohol4',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '안동소주',
    type: '증류주',
    rating: 4.5,
    reviewCount: 234,
  },
  {
    id: 'alcohol5',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '문배주',
    type: '증류주',
    rating: 4.7,
    reviewCount: 178,
  },
  {
    id: 'alcohol6',
    imageUrl: require('@/assets/images/example_image.png'),
    name: '복분자주',
    type: '과실주',
    rating: 4.3,
    reviewCount: 92,
  },
];
