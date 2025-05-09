import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';
import '../../styles/components/_service-option-card.scss';

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
        "service-option-card",
        isSelected && "service-option-card--selected"
      )}
      onClick={onSelect}
    >
      {/* Popular tag */}
      {service.popular && (
        <div className="absolute top-0 right-0">
          <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-bl-lg flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3" />
            Popular
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-between h-full" style={{ minHeight: '180px' }}>
        {/* Icon */}
        <Icon className="service-option-card__icon" />
        
        {/* Title */}
        <h3 className="service-option-card__title">
          {service.title}
        </h3>
        
        {/* Price */}
        <div className="text-center">
          <span className="service-option-card__price">
            {formatCurrency(price / 100)}
          </span>
          <span className="service-option-card__per">
            per item
          </span>
        </div>
        
        {/* Selection Indicator */}
        <div className="mt-3">
          <div className={cn(
            "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
            isSelected 
              ? "bg-slate-900 border-slate-900" 
              : "border-slate-300"
          )}>
            {isSelected && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
} 