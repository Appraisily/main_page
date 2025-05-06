import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/text';
import AppraisalServiceCard, { type ServiceInfo } from '@/components/Start/AppraisalServiceCard';
import { Scale, Shield, FileCheck, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

export type AppraisalType = 'regular' | 'insurance' | 'tax';

// Constants for pricing
const BASE_PRICE = 5900; // $59.00
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 0.20; // 20% discount

// Service definitions - matching main page
const appraisalTypes: Record<AppraisalType, ServiceInfo> = {
  regular: {
    title: 'Regular Appraisal',
    description: 'Standard valuation for collectors and sellers',
    icon: Scale,
    basePrice: BASE_PRICE,
    popular: true,
    features: [
      {
        title: 'Detailed condition report',
        description: 'Complete inspection of item condition'
      },
      {
        title: 'Market value assessment',
        description: 'Current market value determination'
      },
      {
        title: 'Expert identification',
        description: 'Professional authentication'
      },
      {
        title: 'Digital documentation',
        description: 'Secure digital documentation'
      }
    ]
  },
  insurance: {
    title: 'Insurance Appraisal',
    description: 'Detailed documentation for insurance purposes',
    icon: Shield,
    basePrice: BASE_PRICE,
    popular: false,
    features: [
      {
        title: 'Insurance & IRS compliance',
        description: 'Meets insurance requirements'
      },
      {
        title: 'Replacement value',
        description: 'Accurate replacement valuation'
      },
      {
        title: 'Risk assessment',
        description: 'Item risk evaluation'
      },
      {
        title: 'Digital certification',
        description: 'Secure certification'
      }
    ]
  },
  tax: {
    title: 'Tax Appraisal',
    description: 'IRS-compliant valuations for tax purposes',
    icon: FileCheck,
    basePrice: BASE_PRICE,
    popular: false,
    features: [
      {
        title: 'IRS compliance',
        description: 'Meets IRS requirements'
      },
      {
        title: 'Fair market value',
        description: 'Tax appropriate valuations'
      },
      {
        title: 'Detailed documentation',
        description: 'Complete tax documentation'
      },
      {
        title: 'Expert testimony',
        description: 'Available expert verification'
      }
    ]
  }
};

function calculatePrice(basePrice: number, itemCount: number): { price: number; hasDiscount: boolean } {
  const hasDiscount = itemCount >= BULK_DISCOUNT_THRESHOLD;
  const price = hasDiscount 
    ? basePrice * (1 - BULK_DISCOUNT_PERCENTAGE)
    : basePrice;
  return { price, hasDiscount };
}

interface AppraisalTypeSelectorProps {
  value: AppraisalType;
  onChange: (type: AppraisalType) => void;
  itemCount?: number;
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

export function AppraisalTypeSelector({ value, onChange, itemCount = 1 }: AppraisalTypeSelectorProps) {
  const showBulkDiscount = itemCount >= BULK_DISCOUNT_THRESHOLD;
  
  // Calculate prices for each service type
  const servicePrices: Record<AppraisalType, number> = {
    regular: calculatePrice(appraisalTypes.regular.basePrice, itemCount).price,
    insurance: calculatePrice(appraisalTypes.insurance.basePrice, itemCount).price,
    tax: calculatePrice(appraisalTypes.tax.basePrice, itemCount).price
  };
  
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Select Appraisal Type
        </h3>
      </div>
      
      {/* Discount Badge */}
      {showBulkDiscount && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-center gap-3 text-white">
              <Percent className="h-5 w-5" />
              <span className="font-medium">
                20% bulk discount applied to all items!
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Appraisal Type Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(Object.entries(appraisalTypes) as [AppraisalType, ServiceInfo][]).map(([type, service]) => (
          <motion.div key={type} variants={item}>
            <AppraisalServiceCard
              service={service}
              isSelected={value === type}
              onSelect={() => onChange(type)}
              price={servicePrices[type]}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}