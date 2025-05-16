import React from 'react';
import { ShieldCheck, Lock, CreditCard, Percent, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Constants to match other components
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 20; // 20%

export function PaymentNotice() {
  return (
    <div className="flex flex-col items-center">
      {/* Bulk discount benefit notice with integrated button */}
      <div className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Percent className="h-4 w-4" />
              <span className="font-medium text-sm">Bulk Appraisal Savings</span>
            </div>
            <p className="text-xs text-slate-600 text-center sm:text-left">
              Add {BULK_DISCOUNT_THRESHOLD} or more items to receive a {BULK_DISCOUNT_PERCENTAGE}% discount on each appraisal.
              The discount will be applied automatically at checkout.
            </p>
          </div>
          <div className="flex justify-center sm:justify-end mt-2 sm:mt-0 sm:ml-4">
            <a
              href="/bulk-appraisal/upload"
              className="inline-flex items-center justify-center px-4 py-1.5 bg-slate-700 text-white font-medium rounded-md shadow-sm hover:bg-slate-800 transition-colors text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 whitespace-nowrap"
            >
              Go to Bulk Appraisal
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}