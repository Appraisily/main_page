import React from 'react';
import { Scale, Shield, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/text';

export type AppraisalType = 'regular' | 'insurance' | 'tax';

interface AppraisalOption {
  id: AppraisalType;
  title: string;
  description: string;
  icon: React.ElementType;
  basePrice: number;
}

const appraisalTypes: AppraisalOption[] = [
  {
    id: 'regular',
    title: 'Regular Appraisal',
    description: 'Standard valuation for collectors and sellers',
    icon: Scale,
    basePrice: 5900 // $59.00
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

export function AppraisalTypeSelector({ value, onChange, itemCount = 1 }: AppraisalTypeSelectorProps) {
  return (
    <div className="mb-12">
      <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-normal" style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
        Select Appraisal Type
      </h3>
      
      {/* Price Information */}
      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-sm text-gray-700 mb-2 font-medium">
          All appraisal types are <span className="text-gray-900 font-semibold">{formatCurrency(5900 / 100)}</span> per item
        </div>
        
        {itemCount >= BULK_DISCOUNT_THRESHOLD && (
          <div className="flex items-center gap-2 mt-2 text-sm text-emerald-700">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">20% bulk discount applied for 3 or more items!</span>
          </div>
        )}
      </div>
      
      {/* Appraisal Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {appraisalTypes.map((type) => {
          const Icon = type.icon;
          const { price, hasDiscount } = calculatePrice(type.basePrice, itemCount);
          
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={cn(
                "relative flex flex-col h-full p-6 text-left rounded-xl border transition-all duration-200",
                value === type.id
                  ? "border-gray-400 bg-gray-50 shadow"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {/* Selected indicator */}
              {value === type.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                </div>
              )}
              
              {/* Header with icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  value === type.id ? "bg-gray-100" : "bg-gray-100"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    value === type.id ? "text-gray-700" : "text-gray-500"
                  )} />
                </div>
                <div>
                  <h4 className={cn(
                    "font-medium text-base",
                    value === type.id ? "text-gray-900" : "text-gray-700"
                  )} style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
                    {type.title}
                  </h4>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {type.description}
              </p>
              
              {/* Price display */}
              <div className="mt-auto pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {hasDiscount && (
                    <span className="text-sm line-through text-gray-400">
                      {formatCurrency(type.basePrice / 100)}/item
                    </span>
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    hasDiscount ? "text-emerald-700" : "text-gray-700"
                  )}>
                    {formatCurrency(price / 100)}/item
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}