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