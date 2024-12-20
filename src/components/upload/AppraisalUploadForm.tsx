import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { validateFile } from '@/lib/validation/fileValidation';
import { submitAppraisal } from '@/lib/api/appraisalApi';
import { UploadProgress } from '@/lib/types/appraisal';
import ImageUpload from './ImageUpload';

interface AppraisalUploadFormProps {
  sessionId: string;
}

export default function AppraisalUploadForm({ sessionId }: AppraisalUploadFormProps) {
  const navigate = useNavigate();
  const { session } = useStripeSession(sessionId);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<{
    main?: File;
    signature?: File;
    age?: File;
  }>({});
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.main) {
      setUploadProgress({
        status: 'error',
        progress: 0,
        error: 'Please upload at least the main artwork image'
      });
      return;
    }

    // Validate main image
    const mainValidation = validateFile(files.main);
    if (!mainValidation.isValid) {
      setUploadProgress({
        status: 'error',
        progress: 0,
        error: mainValidation.error
      });
      return;
    }

    setUploadProgress({ status: 'uploading', progress: 0 });

    try {
      const response = await submitAppraisal({
        session_id: sessionId,
        customer_email: session?.customer.email || '',
        customer_name: session?.customer.name,
        description,
        images: files
      }, (progress) => {
        setUploadProgress({ status: 'uploading', progress });
      });

      if (response.success) {
        setUploadProgress({ status: 'success', progress: 100 });
        navigate('/dashboard');
      } else {
        throw new Error(response.error || 'Upload failed');
      }
    } catch (error) {
      setUploadProgress({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Main Artwork */}
      <ImageUpload
        id="main_artwork"
        label="Main Artwork"
        description="Clear photo of your artwork"
        accept="image/*"
        required
        onChange={(file) => setFiles(prev => ({ ...prev, main: file }))}
      />

      {/* Signature */}
      <ImageUpload
        id="signature_artwork"
        label="Signature or Marks"
        description="Clear photo of any signatures or marks"
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, signature: file }))}
      />

      {/* Age Indicators */}
      <ImageUpload
        id="age_artwork"
        label="Age Indicators"
        description="Photo showing age-related details"
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, age: file }))}
      />

      {/* Description */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Artist's name (if known), period, provenance, size, media, or any other details that could help with the appraisal."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Upload Progress */}
      {uploadProgress.status !== 'idle' && (
        <div className="rounded-md p-4 mb-4">
          {uploadProgress.status === 'uploading' && (
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">
                Uploading... {Math.round(uploadProgress.progress)}%
              </span>
            </div>
          )}

          {uploadProgress.status === 'error' && (
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{uploadProgress.error}</span>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploadProgress.status === 'uploading'}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {uploadProgress.status === 'uploading' ? 'Uploading...' : 'Submit Appraisal'}
      </button>

      {/* Support Email */}
      <p className="text-sm text-gray-500 text-center mt-8">
        Having trouble uploading? Send your images to{' '}
        <a 
          href={`mailto:info@appraisily.com?subject=Data for appraisal ${sessionId}`}
          className="text-blue-600 hover:text-blue-700"
        >
          info@appraisily.com
        </a>{' '}
        with subject "Data for appraisal {sessionId}"
      </p>
    </form>
  );
}