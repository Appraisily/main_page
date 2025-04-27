import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from './config';

// Sign in with email and password
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      success: true
    };
  } catch (error: any) {
    console.error('Login error:', error);
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
    console.error('Google login error:', error);
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
    console.error('Signup error:', error);
    throw error;
  }
};

// Create a user account after payment
export const createUserAfterPayment = async (email: string) => {
  try {
    // Generate a secure random password
    const generatedPassword = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
    
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
    
    // Send password reset email so user can set their own password
    await sendPasswordResetEmail(auth, email);
    
    return {
      user: userCredential.user,
      success: true
    };
  } catch (error: any) {
    // If user already exists, just return success
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists, skipping account creation');
      return { 
        success: true, 
        userExists: true 
      };
    }
    console.error('Auto account creation error:', error);
    throw error;
  }
};

// Sign out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
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
    console.error('Password reset request error:', error);
    throw error;
  }
};

// Listen for auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(auth, callback);
}; 