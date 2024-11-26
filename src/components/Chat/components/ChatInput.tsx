import React from 'react';
import { ImageIcon, Send, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | null;
  onImageRemove: () => void;
}

export function ChatInput({
  input,
  onInputChange,
  onSend,
  onImageSelect,
  selectedImage,
  onImageRemove
}: ChatInputProps) {
  return (
    <div className="p-4 border-t bg-card">
      {selectedImage && (
        <div className="mb-4 relative inline-block">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="h-20 rounded-lg border border-border"
          />
          <button
            onClick={onImageRemove}
            className={cn(
              "absolute -top-2 -right-2 p-1 rounded-full",
              "bg-background border border-border shadow-sm",
              "hover:bg-accent transition-colors duration-200"
            )}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && onSend()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <label className={cn(
          "p-2 rounded-md hover:bg-accent cursor-pointer",
          "transition-colors duration-200"
        )}>
          <input
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
          />
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </label>
        <button
          onClick={onSend}
          disabled={!input.trim() && !selectedImage}
          className={cn(
            "p-2 rounded-md",
            "text-primary hover:bg-primary/10",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}