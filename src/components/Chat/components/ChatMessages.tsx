import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '../types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  clientId: string | null;
  isTyping: boolean;
  assistantImage: string;
}

export function ChatMessages({ messages = [], clientId, isTyping, assistantImage }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Array.isArray(messages) && messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-end gap-2",
            message.clientId === clientId ? "justify-end" : "justify-start"
          )}
        >
          {message.clientId !== clientId && (
            <img 
              src={assistantImage}
              alt="Michelle"
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              loading="lazy"
            />
          )}
          <div
            className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.clientId === clientId 
                ? "bg-[#007bff] text-white rounded-br-none"
                : "bg-gray-100 text-gray-900 rounded-bl-none"
            )}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
            {message.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Uploaded"
                className="mt-2 rounded-lg max-w-full"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex items-center gap-2">
          <img 
            src={assistantImage}
            alt="Michelle"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
          />
          <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#007bff]/40 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#007bff]/40 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#007bff]/40 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}