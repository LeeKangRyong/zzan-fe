import { INFO_CONSTANTS } from '@/domains/info/model/constants';
import { Colors } from '@/shared/constants/Colors';
import { Typography } from '@/shared/constants/Typography';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { interpolate } from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CENTER_IMAGE_WIDTH = SCREEN_WIDTH * 0.7; // 중앙 이미지 너비
const IMAGE_HEIGHT = 200;

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const PairingSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <View style={styles.pairingSection}>
    <SectionTitle title={title} />
    <Text style={styles.pairingDescription}>{description}</Text>
  </View>
);

const ImageGallery = ({ images }: { images: ImageSourcePropType[] }) => {
  return (
    <View style={styles.galleryWrapper}>
      <Carousel
        loop={false}
        width={SCREEN_WIDTH} 
        height={IMAGE_HEIGHT}
        style={{
          width: SCREEN_WIDTH,
        }}
        data={images}
        pagingEnabled={true}
        snapEnabled={true}
        scrollAnimationDuration={600}
        customAnimation={(value: number) => {
          'worklet';
          const opacity = interpolate(
            value,
            [-1, 0, 1],
            [0.5, 1, 0.5]
          );

          const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-SCREEN_WIDTH * 0.5, 0, SCREEN_WIDTH * 0.5] 
          );

          // 4. 중앙 이미지 외에는 살짝 작게 보이고 싶다면 scale 추가 (선택사항)
          const scale = interpolate(value, [-1, 0, 1], [0.85, 1, 0.85]);

          return {
            opacity,
            transform: [
              { translateX },
              { scale }
            ],
          };
        }}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={item}
              style={styles.galleryImage}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

interface AlcholDescriptionProps {
  recommendTitle: string;
  recommendDescription: string;
  images: ImageSourcePropType[];
  description: string;
}

export const AlcholDescription = ({
  recommendTitle,
  recommendDescription,
  images,
  description,
}: AlcholDescriptionProps) => {
  return (
    <View style={styles.container}>
      <PairingSection title={recommendTitle} description={recommendDescription} />
      <ImageGallery images={images} />
      <View style={styles.descriptionSection}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    marginBottom: 12,
  },
  pairingSection: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
  },
  pairingDescription: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
  },
  galleryWrapper: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImage: {
    width: CENTER_IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
  },
  descriptionSection: {
    paddingHorizontal: INFO_CONSTANTS.DESCRIPTION_HORIZONTAL_PADDING,
    paddingVertical: INFO_CONSTANTS.SUMMARY_PADDING_VERTICAL,
  },
  description: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 22,
  },
});
