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
    position: { x: 350, y: -100 }
  },
  {
    id: 'signature',
    name: 'Signature Check',
    description: 'Analyze signatures',
    icon: Fingerprint,
    image: `${IMAGEKIT_URL}/signature?tr=w-64,h-64,q-60`,
    position: { x: 350, y: 100 }
  },
  {
    id: 'origin',
    name: 'Origin Analysis',
    description: 'Determine likely origin',
    icon: MapPin,
    image: `${IMAGEKIT_URL}/origin?tr=w-64,h-64,q-60`,
    position: { x: -350, y: -100 }
  },
  {
    id: 'marks',
    name: 'Marks Recognition',
    description: 'Identify maker marks',
    icon: Stamp,
    image: `${IMAGEKIT_URL}/marks?tr=w-64,h-64,q-60`,
    position: { x: -350, y: 100 }
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: `${IMAGEKIT_URL}/age?tr=w-64,h-64,q-60`,
    position: { x: 0, y: -150 }
  },
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar artworks',
    icon: Search,
    image: `${IMAGEKIT_URL}/visual?tr=w-64,h-64,q-60`,
    position: { x: 0, y: 150 }
  }
];

export default function ServicePanels() {
  return (
    <>
      {/* Service Cards - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block">
        {services.map((service) => (
          <Panel
            key={service.id}
            {...service}
            title={service.name}
          />
        ))}
      </div>

      {/* Mobile Service Grid */}
      <div className="mt-96 md:hidden px-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
                </div>
                <p className="text-xs text-gray-500">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}