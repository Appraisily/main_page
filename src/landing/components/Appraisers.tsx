import React, { useState } from 'react';
import { Award, Star, Shield, X } from 'lucide-react';
import { IMAGES } from '../src/lib/images';

const appraisers = [
  {
    name: 'Andrés Gómez, BSc, MSc',
    image: IMAGES.team.andres,
    credentials: 'Certified Art and Antique Appraiser',
    quote: 'Expertly valuing your treasures to safeguard your investment.',
    specialties: ['Fine Art', 'Antiques', 'Modern Art'],
    icon: Award,
    details: 'With a strong academic background and certification in art appraisal, Andrés specializes in precise, trusted evaluations across fine art, antiques, and modern pieces. His appraisals provide clients with reliable insights for investment, insurance, and estate planning.'
  },
  {
    name: 'Charlotte Williams',
    image: IMAGES.team.charlotte,
    credentials: 'BSc in Art History',
    quote: 'Delivering detailed, accurate appraisals with ease and efficiency.',
    specialties: ['Contemporary Art', 'Sculptures', 'Paintings'],
    icon: Star,
    details: 'Charlotte combines her art history background with expertise in contemporary art and sculpture, providing thorough, insightful appraisals that clients can trust for clarity and accuracy.'
  },
  {
    name: 'Adrian Dupont',
    image: IMAGES.team.adrian,
    credentials: 'European Fine Art and Antiques Specialist',
    quote: 'Our appraisals, accompanied by detailed reports and photographs, reveal the key facts behind your unique finds.',
    specialties: ['European Art', 'Classical Art', 'Religious Art'],
    icon: Shield,
    details: 'Adrian brings specialized knowledge in European fine art and antiques, offering detailed appraisals with comprehensive reports and photographs that uncover each piece\'s history and value.'
  }
];

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  position: { x: number; y: number };
}

function Popover({ isOpen, onClose, content, position }: PopoverProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div
        className="absolute bg-white rounded-lg shadow-xl p-6 max-w-md transform -translate-x-1/2 animate-fade-in"
        style={{
          top: `${position.y + 20}px`,
          left: `${position.x}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="text-gray-700 leading-relaxed">{content}</p>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white"></div>
      </div>
    </div>
  );
}

export default function Appraisers() {
  const [popover, setPopover] = useState<{
    isOpen: boolean;
    content: string;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    content: '',
    position: { x: 0, y: 0 }
  });

  const handleCardClick = (e: React.MouseEvent, details: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    setPopover({
      isOpen: true,
      content: details,
      position: { x, y }
    });
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Expert Appraisers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team of certified professionals brings decades of combined experience in art and antique appraisal.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {appraisers.map((appraiser) => (
            <div
              key={appraiser.name}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center ring-1 ring-inset ring-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              onClick={(e) => handleCardClick(e, appraiser.details)}
            >
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden mb-6">
                <img 
                  src={appraiser.image} 
                  alt={appraiser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <appraiser.icon className="w-5 h-5 text-[#007bff]" />
                <span className="text-sm font-medium text-[#007bff]">Expert Appraiser</span>
              </div>
              
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-bold text-gray-900">{appraiser.name}</h3>
                <p className="mt-1 text-sm text-[#007bff]">{appraiser.credentials}</p>
                
                <div className="mt-4 flex-grow flex items-center">
                  <blockquote className="text-gray-600 italic min-h-[4rem] flex items-center">
                    "{appraiser.quote}"
                  </blockquote>
                </div>
                
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {appraiser.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center rounded-full bg-[#007bff]/10 px-3 py-1 text-sm font-medium text-[#007bff]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://services.appraisily.com/"
            className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
          >
            Start Your Appraisal
          </a>
        </div>
      </div>

      <Popover
        isOpen={popover.isOpen}
        onClose={() => setPopover({ ...popover, isOpen: false })}
        content={popover.content}
        position={popover.position}
      />
    </div>
  );
}