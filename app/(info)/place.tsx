import { InfoImages } from '@/domains/info/components/InfoImages';
import { InfoRate } from '@/domains/info/components/InfoRate';
import { InfoSummary } from '@/domains/info/components/InfoSummary';
import { PlaceDescription } from '@/domains/info/components/PlaceDescription';
import { INFO_CONSTANTS } from '@/domains/info/model/constants';
import { useInfoViewModel } from '@/domains/info/viewmodel/useInfoViewModel';
import { AlcholButton, Header } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PlaceTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const {
    placeInfo,
    isBookmarked,
    infoBoxes,
    toggleBookmark,
    handleShare,
    handleAlcholButtonPress,
  } = useInfoViewModel();

  return (
    <View style={styles.container}>
      <Header title="짠 플레이스" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: safeBottom }}
      >
        {/* InfoImages component */}
        <InfoImages images={placeInfo.images} />

        {/* InfoSummary component */}
        {/* Share ui from shared */}
        {/* BookMark ui from shared 사용 */}
        {/* title */}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        <InfoSummary
          title={placeInfo.name}
          category={placeInfo.category}
          infoBoxes={infoBoxes}
          isBookmarked={isBookmarked}
          onSharePress={handleShare}
          onBookmarkPress={toggleBookmark}
        />

        {/* PlaceDescription component */}
        <PlaceDescription description={placeInfo.description} />

        {/* AlcholButton component, title="이 장소에서 전통주를 먹었어요" */}
        <View style={styles.buttonContainer}>
          <AlcholButton
            title="이 장소에서 전통주를 먹었어요"
            onPress={handleAlcholButtonPress}
          />
        </View>

        {/* 구분선 */}
        <View style={styles.line} />

        {/* InfoRate component */}
        {/* Rate ui from shared */}
        {/* InfoRateBlock 나열하기 */}
        <InfoRate rating={placeInfo.rating} reviews={placeInfo.reviews} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    paddingTop: INFO_CONSTANTS.BUTTON_MARGIN_VERTICAL,
    paddingBottom: 0,
  },
  line: {
    backgroundColor: Colors.black,
    marginHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    marginVertical: INFO_CONSTANTS.SUMMARY_PADDING_VERTICAL,
    height: 2,
  },
});
