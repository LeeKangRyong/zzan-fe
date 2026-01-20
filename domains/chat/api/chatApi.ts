import Constants from 'expo-constants';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  query: string;
  history: ChatHistoryItem[];
}

export interface LiquorSource {
  id: string;
  name: string;
  type: string;
  alcohol: string;
  volume: string;
  brewery: string;
  image_url: string;
  score?: number;
}

export interface ChatResponse {
  answer: string;
  sources: LiquorSource[];
  suggested_questions: string[];
}

const getChatBotBaseUrl = (): string => {
  const baseUrl = Constants.expoConfig?.extra?.chatApiUrl;
  if (!baseUrl) {
    throw new Error('EXPO_PUBLIC_CHATBOT_URL is not configured');
  }
  return baseUrl;
};

export const chatApi = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const baseUrl = getChatBotBaseUrl();

    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
};
