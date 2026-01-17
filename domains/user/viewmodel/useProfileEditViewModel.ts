import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import type { User, UserApiResponse } from '../model/userModel';
import { mapUserToApiRequest } from '../model/userMapper';
import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { ApiResponse } from '@/shared/types/api';

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

export const useProfileEditViewModel = (initialUser: User | null) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(initialUser);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedUser(initialUser);
  }, [initialUser]);

  const saveUser = async (): Promise<boolean> => {
    if (!editedUser) return false;

    if (isMockEnabled()) {
      return true;
    }

    setIsSaving(true);
    try {
      await apiClient<ApiResponse<UserApiResponse>>(API_ENDPOINTS.USER.ME, {
        method: 'PATCH',
        body: mapUserToApiRequest(editedUser),
        requireAuth: true,
      });
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditMode = async () => {
    if (isEditMode) {
      await saveUser();
    }
    setIsEditMode(!isEditMode);
  };

  const updateUserField = (field: keyof User, value: string) => {
    setEditedUser((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled) return;
    setEditedUser((prev) => {
      if (!prev) return prev;
      return { ...prev, profileImage: { uri: result.assets[0].uri } };
    });
  };

  const cancelEdit = () => {
    setEditedUser(initialUser);
    setIsEditMode(false);
  };

  return {
    isEditMode,
    editedUser,
    isSaving,
    toggleEditMode,
    updateUserField,
    selectProfileImage,
    cancelEdit,
  };
};
