import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { MapMarker, MapRegion } from '../model/mapModel';
import { generateMapHtml } from './MapHtmlTemplate';
import { useWebViewMessage } from '../hooks/useWebViewMessage';

interface KakaoMapWebViewProps {
  region: MapRegion;
  markers: MapMarker[];
  onMarkerPress: (markerId: string) => void;
  apiKey: string;
}

export const KakaoMapWebView = ({ region, markers, onMarkerPress, apiKey }: KakaoMapWebViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const { handleMessage } = useWebViewMessage(onMarkerPress);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          html: generateMapHtml(region, markers, apiKey),
          baseUrl: 'http://10.0.2.2:8081'
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
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
