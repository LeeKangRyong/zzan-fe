import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { usePostStore } from '../store/postStore';

export const usePostViewModel = () => {
  const router = useRouter();

  const {
    selectedPlace,
    placeRating,
    review,
    isRatingModalVisible,
    tempRating,
    setPlaceRating,
    setReview,
    setIsRatingModalVisible,
    setTempRating,
  } = usePostStore();

  const isPlaceSelected = selectedPlace !== null;

  useEffect(() => {
    if (isPlaceSelected && placeRating === 0) {
      handleOpenRatingModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace]);

  const handlePlaceSelect = () => {
    router.push('/add?type=place');
  };

  const handleOpenRatingModal = () => {
    setTempRating(placeRating);
    setIsRatingModalVisible(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalVisible(false);
  };

  const handleSaveRating = () => {
    setPlaceRating(tempRating);
    setIsRatingModalVisible(false);
  };

  const handleTempRatingChange = (rating: number) => {
    setTempRating(rating);
  };

  const handleReviewChange = (text: string) => {
    setReview(text);
  };

  const isNextButtonEnabled = review.trim().length > 0 && isPlaceSelected;

  return {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    isRatingModalVisible,
    tempRating,
    handlePlaceSelect,
    handleReviewChange,
    handleOpenRatingModal,
    handleCloseRatingModal,
    handleSaveRating,
    handleTempRatingChange,
  };
};