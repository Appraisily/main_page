import React from 'react';
import { ShieldCheck, Lock, CreditCard, Percent } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Constants to match other components
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 20; // 20%

export function PaymentNotice() {
  return (
    <div className="space-y-4 flex flex-col items-center text-center">
      {/* Bulk discount benefit notice */}
      <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-emerald-100">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-emerald-700">
            <Percent className="h-5 w-5" />
            <span className="font-medium">Bulk Appraisal Savings</span>
          </div>
          <p className="text-sm text-gray-700">
            Add {BULK_DISCOUNT_THRESHOLD} or more items to receive a {BULK_DISCOUNT_PERCENTAGE}% discount on each appraisal.
            The discount will be applied automatically at checkout.
          </p>
        </div>
      </div>
      
      {/* Payment methods section - exact match to start page */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5 mr-2" />
            <span>Secure payment processing by Stripe</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-5 pt-2">
          <div className="flex items-center gap-1.5 text-slate-600">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs">Credit Card</span>
          </div>
          <img 
            src="/images/payment-methods/new-paypal.svg" 
            alt="PayPal" 
            className="h-5" 
          />
          <img 
            src="/images/payment-methods/google-pay.svg" 
            alt="Google Pay" 
            className="h-5" 
          />
          <img 
            src="/images/payment-methods/apple-pay.svg" 
            alt="Apple Pay" 
            className="h-4" 
          />
        </div>
        
        <Separator className="bg-slate-200 my-4" />
        
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>100% Money-Back Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  );
}