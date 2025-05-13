import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  User
} from 'firebase/auth';
import { auth } from './config';
import { logger } from '../utils/logger'; // Import the logger

// Sign in with email and password
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      success: true
    };
  } catch (error: any) {
    logger.error('Login error:', error); // Use logger
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return {
      user: userCredential.user,
      success: true
    };
  } catch (error: any) {
    logger.error('Google login error:', error); // Use logger
    throw error;
  }
};

// Create a new user with email and password
export const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      success: true
    };
  } catch (error: any) {
    logger.error('Signup error:', error); // Use logger
    throw error;
  }
};

// Create a user account after payment
export const createUserAfterPayment = async (email: string) => {
  try {
    // First, check if the user already exists to avoid unnecessary 400 errors
    const existingMethods = await fetchSignInMethodsForEmail(auth, email);
    if (existingMethods && existingMethods.length > 0) {
      logger.log('User already exists, skipping account creation'); // Use logger
      return {
        success: true,
        userExists: true
      };
    }

    // Generate a secure random password
    const generatedPassword = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
    
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
    
    // Send password reset email so user can set their own password
    await sendPasswordResetEmail(auth, email);
    
    return {
      user: userCredential.user,
      success: true,
      userCreated: true
    };
  } catch (error: any) {
    logger.error('Auto account creation error:', error); // Use logger
    throw error;
  }
};

// Sign out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    logger.error('Logout error:', error); // Use logger
    throw error;
  }
};

// Get the current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Password reset request
export const requestPasswordReset = async (email: string): Promise<{ success: boolean }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    logger.error('Password reset request error:', error); // Use logger
    throw error;
  }
};

// Listen for auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(auth, callback);
}; 