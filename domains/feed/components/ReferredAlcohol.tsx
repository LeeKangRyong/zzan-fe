import { Alcohol } from '@/domains/feed/model/feedModel';
import { ScrollView, StyleSheet } from 'react-native';
import { AlcoholCard } from './AlcoholCard';

interface ReferredAlcoholProps {
  alcohols: Alcohol[];
  focusedAlcoholId?: string;
}

export const ReferredAlcohol = ({ alcohols, focusedAlcoholId }: ReferredAlcoholProps) => {
  if (alcohols.length === 0) return null;

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
});
