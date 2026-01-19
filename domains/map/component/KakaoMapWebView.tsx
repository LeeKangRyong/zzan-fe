import { useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useWebViewMessage } from '../hooks/useWebViewMessage';
import { MapMarker, MapRegion } from '../model/mapModel';
import { generateMapHtml } from './MapHtmlTemplate';

interface KakaoMapWebViewProps {
  region: MapRegion;
  markers: MapMarker[];
  onMarkerPress: (markerId: string) => void;
  onMapPress?: () => void;
  onCurrentRegion?: (region: MapRegion) => void;
  apiKey: string;
  focusedMarkerId?: string | null;
}

export interface KakaoMapWebViewRef {
  requestCurrentRegion: () => void;
}

export const KakaoMapWebView = forwardRef<KakaoMapWebViewRef, KakaoMapWebViewProps>(
  ({ region, markers, onMarkerPress, onMapPress, onCurrentRegion, apiKey, focusedMarkerId }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const { handleMessage } = useWebViewMessage(onMarkerPress, onMapPress, onCurrentRegion);

    useImperativeHandle(ref, () => ({
      requestCurrentRegion: () => {
        if (webViewRef.current) {
          console.log('[KakaoMapWebView] Requesting current region');
          const message = JSON.stringify({ type: 'getCurrentRegion' });
          webViewRef.current.postMessage(message);
        }
      },
    }));

  const prevTimestampRef = useRef<number | undefined>(region.timestamp);
  const prevFocusedMarkerIdRef = useRef<string | null | undefined>(focusedMarkerId);
  const prevMarkersRef = useRef<MapMarker[]>(markers);

  const htmlContent = useMemo(() => {
    console.log('[KakaoMapWebView] Generating HTML with region:', region.latitude, region.longitude);
    return generateMapHtml(region, [], apiKey);
  }, [region.latitude, region.longitude, apiKey]);

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

  useEffect(() => {
    // markers 배열이 변경되었는지 확인 (깊은 비교는 하지 않고 길이와 참조만 확인)
    if (markers !== prevMarkersRef.current) {
      if (webViewRef.current) {
        console.log('[KakaoMapWebView] Sending updateMarkers:', markers.length);

        // WebView에서 필요한 필드만 추출
        const webViewMarkers = markers.map((m) => ({
          id: m.id,
          name: m.name,
          latitude: m.latitude,
          longitude: m.longitude,
        }));

        const message = JSON.stringify({
          type: 'updateMarkers',
          markers: webViewMarkers,
        });

        webViewRef.current.postMessage(message);
      }
      prevMarkersRef.current = markers;
    }
  }, [markers]);

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{
            html: htmlContent,
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
  }
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});