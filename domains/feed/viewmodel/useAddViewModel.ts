import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AddType, Alcohol, Place } from '../model/feedModel';
import { mockAlcohols, mockPlaces } from '../model/mock';
import { usePostStore } from '../store/postStore';
import { isMockEnabled } from '@/shared/utils/env';
import { feedApi } from '../api/feedApi';
import { mapLiquorApiToAlcohol } from '../model/feedApiModel';
import { placeApi } from '@/domains/map/api/placeApi';

interface UseAddViewModelProps {
  addType: AddType;
}

export const useAddViewModel = ({ addType }: UseAddViewModelProps) => {
  const router = useRouter();
  const { setSelectedPlace, addSelectedAlcohol } = usePostStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [alcoholResults, setAlcoholResults] = useState<Alcohol[]>([]);
  const [placeResults, setPlaceResults] = useState<Place[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    if (isMockEnabled()) {
      searchWithMockData();
      return;
    }
    searchWithApi();
  };

  const searchWithMockData = () => {
    if (addType === 'alcohol') {
      const filtered = mockAlcohols.filter((item) =>
        item.name.includes(searchQuery)
      );
      setAlcoholResults(filtered.length > 0 ? filtered : mockAlcohols);
      return;
    }
    const filtered = mockPlaces.filter((item) =>
      item.name.includes(searchQuery)
    );
    setPlaceResults(filtered.length > 0 ? filtered : mockPlaces);
  };

  const searchWithApi = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (addType === 'alcohol') {
        await searchAlcoholsFromApi();
        return;
      }
      await searchPlacesFromApi();
    } catch (err) {
      setError('검색에 실패했습니다');
      console.error('[Search Error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchAlcoholsFromApi = async () => {
    const result = await feedApi.searchLiquors({
      keyword: searchQuery,
      page: 1,
      size: 15,
    });

    const alcohols = result.items.map(mapLiquorApiToAlcohol);
    setAlcoholResults(alcohols);
  };

  const searchPlacesFromApi = async () => {
    const places = await placeApi.searchPlaces({
      keyword: searchQuery,
      page: 1,
      size: 15,
    });

    const mappedPlaces: Place[] = places.map((p) => ({
      id: p.id,
      name: p.placeName,
      address: p.roadAddressName,
      imageUrl: '',
    }));

    setPlaceResults(mappedPlaces);
  };

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const getSelectedItem = () => {
    if (!selectedId) return null;
    if (addType === 'alcohol') {
      return alcoholResults.find((item) => item.id === selectedId) ?? null;
    }
    return placeResults.find((item) => item.id === selectedId) ?? null;
  };

  const isItemSelected = selectedId !== null;

  const handleAdd = () => {
    if (!selectedId) return;

    if (addType === 'alcohol') {
      const selectedItem = alcoholResults.find((item) => item.id === selectedId);
      if (selectedItem) addSelectedAlcohol(selectedItem);
    }

    if (addType === 'place') {
      const selectedItem = placeResults.find((item) => item.id === selectedId);
      if (selectedItem) setSelectedPlace(selectedItem);
    }

    router.back();
  };

  return {
    searchQuery,
    setSearchQuery,
    alcoholResults,
    placeResults,
    selectedId,
    handleSearch,
    handleSelect,
    getSelectedItem,
    isItemSelected,
    handleAdd,
    isLoading,
    error,
  };
};
