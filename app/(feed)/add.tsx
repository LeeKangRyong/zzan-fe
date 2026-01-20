import { Search, SearchResult, SectionTitle } from '@/domains/feed/component';
import { AddType } from '@/domains/feed/model/feedModel';
import { useAddViewModel } from '@/domains/feed/viewmodel/useAddViewModel';
import { CommonButton, Header, KakaoLoginModal } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useAuthStore } from '@/domains/auth/store/authStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 장소 or 전통주를 검색해서 추가하는 UI
// post.tsx에서 버튼을 누를 때 버튼에 따라 '전통주 추가하기'인지 '장소 추가하기'인지 바뀜
// parameter로 이를 설정하여 같은 UI에서 정보만 바뀌게 하면 됨
// 전통주 추가 시 SearchResult -> 이미지, 이름, #타입
// 장소 추가 시 SearchResult -> 이미지, 이름, 주소

const getHeaderTitle = (addType: AddType) => {
  if (addType === 'place') return '장소 추가하기';
  return '전통주 추가하기';
};

const getButtonColors = (isSelected: boolean) => {
  if (isSelected) return { textColor: Colors.yellow, backColor: Colors.black };
  return { textColor: Colors.black, backColor: Colors.gray };
};

export default function AddTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const params = useLocalSearchParams<{ type?: string }>();
  const addType: AddType = (params.type as AddType) ?? 'alcohol';

  const { isAuthenticated } = useAuthStore();

  const {
    searchQuery,
    setSearchQuery,
    alcoholResults,
    placeResults,
    selectedId,
    handleSearch,
    handleSelect,
    isItemSelected,
    handleAdd,
  } = useAddViewModel({ addType });

  const buttonColors = getButtonColors(isItemSelected);
  const results = addType === 'alcohol' ? alcoholResults : placeResults;

  // ✅ Simple auth guard - modal shows immediately if not authenticated
  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { paddingBottom: safeBottom }]}>
        <KakaoLoginModal visible={true} onClose={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>

      {/* 만약 장소 추가하면, 장소 추가하기 header 사용, 술 추가시 전통주 추가하기 header 사용 */}
      <Header title={getHeaderTitle(addType)} onBackPress={() => router.back()} />

      <View style={styles.content}>
        {/* 이름으로 검색하기 Text*/}
        <SectionTitle title="이름으로 검색하기" />

        {/* Search component */}
        <Search
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          placeholder="검색어를 입력하세요"
        />

        {/* ScrollView 사용*/}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          {/* 검색 결과에 따라 SearchResult component 띄우기 */}
          {results.map((item) => (
            <SearchResult
              key={item.id}
              imageUri={item.imageUrl}
              name={item.name}
              subText={'type' in item ? `#${item.type}` : item.address}
              isSelected={selectedId === item.id}
              onPress={() => handleSelect(item.id)}
            />
          ))}
        </ScrollView>
        {/* ScrollView 종료 */}

        {/* CommonButton component title="추가하기 */}
        {/* default는 textColor=Colors.black 에 backColor=Colors.gray */}
        {/* 하나 선택 시 textColo=Colors.yellow 에 backColor=Colors.black */}
        <CommonButton
          title="추가하기"
          textColor={buttonColors.textColor}
          backColor={buttonColors.backColor}
          onPress={handleAdd}
          disabled={!isItemSelected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: Layout.ITEM_SPACING,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: Layout.ITEM_SPACING,
    paddingVertical: Layout.ITEM_SPACING,
  },
});