import React from 'react';
import { Award, Star, Globe2 } from 'lucide-react';

interface ExpertProfile {
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  quote: string;
  stats: {
    label: string;
    value: string;
  }[];
  badges: {
    icon: typeof Award;
    text: string;
  }[];
}

const andresProfile: ExpertProfile = {
  name: 'Andrés Gómez',
  title: 'Lead Art Appraiser',
  credentials: ['BSc, MSc', 'Certified Art Appraiser'],
  specialties: ['Fine Art', 'Modern Art', 'Sculptures'],
  quote: 'Every piece tells a unique story through its history, craftsmanship, and cultural significance.',
  stats: [
    { label: 'Years Experience', value: '15+' },
    { label: 'Appraisals', value: '10K+' },
    { label: 'Specialties', value: '8' }
  ],
  badges: [
    { icon: Award, text: 'Certified Expert' },
    { icon: Star, text: '15+ Years Experience' },
    { icon: Globe2, text: 'International Recognition' }
  ]
};

export default function ExpertProfile() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Lead Expert
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get your artwork appraised by certified professionals with decades of experience
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-xl ring-1 ring-gray-200">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
              {/* Image Section */}
              <div className="relative">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg ring-1 ring-gray-200">
                  <img 
                    src="https://ik.imagekit.io/appraisily/Appraisers/andres.png?updatedAt=1730554573181" 
                    alt={andresProfile.name} 
                    className="h-full w-full object-cover"
                    width="400"
                    height="600"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {andresProfile.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-gray-900"
                      >
                        <badge.icon className="h-4 w-4 text-primary" />
                        {badge.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{andresProfile.name}</h3>
                    <p className="mt-2 text-lg font-medium text-primary">{andresProfile.title}</p>
                  </div>

                  {/* Credentials */}
                  <div className="flex flex-wrap gap-2">
                    {andresProfile.credentials.map((credential) => (
                      <span
                        key={credential}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-600 italic border-l-4 border-primary/20 pl-4">
                    "{andresProfile.quote}"
                  </blockquote>

                  {/* Specialties */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {andresProfile.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                    {andresProfile.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-6">
                    <a
                      href="https://appraisily.com/start"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                    >
                      Get Expert Appraisal
                      <Award className="h-5 w-5" />
                    </a>
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