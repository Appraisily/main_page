import React, { useState, useCallback, useRef } from 'react';
import { Upload, Pause, Play, X, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { createChunkedUpload } from '@/lib/upload/chunkedUpload';
import type { UploadController } from '@/lib/upload/chunkedUpload';

interface ChunkedUploaderProps {
  file: File;
  onComplete: (url: string) => void;
  onRemove: () => void;
}

export default function ChunkedUploader({ file, onComplete, onRemove }: ChunkedUploaderProps) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadController = useRef<UploadController | null>(null);

  const startUpload = useCallback(async () => {
    setIsUploading(true);
    setError(null);

    try {
      uploadController.current = await createChunkedUpload({
        file,
        onProgress: (progress) => setProgress(progress),
        onSuccess: (url) => {
          setProgress(100);
          onComplete(url);
        },
        onError: (error) => {
          setError(error.message);
          setIsUploading(false);
        },
        onPause: () => setIsPaused(true),
        onResume: () => setIsPaused(false)
      });

      uploadController.current.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
    }
  }, [file, onComplete]);

  const togglePause = () => {
    if (!uploadController.current) return;

    if (isPaused) {
      uploadController.current.resume();
    } else {
      uploadController.current.pause();
    }
  };

  const handleRemove = () => {
    if (uploadController.current) {
      uploadController.current.abort();
    }
    onRemove();
  };

  React.useEffect(() => {
    startUpload();
    return () => {
      if (uploadController.current) {
        uploadController.current.abort();
      }
    };
  }, [startUpload]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg border flex items-center justify-center bg-gray-50">
          <Upload className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <div className="flex items-center gap-2">
          {isUploading && (
            <button
              onClick={togglePause}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {isPaused ? (
                <Play className="h-5 w-5 text-gray-500" />
              ) : (
                <Pause className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-gray-500 text-right">{Math.round(progress)}%</p>
        </div>
      )}
    </div>
  );
}