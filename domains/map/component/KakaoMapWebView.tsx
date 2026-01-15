import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useWebViewMessage } from '../hooks/useWebViewMessage';
import { MapMarker, MapRegion } from '../model/mapModel';
import { generateMapHtml } from './MapHtmlTemplate';

interface KakaoMapWebViewProps {
  region: MapRegion;
  markers: MapMarker[];
  onMarkerPress: (markerId: string) => void;
  apiKey: string;
}

export const KakaoMapWebView = ({ region, markers, onMarkerPress, apiKey }: KakaoMapWebViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const { handleMessage } = useWebViewMessage(onMarkerPress);
  
  const prevTimestampRef = useRef<number | undefined>(region.timestamp);

  useEffect(() => {
    if (region.timestamp !== prevTimestampRef.current) {
      if (webViewRef.current) {
        console.log('[KakaoMapWebView] Sending moveCenter:', region.latitude, region.longitude);
        
        const message = JSON.stringify({
          type: 'moveCenter',
          latitude: region.latitude,
          longitude: region.longitude,
        });

        webViewRef.current.postMessage(message);
      }
      prevTimestampRef.current = region.timestamp;
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          html: generateMapHtml(region, markers, apiKey),
          baseUrl: 'https://zzan-kakao-map.netlify.app' // 등록된 도메인과 일치해야 함
        }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        onMessage={handleMessage}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});