import React from 'react';
import { Mail, Package2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DashboardHeaderProps {
  email: string;
  totalAppraisals: number;
}

export default function DashboardHeader({ email, totalAppraisals }: DashboardHeaderProps) {
  return (
    <div className="mb-6 sm:mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Your Appraisals</h1>
            <p className="text-base sm:text-lg text-gray-600">
              Manage and track your art appraisal requests
            </p>
          </div>

          <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{totalAppraisals}</span>
                <span className="text-sm text-gray-600">
                  {totalAppraisals === 1 ? 'Appraisal' : 'Appraisals'}
                </span>
              </div>
            </div>

            <Separator className="my-1" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Email</span>
                <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}