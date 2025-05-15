import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock, CreditCard, Lock, Package, ArrowRight, FileText } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils/text';
import { cn } from '@/lib/utils';
import { TurnaroundSpeed } from '@/components/TurnaroundSpeedSelector';
import ServiceDetails from '@/components/Start/ServiceDetails';
import AppraisalServiceSelector, { ServiceType } from '@/components/Start/AppraisalServiceSelector';
import { PaymentNotice } from '@/components/upload/BulkUpload/PaymentNotice';

// Constants for pricing and discounts - matching the ones in AppraisalTypeSelector
const BASE_PRICE = 5900; // $59.00
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 0.20; // 20% discount

// Speed prices
const SPEED_ADDITIONAL_PRICES = {
  standard: 0,
  express: 3000, // $30
  priority: 6000, // $60
};

function calculatePrice(basePrice: number, itemCount: number): { price: number; hasDiscount: boolean } {
  const hasDiscount = itemCount >= BULK_DISCOUNT_THRESHOLD;
  const price = hasDiscount 
    ? basePrice * (1 - BULK_DISCOUNT_PERCENTAGE)
    : basePrice;
  return { price, hasDiscount };
}

// Service definitions - Updated to reflect the correct service types
const services = {
  regular: {
    title: 'Regular Appraisal',
    description: 'Standard valuation for collectors and sellers',
    icon: Star,
    popular: true,
    features: [
      {
        title: 'Detailed condition report',
        description: 'High-resolution imagery and microscopic inspection notes covering wear, restoration, and overall preservation.'
      },
      {
        title: 'Market value assessment',
        description: 'Final value derived from our AI-powered comparable-auction engine, proprietary sales database, and real-time marketplace analytics.'
      },
      {
        title: 'Expert identification',
        description: 'Dual-layer review: Google Vision image recognition pinpoints object type & style, then an accredited specialist verifies maker, era, and authenticity.'
      },
      {
        title: 'Digital documentation',
        description: 'Tamper-proof PDF plus secure cloud backup for easy sharing with insurers, galleries, or buyers.'
      },
      {
        title: 'PDF report delivery',
        description: 'Downloadable via your personal dashboard—includes signature page, methodology, and fully illustrated findings.'
      },
      {
        title: '48-hour turnaround',
        description: 'Need it sooner? Same-day & 24-hour rush options available at checkout.'
      }
    ],
    basePrice: BASE_PRICE
  },
  insurance: {
    title: 'Insurance Appraisal',
    description: 'Detailed documentation for insurance purposes',
    icon: Shield,
    popular: false,
    features: [
      {
        title: 'Insurance & IRS compliance',
        description: 'Documentation that meets the requirements of major insurance companies and IRS guidelines for donations and estates.'
      },
      {
        title: 'Replacement value',
        description: 'Accurate retail replacement value assessment for insurance coverage and financial planning purposes.'
      },
      {
        title: 'Risk assessment',
        description: 'Detailed analysis of object fragility, environmental sensitivities, and specialized storage recommendations.'
      },
      {
        title: 'Digital certification',
        description: 'Secure digital certificate with unique identifier and verification system for authenticity.'
      },
      {
        title: 'Priority processing',
        description: 'Expedited handling by senior appraisers with specialized compliance expertise.'
      },
      {
        title: 'Expert consultation',
        description: 'Direct access to specialist appraisers for questions about your valuation and documentation.'
      }
    ],
    basePrice: BASE_PRICE
  },
  tax: {
    title: 'Tax Appraisal',
    description: 'IRS-compliant valuations for tax purposes',
    icon: FileText,
    popular: false,
    features: [
      {
        title: 'IRS compliance',
        description: 'Documentation that meets IRS guidelines for charitable donations, estates, and gift tax returns.'
      },
      {
        title: 'Fair market value',
        description: 'Accurate determination of fair market value as required for tax deduction purposes.'
      },
      {
        title: 'Detailed documentation',
        description: 'Comprehensive reports that include all required details to support your tax filing.'
      },
      {
        title: 'Expert testimony',
        description: 'Access to appraisers who can provide expert testimony if needed for tax audit or dispute.'
      },
      {
        title: 'Tax form assistance',
        description: 'Guidance on completing the relevant tax forms and filings related to your appraised items.'
      },
      {
        title: 'Rush service available',
        description: 'Expedited processing available for time-sensitive tax deadlines.'
      }
    ],
    basePrice: BASE_PRICE
  }
};

export default function ServiceSelection() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceType>('regular');
  const [selectedSpeed, setSelectedSpeed] = useState<TurnaroundSpeed>('standard');
  // Fixed item count to 1 since this is for single items only
  const itemCount = 1;
  
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate the price with potential discount - no discounts apply since itemCount is fixed at 1
  const servicePrices = {
    regular: calculatePrice(services.regular.basePrice, itemCount).price,
    insurance: calculatePrice(services.insurance.basePrice, itemCount).price,
    tax: calculatePrice(services.tax.basePrice, itemCount).price
  };

  const { price, hasDiscount } = calculatePrice(services[selectedService].basePrice, itemCount);

  // Calculate total price with speed option
  const speedAdditionalPrice = SPEED_ADDITIONAL_PRICES[selectedSpeed];
  const totalPricePerItem = price + speedAdditionalPrice;
  const totalPrice = totalPricePerItem * itemCount;

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
    window.location.href = getCheckoutUrl(selectedService);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Main Content Container with Service Selection and Bulk Appraisal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Trust Ribbon */}
          <div className="bg-neutral-50 border-b border-slate-200">
            <TrustBadges />
          </div>
          
          {/* Service Selection */}
          <div className="p-3 sm:p-5 md:p-6 bg-white">
            <div className="max-w-5xl mx-auto">
              {/* Use the new AppraisalServiceSelector component */}
              <AppraisalServiceSelector
                services={services}
                selectedService={selectedService}
                onSelectService={setSelectedService}
                prices={servicePrices}
              />
            </div>
          </div>
          
          {/* Divider */}
          <div className="px-3 sm:px-5 md:px-6">
            <Separator className="bg-slate-100" />
          </div>
          
          {/* Bulk Appraisal CTA - Integrated with service selection panel */}
          <div className="p-4 sm:p-6 bg-white">
            <div className="max-w-5xl mx-auto">
              <PaymentNotice />
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
          <ServiceDetails
            service={services[selectedService]}
            type={selectedService}
            onGetStarted={handleGetStarted}
            price={price}
            hasDiscount={hasDiscount}
            itemCount={itemCount}
          />
        </div>
      </div>
    </div>
  );
}