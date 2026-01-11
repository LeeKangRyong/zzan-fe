import type { RecommendedAnswer, ChatResponse } from './chatModel';

export const MOCK_RECOMMENDED_ANSWERS: RecommendedAnswer[] = [
  {
    id: 'rec1',
    text: '친구와 자취방에서 편하게 마시려고!',
  },
  {
    id: 'rec2',
    text: '여행가서 호텔에서 애인과 오붓하게 마시려고!',
  },
  {
    id: 'rec3',
    text: '부모님과 함께 집에서 식사하면서!',
  },
  {
    id: 'rec4',
    text: '회식 자리에서 동료들과!',
  },
];

export const MOCK_CHAT_RESPONSE: ChatResponse = {
  message: '기본 답변',
  timestamp: Date.now(),
};

export const getMockChatResponse = (userMessage: string): ChatResponse => {
  return {
    message: `응답: ${userMessage}`,
    timestamp: Date.now(),
  };
};
