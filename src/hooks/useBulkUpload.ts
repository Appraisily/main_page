import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initBulkSession, restoreSession } from '@/lib/api/bulkUploadApi';
import type { UploadedItem } from '@/components/upload/BulkUpload/ItemGrid';

export function useBulkUpload() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(false);
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  type UploadStatus = 'error' | 'pending' | 'uploading' | 'success' | 'saving' | 'processed';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSessionId = params.get('session_id');
    const savedSession = localStorage.getItem('bulkAppraisalSession');
    const savedSessionData = savedSession ? JSON.parse(savedSession) : null;

    const initSession = async () => {
      try {
        if (urlSessionId) {
          setIsRestoringSession(true);
          setSessionId(urlSessionId);
        } else if (savedSessionData?.sessionId) {
          setIsRestoringSession(true);
          setSessionId(savedSessionData.sessionId);
          setItems(savedSessionData.items || []);
        } else {
          const { session_id } = await initBulkSession();
          setSessionId(session_id);
          localStorage.setItem('bulkAppraisalSession', JSON.stringify({
            sessionId: session_id,
            items: []
          }));
        }
      } catch (err) {
        setError('Failed to initialize upload session');
      } finally {
        setIsRestoringSession(false);
      }
    };

    initSession();
  }, [navigate]);

  const handleSessionRestore = async (id: string) => {
    setIsRestoringSession(true);
    try {
      const response = await restoreSession(id);
      if (response.success) {
        setSessionId(id);
        setItems(response.items.map(item => ({
          images: [{
            id: item.item_id,
            preview: item.file_url,
            type: 'main',
            label: 'Main Photo'
          }],
          id: item.item_id,
          uploadStatus: item.status as UploadStatus,
          description: item.description || '',
          category: item.category || ''
        })));
      }
    } catch (err) {
      setError('Failed to restore session');
    } finally {
      setIsRestoringSession(false);
    }
  };

  return {
    sessionId,
    isRestoringSession,
    items,
    error,
    setItems,
    setError,
    handleSessionRestore
  };
}