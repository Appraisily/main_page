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
import QualifiedAppraisals from './pages/QualifiedAppraisals';
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

// Define AuthSuccess component inline to fix build issues
const AuthSuccess = () => {
  useEffect(() => {
    console.log('[DEBUG] Auth success component mounted');
    
    try {
      if (window.opener) {
        console.log('[DEBUG] Found opener window, sending AUTH_SUCCESS message');
        window.opener.postMessage({ type: 'AUTH_SUCCESS' }, window.location.origin);
        setTimeout(() => window.close(), 1000);
      } else {
        console.log('[DEBUG] No opener window found, likely direct navigation');
      }
    } catch (err) {
      console.error('[DEBUG] Error in auth success handler:', err);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-700 font-medium">Completing your sign in...</p>
        <p className="mt-2 text-gray-500 text-sm">Please wait while we verify your account.</p>
      </div>
    </div>
  );
};

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
                  <Route path="/qualified-appraisals" element={
                    <Suspense fallback={<PageLoader />}>
                      <QualifiedAppraisals />
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