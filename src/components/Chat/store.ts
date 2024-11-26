import { create } from 'zustand';
import { ChatState, ChatMessage } from './types';
import { get, set } from 'idb-keyval';

interface ChatStore extends ChatState {
  addMessage: (message: ChatMessage) => Promise<void>;
  setConnected: (isConnected: boolean) => void;
  setTyping: (isTyping: boolean) => void;
  setError: (error: string | null) => void;
  setClientId: (clientId: string | null) => void;
  loadMessages: () => Promise<void>;
  clearMessages: () => Promise<void>;
}

const initialState: ChatState = {
  messages: [], // Initialize as empty array
  isConnected: false,
  isTyping: false,
  error: null,
  clientId: null
};

export const useChatStore = create<ChatStore>()((set, get) => ({
  ...initialState,

  addMessage: async (message) => {
    const currentMessages = get().messages || []; // Ensure it's an array
    const updatedMessages = [...currentMessages, message];
    set({ messages: updatedMessages });
    try {
      await set('chat_messages', updatedMessages);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  },

  setConnected: (isConnected) => set({ isConnected }),
  setTyping: (isTyping) => set({ isTyping }),
  setError: (error) => set({ error }),
  setClientId: (clientId) => set({ clientId }),

  loadMessages: async () => {
    try {
      const savedMessages = await get<ChatMessage[]>('chat_messages');
      const clientId = await get<string>('chat_client_id');
      set({ 
        messages: Array.isArray(savedMessages) ? savedMessages : [], // Ensure it's an array
        clientId: clientId || null
      });
    } catch (error) {
      console.error('Failed to load messages:', error);
      set({ messages: [], clientId: null });
    }
  },

  clearMessages: async () => {
    try {
      await set('chat_messages', []);
      set({ messages: [] });
    } catch (error) {
      console.error('Failed to clear messages:', error);
    }
  }
}));