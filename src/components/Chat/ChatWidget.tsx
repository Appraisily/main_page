import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useChatStore } from './store';
import { useWebSocket } from './hooks/useWebSocket';
import { compressImage, convertToBase64 } from './utils/imageUtils';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { cn } from '@/lib/utils';

// Optimized image URL with ImageKit transformations
const ASSISTANT_IMAGE = "https://ik.imagekit.io/appraisily/WebPage/michelle.png?tr=w-64,h-64,q-80,f-auto";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const lastMessageTimeRef = useRef<number>(0);

  const {
    messages,
    isConnected,
    isTyping,
    error,
    clientId,
    addMessage,
    setTyping,
    setError
  } = useChatStore();

  const { socket } = useWebSocket();

  const handleSendMessage = async () => {
    if ((!input.trim() && !selectedImage) || !socket) return;

    const now = Date.now();
    if (now - lastMessageTimeRef.current < 1000) {
      setError('Please wait a moment before sending another message');
      return;
    }
    lastMessageTimeRef.current = now;

    let images: string[] = [];
    if (selectedImage) {
      try {
        const compressedImage = await compressImage(selectedImage);
        const base64Image = await convertToBase64(compressedImage);
        images = [base64Image];
      } catch (error) {
        setError('Failed to process image');
        return;
      }
    }

    const message = {
      type: images.length ? 'image' : 'message',
      content: input,
      images,
      timestamp: new Date().toISOString(),
      id: uuidv4(),
      clientId
    };

    try {
      socket.send(JSON.stringify({
        ...message,
        type: 'message',
        email: undefined
      }));
      addMessage(message);
      setInput('');
      setSelectedImage(null);
      setTyping(true);
    } catch (error) {
      setError('Failed to send message');
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "bg-[#007bff] text-white shadow-lg",
            "hover:bg-[#0056b3] transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#007bff]/50 focus:ring-offset-2"
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Chat with Michelle</span>
        </button>
      ) : (
        <Card className="w-[380px] h-[600px] flex flex-col shadow-xl border-[#007bff]/10">
          <ChatHeader 
            isConnected={isConnected} 
            onClose={() => setIsOpen(false)}
            assistantImage={ASSISTANT_IMAGE}
          />
          
          <ChatMessages 
            messages={messages || []}
            clientId={clientId}
            isTyping={isTyping}
            assistantImage={ASSISTANT_IMAGE}
          />

          {error && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <ChatInput
            input={input}
            onInputChange={setInput}
            onSend={handleSendMessage}
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onImageRemove={() => setSelectedImage(null)}
          />
        </Card>
      )}
    </div>
  );
}