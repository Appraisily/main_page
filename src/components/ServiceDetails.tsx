import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Search, 
  FileText, 
  UserCheck, 
  FileDown, 
  Clock,
  ShieldCheck,
  Calendar,
  Scale,
  AlertTriangle,
  FileCheck,
  Zap,
  MessagesSquare,
  BadgeCheck,
  Building2,
  Receipt,
  FileSpreadsheet,
  Landmark,
  ScrollText,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCalendar from './ServiceCalendar';
import { addDays, format } from 'date-fns';
import type { LucideIcon } from 'lucide-react';

interface ServiceDetailsProps {
  service: {
    title: string;
    description: string;
    features: string[];
    icon: LucideIcon;
  };
  type: 'regular' | 'insurance' | 'tax';
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  onGetStarted: () => void;
}

// Map features to their corresponding icons
const featureIcons: Record<string, LucideIcon> = {
  'Detailed condition report': FileText,
  'Market value assessment': Scale,
  'Digital documentation': FileDown,
  'Expert analysis': UserCheck,
  'PDF report delivery': FileDown,
  '48-hour turnaround': Clock,
  'Insurance-grade documentation': Receipt,
  'Replacement value': Scale,
  'Risk assessment': AlertTriangle,
  'Digital certification': BadgeCheck,
  'Priority processing': Zap,
  'Expert consultation': MessagesSquare,
  'IRS compliance': Landmark,
  'Fair market value': Scale,
  'Detailed documentation': FileText,
  'Expert testimony': Building2,
  'Tax form assistance': FileSpreadsheet,
  'Rush service available': Clock
};

export default function ServiceDetails({
  service,
  type,
  selectedDate,
  onDateSelect,
  onGetStarted
}: ServiceDetailsProps) {
  const today = new Date();
  const dateOptions = [
    { label: 'Today', date: today, price: 59 },
    { label: 'Tomorrow', date: addDays(today, 1), price: 59 },
    { label: format(addDays(today, 2), 'MMM d'), date: addDays(today, 2), price: 59 }
  ];

  const handleCheckout = () => {
    if (selectedDate) {
      onGetStarted();
    }
  };

  const renderFeaturesList = (features: string[]) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900">
        What's included with your appraisal:
      </h3>
      <div className="grid gap-1.5">
        {features.map((feature) => {
          const Icon = featureIcons[feature] || Search;
          return (
            <div
              key={feature}
              className="flex items-center gap-2.5 p-2 rounded-md bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="p-1.5 rounded-md bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-[#007bff]" />
                </div>
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDateSelection = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3">
        {dateOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onDateSelect(option.date)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border transition-all w-full",
              selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                ? "border-gray-900 bg-white hover:bg-gray-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <Calendar className={cn(
                "h-5 w-5",
                selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                  ? "text-gray-900"
                  : "text-gray-400"
              )} />
              <span className={cn(
                "text-sm font-medium",
                selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                  ? "text-gray-900"
                  : "text-gray-600"
              )}>
                {option.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-gray-400">
                $119
              </span>
              <span className="text-sm font-semibold text-green-600">
                ${option.price}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="space-y-3">
          <Button 
            onClick={handleCheckout}
            className="w-full h-12 text-base"
            size="lg"
          >
            Continue to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regular Service Layout */}
        {type === 'regular' && (
          <>
            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>

            <div className="flex items-start">
              <ServiceCalendar
                selectedDate={selectedDate}
                onSelect={onDateSelect}
                onCheckout={handleCheckout}
              />
            </div>
          </>
        )}

        {/* Insurance Service Layout */}
        {type === 'insurance' && (
          <>
            <div className="flex flex-col justify-center h-full">
              {renderDateSelection()}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>
          </>
        )}

        {/* Tax Service Layout */}
        {type === 'tax' && (
          <>
            <div className="flex flex-col justify-center h-full">
              {renderDateSelection()}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}