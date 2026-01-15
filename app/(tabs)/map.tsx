import { MapHeader } from "@/domains/map/component";
import { KakaoMapWebView } from '@/domains/map/component/KakaoMapWebView';
import { useMapViewModel } from '@/domains/map/viewmodel/useMapViewModel';
import { Layout } from "@/shared/constants";
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapTab() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const { region, markers, handleMarkerPress } = useMapViewModel();
  const apiKey = Constants.expoConfig?.extra?.kakaoJavascriptKey ?? '';

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      {/* MapHeader component */}
      <MapHeader onProfilePress={handleProfilePress} />
      <View style={styles.mapWrapper}>
        <KakaoMapWebView
          region={region}
          markers={markers}
          onMarkerPress={handleMarkerPress}
          apiKey={apiKey}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapWrapper: {
    flex: 1,
  },
});
