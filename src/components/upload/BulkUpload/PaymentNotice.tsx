import React from 'react';
import { DollarSign, Check, CreditCard, Info } from 'lucide-react';

export function PaymentNotice() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-stone-100 rounded-full flex-shrink-0">
          <CreditCard className="h-5 w-5 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
          Next Step: Payment
        </h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        After clicking continue, you'll be redirected to our secure Stripe payment page where you can:
      </p>
      
      <ul className="space-y-3 mb-4">
        <li className="flex items-start gap-3 text-gray-600">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-gray-600 flex items-center justify-center text-sm font-medium">1</span>
          <span className="pt-0.5">Select the number of items you want to appraise</span>
        </li>
        <li className="flex items-start gap-3 text-gray-600">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-gray-600 flex items-center justify-center text-sm font-medium">2</span>
          <span className="pt-0.5">Review your total with any applicable bulk discounts</span>
        </li>
        <li className="flex items-start gap-3 text-gray-600">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-gray-600 flex items-center justify-center text-sm font-medium">3</span>
          <span className="pt-0.5">Complete your payment securely through Stripe</span>
        </li>
      </ul>
      
      <div className="flex items-start gap-2 text-sm text-gray-500 bg-stone-50 p-3 rounded-md border border-stone-100">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          Your items will be processed based on the quantity selected during payment.
        </p>
      </div>
    </div>
  );
}