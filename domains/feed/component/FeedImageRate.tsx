import PlusIcon from '@/assets/icons/plus.svg';
import { AlcoholTagInfo, TagPosition } from '@/domains/feed/model/feedModel';
import { usePostStore } from '@/domains/feed/store/postStore';
import { Colors, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import {
  Animated as RNAnimated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface FeedImageRateProps {
  currentAlcoholId: string | null;
}

const renderProgressBar = (totalImages: number, animatedWidth: RNAnimated.Value) => {
  if (totalImages <= 1) return null;

  const animatedWidthStyle = {
    width: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <RNAnimated.View style={[styles.progressBarFill, animatedWidthStyle]} />
      </View>
    </View>
  );
};

const renderTagIcon = (tag: TagPosition, tagIndex: number) => (
  <View
    key={tagIndex}
    style={[styles.tagIcon, { left: tag.x - 12, top: tag.y - 12 }]}
  >
    <PlusIcon width={12} height={12} fill={Colors.black} />
  </View>
);

export const FeedImageRate = ({ currentAlcoholId }: FeedImageRateProps) => {
  const {
    uploadedImages,
    imageTags,
    alcoholTagMappings,
    currentImageIndex,
    setCurrentImageIndex,
  } = usePostStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [images, setImages] = useState<string[]>([]);
  const animatedWidth = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    if (uploadedImages.length > 0) {
      setImages(uploadedImages);
    }
  }, [uploadedImages]);

  useEffect(() => {
    if (images.length === 0) return;

    const targetPercentage = ((currentImageIndex + 1) / images.length) * 100;
    RNAnimated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex, images.length, animatedWidth]);

  const performZoomOrReset = (mapping: AlcoholTagInfo | null) => {
    if (!mapping) {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      return;
    }

    if (scrollViewRef.current && mapping.imageIndex !== currentImageIndex) {
      scrollViewRef.current.scrollTo({
        x: mapping.imageIndex * SCREEN_WIDTH,
        animated: true,
      });
    }

    setCurrentImageIndex(mapping.imageIndex);

    const { x, y } = mapping.tagPosition;
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_WIDTH / 2;

    translateX.value = withSpring(centerX - x);
    translateY.value = withSpring(centerY - y);
    scale.value = withSpring(2);
  };

  useEffect(() => {
    if (!currentAlcoholId) {
      performZoomOrReset(null);
      return;
    }

    const mapping = alcoholTagMappings.find(
      (m) => m.alcoholId === currentAlcoholId
    );

    performZoomOrReset(mapping || null);
  }, [currentAlcoholId, alcoholTagMappings]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const renderImageWithTags = (uri: string, index: number) => {
    const currentImageTags = imageTags.get(index) || [];
    const isCurrentImage = index === currentImageIndex;

    return (
      <Animated.View
        key={index}
        style={[styles.imageContainer, isCurrentImage && animatedStyle]}
      >
        <Image source={{ uri }} style={styles.image} />
        {currentImageTags.map((tag, tagIndex) => renderTagIcon(tag, tagIndex))}
      </Animated.View>
    );
  };

  if (images.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}>이미지가 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        scrollEnabled={false}
      >
        {images.map((uri, index) => renderImageWithTags(uri, index))}
      </ScrollView>
      {renderProgressBar(images.length, animatedWidth)}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    width: '100%',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 16,
    width: '50%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.white,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.black,
  },
  tagIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: Colors.takju,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  emptyText: {
    fontFamily: Typography.KAKAO_SAMLL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
});
