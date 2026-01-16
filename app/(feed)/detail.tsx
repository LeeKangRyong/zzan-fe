import {
  FeedDetailComments,
  FeedDetailImage,
  FeedDetailPlace,
  FeedUser,
  ReferredAlcholWithRate,
} from '@/domains/feed/component';
import { useDetailViewModel } from '@/domains/feed/viewmodel/useDetailViewModel';
import { BookMark, Header, Share } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const renderUserSection = (
  userImageUrl: any,
  username: string,
  isBookmarked: boolean,
  onShare: () => void,
  onBookmark: () => void
) => (
  <View style={styles.userSection}>
    <FeedUser userImageUrl={userImageUrl} username={username} />
    <View style={styles.actionButtons}>
      <Share onPress={onShare} />
      <BookMark isBookmarked={isBookmarked} onPress={onBookmark} />
    </View>
  </View>
);

export default function DetailTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  const {
    user,
    images,
    alcohols,
    alcoholRatings,
    alcoholTagMappings,
    place,
    placeRating,
    review,
    focusedAlcoholId,
    isBookmarked,
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  } = useDetailViewModel();

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <Header title="피드" onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content}>
        <FeedDetailImage
          images={images}
          alcoholTagMappings={alcoholTagMappings}
          onTagPress={handleTagPress}
        />

        <View style={styles.paddedContent}>
          {renderUserSection(
            user.imageUrl,
            user.username,
            isBookmarked,
            handleShare,
            handleBookmark
          )}

          <ReferredAlcholWithRate
            alcohols={alcohols}
            alcoholRatings={alcoholRatings}
            focusedAlcoholId={focusedAlcoholId ?? undefined}
            onAlcoholPress={handleAlcoholPress}
          />

          <FeedDetailPlace
            place={place}
            placeRating={placeRating}
            onPlacePress={handlePlacePress}
          />

          <FeedDetailComments review={review} />
        </View>
      </ScrollView>
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
  paddedContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: 24,
    paddingTop: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});
