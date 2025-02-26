import * as tus from 'tus-js-client';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const UPLOAD_ENDPOINT = 'https://payment-processor-856401495068.us-central1.run.app/upload';

export interface UploadOptions {
  file: File;
  onProgress?: (progress: number) => void;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
  onPause?: () => void;
  onResume?: () => void;
}

export interface UploadController {
  start: () => void;
  pause: () => void;
  resume: () => void;
  abort: () => void;
}

export async function createChunkedUpload(options: UploadOptions): Promise<UploadController> {
  const { file, onProgress, onSuccess, onError, onPause, onResume } = options;

  // Compress image if it's large
  let uploadFile = file;
  if (file.size > 2 * 1024 * 1024) { // If larger than 2MB
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 2000,
        useWebWorker: true
      });
      uploadFile = compressedFile;
    } catch (err) {
      console.warn('Image compression failed, using original file:', err);
    }
  }

  // Create unique file identifier
  const fileId = uuidv4();
  const fileName = `${fileId}-${file.name}`;

  // Initialize tus upload
  const upload = new tus.Upload(uploadFile, {
    endpoint: UPLOAD_ENDPOINT,
    retryDelays: [0, 3000, 5000, 10000],
    chunkSize: CHUNK_SIZE,
    metadata: {
      filename: fileName,
      filetype: file.type
    },
    onError: (error) => {
      console.error('Upload error:', error);
      onError?.(error);
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const percentage = (bytesUploaded / bytesTotal) * 100;
      onProgress?.(percentage);
    },
    onSuccess: () => {
      if (upload.url) {
        onSuccess?.(upload.url);
      }
    }
  });

  // Save upload URL to localStorage for resumability
  upload.findPreviousUploads().then((previousUploads) => {
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
  });

  return {
    start: () => upload.start(),
    pause: () => {
      upload.abort();
      onPause?.();
    },
    resume: () => {
      upload.start();
      onResume?.();
    },
    abort: () => upload.abort()
  };
}