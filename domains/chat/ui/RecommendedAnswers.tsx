import type { RecommendedAnswer } from '@/domains/chat/model/chatModel';
import { CHAT_CONSTANTS } from '@/domains/chat/model/constants';
import { Typography } from '@/shared/constants/Typography';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RecommendedChip } from './RecommendedChip';

interface RecommendedAnswersProps {
  answers: RecommendedAnswer[];
  onSelectAnswer: (text: string) => void;
  labelColor: string;
  chipBackgroundColor: string;
  chipTextColor: string;
}

export const RecommendedAnswers = ({
  answers,
  onSelectAnswer,
  labelColor,
  chipBackgroundColor,
  chipTextColor,
}: RecommendedAnswersProps) => (
  <View style={styles.container}>
    <Text style={[styles.label, { color: labelColor }]}>
      {CHAT_CONSTANTS.RECOMMENDED_LABEL}
    </Text>
    
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipContainer}
    >
      {answers.map((answer) => (
        <RecommendedChip
          key={answer.id}
          text={answer.text}
          onPress={() => onSelectAnswer(answer.text)}
          backgroundColor={chipBackgroundColor}
          textColor={chipTextColor}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: CHAT_CONSTANTS.RECOMMENDED_SECTION_SPACING,
  },
  label: {
    fontFamily: Typography.KAKAO_BIG_SANS_REGULAR,
    fontSize: 10,
    opacity: CHAT_CONSTANTS.LABEL_OPACITY,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  }
});
