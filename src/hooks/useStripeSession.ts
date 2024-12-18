import { useState, useEffect, useRef } from 'react';

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
  const fetchController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError('No session ID provided.');
      return;
    }

    // Abort previous fetch if it exists
    if (fetchController.current) {
      fetchController.current.abort();
    }

    // Create new abort controller for this fetch
    fetchController.current = new AbortController();

    async function fetchSession() {
      try {
        const response = await fetch(
          `https://payment-processor-856401495068.us-central1.run.app/stripe/session/${sessionId}`,
          {
            headers: {
              'x-shared-secret': 'sk_shared_5f9a4b2c8e7d6f3a1b9c4d5e8f7a2b3c4d5e6f7',
              'Accept': 'application/json'
            },
            signal: fetchController.current?.signal
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to fetch session: ${errorData}`);
        }

        const stripeSession = await response.json();

        if (!stripeSession) {
          throw new Error('Session not found in Stripe.');
        }

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
        // Only set error if it's not an abort error
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSession();

    // Cleanup function to abort fetch on unmount or sessionId change
    return () => {
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, [sessionId]); // Only re-run if sessionId changes

  return { session, loading, error };
}