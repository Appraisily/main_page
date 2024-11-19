import React from 'react';
import { User, Fingerprint, MapPin, Stamp, Calendar, Search } from 'lucide-react';

const IMAGEKIT_URL = 'https://ik.imagekit.io/appraisily/WebPage';

const services = [
  {
    id: 'maker',
    name: 'Maker Analysis',
    description: 'Identify potential creator',
    icon: User,
    image: `${IMAGEKIT_URL}/maker?updatedAt=1732004009063`,
    position: { x: 350, y: -100 }
  },
  {
    id: 'signature',
    name: 'Signature Check',
    description: 'Analyze signatures',
    icon: Fingerprint,
    image: `${IMAGEKIT_URL}/signature?updatedAt=1732003919574`,
    position: { x: 350, y: 100 }
  },
  {
    id: 'origin',
    name: 'Origin Analysis',
    description: 'Determine likely origin',
    icon: MapPin,
    image: `${IMAGEKIT_URL}/origin?updatedAt=1732003994998`,
    position: { x: -350, y: -100 }
  },
  {
    id: 'marks',
    name: 'Marks Recognition',
    description: 'Identify maker marks',
    icon: Stamp,
    image: `${IMAGEKIT_URL}/marks?updatedAt=1732003867308`,
    position: { x: -350, y: 100 }
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: `${IMAGEKIT_URL}/age?updatedAt=1732003886959`,
    position: { x: 0, y: -150 }
  },
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar artworks',
    icon: Search,
    image: `${IMAGEKIT_URL}/visual?updatedAt=1732003934468`,
    position: { x: 0, y: 150 }
  }
];

export default function ServicePanels() {
  return (
    <>
      {/* Service Cards - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-105"
              style={{
                left: `calc(50% + ${service.position.x}px)`,
                top: `calc(50% + ${service.position.y}px)`,
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-blue-100 transition-all duration-300 w-64 group border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10 group-hover:to-black/5 transition-colors"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      {service.name}
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -z-10"
                style={{
                  width: Math.abs(service.position.x),
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2))',
                  transform: `rotate(${Math.atan2(service.position.y, service.position.x) * (180 / Math.PI)}deg)`,
                  transformOrigin: service.position.x > 0 ? 'left' : 'right'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Service Grid */}
      <div className="mt-48 md:hidden px-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className="h-4 w-4 text-blue-600" />
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