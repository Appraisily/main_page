import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2, AlertCircle, Lock, CreditCard, Percent, ShieldCheck, Link2, ChevronDown } from 'lucide-react';
import { finalizeBulkUpload, updateSessionEmail } from '@/lib/api/bulkUploadApi';
import { useBulkUpload, type UploadedItem } from '@/hooks/useBulkUpload';
import { useFileUpload } from '@/hooks/useFileUpload';
import { SessionInfo } from '@/components/upload/BulkUpload/SessionInfo';
import { SessionRestoreForm } from '@/components/upload/BulkUpload/SessionRestoreForm';
import { UploadArea } from '@/components/upload/BulkUpload/UploadArea';
import { ItemGrid } from '@/components/upload/BulkUpload/ItemGrid';
import { AppraisalTypeSelector, type AppraisalType } from '@/components/upload/BulkUpload/AppraisalTypeSelector';
import { EmailInput } from '@/components/upload/BulkUpload/EmailInput';
import { PaymentNotice } from '@/components/upload/BulkUpload/PaymentNotice';
import { ActionButtons } from '@/components/upload/BulkUpload/ActionButtons';
import { Separator } from '@/components/ui/separator';

// Bulk discount constants
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 20; // 20% discount

// Add mobile-specific styles for section spacing
const mobileSectionSpacing = `
  @media (max-width: 640px) {
    .bulk-section-group {
      margin-bottom: 1.5rem !important;
    }
    .bulk-section-group:last-child {
      margin-bottom: 0 !important;
    }
  }
`;

export default function BulkUploadPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [appraisalType, setAppraisalType] = useState<AppraisalType>('regular');
  const [useTestPayment, setUseTestPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showRestorePanel, setShowRestorePanel] = useState(false);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    sessionId,
    isRestoringSession,
    items,
    error,
    setItems,
    setError,
    handleSessionRestore,
    refreshSession
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
    <>
      <style>{mobileSectionSpacing}</style>
      <div className="min-h-screen bg-stone-50 pt-24 pb-16 sm:pb-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-8 border-b border-gray-100">
              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-stone-100 rounded-full flex-shrink-0">
                  <Upload className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-emerald-900 mb-0" style={{ fontFamily: 'inherit', fontWeight: 600 }}>
                    Bulk Appraisal Request Process
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="p-3 sm:p-8">
              <div className="space-y-8 sm:space-y-12">
                {/* 1. Bulk discount (collapsible) */}
                <div className="bulk-section-group">
                  <details className="w-full bg-gradient-to-r from-blue-50 to-emerald-50/60 border border-emerald-100 rounded-lg group">
                    <summary className="flex items-center gap-3 p-3 sm:p-4 cursor-pointer select-none list-none">  
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <Percent className="h-5 w-5 text-emerald-600" />
                      </div>
                      <p className="font-medium text-gray-900 flex-1">Bulk Discount Available</p>
                      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-3 sm:px-4 pb-4 pt-1 text-sm text-gray-700">
                      Upload at least {BULK_DISCOUNT_THRESHOLD} items to receive a {BULK_DISCOUNT_PERCENTAGE}% discount on all appraisals.
                    </div>
                  </details>
                </div>

                {/* 2. Appraisal type selector */}
                <div className="bulk-section-group">
                  <AppraisalTypeSelector
                    value={appraisalType}
                    onChange={setAppraisalType}
                    itemCount={items.length}
                  />
                </div>

                {/* 3. Email input */}
                <div className="bulk-section-group">
                  <EmailInput
                    value={email}
                    onChange={setEmail}
                    onBlur={handleEmailBlur}
                    showConfirmation={emailSaved}
                  />
                </div>

                {/* 4. Session management */}
                <div className="bulk-section-group">
                  <div>
                    {sessionId && 
                      <SessionInfo 
                        sessionId={sessionId} 
                        onRefresh={refreshSession} 
                      />
                    }
                    {!showRestorePanel ? (
                      <button 
                        onClick={() => setShowRestorePanel(true)}
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Link2 className="h-3.5 w-3.5" />
                        <span>Restore a previous session</span>
                      </button>
                    ) : (
                      <SessionRestoreForm onRestore={handleSessionRestore} />
                    )}
                  </div>
                </div>

                {isRestoringSession && (
                  <div className="flex items-center justify-center py-12 bulk-section-group">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Restoring session...</span>
                    </div>
                  </div>
                )}

                {/* 5. Upload area */}
                {!isRestoringSession && (
                  <div className="bulk-section-group">
                    <UploadArea onFileSelect={handleFileSelect} />
                  </div>
                )}

                {/* 6. Display error if any */}
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-start gap-2 bulk-section-group">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {/* 7. Item Grid */}
                {items.length > 0 && (
                  <div className="bulk-section-group">
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
                  </div>
                )}

                {/* 8. Payment and checkout section */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                  {/* Test Payment Option - Only in development mode */}
                  {process.env.NODE_ENV !== 'production' && (
                    <div className="flex items-center gap-2 p-4 bg-stone-50 border border-stone-100 rounded-lg mb-4">
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
                  
                  {/* Action buttons */}
                  <ActionButtons
                    onSubmit={handleSubmit}
                    isUploading={isUploading}
                    disabled={items.length === 0}
                  />
                  
                  {/* Payment Methods and Guarantee */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Secure payment processing by Stripe</span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-5 pt-2">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CreditCard className="h-4 w-4" />
                        <span className="text-xs">Credit Card</span>
                      </div>
                      <img 
                        src="/images/payment-methods/new-paypal.svg" 
                        alt="PayPal" 
                        className="h-5" 
                      />
                      <img 
                        src="/images/payment-methods/google-pay.svg" 
                        alt="Google Pay" 
                        className="h-5" 
                      />
                      <img 
                        src="/images/payment-methods/apple-pay.svg" 
                        alt="Apple Pay" 
                        className="h-4" 
                      />
                    </div>
                    
                    <Separator className="bg-slate-200 my-3" />
                    
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>100% Money-Back Satisfaction Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}