import { useState, useEffect } from 'react';

interface Report {
  imageUrl: string;
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
  similarImages: string[];
}

interface ReportResponse {
  success: boolean;
  customerImageUrl: string;
  similarImageUrls: string[];
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
}

export function useReport(sessionId: string | undefined) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState(0);
  const MAX_RETRIES = 30; // 60 seconds maximum waiting time

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError('No session ID provided');
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const fetchReport = async () => {
      try {
        const response = await fetch(`https://appraisals-web-services-backend-856401495068.us-central1.run.app/get-report?sessionId=${sessionId}`);
        
        if (!response.ok) {
          if (retries < MAX_RETRIES) {
            // If we haven't reached max retries, try again in 2 seconds
            setRetries(prev => prev + 1);
            timeoutId = setTimeout(fetchReport, 2000);
            return;
          }
          throw new Error('Failed to fetch report');
        }

        const data: ReportResponse = await response.json();
        
        if (data.success) {
          setReport({
            imageUrl: data.customerImageUrl,
            analysis: data.analysis,
            enhancedAnalysis: data.enhancedAnalysis,
            offerText: data.offerText,
            similarImages: data.similarImageUrls,
          });
          setLoading(false);
        } else {
          if (retries < MAX_RETRIES) {
            // If we haven't reached max retries, try again in 2 seconds
            setRetries(prev => prev + 1);
            timeoutId = setTimeout(fetchReport, 2000);
          } else {
            throw new Error('Failed to generate report');
          }
        }
      } catch (e) {
        if (retries < MAX_RETRIES) {
          // If we haven't reached max retries, try again in 2 seconds
          setRetries(prev => prev + 1);
          timeoutId = setTimeout(fetchReport, 2000);
        } else {
          setError(e instanceof Error ? e.message : 'An error occurred');
          setLoading(false);
        }
      }
    };

    fetchReport();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sessionId, retries]);

  return { report, loading, error };
}