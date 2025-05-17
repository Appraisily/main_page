import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initBulkSession, restoreSession } from '@/lib/api/bulkUploadApi';
import type { BulkUploadResponse } from '@/lib/types/appraisal';

export type UploadStatus = 'error' | 'pending' | 'uploading' | 'success' | 'saving' | 'processed';

export interface UploadedItem {
  id: string;
  images: {
    id: string;
    preview: string;
    file?: File;
    type: 'main' | 'signature' | 'age';
    label: string;
  }[];
  uploadStatus: UploadStatus;
  uploadProgress?: number;
  uploadError?: string;
  description?: string;
  localDescription?: string;
  category?: string;
  descriptionStatus?: 'saving' | 'saved' | 'error';
  descriptionError?: string;
}

export function useBulkUpload() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(false);
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const initSession = async () => {
    try {
      const { session_id } = await initBulkSession();
      setSessionId(session_id);
      localStorage.setItem('bulkAppraisalSession', JSON.stringify({
        sessionId: session_id,
        items: []
      }));
      return session_id;
    } catch (err) {
      setError('Failed to initialize upload session');
      return null;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSessionId = params.get('session_id');
    const savedSession = localStorage.getItem('bulkAppraisalSession');
    const savedSessionData = savedSession ? JSON.parse(savedSession) : null;

    const setupSession = async () => {
      try {
        if (urlSessionId) {
          setIsRestoringSession(true);
          setSessionId(urlSessionId);
          
          // Actually fetch the session data from the backend
          try {
            const response = await restoreSession(urlSessionId);
            if (response.success && response.items) {
              setItems(response.items.map(item => ({
                images: [{
                  id: item.item_id,
                  preview: item.file_url,
                  type: 'main',
                  label: 'Main Photo'
                }] as UploadedItem['images'],
                id: item.item_id,
                uploadStatus: item.status as UploadStatus,
                description: item.description || '',
                category: item.category || ''
              })));
            }
          } catch (restoreErr) {
            console.error('Failed to restore session from URL:', restoreErr);
            setError('Failed to restore session. The session may have expired.');
          }
        } else if (savedSessionData?.sessionId) {
          setIsRestoringSession(true);
          setSessionId(savedSessionData.sessionId);
          setItems(savedSessionData.items || []);
        } else {
          await initSession();
        }
      } catch (err) {
        setError('Failed to initialize upload session');
      } finally {
        setIsRestoringSession(false);
      }
    };

    setupSession();
  }, [navigate]);

  const handleSessionRestore = async (id: string) => {
    setIsRestoringSession(true);
    try {
      const response = await restoreSession(id);
      if (response.success && response.items) {
        setSessionId(id);
        setItems(response.items.map(item => ({
          images: [{
            id: item.item_id,
            preview: item.file_url,
            type: 'main',
            label: 'Main Photo'
          }] as UploadedItem['images'],
          id: item.item_id,
          uploadStatus: item.status as UploadStatus,
          description: item.description || '',
          category: item.category || ''
        })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore session');
    } finally {
      setIsRestoringSession(false);
    }
  };

  const refreshSession = async () => {
    // Remove current session from local storage
    localStorage.removeItem('bulkAppraisalSession');
    
    // Reset state
    setItems([]);
    setError(null);
    
    // Initialize a new session
    await initSession();
  };

  return {
    sessionId,
    isRestoringSession,
    items,
    error,
    setItems,
    setError,
    handleSessionRestore,
    refreshSession
  };
}