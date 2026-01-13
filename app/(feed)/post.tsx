import {
  FeedImage,
  RateTextInput,
  SectionTitle,
} from '@/domains/feed/component';
import { Header } from '@/shared/components';
import { CommonButton } from '@/shared/components/CommonButton';
import { Colors, Layout } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Feed 작성하는 UI
export default function PostTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Header title="피드 작성" onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: safeBottom + 12 }]}>
        {/* FeedImage component */}
        <View style={styles.imageSection}>
          <FeedImage />
        </View>

        <View style={styles.paddedContent}>
          {/* 언급한 전통주 (n개) */}
          <View style={styles.section}>
            <SectionTitle title="언급된 전통주" count={0} />
            {/* CommonButton title="이미지를 등록하고 전통주를 추가해보세요" textColor=Colors.black backColor=Colors.gray */}
            <CommonButton
              title="이미지를 등록하고 전통주를 추가해보세요"
              textColor={Colors.black}
              backColor={Colors.gray}
              size="S"
            />
          </View>

          {/* 짠-플레이스* */}
          <View style={styles.section}>
            <SectionTitle title="짠-플레이스*" />
            {/* CommonButton title="이미지를 등록하고 전통주를 추가해보세요" textColor=Colors.black backColor=Colors.gray */}
            <CommonButton
              title="장소 추가하기"
              textColor={Colors.black}
              backColor={Colors.gray}
              size="S"
            />
            {/* 작성하고 있던 상태를 zustand에 저장 후 add로 routing됨 */}
          </View>

          {/* 후기 */}
          <View style={styles.section}>
            <SectionTitle title="후기" />
            {/* RateTextInput component */}
            <RateTextInput />
          </View>

          {/* CommonButton title="다음" textColor=Colors.yellow backColor=Colors.black */}
          <CommonButton
            title="다음"
            textColor={Colors.black}
            backColor={Colors.gray}
            size="L"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {},
  imageSection: {
    marginBottom: 16,
  },
  paddedContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  section: {
    gap: 8,
    marginBottom: 24,
  },
});