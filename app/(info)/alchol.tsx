import { AlcholDescription } from '@/domains/info/components/AlcholDescription';
import { InfoImages } from '@/domains/info/components/InfoImages';
import { InfoRate } from '@/domains/info/components/InfoRate';
import { InfoSummary } from '@/domains/info/components/InfoSummary';
import { INFO_CONSTANTS } from '@/domains/info/model/constants';
import { useAlcoholViewModel } from '@/domains/info/viewmodel/useInfoViewModel';
import { Header } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AlcholTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    toggleBookmark,
    handleShare,
  } = useAlcoholViewModel();

  return (
    <View style={styles.container}>
      <Header title="전통주" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: safeBottom }}
      >
        {/* InfoImages component */}
        <InfoImages images={alcoholInfo.images.map((img) => img.image)} />

        {/* InfoSummary component */}
        {/* Share ui from shared */}
        {/* BookMark ui from shared 사용 */}
        {/* title */}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        {/* 설명 및 내용 box*/}
        <InfoSummary
          title={alcoholInfo.name}
          category={alcoholInfo.category}
          infoBoxes={infoBoxes}
          isBookmarked={isBookmarked}
          onSharePress={handleShare}
          onBookmarkPress={toggleBookmark}
        />

        {/* AlcholDescription component */}
        <AlcholDescription
          recommendTitle={alcoholInfo.recommendTitle}
          recommendDescription={alcoholInfo.recommendDescription}
          images={alcoholInfo.images}
        />

        {/* RateAlcholButton component with toggle functionality */}
        {/* <View style={styles.buttonContainer}>
          <RateAlcholButton />
        </View> */}

        {/* 구분선 */}
        <View style={styles.line} />

        {/* InfoRate component */}
        {/* Rate ui from shared */}
        {/* InfoRateBlock 나열하기 */}
        <InfoRate rating={alcoholInfo.rating} reviews={alcoholInfo.reviews} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // buttonContainer: {
  //   paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
  //   paddingTop: INFO_CONSTANTS.BUTTON_MARGIN_VERTICAL,
  //   paddingBottom: 0,
  // },
  line: {
    backgroundColor: Colors.black,
    marginHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    marginVertical: INFO_CONSTANTS.SUMMARY_PADDING_VERTICAL,
    height: 4,
  },
});