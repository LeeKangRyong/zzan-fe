import type { Message, RecommendedAnswer } from '@/domains/chat/model/chatModel';
import { CHAT_CONSTANTS } from '@/domains/chat/model/constants';
import { MOCK_RECOMMENDED_ANSWERS, getMockChatResponse } from '@/domains/chat/model/mock';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const createMessage = (role: 'user' | 'bot', content: string): Message => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  content,
  timestamp: Date.now(),
});

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

const fetchBotResponse = async (userMessage: string): Promise<string> => {
  if (isMockEnabled()) {
    return getMockChatResponse(userMessage).message;
  }

  try {
    return CHAT_CONSTANTS.DEFAULT_RESPONSE;
  } catch (error) {
    console.error('Chat API error:', error);
    return CHAT_CONSTANTS.DEFAULT_RESPONSE;
  }
};

export const useChatViewModel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [recommendedAnswers, setRecommendedAnswers] = useState<RecommendedAnswer[]>([]);

  useEffect(() => {
    setRecommendedAnswers(MOCK_RECOMMENDED_ANSWERS);

    // 초기 환영 메시지 추가
    const initialMessages = CHAT_CONSTANTS.INITIAL_GREETING_MESSAGES.map((content, index) =>
      createMessage('bot', content)
    );
    setMessages(initialMessages);
  }, []);

  const addUserMessage = (text: string) => {
    const newMessage = createMessage('user', text);
    setMessages((prev) => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    const newMessage = createMessage('bot', text);
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue('');
    setIsLoading(true);

    const response = await fetchBotResponse(inputValue);
    addBotMessage(response);
  };

  const handleRecommendedAnswer = async (text: string) => {
    addUserMessage(text);
    setIsLoading(true);

    const response = await fetchBotResponse(text);
    addBotMessage(response);
  };

  return {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    recommendedAnswers,
    handleSendMessage,
    handleRecommendedAnswer,
  };
};
