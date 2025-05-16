import React from 'react';
import { Loader2, Check, X, AlertCircle, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateItemDescription } from '@/lib/api/bulkUploadApi';
import type { UploadStatus } from '@/lib/types/appraisal';

export interface UploadedItem {
  id: string;
  images: {
    id: string;
    preview: string;
    file?: File;
    type: 'main' | 'signature' | 'age';
    label: string;
  }[];
  uploadStatus: UploadStatus;
  uploadProgress?: number;
  uploadError?: string;
  description?: string;
  localDescription?: string;
  category?: string;
  descriptionStatus?: 'saving' | 'saved' | 'error';
  descriptionError?: string;
}

interface ItemGridProps {
  items: UploadedItem[];
  sessionId: string;
  onRemoveItem: (id: string) => void;
  onDescriptionChange: (id: string, description: string, status?: 'saving' | 'saved' | 'error') => void;
  onFileSelect: (files: FileList) => void;
}

export function ItemGrid({ 
  items, 
  sessionId,
  onRemoveItem, 
  onDescriptionChange,
  onFileSelect 
}: ItemGridProps) {
  // Track local description changes without saving
  const handleDescriptionChange = (id: string, value: string) => {
    onDescriptionChange(id, value);
  };

  const handleDescriptionBlur = async (id: string, description: string) => {
    console.log('Description blur handler triggered for item:', id);
    
    const item = items.find(i => i.id === id);
    if (!item) {
      console.error('Item not found for ID:', id);
      return;
    }

    // Update UI to show saving status
    onDescriptionChange(id, description, 'saving');

    // Get the main image ID from the first image
    const mainImage = item.images[0];
    if (!mainImage || !mainImage.id) {
      console.error('No image ID found:', {
        itemId: id,
        mainImage
      });
      onDescriptionChange(id, description, 'error');
      return;
    }

    try {
      console.log('Saving description for item:', {
        sessionId,
        itemId: item.id,
        imageId: mainImage.id,
        description
      });

      // Save to backend
      await updateItemDescription(sessionId, item.id, description, mainImage.id);

      // Update UI to show saved status
      onDescriptionChange(id, description, 'saved');

      // Clear saved status after 2 seconds
      setTimeout(() => {
        onDescriptionChange(id, description, undefined);
      }, 2000);
    } catch (err) {
      console.error('Failed to save description:', err);
      onDescriptionChange(id, description, 'error');
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div role="region" aria-label="Uploaded items">
      {/* Header section for the uploaded items */}
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100">
        <div className="bg-emerald-100 p-2 rounded-full">
          <ImageIcon className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-lg font-medium text-gray-900">Your Uploaded Items</h2>
        <span className="text-sm text-gray-500 ml-auto">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-4" role="list">
        {items.map((item) => (
          <div 
            key={`item-${item.id}`} 
            className="relative bg-white rounded-lg shadow-sm p-6"
            role="listitem"
          >
            <div className="flex gap-6">
              <div className="flex flex-col gap-4 w-64 flex-shrink-0">
                {item.images.map((image) => (
                  <div key={image.id} className="relative">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {image.label}
                    </div>
                    <div className="relative w-full h-48">
                      <img
                        src={image.preview}
                        alt={`${image.label} preview`}
                        className={cn(
                          "w-full h-full object-contain rounded-lg bg-gray-50 border border-gray-200",
                          item.uploadStatus === 'uploading' && "opacity-50"
                        )}
                      />
                      {/* Upload Status Indicator */}
                      <div className="absolute top-2 left-2">
                        {item.uploadStatus === 'uploading' && (
                          <div className="bg-white rounded-full p-2 shadow-sm">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          </div>
                        )}
                        {(item.uploadStatus === 'success' || item.uploadStatus === 'processed') && (
                          <div className="bg-green-100 rounded-full p-2 shadow-sm">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                        {item.uploadStatus === 'error' && (
                          <div className="bg-red-100 rounded-full p-2 shadow-sm">
                            <X className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
            <div className="flex-grow space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-gray-900">Item Details</h3>
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className={cn(
                    "p-2 rounded-full shadow-sm transition-colors",
                    item.uploadStatus === 'error' 
                      ? "bg-red-100 hover:bg-red-200" 
                      : "bg-white hover:bg-gray-100"
                  )}
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            
              <textarea
                placeholder="Add details about your artwork or antique including history, condition, markings, dimensions, materials, and provenance. For antiques, include any maker's marks, labels, or stamps. The more details you provide, the more accurate your appraisal will be."
                className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y min-h-[300px] bg-gray-50 hover:bg-white"
                value={item.description || ''}
                onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                onBlur={(e) => {
                  console.log('Textarea blur event');
                  const newValue = e.target.value;
                  handleDescriptionBlur(item.id, newValue);
                }}
                aria-label="Item description"
              />
              
              {/* Description Status Indicator */}
              <div className="mt-2 flex items-center gap-2 text-sm">
                {item.descriptionStatus === 'saving' && (
                  <>
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <span className="text-gray-500">Saving changes...</span>
                  </>
                )}
                {item.descriptionStatus === 'saved' && (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-500">Changes saved</span>
                  </>
                )}
                {item.descriptionStatus === 'error' && (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">Failed to save changes</span>
                  </>
                )}
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}