// 주변 피드 보는 UI
import { mockNearbyFeeds } from '@/domains/feed/model/mock';
import { useFeedTabViewModel } from '@/domains/feed/viewmodel';
import { FeedBlockWithProfile } from '@/domains/user/component';
import { Colors, Layout, Typography } from '@/shared/constants';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ location }: { location: string }) => (
  <View style={styles.header}>
    <Text style={styles.title}>주변 피드</Text>
    <Text style={styles.location}>위치 ㅣ {location}</Text>
  </View>
);

const FeedGrid = () => (
  <View style={styles.feedGrid}>
    {mockNearbyFeeds.map((feed) => (
      <FeedBlockWithProfile
        key={feed.id}
        userId={feed.userId}
        username={feed.username}
        userProfileImage={feed.userProfileImage}
        imageUrl={feed.imageUrl}
        placeName={feed.placeName}
        address={feed.address}
        alcoholCount={feed.alcoholCount}
        onPress={() => router.push(`/detail?feedId=${feed.id}` as any)}
      />
    ))}
  </View>
);

export default function FeedTab() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top;
  
  const TAB_BAR_HEIGHT = 60;
  const bottomSpace = (insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK) + TAB_BAR_HEIGHT;

  const { location } = useFeedTabViewModel();

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header location={location} />
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomSpace + 24 }]} 
        showsVerticalScrollIndicator={false}
      >
        <FeedGrid />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 20,
    color: Colors.black,
    letterSpacing: -0.4,
  },
  location: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  scrollContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  feedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});