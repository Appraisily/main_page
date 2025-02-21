const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  // Images
  'image/jpeg',
  'image/png', 
  'image/webp',
  'image/heic',
  'image/heif',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const getFileTypeMessage = (type: string): string => {
  if (type.startsWith('image/')) return 'image';
  if (type.includes('pdf')) return 'PDF document';
  if (type.includes('word')) return 'Word document';
  return 'file';
};

export const validateFile = (file: File): ValidationResult => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload JPG, PNG, WebP, HEIC images, or PDF/DOC documents only' 
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `${getFileTypeMessage(file.type)} size exceeds 5MB limit` 
    };
  }

  return { isValid: true };
};