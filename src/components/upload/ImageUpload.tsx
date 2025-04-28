import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Info, X } from 'lucide-react';
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

    if (isMobile) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/90 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Info className="h-4 w-4" />
              See example
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-0">
            <DialogHeader className="p-6">
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
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/90 flex items-center gap-1.5 transition-colors font-medium"
          >
            <Info className="h-4 w-4" />
            See example
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end" className="w-[300px] p-0 bg-white text-gray-900 shadow-lg">
          <div className="space-y-2">
            {exampleTooltip && (
              <p className="text-sm p-4 border-b">{exampleTooltip}</p>
            )}
            <img
              src={exampleImage}
              alt="Example"
              className="w-full rounded-b-lg"
              loading="lazy"
            />
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <Card className="p-6 border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor={id} className="block text-base font-semibold text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <ExampleImageComponent />
      </div>

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200",
          isDragging ? "border-primary bg-primary/5" : "border-muted hover:border-primary",
          preview ? "bg-gray-50" : "bg-background"
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
              className="w-full h-full object-contain rounded-lg shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                if (preview) {
                  URL.revokeObjectURL(preview);
                }
                setPreview(undefined);
                onChange(undefined);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-red-100 hover:bg-red-50 hover:border-red-200"
              aria-label="Remove image"
              title="Remove image"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center p-8 cursor-pointer"
          >
            <div className="p-3 rounded-full bg-blue-50 mb-4">
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-center">
              Drop your image here or click to upload
            </span>
            <span className="text-sm text-muted-foreground mt-1 mb-4 text-center">
              {description}
            </span>
            <button 
              type="button" 
              onClick={() => inputRef.current?.click()}
              className="upload-image-button px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-black transition-colors shadow-sm"
            >
              Browse Files
            </button>
          </label>
        )}
      </div>
    </Card>
  );
}