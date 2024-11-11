import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Appraisal {
  id: number;
  title: {
    rendered: string;
  };
  date: string;
  acf: {
    main: string;
    value: string;
  };
  link: string;
}

export function useWordPressAppraisals() {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppraisals() {
      try {
        const response = await fetch('https://www.appraisily.com/wp-json/wp/v2/appraisals?per_page=10', {
          headers: {
            'Authorization': 'Basic ' + btoa('Admin-Appraisily:uS2F cpoG D6io hv58 BFUR dpyx')
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appraisals');
        }

        const data = await response.json();
        setAppraisals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchAppraisals();
  }, []);

  return { appraisals, loading, error };
}