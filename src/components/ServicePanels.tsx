import React from 'react';
import { motion } from 'framer-motion';
import { User, Fingerprint, MapPin, Stamp, Calendar, Search } from 'lucide-react';

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function ServicePanels() {
  return (
    <>
      {/* Desktop Layout */}
      <motion.div 
        className="hidden md:grid grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="group cursor-pointer relative"
            >
              <div className="relative bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-blue-50">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      width="64"
                      height="64"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-200">
                      {service.name}
                      <IconComponent className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors duration-200">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-blue-500/10 group-hover:ring-blue-500/20 transition-all duration-300" />
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-blue-500/[0.08] via-transparent to-blue-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile Layout */}
      <motion.div 
        className="md:hidden grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              className="group touch-manipulation"
            >
              <div className="bg-white rounded-xl p-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-all duration-200 relative">
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-blue-50">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-1.5 text-sm group-hover:text-blue-600 transition-colors duration-200">
                      {service.name}
                      <IconComponent className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 group-hover:text-gray-900 transition-colors duration-200">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Ring Border */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-blue-500/10 group-hover:ring-blue-500/20 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}