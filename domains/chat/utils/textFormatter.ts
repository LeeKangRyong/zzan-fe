export interface TextSegment {
  text: string;
  isBold: boolean;
}

export const parseMessageText = (content: string): TextSegment[] => {
  // 1. [ITEM: ...] 패턴 제거
  let cleanedText = content.replace(/\[ITEM:\s*[^\]]*\]/g, '');

  // 2. **텍스트** 패턴 파싱
  const segments: TextSegment[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanedText)) !== null) {
    // 일반 텍스트 추가 (** 이전)
    if (match.index > lastIndex) {
      segments.push({
        text: cleanedText.substring(lastIndex, match.index),
        isBold: false
      });
    }

    // 굵은 텍스트 추가 (** 제거)
    segments.push({
      text: match[1],
      isBold: true
    });

    lastIndex = regex.lastIndex;
  }

  // 나머지 일반 텍스트 추가
  if (lastIndex < cleanedText.length) {
    segments.push({
      text: cleanedText.substring(lastIndex),
      isBold: false
    });
  }

  return segments;
};
