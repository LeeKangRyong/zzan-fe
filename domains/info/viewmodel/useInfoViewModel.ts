import type { AlcoholInfo, InfoBox, PlaceInfo } from '@/domains/info/model/infoModel';
import { MOCK_ALCOHOL_INFO, MOCK_PLACE_INFO } from '@/domains/info/model/mock';
import { useState } from 'react';

const createInfoBoxes = (placeInfo: PlaceInfo): InfoBox[] => {
  return [
    { label: '문의 및 안내', value: placeInfo.option1 },
    { label: '쉬는날', value: placeInfo.option2 },
    { label: '이용시간', value: placeInfo.option3 },
    { label: '주차시설', value: placeInfo.option4 },
  ];
};

const createAlcoholInfoBoxes = (alcoholInfo: AlcoholInfo): InfoBox[] => {
  return [
    { label: '용량', value: alcoholInfo.option1 },
    { label: '도수', value: alcoholInfo.option2 },
    { label: '양조장', value: alcoholInfo.option3 },
    { label: '기타정보', value: alcoholInfo.option4 },
  ];
};

export const useInfoViewModel = () => {
  const [placeInfo] = useState<PlaceInfo>(MOCK_PLACE_INFO);
  const [isBookmarked, setIsBookmarked] = useState(MOCK_PLACE_INFO.isBookmarked);
  const [infoBoxes] = useState<InfoBox[]>(createInfoBoxes(MOCK_PLACE_INFO));

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleAlcholButtonPress = () => {
    console.log('Alchol button pressed');
  };

  return {
    placeInfo,
    isBookmarked,
    infoBoxes,
    toggleBookmark,
    handleShare,
    handleAlcholButtonPress,
  };
};

export const useAlcoholViewModel = () => {
  const [alcoholInfo] = useState<AlcoholInfo>(MOCK_ALCOHOL_INFO);
  const [isBookmarked, setIsBookmarked] = useState(
    MOCK_ALCOHOL_INFO.isBookmarked
  );
  const [infoBoxes] = useState<InfoBox[]>(
    createAlcoholInfoBoxes(MOCK_ALCOHOL_INFO)
  );

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    console.log('Share alcohol pressed');
  };

  const handleAlcholButtonPress = () => {
    console.log('Tried this alcohol pressed');
  };

  return {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    toggleBookmark,
    handleShare,
    handleAlcholButtonPress,
  };
};
