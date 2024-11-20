import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Lazy load App component
const App = lazy(() => import('./App'));

// Create root outside of render to avoid recreation
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Initialize analytics after initial render
import('./lib/analytics').then(({ initializeAnalytics }) => {
  initializeAnalytics();
});

// Render app with loading fallback
root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);