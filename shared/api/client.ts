import Constants from 'expo-constants';

const getBaseUrl = (): string => {
  return Constants.expoConfig?.extra?.apiUrl || '';
};

export class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

type GetAuthToken = () => string | null;

let getAuthTokenFn: GetAuthToken = () => null;

export const setAuthTokenGetter = (fn: GetAuthToken): void => {
  getAuthTokenFn = fn;
};

const buildAuthHeaders = (): Record<string, string> => {
  const token = getAuthTokenFn();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, requireAuth = false } = options;

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  const authHeaders = requireAuth ? buildAuthHeaders() : {};

  console.log('[ApiClient] 요청 시작');
  console.log('[ApiClient] Base URL:', baseUrl);
  console.log('[ApiClient] Endpoint:', endpoint);
  console.log('[ApiClient] Full URL:', url);
  console.log('[ApiClient] Method:', method);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log('[ApiClient] 응답 상태:', response.status);
  console.log('[ApiClient] 응답 OK:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[ApiClient] 에러 응답:', errorText);
    throw new ApiClientError(response.status, errorText);
  }

  const jsonData = await response.json();
  console.log('[ApiClient] 응답 데이터:', jsonData);
  return jsonData;
};
