# Figma API 연동 가이드

이 프로젝트는 Figma REST API를 통해 디자인 데이터를 가져올 수 있습니다.

## 1. Figma Access Token 발급

1. [Figma 계정 설정](https://www.figma.com/settings)으로 이동
2. **Personal access tokens** 섹션 찾기
3. **Generate new token** 클릭
4. 토큰 이름 입력 (예: "zzan-fe-development")
5. 생성된 토큰 복사 (한 번만 표시됩니다!)

## 2. 프로젝트 설정

### app.json 설정

`app.json` 파일의 `extra` 섹션에 Figma access token을 추가하세요:

```json
{
  "expo": {
    "extra": {
      "figmaAccessToken": "YOUR_FIGMA_ACCESS_TOKEN_HERE"
    }
  }
}
```

**보안 주의사항:**
- 실제 토큰을 커밋하지 마세요!
- 프로덕션 환경에서는 환경 변수를 사용하세요
- `.gitignore`에 `app.json`을 추가하거나, 토큰만 별도 파일로 관리하세요

### 환경별 설정 (권장)

프로덕션과 개발 환경을 분리하려면:

1. `app.config.js` 사용:

```javascript
export default {
  expo: {
    // ... 기존 설정
    extra: {
      figmaAccessToken: process.env.FIGMA_ACCESS_TOKEN,
    },
  },
};
```

2. `.env` 파일 생성 (gitignore에 추가):

```
FIGMA_ACCESS_TOKEN=your_token_here
```

## 3. Figma File Key 찾기

Figma 파일의 URL에서 file key를 찾을 수 있습니다:

```
https://www.figma.com/file/{FILE_KEY}/File-Name
                              ^^^^^^^^
                              이 부분이 file key입니다
```

예시:
- URL: `https://www.figma.com/file/abc123def456/My-Design`
- File Key: `abc123def456`

## 4. 사용 방법

### 기본 사용

```typescript
import { figmaClient } from '@/api';

// Figma 파일 데이터 가져오기
const file = await figmaClient.getFile('YOUR_FILE_KEY');
console.log(file.name);

// 특정 노드 찾기
const nodes = figmaClient.findNodes(file.document, (node) => {
  return node.name === 'Button';
});

// 색상을 HEX로 변환
const hexColor = figmaClient.colorToHex({ r: 1, g: 0.84, b: 0, a: 1 });
// 결과: "#FFD800"
```

### 색상 추출 예시

```typescript
import { extractColors } from '@/api/figma.example';

const colors = await extractColors('YOUR_FILE_KEY');
console.log(colors); // ["#FFD800", "#1F1F1F", ...]
```

### 이미지 내보내기 예시

```typescript
import { exportFrameAsImage } from '@/api/figma.example';

const imageUrl = await exportFrameAsImage('YOUR_FILE_KEY', 'NODE_ID');
console.log(imageUrl); // "https://..."
```

더 많은 예시는 `api/figma.example.ts` 파일을 참고하세요.

## 5. API 제한사항

Figma API는 다음과 같은 제한이 있습니다:

- **Rate Limit**: 분당 최대 60 요청
- **파일 크기**: 매우 큰 파일은 응답 시간이 길 수 있습니다
- **권한**: 접근하려는 파일에 대한 읽기 권한이 필요합니다

## 6. 트러블슈팅

### "Figma access token이 설정되지 않았습니다" 경고

- `app.json`의 `extra.figmaAccessToken`이 올바르게 설정되었는지 확인
- 앱을 재시작했는지 확인

### "403 Forbidden" 에러

- 토큰이 유효한지 확인
- 파일에 대한 접근 권한이 있는지 확인

### "404 Not Found" 에러

- File Key가 올바른지 확인
- 파일이 삭제되지 않았는지 확인

## 참고 자료

- [Figma API 공식 문서](https://www.figma.com/developers/api)
- [Figma API 레퍼런스](https://www.figma.com/developers/api#files)
