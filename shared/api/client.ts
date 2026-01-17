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

  const url = `${getBaseUrl()}${endpoint}`;
  const authHeaders = requireAuth ? buildAuthHeaders() : {};

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiClientError(response.status, errorText);
  }

  return response.json();
};
