import { useEffect } from 'react';

export const useGoogleTagManager = (gtmId: string) => {
  useEffect(() => {
    // We don't need to manually implement GTM here as it's already being done
    // through the Helmet component in App.tsx
    
    // This hook is now used for programmatic dataLayer events, not initialization
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
    
    return () => {
      // No cleanup needed
    };
  }, [gtmId]);
  
  // Helper function to push events to dataLayer
  const pushEvent = (event: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(event);
    }
  };
  
  return { pushEvent };
};