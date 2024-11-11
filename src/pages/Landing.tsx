import React from 'react';
import Hero from '../landing/components/Hero';
import WhyChooseUs from '../landing/components/WhyChooseUs';
import Services from '../landing/components/Services';
import Process from '../landing/components/Process';
import Gallery from '../landing/components/Gallery';
import Appraisers from '../landing/components/Appraisers';
import SampleReport from '../landing/components/SampleReport';
import Pricing from '../landing/components/Pricing';
import Testimonials from '../landing/components/Testimonials';
import InstantAnalysis from '../landing/components/InstantAnalysis';
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
      <Appraisers />
      <SampleReport />
      <Pricing />
      <Testimonials />
      <InstantAnalysis />
    </div>
  );
}