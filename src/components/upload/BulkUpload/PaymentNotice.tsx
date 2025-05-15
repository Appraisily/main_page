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
      <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-emerald-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <Percent className="h-5 w-5" />
              <span className="font-medium">Bulk Appraisal Savings</span>
            </div>
            <p className="text-sm text-gray-700 text-center sm:text-left">
              Add {BULK_DISCOUNT_THRESHOLD} or more items to receive a {BULK_DISCOUNT_PERCENTAGE}% discount on each appraisal.
              The discount will be applied automatically at checkout.
            </p>
          </div>
          <div className="flex justify-center sm:justify-end mt-3 sm:mt-0 sm:ml-4">
            <a
              href="/bulk-appraisal/upload"
              className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 whitespace-nowrap"
            >
              Go to Bulk Appraisal
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}