import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Process from '../components/sections/Process';
import RecentAppraisals from '../components/sections/RecentAppraisals';
import SuccessStories from '../components/sections/SuccessStories';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Experts from '../components/Experts';
import TrustFooter from '../components/TrustFooter';

export default function ArtAppraiser() {
  useEffect(() => {
    // Push page view to GTM
    window.dataLayer?.push({
      event: 'pageview',
      page: {
        title: 'Professional Art Appraisers',
        path: '/art-appraiser'
      }
    });
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Process />
      <RecentAppraisals />
      <SuccessStories />
      <WhyChooseUs />
      <Services />
      <Experts />
      <TrustFooter />
    </div>
  );
}