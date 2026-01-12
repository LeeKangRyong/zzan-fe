import { Header } from "@/shared/components";
import { Colors } from "@/shared/constants";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PlaceTab() {
  const router= useRouter();

  return (
    <View style={styles.container}>
      <Header title="짠 플레이스" onBackPress={() => router.back() }/>

        {/* InfoImages component */}

        { /* InfoSummary component */}
          {/* Share ui from shared */}
          {/* BookMark ui from shared 사용 */}

          {/* title */}
          {/* 설명 및 내용 box*/}
          {/* 설명 및 내용 box*/}
          {/* 설명 및 내용 box*/}
          {/* 설명 및 내용 box*/}
        
        {/* PlaceDescription component */}

        {/* AlcholButton component, title="이 장소에서 전통주를 먹었어요" */}

        {/* InfoRate component */}
          {/* Rate ui from shared */}
          {/* InfoRateBlock 나열하기 */}
          
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
});