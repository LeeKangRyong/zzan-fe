import {
  FeedImage,
  PlaceRate,
  PlaceRateModal,
  PlaceSummary,
  RateTextInput,
  ReferredAlchol,
  SectionTitle,
} from '@/domains/feed/component';
import { usePostViewModel } from '@/domains/feed/viewmodel/usePostViewModel';
import { Header } from '@/shared/components';
import { CommonButton } from '@/shared/components/CommonButton';
import { Colors, Layout } from '@/shared/constants';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter } from 'expo-router';

export default function PostTab() {
  const router = useRouter();

  const {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    isRatingModalVisible,
    tempRating,
    selectedAlcohols,
    handlePlaceSelect,
    handleReviewChange,
    handleCloseRatingModal,
    handleSaveRating,
    handleTempRatingChange,
    handleBackPress,
    handleNextPress,
  } = usePostViewModel();

  return (
    <View style={styles.container}>
      <Header title="피드 작성" onBackPress={handleBackPress} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={styles.imageSection}>
          <FeedImage />
        </View>

        <View style={styles.paddedContent}>
          <View style={styles.section}>
            {/* TODO: ReferredAlchol ScrollView 가로로 구현하기 */}
            <SectionTitle title="언급된 전통주" count={selectedAlcohols.length} />
            {selectedAlcohols.length > 0 ? (
              <ReferredAlchol alcohols={selectedAlcohols} />
            ) : (
              <CommonButton
                title="이미지를 등록하고 전통주를 추가해보세요"
                textColor={Colors.black}
                backColor={Colors.gray}
                size="S"
                disabled
              />
            )}
          </View>

          <View style={styles.section}>
            <SectionTitle title="짠-플레이스*" />
            {isPlaceSelected && selectedPlace ? (
              <>
                <PlaceRate rating={placeRating} />
                <PlaceSummary
                  name={selectedPlace.name}
                  address={selectedPlace.address}
                  feedCount={selectedPlace.feedCount}
                />
              </>
            ) : (
              <CommonButton
                title="장소 추가하기"
                textColor={Colors.black}
                backColor={Colors.gray}
                size="S"
                onPress={handlePlaceSelect}
              />
            )}
          </View>

          <View style={styles.section}>
            <SectionTitle title="후기" />
            <RateTextInput value={review} onChangeText={handleReviewChange} />
          </View>

          {/* TODO: 활성화됐을 경우에만 다음버튼이 눌리게 하기. 아닌 경우에는 disabled */}
          {/* TODO: 활성화된 다음 버튼 누르면 figma design처럼 넘어가게 됨*/}
          {/* TODO: 언급한 각 전통주에 대해 borderColor가 Colors.black으로 변경됨 */}
          {/* TODO: 전통주가 focus될 때마다 해당 전통주에 대해 해당 이미지에서 해당 plus icon 있는 곳으로 자동 확대됨 */}
          {/* TODO: figma design처럼 RateStyleButton을 통해 별점을 등록하면, 다음 전통주로 focus되면서 해당 이미지로 확대된 채로 이동 */}
          {/* TODO: 만약 plus icon이 다른 이미지에 있으면 해당 이미지로 스크롤 후 자동 확대 */}
          {/* TODO: 모든 전통주에 별점을 매겼으면, console로 완료 메세지를 띄우고 /main으로 이동 */}
          <CommonButton
            title="다음"
            textColor={isNextButtonEnabled ? Colors.yellow : Colors.black}
            backColor={isNextButtonEnabled ? Colors.black : Colors.gray}
            size="L"
            disabled={!isNextButtonEnabled}
            onPress={handleNextPress}
          />
        </View>
      </KeyboardAwareScrollView>

      <PlaceRateModal
        visible={isRatingModalVisible}
        selectedPlace={selectedPlace}
        tempRating={tempRating}
        onClose={handleCloseRatingModal}
        onRatingChange={handleTempRatingChange}
        onSave={handleSaveRating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingBottom: 20 },
  content: {},
  imageSection: { marginBottom: 16 },
  paddedContent: { paddingHorizontal: Layout.SCREEN_HORIZONTAL },
  section: { gap: 8, marginBottom: 24 },
});