import React, { useState, useEffect } from 'react';
import { Camera, ArrowRight, Shield, Star } from 'lucide-react';
import Logo from './Logo';

const paintings = [
  {
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery2.jpg",
    title: "Portrait of a Gentleman",
    artist: "Frans Hals",
    period: "17th Century",
    value: "$85,000"
  },
  {
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery1.jpg",
    title: "Surrealist Abstract",
    artist: "Tom Kidd",
    period: "Contemporary",
    value: "$2,200"
  },
  {
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery3.jpg",
    title: "Tavern Scene",
    artist: "Adriaen Brouwer",
    period: "Dutch Golden Age",
    value: "$6,000"
  }
];

const getImageUrl = (url: string) => {
  const isMobile = window.innerWidth <= 768;
  const width = isMobile ? 400 : 800;
  const height = Math.round(width * 0.75);
  const quality = isMobile ? 40 : 60;
  return `${url}?tr=w-${width},h-${height},q-${quality},f-auto`;
};

export default function HeroSplitScreen() {
  const [showContent, setShowContent] = useState(false);
  const [currentPainting, setCurrentPainting] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPainting((prev) => (prev + 1) % paintings.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Content with Gradient Background */}
        <div className="relative bg-gradient-to-br from-white via-gray-50 to-white px-8 lg:px-12 flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
          
          <div className="absolute top-8 left-8">
            <Logo variant="dark" size="md" />
          </div>
          
          <div className={`relative max-w-xl transition-all duration-700 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Trust Badge */}
            <div className="flex items-center gap-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                USPAP Certified
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-primary to-gray-900">
              Instant Art Value Check
            </h1>
            
            <p className="mt-6 text-lg text-gray-600">
              Get an instant AI estimate of your artwork's value in seconds.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="https://screener.appraisily.com/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 transition-all duration-200"
              >
                <Camera className="h-5 w-5" />
                Get Instant AI Analysis
              </a>
              <a
                href="https://appraisily.com/start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-white transition-all duration-200"
              >
                Learn More
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm ring-1 ring-gray-200">
                <div className="text-2xl font-bold text-gray-900">15K+</div>
                <div className="mt-1 text-sm text-gray-600">Artworks Appraised</div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm ring-1 ring-gray-200">
                <div className="text-2xl font-bold text-gray-900">24h</div>
                <div className="mt-1 text-sm text-gray-600">For Full Report</div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm ring-1 ring-gray-200">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="mt-1 text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image Gallery */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(paintings[currentPainting].image)}
              alt="Art appraisal example"
              fetchpriority="high"
              className={`h-full w-full object-cover transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              loading="eager"
              width={window.innerWidth <= 768 ? "400" : "800"}
              height={window.innerWidth <= 768 ? "300" : "600"}
              decoding="async"
              sizes="(max-width: 768px) 400px, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          </div>
          
          <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{paintings[currentPainting].title}</h2>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {paintings[currentPainting].artist}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {paintings[currentPainting].period}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Appraised Value</div>
                  <div className="text-xl font-bold text-primary">{paintings[currentPainting].value}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {paintings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentPainting(index);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPainting === index ? 'bg-primary w-4' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View painting ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src={paintings[currentPainting].image}
            alt="Art appraisal example"
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative flex flex-col min-h-screen p-6">
          <div className="pt-8">
            <Logo variant="light" size="md" />
          </div>

          <div className="mt-auto space-y-6 pb-8">
            <div className={`transition-all duration-700 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                USPAP Certified Appraisers
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Quick Art Value Check
              </h1>

              <p className="mt-4 text-lg text-gray-200">
                Get a quick estimate of your artwork's value in minutes.
              </p>

              <div className="mt-4 flex justify-center gap-2">
                {paintings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentPainting(index);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPainting === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`View painting ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-white">
                  <div className="text-2xl font-bold">15K+</div>
                  <div className="mt-1 text-sm text-gray-200">Appraised</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="mt-1 text-sm text-gray-200">Full Report</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="mt-1 text-sm text-gray-200">Satisfied</div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="https://screener.appraisily.com/"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-md hover:bg-gray-100 transition-all duration-200"
                >
                  <Camera className="h-5 w-5" />
                  Get Quick Value Check
                </a>
                <a
                  href="https://appraisily.com/start"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}