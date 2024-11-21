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
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">
        What's included with your appraisal:
      </h3>
      <div className="grid gap-2">
        {features.map((feature) => {
          const Icon = featureIcons[feature] || Search;
          return (
            <div
              key={feature}
              className="flex items-center gap-2.5 p-2.5 rounded-md bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="p-1.5 rounded-md bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-gray-500" />
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
      <div className="grid grid-cols-3 gap-3">
        {dateOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onDateSelect(option.date)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
              selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <Calendar className={cn(
              "h-5 w-5 mb-1",
              selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                ? "text-white"
                : "text-gray-400"
            )} />
            <span className="text-sm font-medium">{option.label}</span>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs line-through opacity-75">$119</span>
              <span className={cn(
                "text-sm font-semibold",
                selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                  ? "text-white"
                  : "text-green-600"
              )}>
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
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
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
            <div className="space-y-6">
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
            <div className="space-y-6">
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