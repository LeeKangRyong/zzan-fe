import { AlcholDescription } from "@/domains/info/components/AlcholDescription";
import { InfoImages } from "@/domains/info/components/InfoImages";
import { InfoRate } from "@/domains/info/components/InfoRate";
import {
  InfoRateWithProfile,
  MOCK_REVIEWS_FOR_DESIGN,
} from "@/domains/info/components/InfoRateWithProfile";
import { InfoSummary } from "@/domains/info/components/InfoSummary";
import { INFO_CONSTANTS } from "@/domains/info/model/constants";
import { useAlcoholViewModel } from "@/domains/info/viewmodel/useInfoViewModel";
import { Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const renderLoadingState = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color={Colors.purple} />
  </View>
);

const renderErrorState = (message: string) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default function AlcholTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const liquorId = params.liquorId as string | undefined;
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    toggleBookmark,
    handleShare,
  } = useAlcoholViewModel(liquorId);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="전통주" onBackPress={() => router.back()} />
        {renderLoadingState()}
      </View>
    );
  }

  if (error || !alcoholInfo) {
    return (
      <View style={styles.container}>
        <Header title="전통주" onBackPress={() => router.back()} />
        {renderErrorState(error || "주류 정보를 찾을 수 없습니다")}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="전통주" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: safeBottom }}
      >
        <InfoImages images={alcoholInfo.images.map((img) => img.image)} />

        <InfoSummary
          title={alcoholInfo.name}
          category={alcoholInfo.category}
          infoBoxes={infoBoxes}
          isBookmarked={isBookmarked}
          onSharePress={handleShare}
          onBookmarkPress={toggleBookmark}
        />

        <AlcholDescription
          recommendTitle={alcoholInfo.recommendTitle}
          recommendDescription={alcoholInfo.recommendDescription}
          images={alcoholInfo.images}
        />

        <View style={styles.line} />

        <InfoRate rating={alcoholInfo.rating} />

        <ScrollView
          horizontal
          contentContainerStyle={styles.reviewList}
          showsHorizontalScrollIndicator={false}
        >
          {MOCK_REVIEWS_FOR_DESIGN.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <InfoRateWithProfile
                username={review.username}
                userProfileImage={review.userProfileImage}
                imageUrl={review.feedImage}
                placeName={review.liquorName}
                address={review.reviewText}
                alcoholCount={review.score}
                onPress={() => {}}
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: Colors.black,
  },
  line: {
    backgroundColor: Colors.black,
    marginHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    marginVertical: INFO_CONSTANTS.SUMMARY_PADDING_VERTICAL,
    height: 4,
  },
  reviewList: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    gap: 12,
  },
  reviewItem: {},
});
