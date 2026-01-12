import { INFO_CONSTANTS } from '@/domains/info/model/constants';
import type { InfoBox } from '@/domains/info/model/infoModel';
import { BookMark, Share } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { StyleSheet, Text, View } from 'react-native';

interface InfoSummaryProps {
  title: string;
  category: string;
  infoBoxes: InfoBox[];
  isBookmarked: boolean;
  onSharePress: () => void;
  onBookmarkPress: () => void;
}

const InfoBoxItem = ({ label, value }: InfoBox) => (
  <View style={styles.infoBox}>
    <View style={styles.infoBoxCategory}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export const InfoSummary = ({
  title,
  category,
  infoBoxes,
  isBookmarked,
  onSharePress,
  onBookmarkPress,
}: InfoSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.actions}>
            <Share onPress={onSharePress} />
            <BookMark isBookmarked={isBookmarked} onPress={onBookmarkPress} />
          </View>
        </View>
        <Text style={styles.category}>#{category}</Text>
      </View>
      <View style={styles.infoBoxContainer}>
        {infoBoxes.map((box) => (
          <InfoBoxItem key={box.label} label={box.label} value={box.value} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    paddingVertical: INFO_CONSTANTS.SUMMARY_PADDING_VERTICAL,
  },
  headerContainer: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: INFO_CONSTANTS.TITLE_FONT_SIZE,
    color: Colors.black,
  },
  category: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  infoBoxContainer: {
    marginTop: INFO_CONSTANTS.INFO_BOX_MARGIN_TOP,
    gap: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  infoBoxCategory: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: INFO_CONSTANTS.LABEL_FONT_SIZE,
    color: Colors.white,
    paddingVertical: 3,
    width: 80,
    textAlign: 'center',
  },
  value: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: INFO_CONSTANTS.VALUE_FONT_SIZE,
    color: Colors.black,
    flex: 1,
    textAlign: 'right'
  },
});
