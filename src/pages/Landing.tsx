import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Process from '../components/Process';
import Team from '../components/Team';
import Expertise from '../components/Expertise';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import ProcessSteps from '../components/ProcessSteps';
import SuccessStories from '../components/SuccessStories';
import RecentAppraisals from '../components/RecentAppraisals';
import MarketAnalysis from '../components/MarketAnalysis';
import { Link } from 'react-router-dom';

export default function Landing() {
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-white">
      {/* Debug Link - Only visible in development */}
      {isDev && (
        <div className="fixed bottom-4 left-4 z-50">
          <Link
            to="/success-payment?session_id=cs_live_a1pi2YjX8Nr6lH53ACyeqX6bIx6REfRLBGrJ1ThzXj6C6UEJytdKOyiMxf"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm"
          >
            Debug: Success Payment
          </Link>
          <Link
            to="/dashboard?email=cmillsjr@cmcllc.biz"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm"
          >
            Debug: Dashboard
          </Link>
        </div>
      )}
      <Hero />
      <Features />
      <Services />
      <Process />
      <Team />
      <ProcessSteps />
      <MarketAnalysis />
      <RecentAppraisals />
      <SuccessStories />
      <Testimonials />
      <Contact />
    </div>
  );
}