import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, isAuthenticated, logout, refreshToken } from './authService';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  authenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  authenticated: false,
  login: () => {},
  logout: async () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Function to refresh the token periodically
  const setupTokenRefresh = () => {
    const refreshInterval = setInterval(async () => {
      try {
        if (authenticated) {
          const response = await refreshToken();
          if (response.user) {
            setUser(response.user);
          }
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        // If refresh fails, log out the user
        await logoutUser();
      }
    }, 14 * 60 * 1000); // Refresh every 14 minutes (assuming 15-minute token expiry)

    return () => clearInterval(refreshInterval);
  };

  useEffect(() => {
    // Check if user is authenticated when the app loads
    const checkAuth = async () => {
      console.log('🔍 Checking authentication state...', {
        currentPath: window.location.pathname,
        timestamp: new Date().toISOString()
      });

      try {
        // Only check auth status if we're on a protected route
        if (window.location.pathname === '/dashboard' || window.location.pathname.startsWith('/protected')) {
          console.log('🛡️ Protected route detected, verifying authentication...');
          const authStatus = await isAuthenticated();
          setAuthenticated(authStatus);
          
          if (authStatus) {
            console.log('✅ User is authenticated, fetching user data...');
            const response = await getCurrentUser();
            setUser(response.user);
            // Set up token refresh only if authenticated
            const cleanup = setupTokenRefresh();
            return () => cleanup();
          } else {
            console.log('❌ User is not authenticated');
            setUser(null);
          }
        } else {
          console.log('📍 Public route, skipping auth check');
          setLoading(false);
        }
      } catch (err) {
        console.error('🚨 Authentication check failed:', err);
        setError('Authentication check failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    setAuthenticated(true);
    setupTokenRefresh();
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setAuthenticated(false);
    } catch (err) {
      setError('Logout failed');
      console.error('Logout error:', err);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        authenticated,
        login: loginUser,
        logout: logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};