import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripeSession } from '@/hooks/useStripeSession';
import ImageUpload from './ImageUpload';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface UploadFormProps {
  sessionId: string;
}

export default function UploadForm({ sessionId }: UploadFormProps) {
  const navigate = useNavigate();
  const { session } = useStripeSession(sessionId);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<{
    front?: File;
    signature?: File;
    back?: File;
  }>({});
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.front) {
      alert('Please upload at least the front artwork image');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('session_id', sessionId);
      formData.append('email', session?.customer_details?.email || '');
      formData.append('description', description);

      if (files.front) formData.append('front_artwork', files.front);
      if (files.signature) formData.append('signature_artwork', files.signature);
      if (files.back) formData.append('back_artwork', files.back);

      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      if (session?.customer_details?.email) {
        // Redirect to login for dashboard access
        navigate('/login');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again or contact support.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Front Artwork */}
      <ImageUpload
        id="front_artwork"
        label="Front Artwork"
        description="Clear well-lit photo of the front of your artwork"
        accept="image/*"
        required
        onChange={(file) => setFiles(prev => ({ ...prev, front: file }))}
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/example-rotated.jpeg"
      />

      {/* Signature */}
      <ImageUpload
        id="signature_artwork"
        label="Signature"
        description="Clear photo of the signature or maker's mark"
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, signature: file }))}
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/54E7BACA-3C7C-4E34-9887-681A9A15BD4B-scaled.jpeg"
      />

      {/* Back Artwork */}
      <ImageUpload
        id="back_artwork"
        label="Back Artwork"
        description="Photo of the back showing any labels or marks"
        accept="image/*"
        onChange={(file) => setFiles(prev => ({ ...prev, back: file }))}
        exampleImage="https://resources.appraisily.com/wp-content/uploads/2024/02/7F9CF86F-4D62-497A-AA96-77B7BFBDA0A8-387db9fbeaf8374fca133be99981fa50-scaled-1.jpeg"
      />

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          className="min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Artist's name (if known), period, provenance, size, media, or any other details that could help with the appraisal."
          maxLength={1500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Please provide as much detail as possible (max 1500 characters)
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isUploading || !files.front}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isUploading ? 'Uploading...' : 'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Support Email */}
      <p className="text-sm text-gray-500 text-center">
        Having trouble? Contact us at{' '}
        <a 
          href="mailto:info@appraisily.com" 
          className="text-blue-600 hover:text-blue-700"
        >
          info@appraisily.com
        </a>
      </p>
    </form>
  );
}