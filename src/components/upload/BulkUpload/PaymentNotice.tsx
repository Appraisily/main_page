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
      <a
        href="/bulk-appraisal/upload"
        className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        style={{ minWidth: 180 }}
      >
        Go to Bulk Appraisal
      </a>
    </div>
  );
}