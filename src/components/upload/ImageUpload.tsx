import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Info, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageUploadProps {
  id: string;
  label: string;
  description: string;
  accept: string;
  required?: boolean;
  onChange: (file: File | undefined) => void;
  exampleImage?: string;
  exampleTooltip?: string;
}

export default function ImageUpload({
  id,
  label,
  description,
  accept,
  required,
  onChange,
  exampleImage,
  exampleTooltip
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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

  // Example image component based on device
  const ExampleImageComponent = () => {
    if (!exampleImage) return null;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex items-center px-2 py-1.5 text-sm text-primary hover:text-primary/90 font-medium gap-1.5 transition-colors"
            aria-label="See example image"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Example</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-0 w-[90vw] mx-auto">
          <DialogHeader className="p-4">
            <DialogTitle>Example Image</DialogTitle>
            {exampleTooltip && (
              <DialogDescription>
                {exampleTooltip}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="relative">
            <img
              src={exampleImage}
              alt="Example"
              className="w-full"
              loading="lazy"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className={cn(
      "border shadow-sm overflow-hidden",
      isMobile ? "p-4 mb-6" : "p-6 mb-4"
    )}>
      <div className={cn(
        "flex justify-between items-center",
        isMobile ? "mb-3 flex-col items-start gap-2" : "mb-3 flex-row items-center"
      )}>
        <label htmlFor={id} className="block text-base font-semibold text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <ExampleImageComponent />
      </div>

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer",
          isDragging 
            ? "border-primary bg-primary/5" 
            : preview 
              ? "border-gray-200 bg-gray-50" 
              : "border-blue-300 bg-blue-50/30 hover:bg-blue-50/50 hover:border-blue-400",
          isMobile ? "min-h-[180px]" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
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
              className="w-full h-full object-contain rounded-lg shadow-sm"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (preview) {
                  URL.revokeObjectURL(preview);
                }
                setPreview(undefined);
                onChange(undefined);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              className="absolute top-2 right-2 p-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-red-100 hover:bg-red-50 hover:border-red-200"
              aria-label="Remove image"
              title="Remove image"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer",
              isMobile ? "p-6" : "p-8"
            )}
          >
            <div className="rounded-full bg-blue-100 p-4 flex items-center justify-center mb-4">
              <ImageIcon className={cn(
                "text-blue-600",
                isMobile ? "h-6 w-6" : "h-7 w-7"
              )} />
            </div>
            <p className="text-sm font-medium text-center text-gray-900">
              Drop your image here or click to upload
            </p>
            <p className="text-sm text-gray-500 mt-1 mb-6 text-center max-w-xs">
              {description}
            </p>
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className={cn(
                "bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm",
                isMobile ? "px-6 py-3 w-full max-w-[200px]" : "px-5 py-2.5"
              )}
            >
              Browse Files
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}