import { useRouter } from 'expo-router';
import { useState } from 'react';
import { usePostStore } from '../store/postStore';

export const useRateViewModel = () => {
  const router = useRouter();
  const {
    selectedAlcohols,
    alcoholRatings,
    currentRatingIndex,
    selectedPlace,
    placeRating,
    review,
    alcoholTagMappings,
    setAlcoholRating,
    setCurrentRatingIndex,
    resetPost,
  } = usePostStore();

  const currentAlcohol = selectedAlcohols[currentRatingIndex];
  const totalAlcohols = selectedAlcohols.length;
  const [tempRating, setTempRating] = useState(0);

  const moveToNextAlcohol = () => {
    setCurrentRatingIndex(currentRatingIndex + 1);
    setTempRating(0);
  };

  const completeAllRatings = () => {
    const feedData = {
      place: selectedPlace,
      placeRating,
      alcohols: selectedAlcohols,
      alcoholRatings,
      alcoholTagMappings,
      review,
    };

    console.log('피드 작성 완료:', feedData);
    resetPost();
    router.replace('/map');
  };

  const handleSaveRating = () => {
    if (!currentAlcohol) return;

    setAlcoholRating(currentAlcohol.id, tempRating);

    if (currentRatingIndex < totalAlcohols - 1) {
      moveToNextAlcohol();
      return;
    }

    completeAllRatings();
  };

  return {
    currentAlcohol,
    currentRatingIndex,
    totalAlcohols,
    tempRating,
    setTempRating,
    handleSaveRating,
    alcoholRatings,
    selectedAlcohols,
  };
};
