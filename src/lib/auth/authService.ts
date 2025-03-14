const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8080/api/auth';

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
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
  message: string;
}

// Create an axios instance or similar for handling API requests with interceptors
// This is a simplified version using fetch

// Handle token refresh
let refreshPromise: Promise<any> | null = null;

const refreshToken = async (): Promise<string | null> => {
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
    const newToken = await refreshToken();
    
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
    credentials: 'include', // Include cookies in the request
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
}

export async function logout(): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${AUTH_API_URL}/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.json();
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const response = await fetch(`${AUTH_API_URL}/reset-password`, {
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

export async function getCurrentUser(): Promise<AuthResponse> {
  const response = await fetchWithAuth(`${AUTH_API_URL}/me`);

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  return response.json();
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
}