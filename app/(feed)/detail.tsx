import {
  FeedDetailComments,
  FeedDetailImage,
  FeedDetailPlace,
  FeedUser,
  ReferredAlcholWithRate,
} from '@/domains/feed/component';
import { useDetailViewModel } from '@/domains/feed/viewmodel/useDetailViewModel';
import { BookMark, Header, KakaoLoginModal, Share } from '@/shared/components';
import { useModal } from '@/shared/hooks';
import { useAuthStore } from '@/domains/auth/store/authStore';
import { Colors, Layout } from '@/shared/constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
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
  const params = useLocalSearchParams();
  const feedId = params.feedId as string | undefined;
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
    isLoading,
    error,
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  } = useDetailViewModel(feedId);

  const { isAuthenticated } = useAuthStore();
  const { visible, openModal, closeModal } = useModal();

  const handleBookmarkWithAuth = async () => {
    const success = await handleBookmark();

    if (!success && !isAuthenticated) {
      openModal();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>피드를 찾을 수 없습니다.</Text>
      </View>
    );
  }

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
            handleBookmarkWithAuth
          )}

          <ReferredAlcholWithRate
            alcohols={alcohols}
            alcoholRatings={alcoholRatings}
            focusedAlcoholId={focusedAlcoholId ?? undefined}
            onAlcoholPress={(id) => {
              handleAlcoholPress(id);
              router.push({
                pathname: '/alchol',
                params: { liquorId: id },
              });
            }}
          />

          {place && (
            <FeedDetailPlace
              place={place}
              placeRating={placeRating}
              onPlacePress={() => {
                handlePlacePress();
                router.push({
                  pathname: '/place',
                  params: { placeId: place.id },
                });
              }}
            />
          )}

          <FeedDetailComments review={review} />
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
  },
});
