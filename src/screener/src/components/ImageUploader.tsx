import React, { useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<any>;
  isUploading: boolean;
  customerImage?: string | null;
}

export default function ImageUploader({ onUpload, isUploading, customerImage }: ImageUploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`rounded-2xl bg-white p-8 shadow-lg ring-1 transition-all duration-200 ${
          isUploading
            ? 'ring-blue-600'
            : 'ring-gray-200 hover:ring-blue-600'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          {customerImage ? (
            <div className="relative w-full">
              <img
                src={customerImage}
                alt="Uploaded artwork"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sm font-medium text-gray-700">Processing image...</p>
                      <p className="text-xs text-gray-500">Getting AI analysis results</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-blue-50 p-3">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isUploading ? 'Uploading artwork...' : 'Drop your artwork here'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isUploading ? 'Please wait while we process your image' : 'or click to select a file'}
                </p>
              </div>
            </>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className={`rounded-md px-6 py-3 text-lg font-semibold shadow-sm 
                     transition-all duration-200 cursor-pointer flex items-center gap-2
                     ${isUploading 
                       ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                       : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            <Upload className="w-4 h-4" />
            {customerImage ? 'Upload Another Image' : 'Select Image'}
          </label>
        </div>
      </div>
    </div>
  );
}