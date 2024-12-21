import { StripeSession } from '../types/stripe';

const API_URL = 'https://payment-processor-856401495068.us-central1.run.app';

export async function fetchSessionEmail(sessionId: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/stripe/session/${sessionId}/email`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch session email');
    }

    const data = await response.json();
    return data.email;
  } catch (error) {
    throw error;
  }
}