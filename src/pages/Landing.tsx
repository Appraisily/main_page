import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import Team from '../components/Team';
import ServicesOverview from '../components/Services';
import Expertise from '../components/Expertise';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Features from '../components/Features';
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
      <WhyChooseUs />
      <Services />
      <Process />
      <Gallery />
      <Team />
      <Features />
      <ProcessSteps />
      <MarketAnalysis />
      <ServicesOverview />
      <RecentAppraisals />
      <SuccessStories />
      <Testimonials />
      <Contact />
    </div>
  );
}