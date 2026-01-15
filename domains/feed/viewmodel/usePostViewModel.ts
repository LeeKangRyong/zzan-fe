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

  // ESLint 에러 해결: 의존성 배열에 필요한 값들을 추가합니다.
  useEffect(() => {
    if (isPlaceSelected && placeRating === 0) {
      handleOpenRatingModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaceSelected]); 
  // 위와 같이 유지하거나, 함수까지 포함하려면 아래 handleOpenRatingModal을 useCallback으로 감싸야 합니다.
  // 하지만 '최초 장소 선택 시'라는 조건이 명확하므로 isPlaceSelected만 감시하는 것이 의도에 맞습니다.

  const handlePlaceSelect = () => {
    router.push('/add?type=place');
  };

  const handleOpenRatingModal = () => {
    setTempRating(placeRating || 1);
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