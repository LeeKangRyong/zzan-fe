import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useWebViewMessage } from "../hooks/useWebViewMessage";
import { MapMarker, MapRegion } from "../model/mapModel";
import { generateMapHtml } from "./MapHtmlTemplate";

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

export const KakaoMapWebView = forwardRef<
  KakaoMapWebViewRef,
  KakaoMapWebViewProps
>(
  (
    {
      region,
      markers,
      onMarkerPress,
      onMapPress,
      onCurrentRegion,
      apiKey,
      focusedMarkerId,
    },
    ref,
  ) => {
    const webViewRef = useRef<WebView>(null);
    const { handleMessage } = useWebViewMessage(
      onMarkerPress,
      onMapPress,
      onCurrentRegion,
    );

    useImperativeHandle(ref, () => ({
      requestCurrentRegion: () => {
        if (webViewRef.current) {
          const message = JSON.stringify({ type: "getCurrentRegion" });
          webViewRef.current.postMessage(message);
        }
      },
    }));

    const prevTimestampRef = useRef<number | undefined>(region.timestamp);
    const prevFocusedMarkerIdRef = useRef<string | null | undefined>(
      focusedMarkerId,
    );
    const prevMarkersRef = useRef<MapMarker[]>(markers);

    // 초기 HTML 생성
    const htmlContent = useMemo(() => {
      return generateMapHtml(region, markers, apiKey);
    }, [region.latitude, region.longitude, apiKey]);

    // 지도 중심 이동 처리
    useEffect(() => {
      if (region.timestamp !== prevTimestampRef.current) {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "moveCenter",
              latitude: region.latitude,
              longitude: region.longitude,
            }),
          );

          if (focusedMarkerId) {
            setTimeout(() => {
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: "focusMarker",
                  markerId: focusedMarkerId,
                }),
              );
            }, 100);
          }
        }
        prevTimestampRef.current = region.timestamp;
      }
    }, [region, focusedMarkerId]);

    // 특정 마커 포커스 처리
    useEffect(() => {
      if (focusedMarkerId !== prevFocusedMarkerIdRef.current) {
        if (webViewRef.current && focusedMarkerId) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "focusMarker",
              markerId: focusedMarkerId,
            }),
          );
        }
        prevFocusedMarkerIdRef.current = focusedMarkerId;
      }
    }, [focusedMarkerId]);

    // 마커 리스트 업데이트 처리
    useEffect(() => {
      if (markers !== prevMarkersRef.current) {
        if (webViewRef.current) {
          const webViewMarkers = markers.map((m) => ({
            id: m.id,
            name: m.name,
            latitude: m.latitude,
            longitude: m.longitude,
          }));

          webViewRef.current.postMessage(
            JSON.stringify({
              type: "updateMarkers",
              markers: webViewMarkers,
            }),
          );
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
            baseUrl: "https://zzan-kakao-map.netlify.app",
          }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleMessage}
          style={styles.webview}
        />
      </View>
    );
  },
);

// 컴포넌트 이름 설정 (DevTools 디버깅용)
KakaoMapWebView.displayName = "KakaoMapWebView";

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});
