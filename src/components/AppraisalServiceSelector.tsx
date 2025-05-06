import React from 'react';
import { motion } from 'framer-motion';
import AppraisalServiceCard, { type ServiceInfo } from './AppraisalServiceCard';

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
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Select Your Appraisal Service</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Choose the service that best fits your needs. Each service includes expert evaluation by our certified specialists.</p>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(Object.entries(services) as [ServiceType, ServiceInfo][]).map(([type, service]) => (
          <motion.div key={type} variants={item}>
            <AppraisalServiceCard
              service={service}
              isSelected={selectedService === type}
              onSelect={() => onSelectService(type)}
              price={prices[type]}
              showFeatures={true}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 