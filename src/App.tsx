import * as React from 'react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useGoogleTagManager } from './hooks/useGoogleTagManager';
import ScrollRestoration from './components/ScrollRestoration';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { AuthProvider } from './lib/auth/AuthContext';
import { useAuth } from './lib/auth/AuthContext';
import ProtectedRoute from './lib/auth/ProtectedRoute';

// Import pages
import Landing from './pages/Landing';
import About from './pages/About';
import Team from './pages/Team';
import Success from './pages/Success';
import Services from './pages/Services';
import Expertise from './pages/Expertise';
import Dashboard from './pages/Dashboard';
import BulkAppraisal from './pages/BulkAppraisal';
import BulkUpload from './pages/BulkAppraisal/Upload';
import BulkReview from './pages/BulkAppraisal/Review';
import SessionRestore from './pages/BulkAppraisal/SessionRestore';
import HowItWorks from './pages/HowItWorks';
import Report from './pages/Report';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ServiceSelection from './pages/ServiceSelection';
import SubmissionSuccess from './pages/SubmissionSuccess';
import Profile from './pages/Profile';
import { Login, Signup, ResetPassword } from './pages/Auth';

// AuthSuccess component defined directly in App.tsx to avoid import issues
function AuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Function to handle the authentication success flow
    const handleAuthSuccess = async () => {
      try {
        // Check if this is opened as a popup window
        if (window.opener) {
          console.log('Running in popup mode, will notify parent window');
          
          // Get authentication data from URL parameters if available
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          const errorMsg = params.get('error');
          
          // Handle error case
          if (errorMsg) {
            window.opener.postMessage({ 
              type: 'AUTH_ERROR', 
              error: errorMsg 
            }, '*');
            window.close();
            return;
          }
          
          // If we have a token in the URL, we can use it directly
          if (token) {
            // You could store the token here if needed
            console.log('Token received from URL parameters');
          }
          
          // Notify the parent window that authentication was successful
          window.opener.postMessage({ 
            type: 'AUTH_SUCCESS'
          }, '*');
          
          // Close the popup window after notifying the parent
          window.close();
        } else {
          // This is not a popup - handle direct navigation to this route
          console.log('Not in popup mode, fetching user data directly');
          
          try {
            // Use the auth service API URL from environment variables
            const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 
              'https://auth-service-856401495068.us-central1.run.app/api/auth';
            
            // Fetch the current user data
            const response = await fetch(`${AUTH_API_URL}/me`, {
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            if (!response.ok) {
              throw new Error(`Failed to fetch user data: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.user) {
              // Login the user using the auth context
              login(data.user);
              
              // Redirect to dashboard after successful login
              console.log('Login successful, redirecting to dashboard');
              navigate('/dashboard');
            } else {
              throw new Error('No user data received from authentication service');
            }
          } catch (fetchError) {
            console.error('Error fetching user data:', fetchError);
            setError('Authentication failed. Please try again.');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        }
      } catch (err) {
        console.error('Authentication success handling error:', err);
        setError('An unexpected error occurred. Please try again.');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    // Execute the authentication handler
    handleAuthSuccess();
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        {error ? (
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-100">
            <div className="animate-pulse rounded-full h-12 w-12 bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
            <p className="mt-2 text-red-600 text-sm">Redirecting you back to login...</p>
          </div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Completing your sign in...</p>
            <p className="mt-2 text-gray-500 text-sm">Please wait while we verify your account.</p>
          </>
        )}
      </div>
    </div>
  );
}

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

export default function App() {
  const GTM_ID = import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID || 'GTM-PSLHDGM';
  const { pushEvent } = useGoogleTagManager(GTM_ID);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Helmet>
          {/* Google Tag Manager */}
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </script>
        </Helmet>
        <Helmet>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            {`
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden">
              </iframe>
            `}
          </noscript>
        </Helmet>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-white">
              <SEO 
                title="Appraisily | Professional Art & Antique Appraisals"
                description="Leading online art and antique appraisal firm with certified experts. Professional valuations for collectors, institutions, and private clients worldwide."
              />
              <ScrollRestoration />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/success-payment" element={
                    <Suspense fallback={<PageLoader />}>
                      <Success />
                    </Suspense>
                  } />
                  <Route path="/about" element={
                    <Suspense fallback={<PageLoader />}>
                      <About />
                    </Suspense>
                  } />
                  <Route path="/team" element={
                    <Suspense fallback={<PageLoader />}>
                      <Team />
                    </Suspense>
                  } />
                  <Route path="/services" element={
                    <Suspense fallback={<PageLoader />}>
                      <Services />
                    </Suspense>
                  } />
                  <Route path="/expertise" element={
                    <Suspense fallback={<PageLoader />}>
                      <Expertise />
                    </Suspense>
                  } />
                  <Route path="/how-it-works" element={
                    <Suspense fallback={<PageLoader />}>
                      <HowItWorks />
                    </Suspense>
                  } />
                  <Route path="/report/:sessionId" element={
                    <Suspense fallback={<PageLoader />}>
                      <Report />
                    </Suspense>
                  } />
                  <Route path="/terms" element={
                    <Suspense fallback={<PageLoader />}>
                      <Terms />
                    </Suspense>
                  } />
                  <Route path="/privacy" element={
                    <Suspense fallback={<PageLoader />}>
                      <Privacy />
                    </Suspense>
                  } />
                  <Route path="/submission-success" element={
                    <Suspense fallback={<PageLoader />}>
                      <SubmissionSuccess />
                    </Suspense>
                  } />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <Suspense fallback={<PageLoader />}>
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    </Suspense>
                  } />
                  <Route path="/profile" element={
                    <Suspense fallback={<PageLoader />}>
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    </Suspense>
                  } />
                  
                  <Route path="/start" element={
                    <Suspense fallback={<PageLoader />}>
                      <ServiceSelection />
                    </Suspense>
                  } />
                  <Route path="/bulk-appraisal" element={
                    <Suspense fallback={<PageLoader />}>
                      <BulkAppraisal />
                    </Suspense>
                  } />
                  <Route path="/bulk-appraisal/:sessionId" element={
                    <Suspense fallback={<PageLoader />}>
                      <SessionRestore />
                    </Suspense>
                  } />
                  <Route path="/bulk-appraisal/upload" element={
                    <Suspense fallback={<PageLoader />}>
                      <BulkUpload />
                    </Suspense>
                  } />
                  <Route path="/bulk-appraisal/review" element={
                    <Suspense fallback={<PageLoader />}>
                      <BulkReview />
                    </Suspense>
                  } />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={
                    <Suspense fallback={<PageLoader />}>
                      <Login />
                    </Suspense>
                  } />
                  <Route path="/signup" element={
                    <Suspense fallback={<PageLoader />}>
                      <Signup />
                    </Suspense>
                  } />
                  <Route path="/reset-password" element={
                    <Suspense fallback={<PageLoader />}>
                      <ResetPassword />
                    </Suspense>
                  } />
                  <Route path="/auth/success" element={
                    <Suspense fallback={<PageLoader />}>
                      <AuthSuccess />
                    </Suspense>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}