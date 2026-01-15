import { WebViewMessageEvent } from 'react-native-webview';

type MessageHandler = (markerId: string) => void;

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

export const useWebViewMessage = (onMarkerPress: MessageHandler) => {
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = parseMessage(event.nativeEvent.data);
    if (!data) {
      console.log('[WebView Message]', event.nativeEvent.data);
      return;
    }

    handleMarkerPress(data, onMarkerPress);
    handleLog(data);
    handleError(data);
  };

  return { handleMessage };
};
