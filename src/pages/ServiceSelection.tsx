import React, { useState } from 'react';
import { Star, Shield, Clock, CreditCard, Lock, Package, ArrowRight } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import ServiceCard from '@/components/ServiceCard';
import ServiceDetails from '@/components/ServiceDetails';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

type ServiceType = 'regular' | 'insurance' | 'tax';

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
    ]
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
    ]
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
    ]
  }
};

export default function ServiceSelection() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceType>('regular');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getCheckoutUrl = (type: ServiceType) => {
    const urls = {
      regular: 'https://buy.stripe.com/9AQaIKd925jC6Ag6pQ',
      insurance: 'https://buy.stripe.com/7sI2ce2uo13m4s87tW',
      tax: 'https://buy.stripe.com/6oE2cefha3bu1fW15z'
    };
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
        {/* Trust Badges */}
        <TrustBadges className="mb-12" />

        {/* Service Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(Object.entries(services) as [ServiceType, typeof services.regular][]).map(([type, service]) => (
            <ServiceCard
              key={type}
              type={type}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isSelected={selectedService === type}
              onSelect={() => setSelectedService(type)}
            />
          ))}
        </div>

        {/* Service Details */}
        <div className="mt-8">
          <ServiceDetails
            service={services[selectedService]}
            type={selectedService}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onGetStarted={handleGetStarted}
          />
        </div>

        {/* Bulk Appraisal CTA */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <div className="flex items-center justify-between">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Bulk Upload
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12">
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