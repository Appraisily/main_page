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
import { useTawkTo } from '../hooks/useTawkTo';

export default function Landing() {
  useTawkTo();

  return (
    <div className="min-h-screen bg-white">
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