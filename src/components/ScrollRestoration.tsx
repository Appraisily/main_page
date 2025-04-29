import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRestoration() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Force scroll to top on navigation
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    
    // Add a delay and scroll again to handle any race conditions
    // Using a longer delay to ensure content has loaded
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Add another scroll attempt with a slightly longer delay
      const secondTimeoutId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        
        // Force scroll on document element as well for maximum compatibility
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 150);
      
      return () => clearTimeout(secondTimeoutId);
    }, 250);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, search]); // Include search params in the dependency array

  return null;
}