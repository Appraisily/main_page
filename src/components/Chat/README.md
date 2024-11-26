# Chat Widget Documentation

## Overview
Standalone chat widget that can be injected into any webpage via Google Tag Manager. Provides real-time communication with AI-powered responses and image analysis capabilities.

## WebSocket Connection
- URL: `wss://michelle-gmail-856401495068.us-central1.run.app`
- No authentication required for initial connection
- Heartbeat interval: 30 seconds (30000ms)

## Message Formats

### Outgoing Messages
```typescript
interface ChatMessage {
  type: 'message' | 'image' | 'system';
  content: string;
  email?: string;
  images?: string[]; // base64 encoded
  timestamp: string;
  id: string;
}
```

### Server Responses
```typescript
interface ChatResponse {
  type: 'response' | 'error' | 'connection_established';
  messageId?: string;
  reply?: string;
  classification?: {
    intent: 'APPRAISAL_LEAD' | 'GENERAL_INQUIRY';
    urgency: 'high' | 'medium' | 'low';
  };
  imageAnalysis?: string;
  error?: string;
  timestamp: string;
}
```

## Features

### Connection Management
- Automatic WebSocket connection/reconnection
- Heartbeat mechanism (30s interval)
- Connection state management
- Maximum 5 reconnection attempts

### Message Handling
- Rate limiting (1 message/second)
- Message persistence using IndexedDB
- Image compression before upload
- Support for text and image messages
- Typing indicators
- Error handling and display

### UI Components
- Floating chat button
- Expandable chat window
- Message history view
- Image upload with preview
- Connection status indicator
- Loading states
- Error messages

## Google Tag Manager Implementation

```html
<!-- Add to GTM Custom HTML Tag -->
<script>
(function(w,d,s,l,i){
  // Chat widget initialization code
  const script = d.createElement('script');
  script.src = 'https://cdn.example.com/chat-widget.js';
  script.async = true;
  d.head.appendChild(script);
})(window,document,'script','dataLayer','GTM-XXXXX');
</script>
```

## Development

### Installation
```bash
npm install zustand idb-keyval uuid
```

### Required Dependencies
- zustand (state management)
- idb-keyval (IndexedDB wrapper)
- uuid (message ID generation)
- lucide-react (icons)

### Build for Production
```bash
npm run build
```

The output will be a single minified JavaScript file that can be hosted on a CDN and loaded via GTM.