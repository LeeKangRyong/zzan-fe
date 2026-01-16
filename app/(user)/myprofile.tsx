// 비운 전통주에는 `assets/icons/alchol_right.svg` 사용

import BackIcon from '@/assets/icons/back.svg';
import { ProfileBasicInfo, ProfileInfo } from '@/domains/user/component';
import { mockUser } from '@/domains/user/model/mock';
import { useProfileEditViewModel } from '@/domains/user/viewmodel';
import { Colors, Layout, Typography } from '@/shared/constants';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  isEditMode: boolean;
  onEditPress: () => void;
}

const CustomHeader = ({ isEditMode, onEditPress }: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top;

  return (
    <View style={[styles.header, { paddingTop: safeTop + 12 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <BackIcon width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>마이페이지</Text>
      <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditMode ? '저장' : '수정'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MyProfileTab() {
  const { isEditMode, editedUser, toggleEditMode, updateUserField, selectProfileImage } =
    useProfileEditViewModel(mockUser);

  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <CustomHeader isEditMode={isEditMode} onEditPress={toggleEditMode} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <ProfileInfo user={editedUser} isEditMode={isEditMode} onImagePress={selectProfileImage} />
        </View>
        <View style={styles.divider} />
        <View style={styles.basicInfoSection}>
          <ProfileBasicInfo user={editedUser} isEditMode={isEditMode} onUserChange={updateUserField} />
        </View>
        <View style={styles.thinDivider} />
        <TouchableOpacity style={styles.logoutContainer}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    color: Colors.black,
    letterSpacing: -0.32,
  },
  editButton: {
    backgroundColor: Colors.black,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  profileSection: {
    paddingTop: 32,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    alignItems: 'center',
  },
  divider: {
    height: 12,
    backgroundColor: Colors.takju,
    marginTop: 32,
  },
  basicInfoSection: {
    paddingTop: 28,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  thinDivider: {
    height: 2,
    backgroundColor: Colors.black,
    marginTop: 28,
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  logoutContainer: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: 12,
  },
  logoutText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    opacity: 0.5,
    letterSpacing: -0.28,
  },
});
