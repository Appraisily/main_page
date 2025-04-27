# Firebase Authentication Migration Plan

## Current Implementation Overview

The current authentication system uses a custom authentication service hosted at `https://auth-service-856401495068.us-central1.run.app/api/auth`. Key components include:

### File Structure
- `src/lib/auth/AuthContext.tsx` - Context provider for authentication state
- `src/lib/auth/authService.ts` - Service for authentication API calls
- `src/lib/auth/ProtectedRoute.tsx` - Route guard for authenticated routes
- `src/pages/Auth/Login.tsx` - Login page implementation
- `src/pages/Auth/Signup.tsx` - Signup page implementation
- `src/pages/Auth/AuthSuccess.tsx` - OAuth success handler

### Authentication Flow
1. User logs in via email/password or Google OAuth
2. The application stores authentication in cookies
3. Token refresh happens every 14 minutes
4. Protected routes check authentication status

### Key Functions
- `login()` - Authenticates users with email/password
- `register()` - Creates new user accounts
- `logout()` - Signs users out
- `getCurrentUser()` - Retrieves the current user from the auth service
- `isAuthenticated()` - Checks if a user is authenticated
- `refreshToken()` - Refreshes the authentication token

## Migration Plan to Firebase Authentication

### Phase 1: Setup and Configuration (1 day)

1. **Firebase Project Setup**
   - Create a Firebase project (if not already created)
   - Enable Firebase Authentication
   - Configure authentication methods:
     - Email/Password
     - Google
   - Set up Firebase project configuration

2. **Install Firebase Dependencies**
   ```bash
   npm install firebase
   ```

3. **Create Firebase Configuration**
   - Create a new file `src/lib/firebase/config.ts` to initialize Firebase

### Phase 2: Firebase Service Implementation (1-2 days)

1. **Create Firebase Auth Service**
   - Create `src/lib/firebase/firebaseAuth.ts` to handle Firebase authentication
   - Implement the following methods:
     - `initializeFirebase()` - Initialize Firebase
     - `signInWithEmailPassword(email, password)`
     - `signInWithGoogle()`
     - `signUpWithEmailPassword(email, password)`
     - `createUserAccount(email)` - For automatic user creation after payment
     - `signOut()`
     - `getCurrentUser()`
     - `onAuthStateChanged(callback)`

2. **Update AuthContext**
   - Modify `src/lib/auth/AuthContext.tsx` to use Firebase Authentication
   - Replace the current auth service calls with Firebase auth methods
   - Utilize `onAuthStateChanged()` for user state updates

### Phase 3: UI Components Update (1-2 days)

1. **Update Login Component**
   - Modify `src/pages/Auth/Login.tsx` to use Firebase authentication
   - Update email/password login flow
   - Update Google login flow to use Firebase's Google provider

2. **Update Signup Component**
   - Modify `src/pages/Auth/Signup.tsx` to use Firebase authentication
   - Update user registration flow

3. **Update Password Reset Component**
   - Modify password reset flow to use Firebase's password reset functionality

### Phase 4: Appraisal Submission Flow & Dashboard Integration (1-2 days)

1. **Automatic Account Creation**
   - Implement automatic account creation in the Stripe payment success handler
   - After successful payment, create a Firebase user account with:
     ```typescript
     // Create user with email only (passwordless)
     async function createUserAfterPayment(email) {
       try {
         // Generate a secure random password that the user doesn't need to know
         const generatedPassword = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
         
         // Create the user account
         const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
         
         // Send password reset email so the user can set their own password
         await sendPasswordResetEmail(auth, email);
         
         // Return the created user
         return userCredential.user;
       } catch (error) {
         // Handle cases where user might already exist
         if (error.code === 'auth/email-already-in-use') {
           // User already exists, just return success
           return { success: true, userExists: true };
         }
         throw error;
       }
     }
     ```

