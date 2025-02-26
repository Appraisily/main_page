import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollRestoration from './components/ScrollRestoration';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const AppraiserProfile = React.lazy(() => import('./pages/AppraiserProfile'));
const AppraisersList = React.lazy(() => import('./pages/AppraisersList'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollRestoration />
        <Navbar />
        
        <main className="min-h-screen pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appraisers" element={<AppraisersList />} />
              <Route path="/appraisers/:id" element={<AppraiserProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </ErrorBoundary>
    </HelmetProvider>
  );
} 