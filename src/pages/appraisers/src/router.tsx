import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { LocationPage } from './pages/LocationPage';
import { AppraiserPage } from './pages/AppraiserPage';
import { RootLayout } from './layouts/RootLayout';
import { AppraisersDirectory } from './components/AppraisersDirectory';

// The key is to ensure the router handles all paths correctly in a production environment
export const router = createBrowserRouter([
  // Route for AppraisersDirectory that doesn't use the RootLayout
  {
    path: '/directory',
    element: <AppraisersDirectory />
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'location/:citySlug',
        element: <LocationPage />
      },
      {
        path: 'appraiser/:appraiserId',
        element: <AppraiserPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ],
  },
], {
  basename: '/' // Ensure the router uses the correct base path
});