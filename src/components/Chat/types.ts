export interface ChatMessage {
  type: 'message' | 'image' | 'system';
  content: string;
  email?: string;
  images?: string[];
  timestamp: string;
  id: string;
  clientId?: string;
}

export interface ChatResponse {
  type: 'response' | 'error' | 'connection_established' | 'pong';
  messageId?: string;
  reply?: string;
  clientId?: string;
  classification?: {
    intent: 'APPRAISAL_LEAD' | 'GENERAL_INQUIRY';
    urgency: 'high' | 'medium' | 'low';
  };
  imageAnalysis?: string;
  error?: string;
  timestamp: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
  error: string | null;
  clientId: string | null;
}