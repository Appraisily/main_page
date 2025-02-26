import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useGoogleTagManager } from './hooks/useGoogleTagManager';
import ScrollRestoration from './components/ScrollRestoration';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';

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
import ServiceSelection from './pages/ServiceSelection';
import SubmissionSuccess from './pages/SubmissionSuccess';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

export default function App() {
  const GTM_ID = 'GTM-PSLHDGM'; // Replace with your GTM ID
  useGoogleTagManager(GTM_ID);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Helmet>
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
          <noscript>
            {`
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden">
              </iframe>
            `}
          </noscript>
        </Helmet>
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
                <Route path="/submission-success" element={
                  <Suspense fallback={<PageLoader />}>
                    <SubmissionSuccess />
                  </Suspense>
                } />
                <Route path="/dashboard" element={
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
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
                
                {/* Directory route - redirects to appraisers app */}
                <Route path="/directory/*" element={
                  <Suspense fallback={<PageLoader />}>
                    <iframe 
                      src="/directory/" 
                      title="Appraisers Directory"
                      className="w-full h-screen border-none"
                    />
                  </Suspense>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}