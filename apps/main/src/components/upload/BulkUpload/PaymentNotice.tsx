import React from 'react';

export function PaymentNotice() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Next Step: Payment
      </h3>
      <p className="text-gray-600 mb-4">
        After clicking continue, you'll be redirected to our secure Stripe payment page where you can:
      </p>
      <ul className="space-y-3 mb-4">
        <li className="flex items-start gap-2 text-gray-600">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
          <span>Select the number of items you want to appraise</span>
        </li>
        <li className="flex items-start gap-2 text-gray-600">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
          <span>Review your total with any applicable bulk discounts</span>
        </li>
        <li className="flex items-start gap-2 text-gray-600">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
          <span>Complete your payment securely through Stripe</span>
        </li>
      </ul>
      <p className="text-sm text-gray-500">
        Your items will be processed based on the quantity selected during payment.
      </p>
    </div>
  );
}