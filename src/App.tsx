import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import About from './components/About';
import ServicesOverview from './components/Services';
import Team from './pages/Team';
import ServicesPage from './pages/Services';
import Expertise from './pages/Expertise';
import HowItWorks from './pages/HowItWorks';
import Report from './pages/Report';
import Terms from './pages/Terms';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Features from './components/Features';
import ProcessSteps from './components/ProcessSteps';
import SuccessStories from './components/SuccessStories';
import RecentAppraisals from './components/RecentAppraisals';
import MarketAnalysis from './components/MarketAnalysis';
import ServiceSelection from './pages/ServiceSelection';
import Screener from './screener/src/App';
import Landing from './pages/Landing';
import { useTawkTo } from './hooks/useTawkTo';
import { useScrollToTop } from './hooks/useScrollToTop';

function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Features />
      <ProcessSteps />
      <MarketAnalysis />
      <ServicesOverview />
      <RecentAppraisals />
      <SuccessStories />
      <Testimonials />
      <Contact />
    </>
  );
}

export function App() {
  // Initialize Tawk.to chat
  useTawkTo();
  
  // Scroll to top on route change
  useScrollToTop();

  return (
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
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/team" element={<Team />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/report/:sessionId" element={<Report />} />
              <Route path="/start" element={<ServiceSelection />} />
              <Route path="/screener/*" element={<Screener />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/landing" element={<Landing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </HelmetProvider>
  );
}