import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
}

export function UploadArea({ onFileSelect }: UploadAreaProps) {
  return (
    <div className="mb-8">
      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
        <div className="flex flex-col items-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            Drag and drop your images here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPG, PNG, WebP (max 10MB each)
          </p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        />
      </label>
    </div>
  );
}