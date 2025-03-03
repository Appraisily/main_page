import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';
import Logo from '../Logo';

interface ExpertFace {
  name: string;
  image: string;
  stats: {
    icon: typeof Award;
    text: string;
  }[];
}

const experts: ExpertFace[] = [
  {
    name: 'Andrés Gómez',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/andres.png?tr=w-400,h-400,q-75',
    stats: [{ icon: Award, text: 'Certified Expert' }]
  },
  {
    name: 'Charlotte Smith',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/charlotte.png?tr=w-400,h-400,q-75',
    stats: [{ icon: Award, text: 'European Specialist' }]
  },
  {
    name: 'Adrian Dupont',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/adrian.png?tr=w-400,h-400,q-75',
    stats: [{ icon: Award, text: 'Modern Art Specialist' }]
  }
];

export default function Hero() {
  return (
    <div className="relative min-h-screen isolate overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-primary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] opacity-10 [background-size:16px_16px] animate-[pulse_4s_ease-in-out_infinite]" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute right-10 top-1/3 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute left-1/3 bottom-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                <Logo variant="light" size="md" />
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 sm:text-6xl">
                Expert Art Appraisers You Can Trust
              </h1>
              
              {/* Expert Faces */}
              <div className="mt-8 flex -space-x-4">
                {experts.map((expert, index) => (
                  <div key={expert.name} className="relative group">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-16 w-16 rounded-full border-2 border-white object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-primary border-2 border-white p-1">
                      {React.createElement(expert.stats[0].icon, {
                        className: "h-4 w-4 text-white"
                      })}
                    </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {expert.name}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-dashed border-white/50 bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                  +10
                </div>
              </div>
              
              <p className="mt-4 text-blue-200 text-sm">
                Join thousands who trust our certified experts for professional art appraisals
              </p>
              
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-blue-300" />
                    </div>
                  </div>
                  <p className="text-lg text-blue-100">
                    USPAP-certified experts with 15+ years of experience
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Award className="h-5 w-5 text-blue-300" />
                    </div>
                  </div>
                  <p className="text-lg text-blue-100">
                    Trusted by leading institutions worldwide
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-blue-300" />
                    </div>
                  </div>
                  <p className="text-lg text-blue-100">
                    Fast 24-48 hour professional appraisals
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://appraisily.com/start"
                  id="start-appraisal-nav"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-primary/90 hover:to-blue-600/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  <span className="relative">
                    Start Your Appraisal
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </span>
                  <Award className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                </a>
                
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 transition-all duration-200 border border-white/20"
                >
                  View Services
                  <Award className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.075] backdrop-blur-sm border border-white/10">
                <div className="p-8">
                  {/* Featured Expert */}
                  <div className="mb-8 flex items-center gap-6 p-4 rounded-xl bg-white/[0.05] border border-white/10">
                    <img
                      src={experts[0].image}
                      alt={experts[0].name}
                      className="h-20 w-20 rounded-xl object-cover"
                      loading="eager"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{experts[0].name}</h3>
                      <p className="text-blue-200">Lead Art Appraiser</p>
                      <div className="mt-2 flex gap-2">
                        <div className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-gray-900">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          Certified Expert
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">15K+</div>
                      <div className="mt-2 text-sm text-blue-200">Artworks Appraised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">98%</div>
                      <div className="mt-2 text-sm text-blue-200">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">50+</div>
                      <div className="mt-2 text-sm text-blue-200">Countries Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">24h</div>
                      <div className="mt-2 text-sm text-blue-200">Avg. Turnaround</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}