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
  Lock,
  Package,
  Shield,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TurnaroundSpeedSelector, { TurnaroundSpeed } from './TurnaroundSpeedSelector';
import { addDays, format } from 'date-fns';
import type { LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text';

interface FeatureItem {
  title: string;
  description: string;
}

interface ServiceDetailsProps {
  service: {
    title: string;
    description: string;
    features: FeatureItem[];
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
  'Expert identification': UserCheck,
  'PDF report delivery': FileDown,
  '48-hour turnaround': Clock,
  'Insurance-grade documentation': Receipt,
  'Insurance & IRS compliance': Shield,
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

  const renderFeaturesList = (features: FeatureItem[]) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-900">
        What's included with your appraisal:
      </h3>
      <div className="grid gap-3">
        {features.map((feature) => {
          const Icon = featureIcons[feature.title] || Search;
          return (
            <div
              key={feature.title}
              className="flex items-start gap-3 p-2.5 rounded-md bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 rounded-md bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900">{feature.title}</h4>
                <p className="text-xs text-slate-600 leading-normal mt-0.5 line-clamp-2 hover:line-clamp-none">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Features Column - All service types use the same layout now */}
        <div className="bg-slate-50 rounded-lg p-5">
          {renderFeaturesList(service.features)}
        </div>

        {/* Pricing and Checkout Column */}
        <div className="space-y-5">
          <TurnaroundSpeedSelector
            selectedSpeed={selectedSpeed}
            onSelect={setSelectedSpeed}
            basePrice={currentPrice / 100}
          />
          
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <h4 className="text-sm font-medium mb-3 text-slate-800">Pricing Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Base price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span className="font-medium">{formatCurrency(currentPrice * itemCount / 100)}</span>
              </div>
              
              {speedAdditionalPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{selectedSpeed.charAt(0).toUpperCase() + selectedSpeed.slice(1)} delivery</span>
                  <span className="font-medium">+{formatCurrency(speedAdditionalPrice * itemCount / 100)}</span>
                </div>
              )}
              
              {hasDiscount && (
                <div className="flex justify-between text-sm text-emerald-700">
                  <span>Bulk discount (20%)</span>
                  <span>-{formatCurrency(basePrice * 0.2 * itemCount / 100)}</span>
                </div>
              )}
              
              <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-medium">
                <span>Total</span>
                <span>{formatCurrency(totalPrice / 100)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleCheckout}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base"
              size="lg"
            >
              Continue → Secure Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Payment Methods and Guarantee - Combined Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span>Secure payment processing by Stripe</span>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-5 pt-2">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs">Credit Card</span>
                </div>
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                  alt="PayPal" 
                  className="h-4" 
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg" 
                  alt="Google Pay" 
                  className="h-4" 
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                  alt="Apple Pay" 
                  className="h-4" 
                />
              </div>
              
              <Separator className="bg-slate-200" />
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Money-Back Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}