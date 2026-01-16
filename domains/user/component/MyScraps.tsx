// 각 피드 블록은 shared/component에 FeedBlock.tsx로 구현
import { mockUserScrapAlcohols, mockUserScrapFeeds } from '@/domains/user/model/mock';
import { UserScrapAlcohol } from '@/domains/user/model/userModel';
import { FeedBlock } from '@/shared/components/FeedBlock';
import { Rate } from '@/shared/components/Rate';
import { Colors, Layout, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterType = '피드' | '전통주';

const FilterToggle = ({ selected, onSelect }: { selected: FilterType; onSelect: (filter: FilterType) => void }) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={() => onSelect('피드')} style={[styles.filterButton, selected === '피드' && styles.filterButtonActive]}>
        <Text style={[styles.filterText, selected === '피드' && styles.filterTextActive]}>피드</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('전통주')} style={[styles.filterButton, selected === '전통주' && styles.filterButtonActive]}>
        <Text style={[styles.filterText, selected === '전통주' && styles.filterTextActive]}>전통주</Text>
      </TouchableOpacity>
    </View>
  );
};

const AlcoholScrapCard = ({ alcohol, onPress }: { alcohol: UserScrapAlcohol; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.alcoholCard}>
      <View style={styles.alcoholTopSection}>
        <Image source={alcohol.imageUrl} style={styles.alcoholImage} contentFit="cover" />
        <View style={styles.alcoholInfo}>
          <Text style={styles.alcoholName} numberOfLines={1}>{alcohol.name}</Text>
          <Text style={styles.alcoholType}>#{alcohol.type}</Text>
        </View>
      </View>
      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>평점</Text>
        <Rate rating={alcohol.rating} size={22} />
        <Text style={styles.ratingText}>{alcohol.rating}/5점 ({alcohol.reviewCount}개)</Text>
      </View>
    </TouchableOpacity>
  );
};

export const MyScraps = () => {
  // 피드, 전통주 중 선택
    // 피드 선택 시, 내가 bookmark한 피드 모임이 있는 component. 클릭 시 해당 상세 피드로 route
    // 전통주 선택 시, 내가 bookmark한 전통주 모임이 있는 component. 클릭 시 해당 상세 전통주로 route
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('피드');

  return (
    <View style={styles.container}>
      <FilterToggle selected={selectedFilter} onSelect={setSelectedFilter} />
      {selectedFilter === '피드' ? (
        <View style={styles.feedGrid}>
          {mockUserScrapFeeds.map((feed) => (
            <FeedBlock
              key={feed.id}
              imageUrl={feed.imageUrl}
              placeName={feed.placeName}
              address={feed.address}
              alcholCount={feed.alcoholCount}
              onPress={() => router.push('/feed/detail' as any)}
            />
          ))}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.alcoholList} showsVerticalScrollIndicator={false}>
          {mockUserScrapAlcohols.map((alcohol) => (
            <AlcoholScrapCard
              key={alcohol.id}
              alcohol={alcohol}
              onPress={() => router.push('/feed/detail' as any)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    height: 37,
    paddingHorizontal: 20,
    backgroundColor: Colors.takju,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.black,
  },
  filterText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  filterTextActive: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    color: Colors.white,
  },
  feedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  alcoholList: {
    gap: 12,
  },
  alcoholCard: {
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 14,
    gap: 12,
  },
  alcoholTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alcoholImage: {
    width: 40,
    height: 40,
    borderRadius: 2,
  },
  alcoholInfo: {
    flex: 1,
    gap: 4,
  },
  alcoholName: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  alcoholType: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  ratingSection: {
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
  ratingText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.2,
  },
});