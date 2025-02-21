export interface AppraisalRequest {
  session_id: string;
  customer_email?: string;
  customer_name?: string;
  description?: string;
  images: {
    main: File;
    signature?: File;
    age?: File;
  }
}

export interface BulkUploadRequest {
  session_id: string;
  file: File;
  description?: string;
  category?: string;
  appraisal_type?: 'regular' | 'insurance' | 'tax';
}

export interface BulkUploadResponse {
  success: boolean;
  items: Array<{
    item_id: string;
    file_url: string;
    description?: string;
    category?: string;
    appraisal_type?: string;
    status: UploadStatus;
  }>;
  error?: string;
}

export type UploadStatus = 'error' | 'pending' | 'uploading' | 'success' | 'saving' | 'processed';

export interface AppraisalResponse {
  success: boolean;
  post_id?: number;
  post_url?: string;
  error?: string;
}

export interface UploadProgress {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}