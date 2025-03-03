import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

export function Icon({ icon: IconComponent, size = 'md', className = '' }: IconProps) {
  return <IconComponent className={`${sizes[size]} ${className}`} />;
}