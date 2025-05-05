import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2, AlertCircle, Lock, CreditCard } from 'lucide-react';
import { finalizeBulkUpload, updateSessionEmail } from '@/lib/api/bulkUploadApi';
import { useBulkUpload, type UploadedItem } from '@/hooks/useBulkUpload';
import { useFileUpload } from '@/hooks/useFileUpload';
import { SessionInfo } from '@/components/upload/SessionInfo';
import { SessionRestoreForm } from '@/components/upload/BulkUpload/SessionRestoreForm';
import { UploadArea } from '@/components/upload/BulkUpload/UploadArea';
import { ItemGrid } from '@/components/upload/BulkUpload/ItemGrid';
import { AppraisalTypeSelector, type AppraisalType } from '@/components/upload/BulkUpload/AppraisalTypeSelector';
import { EmailInput } from '@/components/upload/BulkUpload/EmailInput';
import { PhotoTips } from '@/components/upload/BulkUpload/PhotoTips';
import { PaymentNotice } from '@/components/upload/BulkUpload/PaymentNotice';
import { ActionButtons } from '@/components/upload/BulkUpload/ActionButtons';

export default function BulkUploadPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [appraisalType, setAppraisalType] = useState<AppraisalType>('regular');
  const [useTestPayment, setUseTestPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    sessionId,
    isRestoringSession,
    items,
    error,
    setItems,
    setError,
    handleSessionRestore
  } = useBulkUpload();

  const { handleFileSelect, handleRemoveItem } = useFileUpload({
    sessionId,
    appraisalType,
    setError,
    setItems
  });

  const handleEmailBlur = async () => {
    if (!sessionId || !email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await updateSessionEmail(sessionId, email);
      setEmailSaved(true);
      
      const sessionData = localStorage.getItem('bulkAppraisalSession');
      if (sessionData) {
        const data = JSON.parse(sessionData);
        localStorage.setItem('bulkAppraisalSession', JSON.stringify({
          ...data,
          email
        }));
      }
      setError(null);
    } catch (err) {
      setError('Failed to save email. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!sessionId || items.length === 0) {
      setError('Please add at least one item');
      return;
    }

    const hasUploading = items.some(item => item.uploadStatus === 'uploading');
    if (hasUploading) {
      setError('Please wait for all uploads to complete');
      return;
    }

    const hasFailed = items.some(item => item.uploadStatus === 'error');
    if (hasFailed) {
      setError('Some uploads failed. Please retry or remove failed items.');
      return;
    }

    setIsUploading(true);

    try {
      await finalizeBulkUpload(sessionId, appraisalType);

      localStorage.setItem('bulkAppraisalSession', JSON.stringify({
        sessionId,
        items,
        email,
        appraisalType
      }));

      const paymentLinks = {
        regular: 'https://buy.stripe.com/9AQaIKd925jC6Ag6pQ',
        insurance: 'https://buy.stripe.com/7sI2ce2uo13m4s87tW',
        tax: 'https://buy.stripe.com/6oE2cefha3bu1fW15z',
        test: 'https://buy.stripe.com/cN2aIK8SMaDW4s87u1'
      };

      // Remove the bulk_ prefix since it's already added by the backend
      const paymentLink = `${useTestPayment ? paymentLinks.test : paymentLinks[appraisalType]}?prefilled_promo_code=FRIENDS20&client_reference_id=${sessionId}`;
      window.location.href = paymentLink;
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-5">
              <div className="p-3.5 bg-stone-100 rounded-full flex-shrink-0">
                <Upload className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
                  Bulk Appraisal Request Process
                </h1>
                <p className="text-gray-600">
                  Add multiple items for appraisal
                </p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-8">
            <div className="space-y-12">
              <EmailInput
                value={email}
                onChange={setEmail}
                onBlur={handleEmailBlur}
                showConfirmation={emailSaved}
              />

              <AppraisalTypeSelector
                value={appraisalType}
                onChange={setAppraisalType}
                itemCount={items.length}
              />

              {!isRestoringSession && (
                <>
                  {sessionId && <SessionInfo sessionId={sessionId} />}
                  <SessionRestoreForm onRestore={handleSessionRestore} />
                </>
              )}

              {isRestoringSession && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Restoring session...</span>
                  </div>
                </div>
              )}

              {!isRestoringSession && (
                <div className="mb-8">
                  <PhotoTips />
                  <UploadArea onFileSelect={handleFileSelect} />
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <ItemGrid
                items={items}
                sessionId={sessionId}
                onRemoveItem={(id: string) => handleRemoveItem(id)}
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

              <div className="space-y-6 pt-6 border-t border-gray-100">
                <PaymentNotice />
                
                {/* Payment Methods Section */}
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-center gap-2 bg-stone-50 p-3 border-b border-gray-200">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Secure payment processing by Stripe</span>
                  </div>
                  <div className="flex items-center justify-center gap-8 p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-700" />
                      <span className="text-sm text-gray-700">Credit Card</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" height="23" />
                    </div>
                    <div className="text-sm text-gray-700 flex items-center gap-1">
                      <span className="font-medium">G</span>
                      <span className="text-blue-500">o</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">g</span>
                      <span className="text-blue-500">l</span>
                      <span className="text-green-500">e</span>
                      <span className="ml-1">Pay</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      Apple Pay
                    </div>
                  </div>
                </div>
                
                {/* Test Payment Option */}
                {process.env.NODE_ENV !== 'production' && (
                  <div className="flex items-center gap-2 p-4 bg-stone-50 border border-stone-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="useTestPayment"
                      checked={useTestPayment}
                      onChange={(e) => setUseTestPayment(e.target.checked)}
                      className="h-4 w-4 text-gray-600 rounded border-gray-300"
                    />
                    <label htmlFor="useTestPayment" className="text-sm font-medium text-gray-700">
                      Use test payment link
                    </label>
                  </div>
                )}
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
      </div>
    </div>
  );
}