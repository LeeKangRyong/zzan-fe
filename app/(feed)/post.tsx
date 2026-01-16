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
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

export default function PostTab() {
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
  } = usePostViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // enabled={Platform.OS === 'ios'}
      // behavior="padding"
      // keyboardVerticalOffset={0}
    >
      <Header title="피드 작성" onBackPress={handleBackPress} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
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

          <CommonButton
            title="다음"
            textColor={isNextButtonEnabled ? Colors.yellow : Colors.black}
            backColor={isNextButtonEnabled ? Colors.black : Colors.gray}
            size="L"
          />
        </View>
      </ScrollView>

      <PlaceRateModal
        visible={isRatingModalVisible}
        selectedPlace={selectedPlace}
        tempRating={tempRating}
        onClose={handleCloseRatingModal}
        onRatingChange={handleTempRatingChange}
        onSave={handleSaveRating}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingBottom: 20 },
  content: {},
  imageSection: { marginBottom: 16 },
  paddedContent: { paddingHorizontal: Layout.SCREEN_HORIZONTAL },
  section: { gap: 8, marginBottom: 24 },
});