import React from 'react';
import { motion } from 'framer-motion';
import AppraisalServiceCard, { type ServiceInfo } from './AppraisalServiceCard';
import '../../styles/components/_service-option-card.scss';

export type ServiceType = 'regular' | 'insurance' | 'tax';

interface AppraisalServiceSelectorProps {
  services: Record<ServiceType, ServiceInfo>;
  selectedService: ServiceType;
  onSelectService: (type: ServiceType) => void;
  prices: Record<ServiceType, number>;
}

// Animation variants for cards
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

export default function AppraisalServiceSelector({
  services,
  selectedService,
  onSelectService,
  prices
}: AppraisalServiceSelectorProps) {
  return (
    <div className="py-4 sm:py-6 mt-2 sm:mt-0">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-medium text-slate-600 mb-1">Select Your Appraisal Service</h2>
      </div>
      
      <motion.div 
        className="service-options"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(Object.entries(services) as [ServiceType, ServiceInfo][]).map(([type, service]) => (
          <motion.div key={type} variants={item} className="h-full">
            <AppraisalServiceCard
              service={service}
              isSelected={selectedService === type}
              onSelect={() => onSelectService(type)}
              price={prices[type]}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 