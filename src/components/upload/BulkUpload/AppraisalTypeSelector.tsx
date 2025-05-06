import React from 'react';
import { Scale, Shield, FileCheck, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/text';
import { motion } from 'framer-motion';

export type AppraisalType = 'regular' | 'insurance' | 'tax';

interface AppraisalOption {
  id: AppraisalType;
  title: string;
  description: string;
  icon: React.ElementType;
  basePrice: number;
  popular?: boolean;
}

const appraisalTypes: AppraisalOption[] = [
  {
    id: 'regular',
    title: 'Regular Appraisal',
    description: 'Standard valuation for collectors and sellers',
    icon: Scale,
    basePrice: 5900, // $59.00
    popular: true
  },
  {
    id: 'insurance',
    title: 'Insurance Appraisal',
    description: 'Detailed documentation for insurance purposes',
    icon: Shield,
    basePrice: 5900 // $59.00
  },
  {
    id: 'tax',
    title: 'Tax Appraisal',
    description: 'IRS-compliant valuations for tax purposes',
    icon: FileCheck,
    basePrice: 5900 // $59.00
  }
];

const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 0.20; // 20% discount

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
  
  return (
    <div className="mb-12">
      <h3 className="text-sm font-medium text-slate-900 mb-4 tracking-normal">
        Select Appraisal Type
      </h3>
      
      {/* Price Information */}
      <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-sm text-slate-700 mb-2 font-medium">
          All appraisal types are <span className="text-slate-900 font-semibold">{formatCurrency(5900 / 100)}</span> per item
        </div>
        
        {showBulkDiscount && (
          <div className="flex items-center gap-2 mt-2 text-sm text-emerald-700">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">20% bulk discount applied for 3 or more items!</span>
          </div>
        )}
      </div>
      
      {/* Appraisal Type Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {appraisalTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.id;
          const { price, hasDiscount } = calculatePrice(type.basePrice, itemCount);
          
          return (
            <motion.div
              key={type.id}
              variants={item}
              className={cn(
                "relative overflow-hidden rounded-lg transition-all duration-200",
                "cursor-pointer border-2",
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-slate-200 hover:border-slate-300"
              )}
              onClick={() => onChange(type.id)}
            >
              {showBulkDiscount && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-bl-md transform rotate-12 shadow-lg">
                    SAVE 20%
                  </div>
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Service Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
                    isSelected 
                      ? "bg-blue-100" 
                      : "bg-slate-100"
                  )}>
                    <Icon className={cn(
                      "h-7 w-7",
                      isSelected ? "text-blue-600" : "text-slate-600"
                    )} />
                  </div>
                  
                  {/* Service Info */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={cn(
                        "text-xl font-semibold",
                        isSelected ? "text-blue-600" : "text-slate-900"
                      )}>
                        {type.title}
                      </h3>
                      
                      {type.popular && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-600 mt-1">
                      {type.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2">
                      {hasDiscount && (
                        <span className="text-sm line-through text-slate-400">
                          {formatCurrency(type.basePrice / 100)}
                        </span>
                      )}
                      <span className={cn(
                        "text-lg font-semibold",
                        hasDiscount ? "text-emerald-700" : "text-slate-900"
                      )}>
                        {formatCurrency(price / 100)}
                      </span>
                      <span className="text-sm text-slate-500">
                        per item
                      </span>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected 
                        ? "bg-blue-600 border-blue-600" 
                        : "border-slate-300"
                    )}>
                      {isSelected && <Check className="h-5 w-5 text-white" />}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile selection indicator - bottom bar */}
              <div className="sm:hidden">
                <div className={cn(
                  "h-2 w-full",
                  isSelected ? "bg-blue-600" : "bg-transparent"
                )} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}