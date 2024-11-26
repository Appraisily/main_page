import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChatStore } from '../store';
import type { ChatResponse } from '../types';

const WEBSOCKET_URL = 'wss://michelle-gmail-856401495068.us-central1.run.app';
const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000; // 3 seconds

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>();
  
  const {
    setConnected,
    setTyping,
    addMessage,
    setError,
    setClientId,
    loadMessages
  } = useChatStore();

  const handleServerResponse = async (response: ChatResponse) => {
    switch (response.type) {
      case 'connection_established':
        setConnected(true);
        setClientId(response.clientId || null);
        await loadMessages();

        // Send welcome message
        const welcomeMessage = {
          type: 'system',
          content: "Hi! I'm Michelle, your art appraisal assistant. I'm here to help you get expert valuations for your artwork and antiques. How can I assist you today?",
          timestamp: new Date().toISOString(),
          id: uuidv4(),
          clientId: response.clientId
        };
        await addMessage(welcomeMessage);
        break;

      case 'response':
        if (response.reply) {
          const message = {
            type: 'message',
            content: response.reply,
            timestamp: response.timestamp,
            id: response.messageId || uuidv4(),
            clientId: null // Messages from assistant have no clientId
          };
          await addMessage(message);
        }
        setTyping(false);
        break;

      case 'error':
        setError(response.error || 'An error occurred');
        setTyping(false);
        break;

      case 'pong':
        // Heartbeat response received, connection is alive
        break;
    }
  };

  const connect = () => {
    try {
      const ws = new WebSocket(WEBSOCKET_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttemptsRef.current = 0;
        setConnected(true);
        setError(null);

        // Start heartbeat
        heartbeatIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, HEARTBEAT_INTERVAL);
      };

      ws.onmessage = (event) => {
        try {
          const response: ChatResponse = JSON.parse(event.data);
          handleServerResponse(response);
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        clearInterval(heartbeatIntervalRef.current);

        // Attempt to reconnect if not max attempts
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          setTimeout(connect, RECONNECT_DELAY);
        } else {
          setError('Connection lost. Please refresh the page to try again.');
        }
      };

      ws.onerror = () => {
        setError('Connection error occurred');
      };

    } catch (error) {
      setError('Failed to establish connection');
      console.error('WebSocket connection error:', error);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearInterval(heartbeatIntervalRef.current);
    };
  }, []);

  return { socket: socketRef.current };
}