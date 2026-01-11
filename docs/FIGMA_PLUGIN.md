# Figma Plugin WebSocket 연동 가이드

이 프로젝트는 Cursor Talk to Figma 플러그인과 WebSocket(포트 3055)으로 실시간 통신할 수 있습니다.

## 1. Figma Plugin 설정

### 플러그인 설치 및 실행

1. Figma 데스크톱 앱 실행
2. Cursor Talk to Figma 플러그인 설치
3. 플러그인 실행 (WebSocket 서버가 포트 3055에서 시작됨)

## 2. 프로젝트에서 연결하기

### 기본 연결

```typescript
import { figmaPluginClient } from '@/api/figma.plugin';

// WebSocket 서버에 연결
await figmaPluginClient.connect();

// 연결 상태 확인
console.log(figmaPluginClient.isConnected()); // true
```

### 자동 재연결

클라이언트는 연결이 끊어지면 자동으로 재연결을 시도합니다:
- 최대 5회 재연결 시도
- 재연결 간격: 2초

## 3. 메시지 주고받기

### 메시지 전송

```typescript
// 현재 선택된 노드 정보 요청
figmaPluginClient.requestSelection();

// Figma 파일 정보 요청
figmaPluginClient.requestFileInfo();

// Figma에서 특정 노드 선택
figmaPluginClient.selectNode('node-id-here');

// 커스텀 메시지 전송
figmaPluginClient.send({
  type: 'custom-action',
  data: { foo: 'bar' }
});
```

### 메시지 수신

```typescript
// 특정 타입의 메시지 리스너 등록
figmaPluginClient.on('selection-changed', (message) => {
  console.log('선택 변경됨:', message.data);
});

figmaPluginClient.on('file-info', (message) => {
  console.log('파일 정보:', message.data);
});

// 모든 메시지 리스너 등록
figmaPluginClient.on('*', (message) => {
  console.log('메시지 수신:', message);
});

// 리스너 제거
const handler = (message) => console.log(message);
figmaPluginClient.on('selection-changed', handler);
figmaPluginClient.off('selection-changed', handler);
```

## 4. React 컴포넌트에서 사용하기

```typescript
import { useEffect, useState } from 'react';
import { figmaPluginClient } from '@/api/figma.plugin';
import type { FigmaPluginMessage } from '@/api/figma.plugin';

export function MyComponent() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 연결
    const connect = async () => {
      try {
        await figmaPluginClient.connect();
        setIsConnected(true);
      } catch (error) {
        console.error('연결 실패:', error);
      }
    };

    connect();

    // 메시지 리스너
    const handleSelection = (message: FigmaPluginMessage) => {
      setSelectedNode(message.data);
    };

    figmaPluginClient.on('selection-changed', handleSelection);

    // 클린업
    return () => {
      figmaPluginClient.off('selection-changed', handleSelection);
      figmaPluginClient.disconnect();
    };
  }, []);

  const handleSelectNode = (nodeId: string) => {
    figmaPluginClient.selectNode(nodeId);
  };

  return (
    <div>
      <p>연결 상태: {isConnected ? '연결됨' : '연결 안됨'}</p>
      <p>선택된 노드: {JSON.stringify(selectedNode)}</p>
      <button onClick={() => handleSelectNode('123:456')}>
        노드 선택
      </button>
    </div>
  );
}
```

## 5. 고급 사용법

### 커스텀 포트 및 호스트

```typescript
import { FigmaPluginClient } from '@/api/figma.plugin';

// 커스텀 설정으로 클라이언트 생성
const customClient = new FigmaPluginClient(8080, '192.168.1.100');
await customClient.connect();
```

### 메시지 타입 정의

```typescript
// 타입 안전성을 위한 메시지 타입 정의
type SelectionChangedMessage = {
  type: 'selection-changed';
  data: {
    nodeId: string;
    nodeName: string;
    nodeType: string;
  };
};

type FileInfoMessage = {
  type: 'file-info';
  data: {
    fileName: string;
    fileKey: string;
  };
};

type FigmaMessage = SelectionChangedMessage | FileInfoMessage;

// 타입 가드 사용
figmaPluginClient.on('*', (message) => {
  if (message.type === 'selection-changed') {
    // TypeScript가 message.data의 타입을 추론
    console.log(message.data.nodeId);
  }
});
```

## 6. 트러블슈팅

### "Connection failed" 에러

**원인:**
- Figma 플러그인이 실행되지 않음
- 포트 3055가 이미 사용 중
- 방화벽이 연결을 차단

**해결:**
1. Figma 데스크톱 앱에서 플러그인이 실행 중인지 확인
2. 포트 3055가 사용 가능한지 확인: `netstat -an | grep 3055`
3. 방화벽 설정 확인

### "Max reconnection attempts reached" 에러

**원인:**
- 플러그인 서버가 응답하지 않음
- 네트워크 문제

**해결:**
1. Figma 플러그인 재시작
2. 수동으로 재연결 시도:
```typescript
figmaPluginClient.disconnect();
await figmaPluginClient.connect();
```

### 메시지가 수신되지 않음

**원인:**
- 이벤트 리스너가 등록되지 않음
- 메시지 타입이 일치하지 않음

**해결:**
1. 이벤트 리스너가 올바르게 등록되었는지 확인
2. 모든 메시지 로깅:
```typescript
figmaPluginClient.on('*', (message) => {
  console.log('Received:', message);
});
```

## 7. API 레퍼런스

### FigmaPluginClient 클래스

#### 메서드

- `connect(): Promise<void>` - WebSocket 서버에 연결
- `disconnect(): void` - 연결 종료
- `isConnected(): boolean` - 연결 상태 확인
- `send(message: FigmaPluginMessage): boolean` - 메시지 전송
- `on(eventType: string, handler: FigmaPluginEventHandler): void` - 이벤트 리스너 등록
- `off(eventType: string, handler: FigmaPluginEventHandler): void` - 이벤트 리스너 제거
- `requestSelection(): boolean` - 현재 선택된 노드 요청
- `selectNode(nodeId: string): boolean` - 특정 노드 선택
- `requestFileInfo(): boolean` - 파일 정보 요청

#### 생성자 파라미터

- `port: number` (기본값: 3055) - WebSocket 서버 포트
- `host: string` (기본값: 'localhost') - WebSocket 서버 호스트

## 8. 예시 코드

더 많은 예시는 `api/figma.plugin.example.ts` 파일을 참고하세요.

## 참고 자료

- Figma Plugin API: https://www.figma.com/plugin-docs/
- WebSocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
