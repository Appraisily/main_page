/**
 * Module declarations for external libraries
 * This file fixes "Cannot find module" TypeScript errors
 */

// React and React DOM declarations
declare module 'react' {
  export * from 'react';
  export default React;
}

declare module 'react-dom' {
  export * from 'react-dom';
  export default ReactDOM;
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
}

// Third-party libraries
declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    stroke?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Scale: Icon;
  export const Shield: Icon;
  export const FileCheck: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const ArrowRight: Icon;
  export const MapPin: Icon;
  export const Star: Icon;
  export const Clock: Icon;
  export const Award: Icon;
  export const Badge: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const Globe: Icon;
  // Add any other icons you're using
}

declare module '@radix-ui/react-tooltip' {
  export * from '@radix-ui/react-tooltip';
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

declare module 'react-helmet-async' {
  export * from 'react-helmet-async';
}

// JSON import declarations
declare module "*.json" {
  const value: any;
  export default value;
} 