import { router } from 'expo-router';
import { useAuthStore } from '@/domains/auth/store/authStore';
import Constants from 'expo-constants';
import { API_ENDPOINTS } from '../endpoints';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const getBaseUrl = (): string => {
  return Constants.expoConfig?.extra?.apiUrl || '';
};

async function executeRefresh(): Promise<boolean> {
  const { refreshToken } = useAuthStore.getState();

  if (!refreshToken) {
    await handleLogout();
    return false;
  }

  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_ENDPOINTS.AUTH.TOKEN_REFRESH}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: refreshToken,
    });

    if (!response.ok) {
      await handleLogout();
      return false;
    }

    const jsonData = await response.json();
    const tokens = jsonData.data;

    const { setTokens } = useAuthStore.getState();
    setTokens(tokens.accessToken, tokens.refreshToken);

    return true;
  } catch (error) {
    await handleLogout();
    return false;
  }
}

async function handleLogout(): Promise<void> {
  const { clearTokens } = useAuthStore.getState();
  clearTokens();
  router.replace('/login');
}

export async function attemptTokenRefresh(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = executeRefresh();

  try {
    return await refreshPromise;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

export function resetRefreshState(): void {
  isRefreshing = false;
  refreshPromise = null;
}
