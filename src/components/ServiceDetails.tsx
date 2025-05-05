import React, { useState } from 'react';
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
  ArrowRight,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TurnaroundSpeedSelector, { TurnaroundSpeed } from './TurnaroundSpeedSelector';
import { addDays, format } from 'date-fns';
import type { LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';

interface ServiceDetailsProps {
  service: {
    title: string;
    description: string;
    features: string[];
    icon: LucideIcon;
    basePrice?: number;
  };
  type: 'regular' | 'insurance' | 'tax';
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onGetStarted: () => void;
  price?: number;
  hasDiscount?: boolean;
  itemCount?: number;
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
  'Rush service available': Clock,
  'Insurance & IRS compliance': Shield,
  'Volume discounts': Receipt,
  'Dedicated account manager': UserCheck,
  'Custom reporting': FileText,
  'API integration': FileSpreadsheet,
  'Expedited service': Clock,
  'White-labeled delivery': Package
};

// Speed prices
const SPEED_ADDITIONAL_PRICES = {
  standard: 0,
  express: 3000, // $30
  priority: 6000, // $60
};

export default function ServiceDetails({
  service,
  type,
  selectedDate,
  onDateSelect,
  onGetStarted,
  price,
  hasDiscount,
  itemCount = 1
}: ServiceDetailsProps) {
  const [selectedSpeed, setSelectedSpeed] = useState<TurnaroundSpeed>('standard');
  
  const basePrice = service.basePrice || 5900;
  const currentPrice = price !== undefined ? price : basePrice;
  
  // Calculate total price with speed option
  const speedAdditionalPrice = SPEED_ADDITIONAL_PRICES[selectedSpeed];
  const totalPricePerItem = currentPrice + speedAdditionalPrice;
  const totalPrice = totalPricePerItem * itemCount;
  
  const handleCheckout = () => {
    onGetStarted();
  };

  const renderFeaturesList = (features: string[]) => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">
        What's included with your appraisal:
      </h3>
      <div className="grid gap-2">
        {features.map((feature) => {
          const Icon = featureIcons[feature] || Search;
          return (
            <div
              key={feature}
              className="flex items-center gap-3 p-2 rounded-md bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="p-1.5 rounded-md bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regular Service Layout */}
        {type === 'regular' && (
          <>
            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>

            <div className="space-y-6">
              <TurnaroundSpeedSelector
                selectedSpeed={selectedSpeed}
                onSelect={setSelectedSpeed}
                basePrice={currentPrice / 100}
              />
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium mb-3 text-gray-800">Pricing Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatCurrency(currentPrice * itemCount / 100)}</span>
                  </div>
                  
                  {speedAdditionalPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{selectedSpeed.charAt(0).toUpperCase() + selectedSpeed.slice(1)} delivery</span>
                      <span className="font-medium">+{formatCurrency(speedAdditionalPrice * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  {hasDiscount && (
                    <div className="flex justify-between text-sm text-emerald-700">
                      <span>Bulk discount (20%)</span>
                      <span>-{formatCurrency(basePrice * 0.2 * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice / 100)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base"
                  size="lg"
                >
                  Continue → Secure Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 py-2 px-4 bg-gray-50 rounded-md border border-gray-100 text-xs text-gray-500">
                  <Lock className="h-3.5 w-3.5" />
                  <span>100% Money-Back Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Insurance Service Layout */}
        {type === 'insurance' && (
          <>
            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>

            <div className="space-y-6">
              <TurnaroundSpeedSelector
                selectedSpeed={selectedSpeed}
                onSelect={setSelectedSpeed}
                basePrice={currentPrice / 100}
              />
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium mb-3 text-gray-800">Pricing Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatCurrency(currentPrice * itemCount / 100)}</span>
                  </div>
                  
                  {speedAdditionalPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{selectedSpeed.charAt(0).toUpperCase() + selectedSpeed.slice(1)} delivery</span>
                      <span className="font-medium">+{formatCurrency(speedAdditionalPrice * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  {hasDiscount && (
                    <div className="flex justify-between text-sm text-emerald-700">
                      <span>Bulk discount (20%)</span>
                      <span>-{formatCurrency(basePrice * 0.2 * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice / 100)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base"
                  size="lg"
                >
                  Continue → Secure Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 py-2 px-4 bg-gray-50 rounded-md border border-gray-100 text-xs text-gray-500">
                  <Lock className="h-3.5 w-3.5" />
                  <span>100% Money-Back Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tax Service Layout */}
        {type === 'tax' && (
          <>
            <div className="bg-gray-50 rounded-lg p-6">
              {renderFeaturesList(service.features)}
            </div>

            <div className="space-y-6">
              <TurnaroundSpeedSelector
                selectedSpeed={selectedSpeed}
                onSelect={setSelectedSpeed}
                basePrice={currentPrice / 100}
              />
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium mb-3 text-gray-800">Pricing Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatCurrency(currentPrice * itemCount / 100)}</span>
                  </div>
                  
                  {speedAdditionalPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{selectedSpeed.charAt(0).toUpperCase() + selectedSpeed.slice(1)} delivery</span>
                      <span className="font-medium">+{formatCurrency(speedAdditionalPrice * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  {hasDiscount && (
                    <div className="flex justify-between text-sm text-emerald-700">
                      <span>Bulk discount (20%)</span>
                      <span>-{formatCurrency(basePrice * 0.2 * itemCount / 100)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice / 100)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base"
                  size="lg"
                >
                  Continue → Secure Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 py-2 px-4 bg-gray-50 rounded-md border border-gray-100 text-xs text-gray-500">
                  <Lock className="h-3.5 w-3.5" />
                  <span>100% Money-Back Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}