import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import SEO from './components/SEO';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

// Lazy load other pages
const Team = React.lazy(() => import('./pages/Team').then(module => ({ default: module.default })));
const ServicesPage = React.lazy(() => import('./pages/Services').then(module => ({ default: module.default })));
const Expertise = React.lazy(() => import('./pages/Expertise').then(module => ({ default: module.default })));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks').then(module => ({ default: module.default })));
const Report = React.lazy(() => import('./pages/Report').then(module => ({ default: module.default })));
const Terms = React.lazy(() => import('./pages/Terms').then(module => ({ default: module.default })));
const ServiceSelection = React.lazy(() => import('./pages/ServiceSelection').then(module => ({ default: module.default })));

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
                <Route
                  path="/about"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Team />
                    </Suspense>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ServicesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/expertise"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Expertise />
                    </Suspense>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Team />
                    </Suspense>
                  }
                />
                <Route
                  path="/how-it-works"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <HowItWorks />
                    </Suspense>
                  }
                />
                <Route
                  path="/report/:sessionId"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Report />
                    </Suspense>
                  }
                />
                <Route
                  path="/start"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ServiceSelection />
                    </Suspense>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Terms />
                    </Suspense>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}