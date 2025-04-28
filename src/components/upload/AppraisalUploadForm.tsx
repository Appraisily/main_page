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
      setError('Please upload at least the main artwork image');
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
      {/* Main Artwork */}
      <ImageUpload
        id="main_artwork"
        label="Main Artwork"
        description="Clear photo of your artwork"
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/example-rotated.jpeg"
        exampleTooltip="Take a clear, well-lit photo of the front of your artwork. Avoid glare and reflections."
        accept="image/*"
        required
        onChange={(file) => setFiles(prev => ({ ...prev, main: file }))}
      />

      {/* Signature */}
      <ImageUpload
        id="signature_artwork"
        label="Signature or Marks"
        description="Clear photo of any signatures or marks"
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/54E7BACA-3C7C-4E34-9887-681A9A15BD4B-scaled.jpeg"
        exampleTooltip="Take a close-up photo of any signatures, marks, or labels on the artwork."
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, signature: file }))}
      />

      {/* Age Indicators */}
      <ImageUpload
        id="age_artwork"
        label="Age Indicators"
        description="Photo showing age-related details"
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/7F9CF86F-4D62-497A-AA96-77B7BFBDA0A8-387db9fbeaf8374fca133be99981fa50-scaled-1.jpeg"
        exampleTooltip="Take a photo of the back of the artwork showing any labels, stamps, or age-related details."
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, age: file }))}
      />

      {/* Description */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          className="min-h-[100px] w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Artist's name (if known), period, provenance, size, media, or any other details that could help with the appraisal."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Upload Progress */}
      {error && (
        <div className="text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-3 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Submitting...</span>
          </div>
        ) : (
          'Submit Appraisal'
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