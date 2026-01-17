import { WebViewMessageEvent } from 'react-native-webview';
import { MapRegion } from '../model/mapModel';

type MessageHandler = (markerId: string) => void;
type MapPressHandler = () => void;
type RegionChangeHandler = (region: MapRegion) => void;

const parseMessage = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const handleMarkerPress = (data: any, onMarkerPress: MessageHandler) => {
  if (data.type === 'markerPress') {
    onMarkerPress(data.markerId);
  }
};

const handleMapPress = (data: any, onMapPress?: MapPressHandler) => {
  if (data.type === 'mapPress' && onMapPress) {
    onMapPress();
  }
};

const handleLog = (data: any) => {
  if (data.type === 'log') {
    console.log('[WebView Log]', data.message);
  }
};

const handleError = (data: any) => {
  if (data.type === 'error') {
    console.error('[WebView Error]', data.message);
  }
};

const handleRegionChange = (data: any, onRegionChange?: RegionChangeHandler) => {
  if (data.type === 'idle' && onRegionChange && data.center) {
    const newRegion: MapRegion = {
      latitude: data.center.lat,
      longitude: data.center.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      timestamp: Date.now(),
    };
    onRegionChange(newRegion);
  }
};

export const useWebViewMessage = (
  onMarkerPress: MessageHandler,
  onMapPress?: MapPressHandler,
  onRegionChange?: RegionChangeHandler
) => {
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = parseMessage(event.nativeEvent.data);
    if (!data) {
      console.log('[WebView Message]', event.nativeEvent.data);
      return;
    }

    handleMarkerPress(data, onMarkerPress);
    handleMapPress(data, onMapPress);
    handleRegionChange(data, onRegionChange);
    handleLog(data);
    handleError(data);
  };

  return { handleMessage };
};
