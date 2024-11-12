import React from 'react';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Appraisers from './components/Appraisers';
import SampleReport from './components/SampleReport';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import InstantAnalysis from './components/InstantAnalysis';
import { useTawkTo } from './hooks/useTawkTo';

function App() {
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

export default App;