import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  href?: string;
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30',
  outline: 'bg-white text-primary hover:bg-gray-50'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  href
}: ButtonProps) {
  const Component = href ? 'a' : 'button';
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200';
  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <Component href={href} className={styles}>
      {children}
      {Icon && <Icon className="h-5 w-5" />}
    </Component>
  );
}