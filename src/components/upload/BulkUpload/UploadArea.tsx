import React, { useState } from 'react';
import { Image as ImageIcon, Info, Upload, ArrowUpCircle } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void;
}

export function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div>
      <div
        className={`
          relative overflow-hidden bg-white 
          border-2 rounded-xl shadow-lg 
          transition-all duration-300 mb-4
          flex flex-col items-center
          ${isDragActive ? 'border-emerald-500' : 'border-gray-200'}
          ${isHovered ? 'shadow-xl border-gray-300' : ''}
        `}
        role="region"
        aria-label="Image upload area"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isDragActive && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-emerald-50/70 pointer-events-none transition-all">
            <Upload className="h-12 w-12 text-emerald-500 mb-3 animate-bounce-slow" />
            <p className="text-lg font-bold text-black mb-1">Drop to Upload</p>
            <p className="text-sm text-gray-700 font-light">Release your files here</p>
          </div>
        )}
        <label
          className="block w-full cursor-pointer"
          tabIndex={0}
          aria-label="Upload images. Drag and drop or click to browse."
          htmlFor="bulk-upload-file-input"
        >
          <div 
            className={`
              flex flex-col items-center justify-center py-8 px-6
              transition-all duration-300
              ${isHovered ? 'bg-gray-50' : ''}
            `}
            id="upload-area-desc"
          >
            <div className="relative mb-4 transition-transform duration-300 transform group">
              <div className="relative bg-gray-100 p-3 rounded-full shadow-sm group-hover:shadow transition-all duration-300">
                <Upload className={`h-10 w-10 text-emerald-500 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} aria-hidden="true" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-black mb-2 tracking-tight">
              Upload Your Images
            </h2>
            
            <p className="text-sm text-gray-700 mb-2 max-w-md text-center font-light">
              Drag and drop multiple images here, or <span className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">click to browse</span>
            </p>
            
            <div className="flex items-center justify-center mt-1 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-emerald-700">
              <span>Supported formats: JPG, PNG, WebP (max 10MB each)</span>
            </div>
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
      
      {/* Tips Card - Shadcn inspired note/reminder styling */}
      <div className="bg-gray-50 border border-black rounded-lg p-4 shadow-sm" role="region" aria-label="Quick tips for uploading images">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-white rounded-full border border-gray-200">
            <Info className="h-4 w-4 text-black" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-medium text-black">Quick Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2.5">
            <div className="p-0.5 mt-0.5">
              <span className="block w-1 h-1 rounded-full bg-black" aria-hidden="true" />
            </div>
            <span>Upload multiple photos at once - we'll organize them for you</span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="p-0.5 mt-0.5">
              <span className="block w-1 h-1 rounded-full bg-black" aria-hidden="true" />
            </div>
            <span>The number of items to appraise is selected during checkout</span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="p-0.5 mt-0.5">
              <span className="block w-1 h-1 rounded-full bg-black" aria-hidden="true" />
            </div>
            <span>Add descriptions after uploading to help our experts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Add this to your CSS if needed
// .animate-bounce-slow {
//   animation: bounce 2s infinite;
// }