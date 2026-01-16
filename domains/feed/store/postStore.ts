import { create } from 'zustand';
import { Alcohol, Place, PlaceWithRating } from '../model/feedModel';

interface PostStore {
  selectedPlace: PlaceWithRating | null;
  placeRating: number;
  review: string;
  isRatingModalVisible: boolean;
  tempRating: number;
  selectedAlcohols: Alcohol[];
  editingTagIndex: number | null;

  setSelectedPlace: (place: Place) => void;
  setPlaceRating: (rating: number) => void;
  setReview: (text: string) => void;
  setIsRatingModalVisible: (visible: boolean) => void;
  setTempRating: (rating: number) => void;
  addSelectedAlcohol: (alcohol: Alcohol) => void;
  removeSelectedAlcohol: (alcoholId: string) => void;
  setEditingTagIndex: (index: number | null) => void;
  resetPost: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  selectedPlace: null,
  placeRating: 0,
  review: '',
  isRatingModalVisible: false,
  tempRating: 0,
  selectedAlcohols: [],
  editingTagIndex: null,

  setSelectedPlace: (place: Place) => {
    const placeWithRating: PlaceWithRating = {
      ...place,
      feedCount: Math.floor(Math.random() * 50) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
    };
    set({ selectedPlace: placeWithRating, placeRating: 0 }); 
  },

  setPlaceRating: (rating: number) => set({ placeRating: rating }),
  setReview: (text: string) => set({ review: text }),
  setIsRatingModalVisible: (visible: boolean) => set({ isRatingModalVisible: visible }),
  setTempRating: (rating: number) => set({ tempRating: rating }),

  addSelectedAlcohol: (alcohol: Alcohol) =>
    set((state) => ({
      selectedAlcohols: state.selectedAlcohols.some((a) => a.id === alcohol.id)
        ? state.selectedAlcohols
        : [...state.selectedAlcohols, alcohol],
    })),

  removeSelectedAlcohol: (alcoholId: string) =>
    set((state) => ({
      selectedAlcohols: state.selectedAlcohols.filter((a) => a.id !== alcoholId),
    })),

  setEditingTagIndex: (index: number | null) => set({ editingTagIndex: index }),

  resetPost: () =>
    set({
      selectedPlace: null,
      placeRating: 0,
      review: '',
      isRatingModalVisible: false,
      tempRating: 1,
      selectedAlcohols: [],
      editingTagIndex: null,
    }),
}));