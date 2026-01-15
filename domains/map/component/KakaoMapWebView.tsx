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
  focusedMarkerId?: string | null;
}

export const KakaoMapWebView = ({ region, markers, onMarkerPress, apiKey, focusedMarkerId }: KakaoMapWebViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const { handleMessage } = useWebViewMessage(onMarkerPress);

  const prevTimestampRef = useRef<number | undefined>(region.timestamp);
  const prevFocusedMarkerIdRef = useRef<string | null | undefined>(focusedMarkerId);

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

        // If there's a focused marker, send focus message after a short delay
        if (focusedMarkerId) {
          setTimeout(() => {
            if (webViewRef.current) {
              console.log('[KakaoMapWebView] Sending focusMarker after moveCenter:', focusedMarkerId);
              const focusMessage = JSON.stringify({
                type: 'focusMarker',
                markerId: focusedMarkerId,
              });
              webViewRef.current.postMessage(focusMessage);
            }
          }, 100);
        }
      }
      prevTimestampRef.current = region.timestamp;
    }
  }, [region, focusedMarkerId]);

  useEffect(() => {
    if (focusedMarkerId !== prevFocusedMarkerIdRef.current) {
      if (webViewRef.current && focusedMarkerId) {
        console.log('[KakaoMapWebView] Sending focusMarker:', focusedMarkerId);

        const message = JSON.stringify({
          type: 'focusMarker',
          markerId: focusedMarkerId,
        });

        webViewRef.current.postMessage(message);
      }
      prevFocusedMarkerIdRef.current = focusedMarkerId;
    }
  }, [focusedMarkerId]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          html: generateMapHtml(region, markers, apiKey),
          baseUrl: 'https://zzan-kakao-map.netlify.app'
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