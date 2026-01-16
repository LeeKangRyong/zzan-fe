import { useState } from 'react';
import { mockAlcohols, mockFeedImages, mockSelectedPlace } from '../model/mock';

const MOCK_USER = {
  imageUrl: require('@/assets/images/example_image.png'),
  username: '코코몽',
};

const MOCK_ALCOHOL_RATINGS = {
  '1': 4,
  '2': 3,
  '3': 4,
  '4': 1,
};

const MOCK_ALCOHOL_TAG_MAPPINGS = [
  { alcoholId: '1', imageIndex: 0, tagPosition: { x: 150, y: 120 } },
  { alcoholId: '2', imageIndex: 0, tagPosition: { x: 250, y: 180 } },
  { alcoholId: '3', imageIndex: 0, tagPosition: { x: 200, y: 260 } },
  { alcoholId: '4', imageIndex: 0, tagPosition: { x: 300, y: 200 } },
];

const MOCK_REVIEW =
  '서울 익선동 한식주점에서 막걸리를 마셨는데, 달콤하면서도 진한 곡물 향이 느껴져 좋았어요. 함께 나온 파전이랑 먹으니까 궁합이 딱 맞아서 술맛이 배가되더라고요. 분위기도 전통적이면서 아늑해서, 오래 기억에 남을 술자리가 되었어요.';

const MOCK_PLACE_RATING = 1;

export const useDetailViewModel = () => {
  const [focusedAlcoholId, setFocusedAlcoholId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleTagPress = (alcoholId: string) => {
    setFocusedAlcoholId(alcoholId);
  };

  const handleAlcoholPress = (alcoholId: string) => {
    console.log('Navigate to alcohol detail:', alcoholId);
  };

  const handlePlacePress = () => {
    console.log('Navigate to place detail:', mockSelectedPlace.id);
  };

  const handleShare = () => {
    console.log('Share feed');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log('Bookmark toggled:', !isBookmarked);
  };

  return {
    user: MOCK_USER,
    images: mockFeedImages,
    alcohols: mockAlcohols.slice(0, 4),
    alcoholRatings: MOCK_ALCOHOL_RATINGS,
    alcoholTagMappings: MOCK_ALCOHOL_TAG_MAPPINGS,
    place: mockSelectedPlace,
    placeRating: MOCK_PLACE_RATING,
    review: MOCK_REVIEW,
    focusedAlcoholId,
    isBookmarked,
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  };
};
