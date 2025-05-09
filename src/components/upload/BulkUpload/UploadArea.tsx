import React from 'react';
import { Image as ImageIcon, Info } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
}

export function UploadArea({ onFileSelect }: UploadAreaProps) {
  return (
    <div className="mb-8 space-y-6">
      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-16 text-center cursor-pointer hover:border-gray-400 transition-colors bg-white hover:bg-stone-50">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-stone-100 rounded-full mb-5">
            <ImageIcon className="h-10 w-10 text-gray-600" />
          </div>
          <p className="text-lg font-medium text-gray-800 mb-2">
            Drag and drop multiple images here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-1">
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

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Quick Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600 pl-6">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
            <span>Upload multiple photos at once - we'll organize them for you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
            <span>The number of items to appraise is selected during checkout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
            <span>Add descriptions after uploading to help our experts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}