import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { usePostStore } from '../store/postStore';
import { isMockEnabled } from '@/shared/utils/env';
import { feedApi } from '../api/feedApi';
import { useImageUploadViewModel } from './useImageUploadViewModel';
import type {
  CreateFeedRequest,
  FeedImageTag,
  FeedImageRequest,
} from '../model/feedApiModel';

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
    uploadedImages,
    setAlcoholRating,
    setCurrentRatingIndex,
    resetPost,
  } = usePostStore();

  const currentAlcohol = selectedAlcohols[currentRatingIndex];
  const totalAlcohols = selectedAlcohols.length;
  const [tempRating, setTempRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { uploadImages, isUploading } = useImageUploadViewModel();

  const moveToNextAlcohol = () => {
    setCurrentRatingIndex(currentRatingIndex + 1);
    setTempRating(0);
  };

  const completeAllRatings = async () => {
    if (isMockEnabled()) {
      completeWithMockData();
      return;
    }

    await completeWithApi();
  };

  const completeWithMockData = () => {
    const mockUploadResults = uploadedImages.map((uri, idx) => ({
      localUri: uri,
      objectKey: `mock-feed-images/image-${idx}.jpg`,
    }));

    const feedRequest = buildFeedRequest(mockUploadResults);
    const liquorReviews = selectedAlcohols.map((a) => ({
      liquorId: a.id,
      score: alcoholRatings[a.id] || 0,
      text: '',
    }));

    console.log('=== Mock Feed Request ===');
    console.log('POST /feeds:', JSON.stringify(feedRequest, null, 2));
    console.log('POST /liquors/{id}/reviews:', liquorReviews);
    console.log('=========================');

    resetPost();
    router.replace('/map');
  };

  const completeWithApi = async () => {
    try {
      setIsSaving(true);

      const uploadedImageResults = await uploadAllImages();
      const feedRequest = buildFeedRequest(uploadedImageResults);

      await feedApi.createFeed(feedRequest);
      await createAllLiquorReviews();

      resetPost();
      router.replace('/map');
    } catch (error) {
      console.error('[Feed Creation Error]', error);
      Alert.alert('피드 작성 실패', '다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const uploadAllImages = async () => {
    return await uploadImages(uploadedImages);
  };

  const buildFeedRequest = (uploadedImageResults: any[]): CreateFeedRequest => {
    const images = buildFeedImages(uploadedImageResults);

    return {
      score: placeRating,
      text: review,
      images,
      kakaoPlaceId: selectedPlace?.id,
      placeName: selectedPlace?.name,
      placeAddress: selectedPlace?.address,
    };
  };

  const buildFeedImages = (uploadedImageResults: any[]): FeedImageRequest[] => {
    return uploadedImageResults.map((img) => ({
      imageUrl: img.objectKey,
      tags: buildTagsForImage(img.localUri),
    }));
  };

  const buildTagsForImage = (localUri: string): FeedImageTag[] => {
    const imageIndex = findImageIndex(localUri);

    return alcoholTagMappings
      .filter((m) => m.imageIndex === imageIndex)
      .map((m) => {
        const alcohol = selectedAlcohols.find(a => a.id === m.alcoholId);

        return {
          liquorId: m.alcoholId,
          liquorName: alcohol?.name ?? '',
          x: m.tagPosition.x,
          y: m.tagPosition.y,
        };
      });
  };

  const findImageIndex = (localUri: string): number => {
    return uploadedImages.indexOf(localUri);
  };

  const createAllLiquorReviews = async () => {
    const promises = selectedAlcohols.map((alcohol) =>
      createLiquorReview(alcohol.id)
    );

    await Promise.all(promises);
  };

  const createLiquorReview = async (alcoholId: string) => {
    const rating = alcoholRatings[alcoholId] || 0;
    await feedApi.createLiquorReview(alcoholId, { score: rating, text: '' });
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
    isSaving,
    isUploading,
  };
};
