import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { validateFile } from '@/lib/validation/fileValidation';
import { submitAppraisal } from '@/lib/api/appraisalApi';
import ImageUpload from './ImageUpload';

interface AppraisalUploadFormProps {
  sessionId: string;
}

export default function AppraisalUploadForm({ sessionId }: AppraisalUploadFormProps) {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<{
    main: File | undefined;
    signature?: File;
    age?: File;
  }>({ main: undefined });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mainFile = files.main;
    if (!mainFile) {
      setError('Please upload at least the main item image');
      return;
    }

    // Validate main image
    const mainValidation = validateFile(mainFile);
    if (!mainValidation.isValid) {
      setError(mainValidation.error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitAppraisal({
        session_id: sessionId,
        description,
        images: {
          main: mainFile,
          signature: files.signature,
          age: files.age
        }
      });

      if (response.success) {
        // Reset scroll position before navigation
        window.scrollTo(0, 0);
        
        // Navigate to success page with the session ID
        navigate(`/submission-success?session_id=${sessionId}`, { 
          replace: true // Use replace instead of push to prevent back navigation issues
        });
      } else {
        throw new Error(response.error || 'Upload failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* Main Item Image */}
      <ImageUpload
        id="main_item"
        label="Main Item Image"
        description="Clear photo of your item"
        exampleImage="https://ik.imagekit.io/appraisily/WebPage/main_example.png"
        exampleTooltip="Take clear, well-lit photos showing the entire item. For artwork, furniture, collectibles, or any other items, capture the front view that best represents the piece. Avoid glare, shadows, and busy backgrounds."
        accept="image/*"
        required
        onChange={(file) => setFiles(prev => ({ ...prev, main: file }))}
      />

      {/* Signature/Markings */}
      <ImageUpload
        id="signature_markings"
        label="Signature or Markings"
        description="Clear photo of any signatures, stamps, or marks"
        exampleImage="https://ik.imagekit.io/appraisily/WebPage/mark_example.png"
        exampleTooltip="Capture clear close-ups of signatures, maker's marks, stamps, hallmarks, labels, or any identifying features on your item. These markings are crucial for authentication and proper valuation."
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, signature: file }))}
      />

      {/* Age/Condition Indicators */}
      <ImageUpload
        id="age_indicators"
        label="Age & Condition Details"
        description="Photo showing condition and age-related details"
        exampleImage="https://ik.imagekit.io/appraisily/WebPage/age_example.png"
        exampleTooltip="Take photos showing the back, underside, or interior of the item, along with any details that indicate age, condition, restoration, or damage. For furniture, show joinery details; for artwork, capture the back of canvases or frames; for collectibles, document any patina, crazing, or wear patterns."
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, age: file }))}
      />

      {/* Description */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-base font-semibold text-gray-900"
        >
          Item Details
        </label>
        <textarea
          id="description"
          className="min-h-[120px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          placeholder="Please include any known details such as: creator/maker, period, provenance, size, materials, etc. Any information that could help with the appraisal."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Upload Progress */}
      {error && (
        <div className="text-sm text-red-600 text-center p-3 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-3 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Submitting...</span>
          </div>
        ) : (
          'Submit Appraisal Request'
        )}
      </button>

      {/* Support Email */}
      <p className="text-sm text-muted-foreground text-center mt-8">
        Having trouble uploading? Send your images to{' '}
        <a 
          href={`mailto:info@appraisily.com?subject=Data for appraisal ${sessionId}`}
          className="text-primary hover:text-primary/90 underline"
        >
          info@appraisily.com
        </a>{' '}
        with subject "Data for appraisal {sessionId}"
      </p>
    </form>
  );
}