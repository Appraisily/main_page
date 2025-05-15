import React, { useState } from 'react';
import { Image as ImageIcon, Info } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
}

export function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="mb-8">
      <div
        className={`relative bg-white border-4 rounded-2xl shadow-lg p-0 flex flex-col items-center mb-4 transition-colors duration-200 ${isDragActive ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-400'}`}
        role="region"
        aria-label="Image upload area"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragActive && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-emerald-600/70 rounded-2xl pointer-events-none transition-all">
            <p className="text-2xl font-bold text-white drop-shadow mb-2">Drop files to upload</p>
            <p className="text-base text-white/90">Release your files here</p>
          </div>
        )}
        <label
          className="block w-full cursor-pointer"
          tabIndex={0}
          aria-label="Upload images. Drag and drop or click to browse."
          htmlFor="bulk-upload-file-input"
        >
          <div className="flex flex-col items-center justify-center py-16 px-6" id="upload-area-desc">
            <div className="p-4 bg-emerald-100 rounded-full mb-6 shadow">
              <ImageIcon className="h-16 w-16 text-emerald-500" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mb-2">
              Upload Your Images
            </p>
            <p className="text-base text-gray-700 mb-1">
              Drag and drop multiple images here, or <span className="underline text-emerald-700">click to browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, WebP (max 10MB each)
            </p>
          </div>
          <input
            id="bulk-upload-file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && onFileSelect(e.target.files)}
            aria-label="Select images to upload"
            aria-describedby="upload-area-desc"
          />
        </label>
      </div>
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4" role="region" aria-label="Quick tips for uploading images">
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <h3 className="text-sm font-medium text-gray-700">Quick Tips</h3>
        </div>
        <ul className="space-y-1 text-sm text-gray-600 pl-6">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
            <span>Upload multiple photos at once - we'll organize them for you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
            <span>The number of items to appraise is selected during checkout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
            <span>Add descriptions after uploading to help our experts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}