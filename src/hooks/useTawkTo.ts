import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export const useTawkTo = () => {
  useEffect(() => {
    const loadTawkTo = () => {
      // Only load if user has scrolled or after 5 seconds
      const shouldLoad = () => {
        try {
          // Initialize Tawk API
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();

          // Create script element with CSP nonce
          const s1 = document.createElement("script");
          s1.async = true;
          s1.src = 'https://embed.tawk.to/63a083dbb0d6371309d528e2/1gklg645r';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s1.setAttribute('nonce', 'tawk-script'); // Add CSP nonce
          
          // Error handling
          s1.onerror = () => {
            console.warn('Tawk.to chat widget failed to load');
            s1.remove();
          };

          // Append script to head
          document.head.appendChild(s1);

          // Remove event listeners
          window.removeEventListener('scroll', shouldLoad);
          clearTimeout(timer);
        } catch (error) {
          console.warn('Error loading Tawk.to chat:', error);
        }
      };

      // Load on scroll
      window.addEventListener('scroll', shouldLoad, { once: true });
      
      // Load after 5 seconds if no scroll
      const timer = setTimeout(shouldLoad, 5000);

      return () => {
        window.removeEventListener('scroll', shouldLoad);
        clearTimeout(timer);
      };
    };

    // Only load if user interacts or after initial page load
    if (document.readyState === 'complete') {
      loadTawkTo();
    } else {
      window.addEventListener('load', loadTawkTo);
      return () => window.removeEventListener('load', loadTawkTo);
    }
  }, []);
};