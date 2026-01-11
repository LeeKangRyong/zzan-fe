/**
 * Figma Plugin WebSocket Client
 * Cursor Talk to Figma 플러그인과 WebSocket으로 통신합니다.
 * Port: 3055
 */

export type FigmaPluginMessage = {
  type: string;
  data?: unknown;
};

export type FigmaPluginEventHandler = (message: FigmaPluginMessage) => void;

export class FigmaPluginClient {
  private ws: WebSocket | null = null;
  private port: number;
  private host: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;
  private eventHandlers: Map<string, Set<FigmaPluginEventHandler>> = new Map();

  constructor(port = 3055, host = 'localhost') {
    this.port = port;
    this.host = host;
  }

  /**
   * WebSocket 서버에 연결
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const url = `ws://${this.host}:${this.port}`;
        console.log(`[Figma Plugin] Connecting to ${url}...`);

        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
          console.log('[Figma Plugin] Connected successfully');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: FigmaPluginMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('[Figma Plugin] Failed to parse message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[Figma Plugin] WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[Figma Plugin] Connection closed');
          this.handleReconnect();
        };
      } catch (error) {
        console.error('[Figma Plugin] Connection failed:', error);
        reject(error);
      }
    });
  }

  /**
   * 재연결 시도
   */
  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `[Figma Plugin] Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect().catch((error) => {
          console.error('[Figma Plugin] Reconnection failed:', error);
        });
      }, this.reconnectDelay);
    } else {
      console.error('[Figma Plugin] Max reconnection attempts reached');
    }
  }

  /**
   * 메시지 전송
   */
  send(message: FigmaPluginMessage): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('[Figma Plugin] Cannot send message: Connection not open');
      return false;
    }

    try {
      this.ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('[Figma Plugin] Failed to send message:', error);
      return false;
    }
  }

  /**
   * 특정 타입의 메시지에 대한 이벤트 핸들러 등록
   */
  on(eventType: string, handler: FigmaPluginEventHandler) {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)!.add(handler);
  }

  /**
   * 이벤트 핸들러 제거
   */
  off(eventType: string, handler: FigmaPluginEventHandler) {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * 수신한 메시지 처리
   */
  private handleMessage(message: FigmaPluginMessage) {
    console.log('[Figma Plugin] Received:', message);

    // 특정 타입 핸들러 실행
    const handlers = this.eventHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message));
    }

    // 모든 메시지에 대한 핸들러 실행
    const allHandlers = this.eventHandlers.get('*');
    if (allHandlers) {
      allHandlers.forEach((handler) => handler(message));
    }
  }

  /**
   * 연결 상태 확인
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * 연결 종료
   */
  disconnect() {
    if (this.ws) {
      this.reconnectAttempts = this.maxReconnectAttempts; // 재연결 중지
      this.ws.close();
      this.ws = null;
      console.log('[Figma Plugin] Disconnected');
    }
  }

  /**
   * 현재 선택된 노드 요청
   */
  requestSelection() {
    return this.send({ type: 'request-selection' });
  }

  /**
   * Figma에서 특정 노드 선택
   */
  selectNode(nodeId: string) {
    return this.send({ type: 'select-node', data: { nodeId } });
  }

  /**
   * Figma 파일 정보 요청
   */
  requestFileInfo() {
    return this.send({ type: 'request-file-info' });
  }
}

// 싱글톤 인스턴스
export const figmaPluginClient = new FigmaPluginClient();
