import React from 'react';
import { Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DashboardHeaderProps {
  email: string;
  totalAppraisals: number;
}

export default function DashboardHeader({ email, totalAppraisals }: DashboardHeaderProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Your Appraisals</h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{totalAppraisals}</span>
          {totalAppraisals === 1 ? 'Appraisal' : 'Appraisals'}
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="font-medium">{email}</span>
        </div>
      </div>
    </div>
  );
}