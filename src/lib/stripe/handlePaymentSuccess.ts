import { createUserAfterPayment } from '../firebase/firebaseAuth';
import { auth } from '../firebase/config';

const API_URL = import.meta.env.VITE_PAYMENT_API_URL || 'https://payment-processor-856401495068.us-central1.run.app';

/**
 * Handles successful payment and creates a Firebase user account
 * @param sessionId The Stripe session ID
 * @param email The customer's email, passed from the calling component
 * @returns Response with success status
 */
export async function handleSuccessfulPayment(sessionId: string, email: string | undefined): Promise<{ success: boolean; userCreated?: boolean; userExists?: boolean }> {
  try {
    // Only proceed if there's no current user logged in
    if (auth.currentUser) {
      console.log('User already logged in, skipping account creation');
      return { success: true, userExists: true };
    }

    // Email is now passed as a parameter, no need to fetch it here.
    // const response = await fetch(`${API_URL}/stripe/session/${sessionId}/email`); // REMOVED
    // if (!response.ok) { // REMOVED
    //   console.error('Failed to fetch email from session', { // REMOVED
    //     status: response.status, // REMOVED
    //     statusText: response.statusText // REMOVED
    //   }); // REMOVED
    //   throw new Error('Failed to fetch customer email'); // REMOVED
    // } // REMOVED
    // const data = await response.json(); // REMOVED
    // const { email: fetchedEmail } = data; // REMOVED
    
    if (!email) {
      console.error('No email provided for account creation for session:', sessionId);
      throw new Error('No email found for session, cannot create account');
    }
    
    console.log(`Creating account for customer: ${email} for session: ${sessionId}`);
    
    // Create a Firebase user account with the email
    const result = await createUserAfterPayment(email);
    
    if (result.success) {
      console.log('Successfully created account for customer');
      return { 
        success: true, 
        userCreated: !result.userExists,
        userExists: result.userExists
      };
    } else {
      throw new Error('Failed to create user account');
    }
  } catch (error) {
    console.error('Error in payment success handler:', error);
    throw error;
  }
}

/**
 * Updates a bulk appraisal session with customer email
 * @param sessionId The bulk appraisal session ID
 * @param email The customer email
 */
export async function updateSessionEmail(sessionId: string, email: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/bulk-appraisals/session/${sessionId}/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update session email');
    }
  } catch (error) {
    console.error('Error updating session email:', error);
    throw error;
  }
} 