2. **Update Dashboard Integration**
   - Ensure the dashboard continues to fetch appraisals from WordPress
   - Update the `fetchAppraisals` function in `src/lib/api/dashboardApi.ts` to use Firebase user email:
     ```typescript
     export async function fetchAppraisals(filters) {
       const user = auth.currentUser;
       if (!user || !user.email) {
         throw new Error('User not authenticated');
       }
       
       // Use the same WordPress REST API but with Firebase user email
       const response = await fetch(`${WP_API_URL}/appraisals?user_email=${user.email}`);
       // Rest of the function remains the same
     }
     ```

### Phase 5: Testing and Debugging (1-2 days)

1. **Authentication Flow Testing**
   - Test sign-up flow
   - Test login flow (both email/password and Google)
   - Test logout flow
   - Test protected routes
   - **Test automatic account creation** after Stripe payment

2. **Dashboard Testing**
   - Verify that users can see their appraisals in the dashboard
   - Ensure the WordPress REST API integration works with Firebase authentication
   - Test appraisal filtering and sorting functionality

3. **Edge Case Testing**
   - Test token expiration and automatic renewal
   - Test invalid credentials
   - Test account creation with existing email

### Phase 6: Deployment and Monitoring (1 day)

1. **Deploy Changes**
   - Deploy changes to production
   - Monitor authentication success rates

2. **Rollback Plan**
   - Keep the original authentication system code available for quick rollback if needed
   - Document the rollback procedure

## Implementation Details

### Firebase Configuration Example

```typescript
// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

### Automatic Account Creation After Payment

```typescript
// src/lib/stripe/handlePaymentSuccess.ts
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

export async function handleSuccessfulPayment(sessionId) {
  try {
    // Fetch the email from the Stripe session
    const response = await fetch(`${API_URL}/stripe/session/${sessionId}/email`);
    const data = await response.json();
    const { email } = data;
    
    if (!email) {
      throw new Error('No email found for session');
    }
    
    // Create a user account
    await createUserAfterPayment(email);
    
    // Continue with the rest of the payment success flow
    // ...
  } catch (error) {
    console.error('Error in payment success handler:', error);
  }
}

async function createUserAfterPayment(email) {
  try {
    // Generate a secure random password that the user doesn't need to know
    const generatedPassword = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
    
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
    
    // Send password reset email so the user can set their own password
    await sendPasswordResetEmail(auth, email);
    
    return userCredential.user;
  } catch (error) {
    // Handle cases where user might already exist
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists, skipping account creation');
      return { success: true, userExists: true };
    }
    throw error;
  }
}
```

### Updated Dashboard API Integration

```typescript
// src/lib/api/dashboardApi.ts
import { auth } from '../firebase/config';

export async function fetchAppraisals(filters) {
  // Get the current user from Firebase
  const user = auth.currentUser;
  
  if (!user || !user.email) {
    throw new Error('User not authenticated');
  }
  
  // Use the same WordPress REST API endpoint with Firebase user email
  const response = await fetch(`${WP_API_URL}/appraisals?user_email=${encodeURIComponent(user.email)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch appraisals');
  }
  
  return response.json();
}
```

## Timeline

Given your familiarity with Firebase implementation:

- **Phase 1**: 1 day
- **Phase 2**: 1-2 days
- **Phase 3**: 1-2 days
- **Phase 4**: 1-2 days
- **Phase 5**: 1-2 days
- **Phase 6**: 1 day

**Total estimated time**: 6-10 days

## Key Benefits

1. **Automatic user account creation** after appraisal submission and payment
2. **Simplified auth management** with Firebase handling token refresh and session management
3. **Maintained dashboard functionality** - users will still see their appraisals from WordPress
4. **Enhanced security** with industry-standard Firebase Authentication
5. **Reduced maintenance burden** compared to custom auth service

## Conclusion

This migration plan preserves all existing functionality while adding powerful new capabilities like automatic account creation for customers who submit appraisals. The WordPress REST API integration will continue to work seamlessly with Firebase Authentication, ensuring that users can still see their appraisals in the dashboard after login.

Since you're already familiar with Firebase implementation, this migration could be completed in 6-10 days with proper testing to ensure all functionality is preserved. 