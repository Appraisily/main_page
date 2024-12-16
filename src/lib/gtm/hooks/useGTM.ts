import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pushToDataLayer } from '../utils';

export function useGTM() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    pushToDataLayer({
      event: 'page_view',
      page: {
        path: location.pathname,
        title: document.title,
        search: location.search,
        url: window.location.href
      }
    });
  }, [location]);
}