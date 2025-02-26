import { useEffect } from 'react';

export const useGoogleTagManager = (gtmId: string) => {
  useEffect(() => {
    function initGTM() {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', gtmId);
    }

    // Check if GTM is already loaded
    if (!window.gtag) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
      script.async = true;
      script.onload = initGTM;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, [gtmId]);
};