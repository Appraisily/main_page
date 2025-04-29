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
    
    // Add a small delay and scroll again to handle any race conditions
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, search]); // Include search params in the dependency array

  return null;
}