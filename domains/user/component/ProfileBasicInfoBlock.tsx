// label, value로 parameter 구성

import EditIcon from '@/assets/icons/edit.svg';
import { Colors, Typography } from '@/shared/constants';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface ProfileBasicInfoBlockProps {
  label: string;
  value: string;
  isEditMode: boolean;
  onValueChange?: (text: string) => void;
  showEditIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const ValueDisplay = ({ value, isEditMode, onValueChange, keyboardType, showEditIcon }: Omit<ProfileBasicInfoBlockProps, 'label'>) => (
  <View style={styles.valueContainer}>
    {isEditMode ? (
      <TextInput
        style={styles.valueInput}
        value={value}
        onChangeText={onValueChange}
        keyboardType={keyboardType}
      />
    ) : (
      <Text style={styles.valueText}>{value}</Text>
    )}
    {isEditMode && showEditIcon && <EditIcon width={16} height={16} />}
  </View>
);

export const ProfileBasicInfoBlock = ({ label, value, isEditMode, onValueChange, showEditIcon, keyboardType }: ProfileBasicInfoBlockProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <ValueDisplay
        value={value}
        isEditMode={isEditMode}
        onValueChange={onValueChange}
        keyboardType={keyboardType}
        showEditIcon={showEditIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 28,
  },
  labelContainer: {
    width: 84,
    height: 25,
    backgroundColor: Colors.black,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  valueInput: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    paddingVertical: 0,
  },
});
