import { WebViewMessageEvent } from 'react-native-webview';

type MessageHandler = (markerId: string) => void;
type MapPressHandler = () => void;

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

export const useWebViewMessage = (onMarkerPress: MessageHandler, onMapPress?: MapPressHandler) => {
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = parseMessage(event.nativeEvent.data);
    if (!data) {
      console.log('[WebView Message]', event.nativeEvent.data);
      return;
    }

    handleMarkerPress(data, onMarkerPress);
    handleMapPress(data, onMapPress);
    handleLog(data);
    handleError(data);
  };

  return { handleMessage };
};
