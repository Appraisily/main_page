import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Loader2 } from 'lucide-react';
import { useImageAnalysis } from '../hooks/useImageAnalysis';

export default function ImageUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadImage, loading, error } = useImageAnalysis();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      handleAnalyze(file);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      handleAnalyze(file);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleAnalyze = async (file: File) => {
    try {
      await uploadImage(file);
    } catch (err) {
      console.error('Error analyzing file:', err);
    }
  };
  
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-blue-400/10 rounded-2xl opacity-90 blur-md"></div>
      <div className="absolute -inset-4 border-2 border-blue-200 rounded-2xl"></div>
      <form
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="relative h-full"
      >
        <div
          className={`h-32 rounded-xl transition-all duration-200 ${
            dragActive ? 'bg-blue-50 border-blue-400 scale-105' : 'bg-white border-blue-200'
          } border-2 border-dashed shadow-lg hover:border-blue-400 hover:shadow-xl hover:scale-105`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="max-h-16 mb-2 rounded"
              />
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="px-6 py-1.5 bg-blue-600 text-white rounded-full text-sm flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Uploading...'
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <div className="p-2 rounded-full bg-blue-50 mb-2">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1 text-center">
                Upload a Clear Photo
              </p>
              <p className="text-xs text-gray-600 text-center max-w-[200px]">
                Take a well-lit photo of your art or antique from the front
              </p>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}