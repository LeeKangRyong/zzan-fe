import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { User } from '../model/userModel';

export const useProfileEditViewModel = (initialUser: User) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(initialUser);

  const toggleEditMode = () => {
    if (isEditMode) {
      console.log('Saving user:', editedUser);
    }
    setIsEditMode(!isEditMode);
  };

  const updateUserField = (field: keyof User, value: string) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled) return;
    setEditedUser((prev) => ({ ...prev, profileImage: { uri: result.assets[0].uri } }));
  };

  const cancelEdit = () => {
    setEditedUser(initialUser);
    setIsEditMode(false);
  };

  return {
    isEditMode,
    editedUser,
    toggleEditMode,
    updateUserField,
    selectProfileImage,
    cancelEdit,
  };
};
