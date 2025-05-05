import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Zap, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';

export type TurnaroundSpeed = 'standard' | 'express' | 'priority';

interface TurnaroundSpeedSelectorProps {
  selectedSpeed: TurnaroundSpeed;
  onSelect: (speed: TurnaroundSpeed) => void;
  basePrice: number;
}

const speedOptions = [
  {
    id: 'standard',
    label: 'Standard 48h',
    description: 'Delivered within 2 business days',
    icon: Clock,
    additionalPrice: 0,
    isDefault: true,
  },
  {
    id: 'express',
    label: 'Express 24h',
    description: 'Delivered within 1 business day',
    icon: Zap,
    additionalPrice: 3000, // $30.00
    isRecommended: true,
  },
  {
    id: 'priority',
    label: 'Priority Same-Day',
    description: 'Delivered by end of day',
    icon: CheckCircle2,
    additionalPrice: 6000, // $60.00
  },
];

export default function TurnaroundSpeedSelector({
  selectedSpeed,
  onSelect,
  basePrice,
}: TurnaroundSpeedSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">
        Turnaround Time
      </h3>
      
      <div className="space-y-2">
        {speedOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id as TurnaroundSpeed)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
              selectedSpeed === option.id
                ? "border-gray-400 bg-gray-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-full",
                selectedSpeed === option.id
                  ? "bg-gray-100"
                  : "bg-gray-50"
              )}>
                <option.icon className={cn(
                  "h-4 w-4",
                  selectedSpeed === option.id
                    ? "text-gray-800"
                    : "text-gray-500"
                )} />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-medium",
                    selectedSpeed === option.id
                      ? "text-gray-900"
                      : "text-gray-700"
                  )}>
                    {option.label}
                  </span>
                  
                  {option.isRecommended && (
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Best value
                    </span>
                  )}
                </div>
                
                <span className="text-xs text-gray-500">
                  {option.description}
                </span>
              </div>
            </div>
            
            <div>
              {option.additionalPrice > 0 && (
                <span className="text-sm font-medium text-gray-700">
                  +{formatCurrency(option.additionalPrice / 100)}
                </span>
              )}
              {option.additionalPrice === 0 && (
                <span className="text-sm font-medium text-gray-700">
                  Included
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 