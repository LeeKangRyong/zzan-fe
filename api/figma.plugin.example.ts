/**
 * Figma Plugin WebSocket 사용 예시
 * Cursor Talk to Figma 플러그인과의 실시간 통신 예제
 */

import { figmaPluginClient } from './figma.plugin';
import type { FigmaPluginMessage } from './figma.plugin';

/**
 * 예시 1: Figma Plugin에 연결하고 선택된 노드 정보 받기
 */
export async function connectAndListenToSelection() {
  try {
    // WebSocket 서버에 연결
    await figmaPluginClient.connect();

    // 선택 변경 이벤트 리스너 등록
    figmaPluginClient.on('selection-changed', (message: FigmaPluginMessage) => {
      console.log('선택된 노드:', message.data);
    });

    // 현재 선택된 노드 요청
    figmaPluginClient.requestSelection();
  } catch (error) {
    console.error('Figma Plugin 연결 실패:', error);
  }
}

/**
 * 예시 2: Figma에서 특정 노드 선택하기
 */
export async function selectFigmaNode(nodeId: string) {
  if (!figmaPluginClient.isConnected()) {
    await figmaPluginClient.connect();
  }

  const success = figmaPluginClient.selectNode(nodeId);
  if (success) {
    console.log(`노드 ${nodeId} 선택 요청 전송`);
  } else {
    console.error('노드 선택 요청 실패');
  }
}

/**
 * 예시 3: 파일 정보 받기
 */
export async function getFigmaFileInfo() {
  if (!figmaPluginClient.isConnected()) {
    await figmaPluginClient.connect();
  }

  // 파일 정보 응답 리스너 등록
  figmaPluginClient.on('file-info', (message: FigmaPluginMessage) => {
    console.log('Figma 파일 정보:', message.data);
  });

  // 파일 정보 요청
  figmaPluginClient.requestFileInfo();
}

/**
 * 예시 4: 모든 메시지 로깅
 */
export async function logAllMessages() {
  if (!figmaPluginClient.isConnected()) {
    await figmaPluginClient.connect();
  }

  // 모든 메시지에 대한 리스너 등록
  figmaPluginClient.on('*', (message: FigmaPluginMessage) => {
    console.log('[Figma Plugin Message]', message);
  });
}

/**
 * 예시 5: 커스텀 메시지 전송
 */
export async function sendCustomMessage(type: string, data: unknown) {
  if (!figmaPluginClient.isConnected()) {
    await figmaPluginClient.connect();
  }

  figmaPluginClient.send({ type, data });
}

/**
 * 예시 6: React 컴포넌트에서 사용하기
 */
export function useFigmaPluginExample() {
  // React 컴포넌트 내부에서 사용하는 예시
  const connectToFigma = async () => {
    try {
      await figmaPluginClient.connect();

      // 선택 변경 리스너
      const handleSelectionChange = (message: FigmaPluginMessage) => {
        console.log('Selection changed:', message.data);
      };

      figmaPluginClient.on('selection-changed', handleSelectionChange);

      // 컴포넌트 언마운트 시 리스너 제거
      return () => {
        figmaPluginClient.off('selection-changed', handleSelectionChange);
      };
    } catch (error) {
      console.error('Failed to connect to Figma plugin:', error);
    }
  };

  return { connectToFigma };
}

/**
 * 예시 7: 연결 종료
 */
export function disconnectFromFigma() {
  figmaPluginClient.disconnect();
  console.log('Figma Plugin 연결 종료');
}
