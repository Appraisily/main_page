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
  showFeatures?: boolean;
}

export default function AppraisalServiceCard({
  service,
  isSelected,
  onSelect,
  price,
  showFeatures = true
}: AppraisalServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-200",
        "cursor-pointer border",
        isSelected
          ? "border-blue-600 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md"
      )}
      onClick={onSelect}
    >
      {/* Popular tag */}
      {service.popular && (
        <div className="absolute top-0 right-0">
          <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-medium rounded-bl-lg flex items-center gap-1.5 shadow-sm">
            <Sparkles className="h-3 w-3" />
            Popular
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex flex-col">
          {/* Service Header */}
          <div className="flex items-center justify-between mb-4">
            {/* Icon and Title */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                isSelected 
                  ? "bg-blue-100" 
                  : "bg-slate-100"
              )}>
                <Icon className={cn(
                  "h-5 w-5",
                  isSelected ? "text-blue-600" : "text-slate-600"
                )} />
              </div>
              
              <h3 className={cn(
                "text-lg font-semibold",
                isSelected ? "text-blue-600" : "text-slate-900"
              )}>
                {service.title}
              </h3>
            </div>
            
            {/* Selection Indicator */}
            <div className={cn(
              "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
              isSelected 
                ? "bg-blue-600 border-blue-600" 
                : "border-slate-300"
            )}>
              {isSelected && <Check className="h-4 w-4 text-white" />}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-slate-600 mb-4">
            {service.description}
          </p>
          
          {/* Price */}
          <div className="mb-4 p-3 bg-slate-50 rounded-md flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-slate-900">
                {formatCurrency(price / 100)}
              </span>
              <span className="text-xs text-slate-500">
                per item
              </span>
            </div>
          </div>
          
          {/* Features */}
          {showFeatures && (
            <div className="space-y-2.5">
              {service.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className={cn(
                    "mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center",
                    isSelected ? "bg-blue-100" : "bg-slate-100"
                  )}>
                    <Check className={cn(
                      "h-2.5 w-2.5",
                      isSelected ? "text-blue-600" : "text-slate-500"
                    )} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-800">{feature.title}</span>
                    <p className="text-xs text-slate-600 mt-0.5">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 