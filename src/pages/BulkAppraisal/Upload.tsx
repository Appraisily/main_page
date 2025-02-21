import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2 } from 'lucide-react';
import { validateFile } from '@/lib/validation/fileValidation';
import { initBulkSession, uploadFile, finalizeBulkUpload, restoreSession, updateSessionEmail } from '@/lib/api/bulkUploadApi';
import { SessionInfo } from '@/components/upload/SessionInfo';
import { SessionRestoreForm } from '@/components/upload/BulkUpload/SessionRestoreForm';
import { UploadArea } from '@/components/upload/BulkUpload/UploadArea';
import { ItemGrid, UploadedItem } from '@/components/upload/BulkUpload/ItemGrid';
import { AppraisalTypeSelector, type AppraisalType } from '@/components/upload/BulkUpload/AppraisalTypeSelector';
import { EmailInput } from '@/components/upload/BulkUpload/EmailInput';
import { PhotoTips } from '@/components/upload/BulkUpload/PhotoTips';
import { PaymentNotice } from '@/components/upload/BulkUpload/PaymentNotice';
import { ActionButtons } from '@/components/upload/BulkUpload/ActionButtons';

export default function BulkUploadPage() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(false);
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [appraisalType, setAppraisalType] = useState<'regular' | 'insurance' | 'tax'>('regular');
  const [emailSaved, setEmailSaved] = useState(false);

  const handleEmailBlur = async () => {
    if (!sessionId || !email) return;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      console.log('Updating email for session:', sessionId);
      await updateSessionEmail(sessionId, email);
      setEmailSaved(true);
      
      // Update local storage
      const sessionData = localStorage.getItem('bulkAppraisalSession');
      if (sessionData) {
        const data = JSON.parse(sessionData);
        localStorage.setItem('bulkAppraisalSession', JSON.stringify({
          ...data,
          email
        }));
      }
      setError(null); // Clear any previous errors
      console.log('Email updated successfully');
    } catch (err) {
      console.error('Failed to save email:', err instanceof Error ? err.message : err);
      setError('Failed to save email. Please try again.');
    }
  };

  const handleSessionRestore = async (id: string) => {
    setIsRestoringSession(true);
    try {
      const response = await restoreSession(id);
      if (response.success) {
        setSessionId(id);
        setItems(response.items.map(item => ({
          id: item.item_id,
          preview: item.file_url,
          uploadStatus: item.status,
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

  // Initialize session when component mounts
  React.useEffect(() => {
    // Check URL for session ID
    const params = new URLSearchParams(window.location.search);
    const urlSessionId = params.get('session_id');

    // Check localStorage for saved session
    const savedSession = localStorage.getItem('bulkAppraisalSession');
    const savedSessionData = savedSession ? JSON.parse(savedSession) : null;

    const initSession = async () => {
      try {
        if (urlSessionId) {
          // Restore session from URL
          setIsRestoringSession(true);
          setSessionId(urlSessionId);
          // TODO: Fetch session items from API
        } else if (savedSessionData?.sessionId) {
          // Restore saved session
          setIsRestoringSession(true);
          setSessionId(savedSessionData.sessionId);
          setItems(savedSessionData.items || []);
        } else {
          // Create new session
          const { session_id } = await initBulkSession();
          setSessionId(session_id);
          // Save to localStorage
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

  const handleFileSelect = async (files: FileList) => {
    if (!sessionId) {
      setError('Upload session not initialized');
      return;
    }

    const newFiles = await Promise.all(Array.from(files).map(async file => {
      // Validate each file
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        return null;
      }

      // Create unique ID for the item
      const itemId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      return {
        id: itemId,
        images: [{
          id: '', // This will be set after upload
          preview: previewUrl,
          file: file, // Store the actual File object
          type: 'main',
          label: 'Main Photo'
        }],
        uploadStatus: 'pending',
        description: '',
        category: ''
      };
    })).then(files => files.filter(Boolean)) as UploadedItem[];

    setItems(prev => [...prev, ...newFiles]);
    setError(null);

    // Upload each file immediately
    newFiles.forEach(item => handleUploadFile(item));
  };

  const handleUploadFile = async (item: UploadedItem) => {
    if (!sessionId) return;

    // Get the actual File object from the item
    const file = item.images[0].file;
    if (!file) {
      console.error('No file found for upload');
      return;
    }

    // Update item status to uploading
    setItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, uploadStatus: 'uploading' } : i
    ));

    try {
      const result = await uploadFile(
        sessionId,
        file,
        item.description,
        item.category,
        appraisalType
      );
      
      console.log('Upload successful:', result);

      // Update item with success status
      setItems(prev => prev.map(i => 
        i.id === item.id ? { 
          ...i, 
          uploadStatus: 'success',
          id: result.file_id, // Use file_id from response
          images: [{
            ...i.images[0],
            id: result.file_id // Use file_id for image ID
          }]
        } : i
      ));
    } catch (err) {
      // Update item with error status
      setItems(prev => prev.map(i => 
        i.id === item.id ? { 
          ...i, 
          uploadStatus: 'error',
          uploadError: err instanceof Error ? err.message : 'Upload failed'
        } : i
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id);
      // Cleanup preview URLs
      prev.forEach(item => {
        if (item.id === id) {
          item.images.forEach(image => URL.revokeObjectURL(image.preview));
        }
      });
      return filtered;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionId || items.length === 0) {
      setError('Please add at least one item');
      return;
    }

    // Check if any uploads are still in progress
    const hasUploading = items.some(item => item.uploadStatus === 'uploading');
    if (hasUploading) {
      setError('Please wait for all uploads to complete');
      return;
    }

    // Check if any uploads failed
    const hasFailed = items.some(item => item.uploadStatus === 'error');
    if (hasFailed) {
      setError('Some uploads failed. Please retry or remove failed items.');
      return;
    }

    setIsUploading(true);

    try {
      // Finalize session with backend
      await finalizeBulkUpload(sessionId, appraisalType);

      // Store session data for review page
      localStorage.setItem('bulkAppraisalSession', JSON.stringify({
        sessionId,
        items,
        email,
        appraisalType
      }));

      // Get Stripe checkout URL and redirect
      const paymentLink = getStripeCheckoutUrl(sessionId, appraisalType);
      window.location.href = paymentLink;
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b">
            <div className="p-3 bg-blue-100 rounded-full">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Bulk Appraisal Request Process
              </h1>
              <p className="text-gray-600">
                Add multiple items for appraisal
              </p>
            </div>
          </div>
          
          {/* Email Input */}
          <EmailInput
            value={email}
            onChange={setEmail}
            onBlur={handleEmailBlur}
            showConfirmation={emailSaved}
          />

          {/* Appraisal Type Selection */}
          <AppraisalTypeSelector
            value={appraisalType}
            onChange={setAppraisalType}
            itemCount={items.length}
          />

          {/* Session Info & Restore */}
          {!isRestoringSession && (
            <>
              {sessionId && <SessionInfo sessionId={sessionId} />}
              <SessionRestoreForm onRestore={handleSessionRestore} />
            </>
          )}

          {/* Loading State */}
          {isRestoringSession && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Restoring session...</span>
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!isRestoringSession && (
            <div className="mb-8">
              <PhotoTips />
              <UploadArea onFileSelect={handleFileSelect} />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Items Grid */}
          <ItemGrid
            items={items}
            sessionId={sessionId}
            onRemoveItem={handleRemoveItem}
            onDescriptionChange={(id, description, status) => {
              setItems(prev => prev.map(i => 
                i.id === id ? { 
                  ...i, 
                  description,
                  descriptionStatus: status
                } : i
              ));
            }}
            onFileSelect={handleFileSelect}
          />

          {/* Actions */}
          <div className="space-y-6">
            {/* Payment Notice */}
            <PaymentNotice />

            {/* Buttons */}
            <ActionButtons
              onCancel={() => navigate('/bulk-appraisal')}
              onSubmit={handleSubmit}
              isUploading={isUploading}
              disabled={items.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}