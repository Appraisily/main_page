import React from 'react';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizes = {
  xs: {
    img: 'h-5 w-5',
    text: 'text-base',
    spacing: 'gap-1'
  },
  sm: {
    img: 'h-6 w-6',
    text: 'text-lg',
    spacing: 'gap-1'
  },
  md: {
    img: 'h-8 w-8',
    text: 'text-xl',
    spacing: 'gap-2'
  },
  lg: {
    img: 'h-10 w-10',
    text: 'text-2xl',
    spacing: 'gap-3'
  }
};

const textColors = {
  default: 'text-gray-900',
  light: 'text-white',
  dark: 'text-gray-900'
};

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md' }) => {
  const selectedSize = sizes[size];

  return (
    <div className={`inline-flex items-center ${selectedSize.spacing} group`}>
      <img
        src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?tr=w-64,h-64"
        alt="Appraisily"
        className={`${selectedSize.img} object-contain transition-transform duration-300 group-hover:scale-105`}
        width="64"
        height="64"
        loading="eager"
      />
      <span className={`font-semibold ${selectedSize.text} ${textColors[variant]}`}>
        Appraisily
      </span>
    </div>
  );
};

export default Logo;