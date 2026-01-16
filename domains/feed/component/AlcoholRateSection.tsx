import { Alcohol } from '@/domains/feed/model/feedModel';
import { Colors, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface AlcoholRateSectionProps {
  alcohols: Alcohol[];
  currentIndex: number;
  ratings: { [alcoholId: string]: number };
}

interface AlcoholCardProps {
  alcohol: Alcohol;
  isFocused: boolean;
}

const AlcoholCard = ({ alcohol, isFocused }: AlcoholCardProps) => {
  return (
    <View style={[styles.card, isFocused && styles.focusedCard]}>
      <Image source={alcohol.imageUrl} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={1}>
          {alcohol.name}
        </Text>
        <Text style={styles.type}>#{alcohol.type}</Text>
      </View>
    </View>
  );
};

export const AlcoholRateSection = ({
  alcohols,
  currentIndex,
  ratings,
}: AlcoholRateSectionProps) => {
  if (alcohols.length === 0) return null;

  const focusedAlcoholId = alcohols[currentIndex]?.id;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {alcohols.map((alcohol) => (
        <AlcoholCard
          key={alcohol.id}
          alcohol={alcohol}
          isFocused={alcohol.id === focusedAlcoholId}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: 12,
  },
  card: {
    width: 180,
    height: 60,
    backgroundColor: Colors.takju,
    borderRadius: 6,
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focusedCard: {
    borderColor: Colors.black,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
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
});
