import CameraIcon from '@/assets/icons/camera.svg';
import { Colors, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DescriptionBlock = () => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>사진을 꾹 눌러 전통주 정보를 추가하세요</Text>
    </View>
  )
}

const pickImages = async (onSuccess: (uris: string[]) => void) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (result.canceled) {
    return;
  }

  const uris = result.assets.map((asset) => asset.uri);
  onSuccess(uris);
};

const renderImage = (uri: string, index: number) => (
  <View key={index} style={styles.imageContainer}>
    <Image source={{ uri }} style={styles.image} />
  </View>
);

const renderInitialUploadButton = (onPress: () => void) => (
  <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
    <CameraIcon width={40} height={40} fill={Colors.gray} />
  </TouchableOpacity>
);

const renderProgressBar = (totalImages: number, animatedWidth: Animated.Value) => {
  if (totalImages <= 1) {
    return null;
  }

  const animatedWidthStyle = {
    width: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, animatedWidthStyle]} />
      </View>
    </View>
  );
};

export const FeedImage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (images.length === 0) return;

    const targetPercentage = ((currentIndex + 1) / images.length) * 100;
    Animated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, images.length, animatedWidth]);

  const handleInitialUpload = () => {
    pickImages((uris) => setImages(uris));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <View style={styles.wrapper}>
        {renderInitialUploadButton(handleInitialUpload)}
        <DescriptionBlock />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((uri, index) => renderImage(uri, index))}
      </ScrollView>
      <DescriptionBlock />
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
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  descriptionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: Colors.black,
    position: 'absolute',
    top: 20,
    left: 12,
    zIndex: 999,
    elevation: 5,
  },
  descriptionText: {
    color: Colors.white,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
  },
  uploadButton: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: Colors.takju,
    justifyContent: 'center',
    alignItems: 'center',
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
});
