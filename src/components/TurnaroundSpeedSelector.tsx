import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Zap, CheckCircle2, Timer } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';
import '../styles/components/_turnaround-speed.scss';

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
    description: 'Delivered in 2 business days',
    icon: Clock,
    additionalPrice: 0,
    isDefault: true,
  },
  {
    id: 'priority',
    label: 'Priority Same-Day',
    description: 'Delivered by end of day',
    icon: Timer,
    additionalPrice: 0, // Free as a promotion (normally $60)
    originalPrice: 6000, // Original price ($60.00)
    isPromotion: true,
    isRecommended: true,
  },
];

export default function TurnaroundSpeedSelector({
  selectedSpeed,
  onSelect,
  basePrice,
}: TurnaroundSpeedSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm sm:text-sm font-medium text-gray-900">
        Turnaround Time
      </h3>
      
      <div className="space-y-2">
        {speedOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id as TurnaroundSpeed)}
            className={cn(
              "turnaround-option relative flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer min-h-[84px]",
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
              
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "option-label text-sm font-medium",
                    selectedSpeed === option.id
                      ? "text-gray-900"
                      : "text-gray-700"
                  )}>
                    {option.label}
                  </span>
                  
                  {option.isRecommended && (
                    <span className="limited-time-tag px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded flex items-center gap-1">
                      <Timer className="timer-icon h-3 w-3" />
                      <span>Limited Time</span>
                    </span>
                  )}
                </div>
                
                <span className="option-description text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                  {option.description}
                </span>
              </div>
            </div>
            
            <div className="turnaround-option__price flex flex-col items-end min-w-[70px]">
              {option.isPromotion ? (
                <>
                  <span className="limited-time-tag px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded mb-1 w-fit">Limited Time</span>
                  <span className="original-price text-sm line-through text-gray-400 block">+{formatCurrency(option.originalPrice / 100)}</span>
                  <span className="free-label text-sm font-medium text-green-600">FREE</span>
                </>
              ) : (
                <span className="included-label text-sm font-medium text-gray-700">
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