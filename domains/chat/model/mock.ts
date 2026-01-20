import type { ChatResponse, RecommendedAnswer } from "./chatModel";

export const MOCK_RECOMMENDED_ANSWERS: RecommendedAnswer[] = [
  {
    id: "rec1",
    text: "전통주에 대해 소개해줘!",
  },
  {
    id: "rec2",
    text: "달달한 전통주 추천해줘",
  },
  {
    id: "rec3",
    text: "맛이 엄청 깔끔한 전통주 추천해줘",
  },
];

export const MOCK_CHAT_RESPONSE: ChatResponse = {
  message: "기본 답변",
  timestamp: Date.now(),
};

export const getMockChatResponse = (userMessage: string): ChatResponse => {
  return {
    message: `응답: ${userMessage}`,
    timestamp: Date.now(),
  };
};
