import { INFO_CONSTANTS } from '@/domains/info/model/constants';
import type { PlaceReview } from '@/domains/info/model/infoModel';
import { Rate } from '@/shared/components';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InfoRateBlock } from './InfoRateBlock';

interface InfoRateProps {
  rating: number;
  reviews: PlaceReview[];
}

export const InfoRate = ({ rating, reviews }: InfoRateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>후기 평점</Text>
        <View style={styles.ratingContainer}>
          <Rate rating={rating} />
          <Text style={styles.ratingText}>{rating.toFixed(1)} / 5점</Text>
        </View>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.reviewList}>
        {reviews.map((review) => (
          <InfoRateBlock key={review.id} imageUrl={review.imageUrl} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: INFO_CONSTANTS.RATE_SECTION_PADDING,
  },
  header: {
    paddingHorizontal: INFO_CONSTANTS.RATE_SECTION_PADDING,
    marginBottom: 12,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
    color: Colors.black,
  },
  reviewList: {
    paddingHorizontal: INFO_CONSTANTS.RATE_SECTION_PADDING,
    gap: INFO_CONSTANTS.REVIEW_BLOCK_MARGIN,
  },
});
