import AlcoholIcon from "@/assets/icons/alcohol_right.svg";
import { Colors, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const exampleImage = require("@/assets/images/example_image.png");

// 디자인용 Mock 데이터
const MOCK_REVIEWS_FOR_DESIGN = [
  {
    id: "review1",
    userId: "user1",
    username: "이정훈",
    userProfileImage: exampleImage,
    feedImage: exampleImage,
    liquorName: "울산 문화의 거리",
    reviewText: "울산광역시 중구 성남동 329-5",
    score: 5,
  },
  {
    id: "review2",
    userId: "user2",
    username: "김정현",
    userProfileImage: exampleImage,
    feedImage: exampleImage,
    liquorName: "서울 종로 전통주 거리",
    reviewText: "서울특별시 종로구 종로3가 112",
    score: 2,
  },
  {
    id: "review3",
    userId: "user3",
    username: "황인수",
    userProfileImage: exampleImage,
    feedImage: exampleImage,
    liquorName: "전주 한옥마을",
    reviewText: "전라북도 전주시 완산구 기린대로 99",
    score: 4,
  },
  {
    id: "review4",
    userId: "user4",
    username: "김병수",
    userProfileImage: exampleImage,
    feedImage: exampleImage,
    liquorName: "경주 교동법주마을",
    reviewText: "경상북도 경주시 교동 69",
    score: 4,
  },
  {
    id: "review5",
    userId: "user5",
    username: "김세림",
    userProfileImage: exampleImage,
    feedImage: exampleImage,
    liquorName: "대전 으능정이 거리",
    reviewText: "대전광역시 중구 은행동 145",
    score: 3,
  },
];

interface InfoRateWithProfileProps {
  username: string;
  userProfileImage: ImageSourcePropType;
  imageUrl: ImageSourcePropType;
  placeName: string;
  address: string;
  alcoholCount: number;
  onPress: () => void;
}

const UserProfile = ({
  image,
  name,
}: {
  image: ImageSourcePropType;
  name: string;
}) => (
  <View style={styles.userProfile}>
    <Image source={image} style={styles.profileImage} />
    <Text style={styles.username}>{name}</Text>
  </View>
);

const Badge = ({ count }: { count: number }) => (
  <View style={styles.badge}>
    <AlcoholIcon width={20} height={18} />
    <Text style={styles.badgeText}>{count}</Text>
  </View>
);

const PlaceInfo = ({ name, address }: { name: string; address: string }) => (
  <View style={styles.placeInfo}>
    <Text style={styles.placeName} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.address} numberOfLines={1}>
      {address}
    </Text>
  </View>
);

export const InfoRateWithProfile = ({
  username,
  userProfileImage,
  imageUrl,
  placeName,
  address,
  alcoholCount,
  onPress,
}: InfoRateWithProfileProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} contentFit="cover" />
        <UserProfile image={userProfileImage} name={username} />
        <Badge count={alcoholCount} />
      </View>
      <PlaceInfo name={placeName} address={address} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  userProfile: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  badge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  placeInfo: {
    paddingTop: 10,
    gap: 2,
  },
  placeName: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  address: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.2,
  },
});

// Export mock data for use in other components
export { MOCK_REVIEWS_FOR_DESIGN };
