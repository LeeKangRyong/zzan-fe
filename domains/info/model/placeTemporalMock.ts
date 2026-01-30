// PlaceTemporal Mock Data

import { mockNearbyFeeds, mockPlaces } from "@/domains/feed/model/mock";
import { PLACE_KAKAO_MAP } from "./placeKakaoMapping";

export interface PlaceTemporalInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  feedCount: number;
  kakaoPlaceId: string;
  latitude: number;
  longitude: number;
}

// ===== CONSTANTS =====

const CITY_CENTERS = [
  { name: '서울', lat: 37.5665, lng: 126.9780 },
  { name: '부산', lat: 35.1796, lng: 129.0756 },
  { name: '대구', lat: 35.8714, lng: 128.6014 },
  { name: '인천', lat: 37.4563, lng: 126.7052 },
  { name: '광주', lat: 35.1595, lng: 126.8526 },
  { name: '대전', lat: 36.3504, lng: 127.3845 },
  { name: '울산', lat: 35.5384, lng: 129.3114 },
  { name: '세종', lat: 36.4801, lng: 127.2890 },
  { name: '경기', lat: 37.4138, lng: 127.5183 },
  { name: '강원', lat: 37.8228, lng: 128.1555 },
  { name: '충북', lat: 36.6357, lng: 127.4914 },
  { name: '충남', lat: 36.5184, lng: 126.8000 },
  { name: '전북', lat: 35.7175, lng: 127.1530 },
  { name: '전남', lat: 34.8679, lng: 126.9910 },
  { name: '경북', lat: 36.4919, lng: 128.8889 },
  { name: '경남', lat: 35.4606, lng: 128.2132 },
  { name: '제주', lat: 33.4996, lng: 126.5312 },
];

// ===== HELPER FUNCTIONS =====

const generateRandomRating = (): number => {
  const rating = 3.5 + Math.random() * 1.5;
  return Math.round(rating * 10) / 10;
};

const generateRandomFeedCount = (): number => {
  return Math.floor(Math.random() * 50) + 10;
};

const generateNearbyCoord = (center: { lat: number; lng: number }): { lat: number; lng: number } => {
  const offset = 0.05;
  return {
    lat: center.lat + (Math.random() - 0.5) * offset,
    lng: center.lng + (Math.random() - 0.5) * offset,
  };
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generatePhoneNumber = (index: number): string => {
  const baseNumber = 1000 + index;
  const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `02-${baseNumber}-${randomSuffix}`;
};

// ===== MOCK DATA =====

export const MOCK_PLACE_TEMPORAL_INFOS: PlaceTemporalInfo[] = Array.from({ length: 100 }, (_, i) => {
  const placeId = String(i + 1);
  const kakaoPlaceId = PLACE_KAKAO_MAP[placeId];
  const place = mockPlaces[i % mockPlaces.length];
  const city = getRandomElement(CITY_CENTERS);
  const coord = generateNearbyCoord({ lat: city.lat, lng: city.lng });

  return {
    id: placeId,
    name: place.name,
    address: place.address,
    phone: generatePhoneNumber(i),
    rating: generateRandomRating(),
    feedCount: generateRandomFeedCount(),
    kakaoPlaceId,
    latitude: coord.lat,
    longitude: coord.lng,
  };
});

export const MOCK_PLACE_FEEDS = mockNearbyFeeds;
