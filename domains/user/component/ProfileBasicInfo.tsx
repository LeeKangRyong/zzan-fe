// ProfileBasicInfoBlock으로 구성

import { User } from '@/domains/user/model/userModel';
import { Colors, Typography } from '@/shared/constants';
import { useBirthDateFormat, usePhoneFormat } from '@/shared/hooks';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileBasicInfoBlock } from './ProfileBasicInfoBlock';

interface ProfileBasicInfoProps {
  user: User;
  isEditMode: boolean;
  onUserChange?: (field: keyof User, value: string) => void;
}

export const ProfileBasicInfo = ({ user, isEditMode, onUserChange }: ProfileBasicInfoProps) => {
  const { formatPhone } = usePhoneFormat();
  const { formatBirthDate } = useBirthDateFormat();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기본정보</Text>
      <InfoList
        user={user}
        isEditMode={isEditMode}
        onUserChange={onUserChange}
        formatPhone={formatPhone}
        formatBirthDate={formatBirthDate}
      />
    </View>
  );
};

interface InfoListProps {
  user: User;
  isEditMode: boolean;
  onUserChange?: (field: keyof User, value: string) => void;
  formatPhone: (value: string) => string;
  formatBirthDate: (value: string) => string;
}

const InfoList = ({ user, isEditMode, onUserChange, formatPhone, formatBirthDate }: InfoListProps) => (
  <View style={styles.infoList}>
    <ProfileBasicInfoBlock
      label="이름"
      value={user.name}
      isEditMode={false}
      onValueChange={(text) => onUserChange?.('name', text)}
      showEditIcon={false}
    />
    <ProfileBasicInfoBlock
      label="생년월일"
      value={user.birthDate}
      isEditMode={isEditMode}
      onValueChange={(text) => onUserChange?.('birthDate', formatBirthDate(text))}
      showEditIcon={true}
      keyboardType="numeric"
    />
    <ProfileBasicInfoBlock
      label="전화번호"
      value={user.phone}
      isEditMode={isEditMode}
      onValueChange={(text) => onUserChange?.('phone', formatPhone(text))}
      showEditIcon={true}
      keyboardType="numeric"
    />
    <ProfileBasicInfoBlock
      label="이메일"
      value={user.email}
      isEditMode={isEditMode}
      onValueChange={(text) => onUserChange?.('email', text)}
      showEditIcon={true}
      keyboardType="email-address"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 28,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 22,
    color: Colors.black,
    letterSpacing: -0.44,
  },
  infoList: {
    gap: 24,
  },
});
