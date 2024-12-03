import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';

// Import pages
import Landing from './pages/Landing';
import About from './pages/About';
import Team from './pages/Team';
import Services from './pages/Services';
import Expertise from './pages/Expertise';
import HowItWorks from './pages/HowItWorks';
import Report from './pages/Report';
import Terms from './pages/Terms';
import ServiceSelection from './pages/ServiceSelection';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-white">
            <SEO 
              title="Appraisily | Professional Art & Antique Appraisals"
              description="Leading online art and antique appraisal firm with certified experts. Professional valuations for collectors, institutions, and private clients worldwide."
            />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
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
                <Route path="/start" element={
                  <Suspense fallback={<PageLoader />}>
                    <ServiceSelection />
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