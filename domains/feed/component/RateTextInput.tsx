import { StyleSheet, TextInput } from 'react-native';
import { Colors, Layout, Typography } from '@/shared/constants';

// 후기를 입력하는 UI
// placeholder 글은 "마셔보신 전통주는 어떠셨나요?" 랑 "안주와도 잘 어울렸나요?"
// 배경색은 Colors.takju
// placeholder 글씨 색은 Colors.black에 opacity 0.3 부여

const PLACEHOLDER_TEXT = '마셔보신 전통주는 어떠셨나요?\n안주와도 잘 어울렸나요?';

interface RateTextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export const RateTextInput = ({ value, onChangeText }: RateTextInputProps) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={PLACEHOLDER_TEXT}
      placeholderTextColor={`${Colors.black}4D`}
      multiline
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.takju,
    borderRadius: Layout.INPUT_RADIUS,
    paddingHorizontal: Layout.INPUT_HORIZONTAL,
    paddingVertical: Layout.INPUT_VERTICAL,
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: Typography.INPUT_TEXT,
    color: Colors.black,
    minHeight: 100,
    textAlignVertical: 'top',
    margin: 0,
  },
});