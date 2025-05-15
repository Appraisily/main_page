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
    <div className="mb-8">
      <div
        className={`
          relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/30 
          border border-emerald-200 rounded-xl shadow-lg 
          transition-all duration-300 mb-6
          ${isDragActive ? 'border-emerald-400 shadow-emerald-200/50 scale-[1.01]' : ''}
          ${isHovered ? 'shadow-xl border-emerald-300' : ''}
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
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500/90 to-teal-600/90 backdrop-blur-sm pointer-events-none transition-all">
            <ArrowUpCircle className="h-16 w-16 text-white mb-4 animate-bounce-slow" />
            <p className="text-2xl font-bold text-white drop-shadow-md mb-2">Drop to Upload</p>
            <p className="text-base text-white/90 font-light">Release your files here</p>
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
              flex flex-col items-center justify-center py-16 px-8 
              transition-all duration-300
              ${isHovered ? 'bg-emerald-50/50' : ''}
            `}
            id="upload-area-desc"
          >
            <div className="relative mb-8 transition-transform duration-300 transform group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-20 blur-md group-hover:opacity-30 scale-90 group-hover:scale-110 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-teal-50 p-5 rounded-full shadow-sm group-hover:shadow transition-all duration-300">
                <Upload className={`h-14 w-14 text-emerald-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} aria-hidden="true" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 tracking-tight">
              Upload Your Images
            </h2>
            
            <p className="text-base text-gray-600 mb-3 max-w-md text-center font-light">
              Drag and drop multiple images here, or <span className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">click to browse</span>
            </p>
            
            <div className="flex items-center justify-center mt-1 px-4 py-2 bg-emerald-50 rounded-full text-xs text-emerald-700">
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
      
      {/* Tips Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm" role="region" aria-label="Quick tips for uploading images">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-medium text-gray-800">Quick Tips</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <div className="p-1 bg-gray-50 rounded-full mt-0.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            </div>
            <span>Upload multiple photos at once - we'll organize them for you</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-gray-50 rounded-full mt-0.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            </div>
            <span>The number of items to appraise is selected during checkout</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-gray-50 rounded-full mt-0.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
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