import { MyFeeds, MyScraps, ProfileInfoBlock } from '@/domains/user/component';
import { mockUser } from '@/domains/user/model/mock';
import { Header } from '@/shared/components/Header';
import { Colors, Layout, Typography } from '@/shared/constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabType = '스크랩' | '내가 쓴 피드';

const TabSelector = ({ selected, onSelect }: { selected: TabType; onSelect: (tab: TabType) => void }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => onSelect('스크랩')}>
        <Text style={[styles.tabText, selected === '스크랩' ? styles.tabTextActive : styles.tabTextInactive]}>스크랩</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('내가 쓴 피드')}>
        <Text style={[styles.tabText, selected === '내가 쓴 피드' ? styles.tabTextActive : styles.tabTextInactive]}>내가 쓴 피드</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MyPageTab() {
  // Header title="마이페이지" onBackPress={() => router.back }

  // MyInfoBlock component
    // 클릭 시 `/myprofile`로 route

  // 스크랩, 내가 쓴 피드 선택 component

  // 스크랩 선택 시 -> MyScraps component

  // 내가 쓴 피드 선택 시 -> MyFeeds component
  const [selectedTab, setSelectedTab] = useState<TabType>('스크랩');
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <Header title="마이페이지" onBackPress={() => router.back()} />
      <View style={styles.profileInfo}>
        <ProfileInfoBlock user={mockUser} />
      </View>
      <View style={styles.tabSection}>
        <TabSelector selected={selectedTab} onSelect={setSelectedTab} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === '스크랩' ? <MyScraps /> : <MyFeeds />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabSection: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 17,
    height: 27,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  tabTextActive: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
  },
  tabTextInactive: {
    opacity: 0.3,
  },
  content: {
    paddingBottom: 24,
  },
  profileInfo: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingTop: 32,
    paddingBottom: 16,
  }
});