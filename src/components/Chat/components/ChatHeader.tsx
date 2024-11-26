import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  isConnected: boolean;
  onClose: () => void;
  assistantImage: string;
}

export function ChatHeader({ isConnected, onClose, assistantImage }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-[#007bff]/5 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={assistantImage} 
              alt="Michelle - Art Appraisal Assistant"
              className="w-12 h-12 rounded-full object-cover shadow-sm"
              loading="eager"
            />
            <div className={cn(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
              isConnected ? "bg-emerald-500" : "bg-red-500"
            )} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">Michelle</span>
            <span className="text-sm text-[#007bff]">Art Appraisal Assistant</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className={cn(
            "rounded-full p-2 hover:bg-gray-100",
            "text-gray-500 hover:text-gray-700",
            "transition-colors duration-200"
          )}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}