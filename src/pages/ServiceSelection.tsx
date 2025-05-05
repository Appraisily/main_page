import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock, CreditCard, Lock, Package, ArrowRight } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import ServiceCard from '@/components/ServiceCard';
import ServiceDetails from '@/components/ServiceDetails';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils/text';
import { cn } from '@/lib/utils';

type ServiceType = 'regular' | 'insurance' | 'tax';

// Constants for pricing and discounts - matching the ones in AppraisalTypeSelector
const BASE_PRICE = 5900; // $59.00
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 0.20; // 20% discount

function calculatePrice(basePrice: number, itemCount: number): { price: number; hasDiscount: boolean } {
  const hasDiscount = itemCount >= BULK_DISCOUNT_THRESHOLD;
  const price = hasDiscount 
    ? basePrice * (1 - BULK_DISCOUNT_PERCENTAGE)
    : basePrice;
  return { price, hasDiscount };
}

const services = {
  regular: {
    title: 'Regular Appraisal',
    description: 'Perfect for collectors and sellers',
    icon: Star,
    features: [
      'Detailed condition report',
      'Market value assessment',
      'Digital documentation',
      'Expert analysis',
      'PDF report delivery',
      '48-hour turnaround'
    ],
    basePrice: BASE_PRICE
  },
  insurance: {
    title: 'Insurance Appraisal',
    description: 'Insurance-ready documentation',
    icon: Shield,
    features: [
      'Insurance-grade documentation',
      'Replacement value',
      'Risk assessment',
      'Digital certification',
      'Priority processing',
      'Expert consultation'
    ],
    basePrice: BASE_PRICE
  },
  tax: {
    title: 'Tax Appraisal',
    description: 'IRS-compliant valuations',
    icon: Clock,
    features: [
      'IRS compliance',
      'Fair market value',
      'Detailed documentation',
      'Expert testimony',
      'Tax form assistance',
      'Rush service available'
    ],
    basePrice: BASE_PRICE
  }
};

export default function ServiceSelection() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceType>('regular');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [itemCount, setItemCount] = useState<number>(1);

  // Calculate the price with potential discount
  const { price, hasDiscount } = calculatePrice(services[selectedService].basePrice, itemCount);

  const getCheckoutUrl = (type: ServiceType) => {
    // Base URLs for checkout
    const urls = {
      regular: 'https://buy.stripe.com/9AQaIKd925jC6Ag6pQ',
      insurance: 'https://buy.stripe.com/7sI2ce2uo13m4s87tW',
      tax: 'https://buy.stripe.com/6oE2cefha3bu1fW15z'
    };
    
    // In a real implementation, you would append additional parameters for item count
    // and potentially apply the discount through Stripe or your backend
    return urls[type];
  };

  const handleGetStarted = () => {
    if (selectedService === 'regular' && !selectedDate) {
      return;
    }
    window.location.href = getCheckoutUrl(selectedService);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bulk Appraisal CTA - Moved to top for better visibility */}
        <div className="mb-10 bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Need to appraise multiple items?</h3>
                <p className="text-gray-600">Save up to 20% with our bulk appraisal service</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/bulk-appraisal/upload')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
            >
              Start Bulk Upload
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Trust Badges - Group with service selections for better organization */}
          <div className="border-b border-gray-100">
            <TrustBadges className="py-2" />
          </div>
          
          {/* Price Information */}
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="text-sm text-gray-700 mb-2 font-medium text-center">
              All appraisal types are <span className="text-gray-900 font-semibold">{formatCurrency(BASE_PRICE / 100)}</span> per item
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-emerald-700">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium">Get 20% off when you appraise 3 or more items!</span>
            </div>
            
            {/* Item count selector */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="text-sm text-gray-700">Items to appraise:</span>
              <select 
                value={itemCount}
                onChange={(e) => setItemCount(parseInt(e.target.value))}
                className="py-1 px-3 rounded border border-gray-300 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Service Selection */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Select an Appraisal Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.entries(services) as [ServiceType, typeof services.regular][]).map(([type, service]) => (
                <div
                  key={type}
                  className={cn(
                    "relative flex flex-col h-full p-6 text-left rounded-xl border transition-all duration-200",
                    selectedService === type
                      ? "border-gray-400 bg-gray-50 shadow"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                  )}
                  onClick={() => setSelectedService(type)}
                >
                  {/* Selected indicator */}
                  {selectedService === type && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                    </div>
                  )}
                  
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      "bg-gray-100"
                    )}>
                      <service.icon className={cn(
                        "h-5 w-5",
                        selectedService === type ? "text-gray-700" : "text-gray-500"
                      )} />
                    </div>
                    <h4 className={cn(
                      "font-medium text-base",
                      selectedService === type ? "text-gray-900" : "text-gray-700"
                    )} style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
                      {service.title}
                    </h4>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Price display */}
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {hasDiscount && (
                        <span className="text-sm line-through text-gray-400">
                          {formatCurrency(service.basePrice / 100)}/item
                        </span>
                      )}
                      <span className={cn(
                        "text-sm font-medium",
                        hasDiscount ? "text-emerald-700" : "text-gray-700"
                      )}>
                        {formatCurrency(price / 100)}/item
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <ServiceDetails
            service={services[selectedService]}
            type={selectedService}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onGetStarted={handleGetStarted}
            price={price}
            hasDiscount={hasDiscount}
            itemCount={itemCount}
          />
          
          {/* Summary of price with item count */}
          {itemCount > 1 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium mb-3 text-gray-800">Pricing Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{itemCount} items × {formatCurrency(hasDiscount ? price / 100 : BASE_PRICE / 100)}</span>
                  <span className="font-medium">{formatCurrency((hasDiscount ? price : BASE_PRICE) * itemCount / 100)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-sm text-emerald-700">
                    <span>Bulk discount (20%)</span>
                    <span>-{formatCurrency(BASE_PRICE * BULK_DISCOUNT_PERCENTAGE * itemCount / 100)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(price * itemCount / 100)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="mt-8">
          <div className="flex flex-col items-center gap-6 p-4 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Secure payment processing by Stripe</span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard className="h-5 w-5" />
                <span>Credit Card</span>
              </div>
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                alt="PayPal" 
                className="h-5" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg" 
                alt="Google Pay" 
                className="h-5" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                alt="Apple Pay" 
                className="h-5" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}