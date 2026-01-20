import {
  AlcoholRateSection,
  FeedImageRate,
  RateStyleButton,
} from '@/domains/feed/component';
import { useRateViewModel } from '@/domains/feed/viewmodel/useRateViewModel';
import { Header, KakaoLoginModal } from '@/shared/components';
import { useModal } from '@/shared/hooks';
import { useAuthStore } from '@/domains/auth/store/authStore';
import { Colors, Layout, Typography } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const segments = Array.from({ length: total }, (_, index) => index);

  return (
    <View style={styles.progressBarContainer}>
      {segments.map((index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index <= current && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );
};

export default function RateTab() {
  const {
    currentAlcohol,
    currentRatingIndex,
    totalAlcohols,
    tempRating,
    setTempRating,
    handleSaveRating,
    alcoholRatings,
    selectedAlcohols,
  } = useRateViewModel();

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { visible, openModal, closeModal } = useModal();

  const handleSaveRatingWithAuth = async () => {
    const success = await handleSaveRating();

    if (!success && !isAuthenticated) {
      openModal();
    }
  };

  {/* TODO: 전통주가 focus될 때마다 해당 전통주에 대해 해당 이미지에서 해당 plus icon 있는 곳으로 자동 확대됨 */}
  {/* TODO: figma design처럼 RateStyleButton을 통해 별점을 등록하면, 다음 전통주로 focus되면서 해당 이미지로 확대된 채로 이동 */}
  {/* TODO: 만약 plus icon이 다른 이미지에 있으면 해당 이미지로 스크롤 후 자동 확대 */}
  {/* TODO: 모든 전통주에 별점을 매겼으면, console로 완료 메세지를 띄우고 /main으로 이동 */}

  if (!currentAlcohol) {
    return (
      <View style={styles.container}>
        <Header title="전통주 평가하기" onBackPress={ () => router.back() } />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>전통주를 먼저 추가해주세요</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="전통주 평가하기" onBackPress={ () => router.back() } />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageSection}>
          <FeedImageRate currentAlcoholId={currentAlcohol?.id ?? null} />
        </View>

        <View style={styles.paddedContent}>
          <Text style={styles.progressText}>
            마신 전통주의 맛을 평가해 주세요! ({currentRatingIndex + 1}/{totalAlcohols})
          </Text>

          <ProgressBar current={currentRatingIndex} total={totalAlcohols} />

          <View style={styles.alcoholSection}>
            <AlcoholRateSection
              alcohols={selectedAlcohols}
              currentIndex={currentRatingIndex}
              ratings={alcoholRatings}
            />
          </View>

          <View style={styles.rateSection}>
            <RateStyleButton
              title="취향에 얼마나 맞았나요?"
              rating={tempRating}
              onRatingChange={setTempRating}
              onSave={handleSaveRatingWithAuth}
            />
          </View>
        </View>
      </ScrollView>

      <KakaoLoginModal visible={visible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 20,
  },
  imageSection: {
    marginBottom: 16,
  },
  paddedContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  progressText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  progressBarContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 24,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.white,
  },
  progressSegmentActive: {
    backgroundColor: Colors.black,
  },
  alcoholSection: {
    marginBottom: 24,
  },
  rateSection: {
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
  },
});
