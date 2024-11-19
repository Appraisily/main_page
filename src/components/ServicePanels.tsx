import React from 'react';
import { User, Fingerprint, MapPin, Stamp, Calendar, Search } from 'lucide-react';
import Panel from './Panel';

const IMAGEKIT_URL = 'https://ik.imagekit.io/appraisily/WebPage';

const services = [
  {
    id: 'maker',
    name: 'Maker Analysis',
    description: 'Identify potential creator',
    icon: User,
    image: `${IMAGEKIT_URL}/maker?tr=w-64,h-64,q-60`,
  },
  {
    id: 'signature',
    name: 'Signature Check',
    description: 'Analyze signatures',
    icon: Fingerprint,
    image: `${IMAGEKIT_URL}/signature?tr=w-64,h-64,q-60`,
  },
  {
    id: 'origin',
    name: 'Origin Analysis',
    description: 'Determine likely origin',
    icon: MapPin,
    image: `${IMAGEKIT_URL}/origin?tr=w-64,h-64,q-60`,
  },
  {
    id: 'marks',
    name: 'Marks Recognition',
    description: 'Identify maker marks',
    icon: Stamp,
    image: `${IMAGEKIT_URL}/marks?tr=w-64,h-64,q-60`,
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: `${IMAGEKIT_URL}/age?tr=w-64,h-64,q-60`,
  },
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar artworks',
    icon: Search,
    image: `${IMAGEKIT_URL}/visual?tr=w-64,h-64,q-60`,
  }
];

export default function ServicePanels() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 gap-6 mt-12">
        {services.map((service) => (
          <Panel
            key={service.id}
            {...service}
            title={service.name}
          />
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200/60 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    {service.name}
                    <IconComponent className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}