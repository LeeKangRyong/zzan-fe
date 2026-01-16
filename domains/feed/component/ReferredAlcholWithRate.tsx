import { Alcohol } from '@/domains/feed/model/feedModel';
import { Rate } from '@/shared/components/Rate';
import { Colors, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ReferredAlcholWithRateProps {
  alcohols: Alcohol[];
  alcoholRatings: { [alcoholId: string]: number };
  focusedAlcoholId?: string;
  onAlcoholPress: (alcoholId: string) => void;
}

interface AlcoholCardProps {
  alcohol: Alcohol;
  rating: number;
  isFocused: boolean;
  onPress: () => void;
}

const AlcoholCard = ({ alcohol, rating, isFocused, onPress }: AlcoholCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.card, isFocused && styles.focusedCard]}>
        <View style={styles.topInfo}>
          <Image source={alcohol.imageUrl} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name} numberOfLines={1}>{alcohol.name}</Text>
            <Text style={styles.type}>#{alcohol.type}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>평점</Text>
          <Rate rating={rating} size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const scrollToAlcohol = (
  scrollViewRef: React.RefObject<ScrollView | null>,
  alcohols: Alcohol[],
  alcoholId: string
) => {
  const alcoholIndex = alcohols.findIndex((a) => a.id === alcoholId);
  if (alcoholIndex === -1) return;

  const CARD_WIDTH = 180;
  const GAP = 12;
  const xPosition = alcoholIndex * (CARD_WIDTH + GAP);

  scrollViewRef.current?.scrollTo({
    x: xPosition,
    animated: true,
  });
};

export const ReferredAlcholWithRate = ({
  alcohols,
  alcoholRatings,
  focusedAlcoholId,
  onAlcoholPress,
}: ReferredAlcholWithRateProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!focusedAlcoholId) return;
    scrollToAlcohol(scrollViewRef, alcohols, focusedAlcoholId);
  }, [focusedAlcoholId, alcohols]);

  if (alcohols.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>언급된 전통주 ({alcohols.length}개)</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {alcohols.map((alcohol) => (
          <AlcoholCard
            key={alcohol.id}
            alcohol={alcohol}
            rating={alcoholRatings[alcohol.id] || 0}
            isFocused={alcohol.id === focusedAlcoholId}
            onPress={() => onAlcoholPress(alcohol.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: 0,
  },
  scrollContent: {
    gap: 12,
  },
  card: {
    width: 180,
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focusedCard: {
    borderColor: Colors.black,
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  type: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingLabel: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
});