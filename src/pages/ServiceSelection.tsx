import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceDetails } from '@/components/ServiceDetails';
import { Star, Shield, Clock, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceType = 'regular' | 'insurance' | 'tax';

const services = {
  regular: {
    title: 'Regular Appraisal',
    description: 'Standard valuation for collectors and sellers',
    price: '$59',
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
    description: 'Detailed reports for insurance coverage',
    price: '$89',
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
    description: 'IRS-compliant appraisals for donations',
    price: '$129',
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
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setSelectedDate(null);
  };

  const handleDateSelect = (date: string, price: number) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-900 font-medium">4.9/5 from 100+ reviews</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-gray-200" />
            <div className="hidden sm:flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-gray-900 font-medium">Certified Experts</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Choose Your Appraisal Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the service that best fits your needs. Each option includes expert analysis and detailed documentation.
          </p>
        </div>

        {/* Service Selection */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {(Object.entries(services) as [ServiceType, typeof services.regular][]).map(([type, service]) => {
            const Icon = service.icon;
            const isSelected = selectedService === type;
            
            return (
              <motion.button
                key={type}
                onClick={() => handleServiceSelect(type)}
                className={cn(
                  "relative w-full text-left p-6 rounded-2xl transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "hover:shadow-lg",
                  isSelected
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                    : "bg-white text-gray-900 shadow-sm hover:shadow-md"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon className={cn(
                    "h-6 w-6",
                    isSelected ? "text-white" : "text-blue-600"
                  )} />
                  <div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className={cn(
                      "text-sm",
                      isSelected ? "text-blue-100" : "text-gray-600"
                    )}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className={cn(
                  "text-2xl font-bold mb-4",
                  isSelected ? "text-white" : "text-gray-900"
                )}>
                  {service.price}
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={cn(
                        "h-4 w-4 flex-shrink-0",
                        isSelected ? "text-blue-200" : "text-blue-600"
                      )} />
                      <span className={isSelected ? "text-blue-100" : "text-gray-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={cn(
                  "absolute top-4 right-4 transition-transform",
                  isSelected ? "rotate-90" : ""
                )}>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Service Details */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <ServiceDetails
                type={selectedService}
                features={services[selectedService].features.map(text => ({
                  title: text,
                  description: text
                }))}
                exampleReportUrl="https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/"
                showCheckout={true}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="text-sm text-gray-500">Secure payment methods</div>
          <div className="flex flex-wrap justify-center items-center gap-6">
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
              src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
              alt="Apple Pay" 
              className="h-5" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}