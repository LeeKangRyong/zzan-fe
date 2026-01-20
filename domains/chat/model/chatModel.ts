import type { LiquorSource } from '@/domains/chat/api/chatApi';

export type MessageRole = 'user' | 'bot' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  sources?: LiquorSource[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface RecommendedAnswer {
  id: string;
  text: string;
}

export interface ChatResponse {
  message: string;
  timestamp: number;
}
