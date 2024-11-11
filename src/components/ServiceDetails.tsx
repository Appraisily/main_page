import { useState } from 'react';
import { Calendar } from './Calendar';
import { DateSelector } from './DateSelector';
import { Button } from './ui/button';
import { VideoModal } from './VideoModal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';
import { FileText, Lock, ShieldCheck, Clock, Upload, CreditCard, CheckCircle, CreditCardIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceDetailsProps {
  type: 'regular' | 'insurance' | 'tax';
  features: Feature[];
  exampleReportUrl: string;
  showCheckout: boolean;
  selectedDate: string | null;
  onDateSelect: (date: string, price: number) => void;
}

const videoIds = {
  regular: 'mHxD5DzRKM8',
  insurance: 'OM_zTNac890',
  tax: 'polLX9YL6uo'
};

export function ServiceDetails({ 
  type, 
  features, 
  exampleReportUrl, 
  showCheckout, 
  selectedDate,
  onDateSelect 
}: ServiceDetailsProps) {
  const [selectedPrice, setSelectedPrice] = useState(59);

  const showDateSelector = type === 'insurance' || type === 'tax';

  const getCheckoutUrl = () => {
    if (type === 'regular') {
      return selectedPrice === 59 
        ? 'https://buy.stripe.com/9AQaIKd925jC6Ag6pQ'
        : 'https://buy.stripe.com/28o16a0mg7rK0bS4gh';
    }
    
    switch (type) {
      case 'insurance':
        return 'https://buy.stripe.com/7sI2ce2uo13m4s87tW';
      case 'tax':
        return 'https://buy.stripe.com/6oE2cefha3bu1fW15z';
      default:
        return '';
    }
  };

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const handleDateSelection = (date: string, price: number) => {
    const finalPrice = type === 'regular' ? price : 59;
    onDateSelect(date, finalPrice);
    setSelectedPrice(finalPrice);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">This service includes:</h2>
          <ul className="space-y-5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-medium flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <div className="flex items-start gap-2 pt-0.5 flex-1">
                  <span className="text-gray-900 font-medium">{feature.title}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        type="button"
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors mt-0.5"
                      >
                        <span className="text-blue-600 text-xs font-bold">?</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-white text-gray-900 border border-gray-200 shadow-lg p-3">
                      <p>{feature.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
          <a
            href={exampleReportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 font-medium"
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} />
            <span>Download an example report</span>
          </a>
          <VideoModal videoId={videoIds[type]} />
        </div>
      </div>

      <div>
        {showDateSelector ? (
          <DateSelector 
            selectedDate={selectedDate} 
            onDateSelect={(date) => handleDateSelection(date, 59)}
          />
        ) : (
          <Calendar 
            onDateSelect={handleDateSelection}
          />
        )}
      </div>

      {showCheckout && selectedDate && (
        <div className="lg:col-span-2">
          <div className="bg-blue-50 rounded-xl p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-blue-100 pb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <div className="text-right flex items-center gap-3">
                  {(type === 'insurance' || type === 'tax') && (
                    <span className="text-xl font-medium text-gray-400 line-through">$89</span>
                  )}
                  <div>
                    <span className="text-3xl font-bold text-blue-600">${selectedPrice}</span>
                    <span className="text-gray-600 ml-2">One-Time-Fee</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3 text-gray-600 items-start">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Receive your appraisal by noon EST</span>
                </div>
                <div className="flex gap-3 text-gray-600 items-start">
                  <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Select appraisal quantity on the next page</span>
                </div>
                <div className="flex gap-3 text-gray-600 items-start">
                  <Upload className="h-5 w-5 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Upload photos and details post-checkout</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 text-lg font-medium"
              onClick={handleCheckout}
            >
              <Lock className="h-5 w-5" strokeWidth={1.5} />
              <span>Secure Checkout</span>
              <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
            </Button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm pt-4 border-t border-blue-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" strokeWidth={1.5} />
                  <span>Fully refundable fee if not satisfied</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <CreditCard className="h-4 w-4" strokeWidth={1.5} />
                  <span>Secure payment processing</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-gray-500">We accept</div>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <CreditCardIcon className="h-5 w-5" />
                    <span>Credit Card</span>
                  </div>
                  <img 
                    src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                    alt="PayPal" 
                    className="h-5 object-contain" 
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
      )}
    </div>
  );
}