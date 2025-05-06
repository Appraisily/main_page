import React from 'react';
import { CreditCard, Info, Check, ShieldCheck } from 'lucide-react';

export function PaymentNotice() {
  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-stone-100 rounded-full flex-shrink-0">
            <CreditCard className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
            Next Step: Payment
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          After clicking continue, you'll be redirected to our secure Stripe payment page where you can:
        </p>
        
        <ul className="space-y-3 mb-5">
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

      {/* 100% Money Back Guarantee Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-0.5">100% Satisfaction Guarantee</h4>
          <p className="text-sm text-blue-700">
            If you're not completely satisfied with your appraisal, we'll provide a full refund.
          </p>
        </div>
      </div>

      {/* Secure Payment Processing */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-center gap-2 bg-stone-50 p-3 border-b border-gray-200">
          <ShieldCheck className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">Secure payment processing by Stripe</span>
        </div>
        <div className="flex items-center justify-center gap-8 p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-700" />
            <span className="text-sm text-gray-700">Credit Card</span>
          </div>
          <div className="text-sm text-gray-700">
            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" height="23" />
          </div>
          <div className="text-sm text-gray-700 flex items-center gap-1">
            <span className="font-medium">G</span>
            <span className="text-blue-500">o</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">g</span>
            <span className="text-blue-500">l</span>
            <span className="text-green-500">e</span>
            <span className="ml-1">Pay</span>
          </div>
          <div className="text-sm font-medium text-gray-700">
            Apple Pay
          </div>
        </div>
      </div>
    </div>
  );
}