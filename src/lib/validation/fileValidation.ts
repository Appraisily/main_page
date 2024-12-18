const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateFile = (file: File): ValidationResult => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload JPG, PNG, or WebP images only' 
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: 'File size exceeds 5MB limit' 
    };
  }

  return { isValid: true };
};