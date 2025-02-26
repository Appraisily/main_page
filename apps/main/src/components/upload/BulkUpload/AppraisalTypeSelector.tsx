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
      <h3 className="text-sm font-medium text-gray-900 mb-4">
        Select Appraisal Type
      </h3>
      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700">
        All appraisal types are <span className="font-medium">{formatCurrency(5900 / 100)}</span> per item
      </div>
      {itemCount >= BULK_DISCOUNT_THRESHOLD && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700">
          20% bulk discount applied for 3 or more items!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {appraisalTypes.map((type) => {
          const Icon = type.icon;
          const { price, hasDiscount } = calculatePrice(type.basePrice, itemCount);
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={cn(
                "relative p-6 text-left rounded-xl border-2 transition-all duration-200",
                value === type.id
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  value === type.id ? "bg-blue-100" : "bg-gray-100"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    value === type.id ? "text-blue-600" : "text-gray-600"
                  )} />
                </div>
                <div className="flex-grow">
                  <h4 className={cn(
                    "font-medium",
                    value === type.id ? "text-blue-600" : "text-gray-900"
                  )}>
                    {type.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    {hasDiscount && (
                      <span className="text-sm line-through text-gray-400">
                        {formatCurrency(type.basePrice / 100)}/item
                      </span>
                    )}
                    <span className={cn(
                      "text-sm",
                      hasDiscount ? "text-green-600 font-medium" : "text-gray-600"
                    )}>
                      {formatCurrency(price / 100)}/item
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 min-h-[40px]">
                {type.description}
              </p>
              {value === type.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}