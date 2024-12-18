import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  id: string;
  label: string;
  description: string;
  accept: string;
  required?: boolean;
  onChange: (file: File | undefined) => void;
  exampleImage?: string;
}

export default function ImageUpload({
  id,
  label,
  description,
  accept,
  required,
  onChange,
  exampleImage
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(undefined);
    }
    onChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {exampleImage && (
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700"
            onMouseEnter={() => setShowExample(true)}
            onMouseLeave={() => setShowExample(false)}
          >
            See example
          </button>
        )}
      </div>

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-colors",
          isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-400",
          preview ? "bg-gray-50" : "bg-white"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          className="sr-only"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />

        {preview ? (
          <div className="relative aspect-video">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                onChange(undefined);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <Upload className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <span className="text-sm font-medium text-gray-900">
              Drop your image here or click to upload
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {description}
            </span>
          </label>
        )}
      </div>

      {/* Example Image Tooltip */}
      {showExample && exampleImage && (
        <div className="absolute z-50 bg-white rounded-lg shadow-xl p-2 border border-gray-200">
          <img
            src={exampleImage}
            alt="Example"
            className="max-w-sm rounded"
          />
        </div>
      )}
    </div>
  );
}