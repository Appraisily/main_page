import { useState, useEffect } from 'react';

interface StripeSession {
  customer: {
    name: string;
    email: string;
  };
  amount_total: number;
  currency: string;
  payment_status: string;
}

export function useStripeSession(sessionId: string | null) {
  const [session, setSession] = useState<StripeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError('No session ID provided.');
      return;
    }

    async function fetchSession() {
      console.log('Fetching session:', { sessionId });
      
      try {
        const response = await fetch(`https://payment-processor-856401495068.us-central1.run.app/stripe/session/${sessionId}`, {
          headers: {
            'x-shared-secret': 'sk_shared_5f9a4b2c8e7d6f3a1b9c4d5e8f7a2b3c4d5e6f7',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to fetch session: ${errorData}`);
        }

        const stripeSession = await response.json();

        if (!stripeSession) {
          throw new Error('Session not found in Stripe.');
        }
        console.log('Session retrieved:', stripeSession);

        // Transform Stripe session into our interface
        setSession({
          customer: {
            name: stripeSession.customer_details?.name || '',
            email: stripeSession.customer_details?.email || ''
          },
          amount_total: stripeSession.amount_total || 0,
          currency: stripeSession.currency || 'usd',
          payment_status: stripeSession.payment_status || ''
        });
      } catch (err) {
        console.error('Session fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load session');
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  return { session, loading, error };
}