import { useState } from 'react';
import { validateFile } from '@/lib/validation/fileValidation';
import { uploadFile } from '@/lib/api/bulkUploadApi';
import type { UploadedItem } from '@/components/upload/BulkUpload/ItemGrid';
import type { AppraisalType } from '@/components/upload/BulkUpload/AppraisalTypeSelector';

interface UseFileUploadProps {
  sessionId: string | null;
  appraisalType: AppraisalType;
  setError: (error: string | null) => void;
  setItems: React.Dispatch<React.SetStateAction<UploadedItem[]>>;
}

export function useFileUpload({ sessionId, appraisalType, setError, setItems }: UseFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (files: FileList) => {
    if (!sessionId) {
      setError('Upload session not initialized');
      return;
    }

    const newFiles = await Promise.all(Array.from(files).map(async file => {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        return null;
      }

      const itemId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      return {
        id: itemId,
        images: [{
          id: '',
          preview: previewUrl,
          file,
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

    newFiles.forEach(item => handleUploadFile(item));
  };

  const handleUploadFile = async (item: UploadedItem) => {
    if (!sessionId) return;

    const file = item.images[0].file;
    if (!file) {
      console.error('No file found for upload');
      return;
    }

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

      setItems(prev => prev.map(i => 
        i.id === item.id ? { 
          ...i, 
          uploadStatus: 'success',
          id: result.file_id,
          images: [{
            ...i.images[0],
            id: result.file_id
          }]
        } : i
      ));
    } catch (err) {
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
      prev.forEach(item => {
        if (item.id === id) {
          item.images.forEach(image => URL.revokeObjectURL(image.preview));
        }
      });
      return filtered;
    });
  };

  return {
    isUploading,
    setIsUploading,
    handleFileSelect,
    handleRemoveItem
  };
}