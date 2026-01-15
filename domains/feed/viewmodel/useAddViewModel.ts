import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AddType, Alcohol, Place } from '../model/feedModel';
import { mockAlcohols, mockPlaces } from '../model/mock';
import { usePostStore } from '../store/postStore';

const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

interface UseAddViewModelProps {
  addType: AddType;
}

export const useAddViewModel = ({ addType }: UseAddViewModelProps) => {
  const router = useRouter();
  const { setSelectedPlace } = usePostStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [alcoholResults, setAlcoholResults] = useState<Alcohol[]>([]);
  const [placeResults, setPlaceResults] = useState<Place[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    if (USE_MOCK_DATA) {
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

  const searchWithApi = () => {
    // TODO: 실제 API 호출 구현
    searchWithMockData();
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

    const results = addType === 'alcohol' ? alcoholResults : placeResults;
    const selectedItem = results.find((item) => item.id === selectedId);

    if (selectedItem && addType === 'place') {
      setSelectedPlace(selectedItem as Place);
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
  };
};
