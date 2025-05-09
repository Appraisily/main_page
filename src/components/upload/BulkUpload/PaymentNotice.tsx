import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function PaymentNotice() {
  return (
    <div className="space-y-4 flex flex-col items-center text-center">
      {/* Payment methods section - matches start page */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center text-gray-600 text-sm">
            <ShieldCheck className="h-4 w-4 mr-2" />
            <span>Secure payment processing by Stripe</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span className="text-sm">Credit Card</span>
          </div>
          
          <div>
            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" height="23" />
          </div>
          
          <div className="flex items-center gap-1">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" alt="Google Pay" className="h-5" />
            <span className="text-sm text-gray-700">Pay</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M17.73 12.053c.011 1.195.505 2.29 1.318 2.91a3.468 3.468 0 01-.89 1.731c-.537.631-1.11.63-1.69.504-.6-.132-1.115-.132-1.716 0-.58.132-1.069.132-1.616-.505a5.113 5.113 0 01-1.638-3.548.55.55 0 01.01-.1c.085-2.066 1.667-3.024 3.243-3.024.579 0 1.11.211 1.573.358.432.137.816.258 1.079.258.232 0 .59-.115.995-.246.58-.189 1.284-.416 2.042-.341.664.021 2.137.253 3.09 1.916-.084.052-1.99 1.178-1.968 3.52 0 .3.02.568.58.82l.001.046z" fill="currentColor" />
              <path d="M13.54 5.003c.32-.385.538-.917.638-1.493.074-.427.074-.648.074-.648-.42.02-.84.252-1.226.504-.385.252-.802.643-.975 1.144-.172.5-.237.98-.172 1.46 0 0 .245-.036.62-.184.375-.148.72-.397 1.04-.783z" fill="currentColor" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Pay</span>
          </div>
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center text-blue-700 text-sm">
          <ShieldCheck className="h-4 w-4 mr-2 text-blue-600" />
          <span>100% Money-Back Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  );
}