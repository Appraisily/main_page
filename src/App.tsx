import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';

// Eagerly load the Landing page since it's the most common entry point
import Landing from './pages/Landing';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
);

// Lazy load other pages
const About = React.lazy(() => import('./pages/About'));
const Team = React.lazy(() => import('./pages/Team'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const Expertise = React.lazy(() => import('./pages/Expertise'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const Report = React.lazy(() => import('./pages/Report'));
const Terms = React.lazy(() => import('./pages/Terms'));
const ServiceSelection = React.lazy(() => import('./pages/ServiceSelection'));

// Route configuration
const routes = [
  { path: '/', element: <Landing /> },
  { path: '/about', element: <About /> },
  { path: '/team', element: <Team /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/expertise', element: <Expertise /> },
  { path: '/how-it-works', element: <HowItWorks /> },
  { path: '/report/:sessionId', element: <Report /> },
  { path: '/terms', element: <Terms /> },
  { path: '/start', element: <ServiceSelection /> }
];

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
                {routes.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      path === '/' ? (
                        element
                      ) : (
                        <Suspense fallback={<PageLoader />}>
                          {element}
                        </Suspense>
                      )
                    }
                  />
                ))}
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}