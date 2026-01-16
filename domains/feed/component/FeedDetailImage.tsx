import PlusIcon from '@/assets/icons/plus.svg';
import { AlcholCounts } from '@/domains/feed/component/AlcholCounts';
import { AlcoholTagInfo, FeedImage } from '@/domains/feed/model/feedModel';
import { Colors } from '@/shared/constants';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Animated as RNAnimated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface FeedDetailImageProps {
  images: FeedImage[];
  alcoholTagMappings: AlcoholTagInfo[];
  onTagPress: (alcoholId: string) => void;
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

const renderTagIcon = (tag: AlcoholTagInfo, onTagPress: (alcoholId: string) => void) => (
  <TouchableOpacity
    key={`${tag.alcoholId}-${tag.imageIndex}`}
    style={[styles.tagIcon, { left: tag.tagPosition.x - 12, top: tag.tagPosition.y - 12 }]}
    onPress={() => onTagPress(tag.alcoholId)}
  >
    <PlusIcon width={12} height={12} fill={Colors.black} />
  </TouchableOpacity>
);

const renderImageWithTags = (
  imageSource: any,
  index: number,
  tagsForImage: AlcoholTagInfo[],
  onTagPress: (alcoholId: string) => void
) => (
  <View key={index} style={styles.imageContainer}>
    <Image source={imageSource} style={styles.image} />
    {tagsForImage.map((tag) => renderTagIcon(tag, onTagPress))}
  </View>
);

export const FeedDetailImage = ({
  images,
  alcoholTagMappings,
  onTagPress,
}: FeedDetailImageProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const animatedWidth = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    if (images.length === 0) return;

    const targetPercentage = ((currentImageIndex + 1) / images.length) * 100;
    RNAnimated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex, images.length, animatedWidth]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(newIndex);
  };

  if (images.length === 0) return null;

  const alcoholCount = alcoholTagMappings.length;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => {
          const tagsForImage = alcoholTagMappings.filter((tag) => tag.imageIndex === index);
          return renderImageWithTags(image.uri, index, tagsForImage, onTagPress);
        })}
      </ScrollView>
      {renderProgressBar(images.length, animatedWidth)}
      <AlcholCounts count={alcoholCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
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
});
