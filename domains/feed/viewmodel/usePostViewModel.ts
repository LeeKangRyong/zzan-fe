import { useRouter } from 'expo-router';
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

  const handlePlaceSelect = () => {
    router.push('/add?type=place');
  };

  const handleRatingChange = (rating: number) => {
    setPlaceRating(rating);
  };

  const handleReviewChange = (text: string) => {
    setReview(text);
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

  const isNextButtonEnabled = review.trim().length > 0;

  return {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    isRatingModalVisible,
    tempRating,
    handlePlaceSelect,
    handleRatingChange,
    handleReviewChange,
    handleOpenRatingModal,
    handleCloseRatingModal,
    handleSaveRating,
    handleTempRatingChange,
  };
};
