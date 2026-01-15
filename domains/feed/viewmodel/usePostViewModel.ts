import { useState } from 'react';
import { PlaceWithRating } from '../model/feedModel';
import { mockSelectedPlace } from '../model/mock';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

export const usePostViewModel = () => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithRating | null>(null);
  const [placeRating, setPlaceRating] = useState(1);
  const [review, setReview] = useState('');

  const isPlaceSelected = selectedPlace !== null;

  const handlePlaceSelect = () => {
    if (USE_MOCK_DATA) {
      setSelectedPlace(mockSelectedPlace);
      return;
    }
    // TODO: 실제 API 연동 시 구현
    setSelectedPlace(mockSelectedPlace);
  };

  const handleRatingChange = (rating: number) => {
    setPlaceRating(rating);
  };

  const handleReviewChange = (text: string) => {
    setReview(text);
  };

  const isNextButtonEnabled = review.trim().length > 0;

  return {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    handlePlaceSelect,
    handleRatingChange,
    handleReviewChange,
  };
};
