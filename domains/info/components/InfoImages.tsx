import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Colors } from '@/shared/constants/Colors';
import { INFO_CONSTANTS } from '@/domains/info/model/constants';

interface InfoImagesProps {
  images: ImageSourcePropType[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const InfoImages = ({ images }: InfoImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }: { item: ImageSourcePropType }) => (
    <Image source={item} style={styles.image} resizeMode="cover" />
  );

  const renderIndicator = (index: number) => {
    const isActive = index === currentIndex;
    return (
      <View
        key={index}
        style={[styles.indicator, isActive && styles.indicatorActive]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => renderIndicator(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: INFO_CONSTANTS.IMAGE_HEIGHT,
  },
  image: {
    width: SCREEN_WIDTH,
    height: INFO_CONSTANTS.IMAGE_HEIGHT,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: INFO_CONSTANTS.IMAGE_INDICATOR_MARGIN,
  },
  indicator: {
    width: INFO_CONSTANTS.IMAGE_INDICATOR_SIZE,
    height: INFO_CONSTANTS.IMAGE_INDICATOR_SIZE,
    borderRadius: INFO_CONSTANTS.IMAGE_INDICATOR_SIZE / 2,
    backgroundColor: Colors.gray,
  },
  indicatorActive: {
    backgroundColor: Colors.yellow,
  },
});
