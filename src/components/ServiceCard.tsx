import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  isSelected,
  onSelect
}: ServiceCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative w-full rounded-lg border p-6 transition-all duration-200",
        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
        isSelected 
          ? "border-gray-900 bg-white ring-1 ring-gray-900" 
          : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50/50 hover:border-gray-300"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={cn(
            "h-5 w-5",
            isSelected ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
          )} />
          <div>
            <h3 className={cn(
              "font-semibold",
              isSelected ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
            )}>
              {title}
            </h3>
            <p className={cn(
              "text-sm",
              isSelected ? "text-gray-600" : "text-gray-500"
            )}>
              {description}
            </p>
          </div>
        </div>
        <ArrowRight className={cn(
          "h-4 w-4 transition-transform duration-200",
          isSelected ? "rotate-90 text-gray-900" : "text-gray-400 group-hover:text-gray-900"
        )} />
      </div>
    </div>
  );
}