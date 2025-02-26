import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type UploadStep = {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
};

interface UploadProgressProps {
  steps: UploadStep[];
  currentProgress?: number;
}

export default function UploadProgress({ steps, currentProgress }: UploadProgressProps) {
  return (
    <div className="space-y-4 bg-muted/10 rounded-lg p-6">
      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          {/* Step content */}
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="flex-shrink-0">
              {step.status === 'pending' && (
                <div className="w-6 h-6 rounded-full border-2 border-muted" />
              )}
              {step.status === 'processing' && (
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              )}
              {step.status === 'completed' && (
                <CheckCircle2 className="w-6 h-6 text-success" />
              )}
              {step.status === 'error' && (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
            </div>

            {/* Step label */}
            <div className="flex-grow">
              <p className={cn(
                "font-medium",
                step.status === 'completed' && "text-success",
                step.status === 'error' && "text-destructive",
                step.status === 'processing' && "text-primary",
                step.status === 'pending' && "text-muted-foreground"
              )}>
                {step.label}
              </p>
              
              {/* Progress bar for processing steps */}
              {step.status === 'processing' && currentProgress !== undefined && (
                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute left-3 top-8 bottom-0 w-px bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}