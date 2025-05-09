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
          <div className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-bl-md flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span className="sm:inline">Popular</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-row sm:flex-col sm:space-y-4 items-center sm:justify-center mb-3 sm:mb-4 w-full">
          {/* Icon and Title side by side on mobile */}
          <Icon className="service-option-card__icon" />
          
          <h3 className="service-option-card__title ml-3 sm:ml-0">
            {service.title}
          </h3>
        </div>
        
        <div className="flex flex-row justify-between w-full sm:block sm:text-center">
          {/* Price and selection on opposite sides on mobile */}
          <div>
            <span className="service-option-card__price">
              {formatCurrency(price / 100)}
            </span>
            <span className="service-option-card__per">
              per item
            </span>
          </div>
          
          {/* Selection Indicator */}
          <div>
            <div className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
              isSelected 
                ? "bg-slate-700 border-slate-700" 
                : "border-slate-300"
            )}>
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 