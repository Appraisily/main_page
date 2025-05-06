import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ServiceInfo {
  title: string;
  description: string;
  icon: LucideIcon;
  popular?: boolean;
  features: FeatureItem[];
  basePrice: number;
}

interface AppraisalServiceCardProps {
  service: ServiceInfo;
  isSelected: boolean;
  onSelect: () => void;
  price: number;
}

export default function AppraisalServiceCard({
  service,
  isSelected,
  onSelect,
  price
}: AppraisalServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-200 h-full",
        "cursor-pointer border shadow-sm hover:shadow-md",
        isSelected
          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100"
          : "border-slate-200 bg-white hover:border-slate-300"
      )}
      onClick={onSelect}
    >
      {/* Popular tag */}
      {service.popular && (
        <div className="absolute top-0 right-0">
          <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-medium rounded-bl-lg flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3" />
            Popular
          </div>
        </div>
      )}
      
      <div className="p-4 flex flex-col items-center justify-between h-full">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3",
          isSelected 
            ? "bg-blue-100" 
            : "bg-slate-100"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            isSelected ? "text-blue-600" : "text-slate-600"
          )} />
        </div>
        
        {/* Title */}
        <h3 className={cn(
          "text-center text-base font-semibold mb-3",
          isSelected ? "text-blue-600" : "text-slate-900"
        )}>
          {service.title}
        </h3>
        
        {/* Price */}
        <div className="text-center">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(price / 100)}
          </span>
          <span className="text-xs text-slate-500 block">
            per item
          </span>
        </div>
        
        {/* Selection Indicator */}
        <div className="mt-3">
          <div className={cn(
            "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
            isSelected 
              ? "bg-blue-600 border-blue-600" 
              : "border-slate-300"
          )}>
            {isSelected && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
} 