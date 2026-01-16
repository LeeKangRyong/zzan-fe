// 각 피드 블록은 shared/component에 FeedBlock.tsx로 구현
import { mockUserFeeds } from '@/domains/user/model/mock';
import { FeedBlock } from '@/shared/components/FeedBlock';
import { Layout } from '@/shared/constants';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export const MyFeeds = () => {
  // 내가 쓴 피드 확인. 클릭 시 각 feed 상세로 route
  return (
    <View style={styles.container}>
      <View style={styles.feedGrid}>
        {mockUserFeeds.map((feed) => (
          <FeedBlock
            key={feed.id}
            imageUrl={feed.imageUrl}
            placeName={feed.placeName}
            address={feed.address}
            alcholCount={feed.alcoholCount}
            onPress={() => router.push('/detail' as any)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  feedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});