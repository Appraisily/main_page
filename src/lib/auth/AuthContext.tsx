import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  getCurrentUser, 
  logoutUser 
} from '../firebase/firebaseAuth';

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
  loading: true,
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

  useEffect(() => {
    console.log('🔍 Setting up Firebase auth listener...');
    
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged((authUser) => {
      console.log('🔄 Auth state changed:', authUser ? 'User logged in' : 'No user');
      setUser(authUser);
      setAuthenticated(!!authUser);
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up Firebase auth listener');
      unsubscribe();
    };
  }, []);

  const loginUser = (userData: User) => {
    console.log('✅ User logged in:', userData.email);
    setUser(userData);
    setAuthenticated(true);
  };

  const logoutUserFromContext = async () => {
    try {
      console.log('🚪 Logging out user');
      await logoutUser();
      setUser(null);
      setAuthenticated(false);
    } catch (err) {
      setError('Logout failed');
      console.error('❌ Logout error:', err);
    }
  };

  const updateUser = (userData: User) => {
    console.log('🔄 Updating user data');
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
        logout: logoutUserFromContext,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};