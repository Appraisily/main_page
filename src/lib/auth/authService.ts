const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://auth-service-856401495068.us-central1.run.app/api/auth';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified: boolean;
  };
  token?: string;
}

// Create an axios instance or similar for handling API requests with interceptors
// This is a simplified version using fetch

// Check auth service connectivity
(async function checkAuthService() {
  try {
    console.log('[DEBUG] Testing auth service connectivity');
    const response = await fetch(`${AUTH_API_URL}/ping`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('[DEBUG] Auth service connectivity test:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries([...response.headers]),
      ok: response.ok
    });
    
    const text = await response.text();
    console.log('[DEBUG] Auth service response:', text);
  } catch (error) {
    console.error('[DEBUG] Auth service connectivity test failed:', error);
  }
})();

// Handle token refresh
let refreshPromise: Promise<any> | null = null;

const refreshTokenInternal = async (): Promise<string | null> => {
  try {
    if (!refreshPromise) {
      refreshPromise = fetch(`${AUTH_API_URL}/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      }).then(res => res.json());
    }

    const data = await refreshPromise;
    refreshPromise = null;
    
    if (data.token) {
      return data.token;
    }
    return null;
  } catch (error) {
    refreshPromise = null;
    throw new Error('Failed to refresh token');
  }
};

// Wrapper for fetch with token refresh
const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  // If unauthorized and not already trying to refresh token
  if (response.status === 401 && !url.includes('/refresh-token')) {
    const newToken = await refreshTokenInternal();
    
    if (newToken) {
      // Retry the request with the new token
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${newToken}`);
      
      response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    }
  }

  return response;
};

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Registration failed');
  }

  return responseData;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${AUTH_API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Logout failed');
  }
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_API_URL}/request-reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password reset request failed');
  }

  return response.json();
}

export async function completePasswordReset(token: string, password: string, confirmPassword: string): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_API_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password, confirmPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password reset failed');
  }

  return response.json();
}

export async function getCurrentUser(): Promise<AuthResponse> {
  console.log('[DEBUG] 📡 Fetching current user data...', {
    endpoint: `${AUTH_API_URL}/me`,
    timestamp: new Date().toISOString()
  });

  console.log('[DEBUG] Document cookies:', document.cookie ? 'Cookies present' : 'No cookies');
  
  try {
    const response = await fetch(`${AUTH_API_URL}/me`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('[DEBUG] /me response status:', response.status);
    console.log('[DEBUG] /me response headers:', Object.fromEntries([...response.headers]));
    
    const data = await response.json();
    console.log('[DEBUG] /me response data:', data);

    if (!response.ok) {
      console.error('[DEBUG] ❌ Failed to get current user:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      throw new Error(data.message || 'Failed to get current user');
    }

    console.log('[DEBUG] ✅ Successfully fetched user data:', data.user);
    return data;
  } catch (error) {
    console.error('[DEBUG] Error in getCurrentUser:', error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  console.log('[DEBUG] 🔐 Checking authentication status...');
  try {
    await getCurrentUser();
    console.log('[DEBUG] ✅ User is authenticated');
    return true;
  } catch (error) {
    console.log('[DEBUG] ❌ User is not authenticated:', error);
    return false;
  }
}

export async function refreshToken(): Promise<AuthResponse> {
  console.log('[DEBUG] Attempting to refresh token');
  try {
    const response = await fetch(`${AUTH_API_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('[DEBUG] Refresh token response status:', response.status);
    console.log('[DEBUG] Response headers:', Object.fromEntries([...response.headers]));
    
    const data = await response.json();
    console.log('[DEBUG] Refresh token response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Token refresh failed');
    }

    return data;
  } catch (error) {
    console.error('[DEBUG] Error refreshing token:', error);
    throw error;
  }
}