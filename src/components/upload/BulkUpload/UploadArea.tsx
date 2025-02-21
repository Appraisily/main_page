import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
}

export function UploadArea({ onFileSelect }: UploadAreaProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Upload multiple photos at once - we'll organize them for you
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            The number of items to appraise is selected during checkout
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Add descriptions after uploading to help our experts
          </li>
        </ul>
      </div>

      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
        <div className="flex flex-col items-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            Drag and drop multiple images here, or click to browse
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