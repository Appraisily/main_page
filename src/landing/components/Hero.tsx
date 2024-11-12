import React from 'react';
import { ArrowRight, Award, Shield, Star, Clock, Sparkles } from 'lucide-react';
import VideoBackground from './VideoBackground';

export default function Hero() {
  return (
    <div className="relative bg-white">
      <VideoBackground 
        fallbackImage="/src/landing/src/images/hero_background.jpg" 
      />
      
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
              <img
                src="https://www.appraisily.com/wp-content/uploads/2023/12/logo.jpg"
                alt="Appraisily"
                className="h-8 w-auto rounded-full"
              />
              <span className="text-xl font-semibold text-white">Appraisily</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Expert Art &amp; Antique Appraisals
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Professional art appraisal services starting at $59. Get your artwork or antique valued by certified experts within 24-48 hours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="https://services.appraisily.com/"
                className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-fit"
              >
                Start Appraisal Now <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://screener.appraisily.com"
                className="rounded-md bg-white/10 backdrop-blur-sm px-6 py-3 text-lg font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-fit"
              >
                Try Free AI Analysis <Sparkles className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Clock className="w-8 h-8 text-[#007bff]" />
              <p className="text-white">24-48h Turnaround</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Award className="w-8 h-8 text-[#007bff]" />
              <p className="text-white">Certified Experts</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Shield className="w-8 h-8 text-[#007bff]" />
              <p className="text-white">From $59/Item</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Star className="w-8 h-8 text-[#007bff]" />
              <p className="text-white">5-Star Rated</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-32 pointer-events-none"></div>
      </div>

      {/* Floating Brand Badge */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="https://appraisily.com"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:bg-white/20 transition-all duration-200"
        >
          <img
            src="https://www.appraisily.com/wp-content/uploads/2023/12/logo.jpg"
            alt="Appraisily"
            className="h-6 w-auto rounded-full"
          />
          <span className="text-white font-medium">appraisily.com</span>
        </a>
      </div>
    </div>
  );
}