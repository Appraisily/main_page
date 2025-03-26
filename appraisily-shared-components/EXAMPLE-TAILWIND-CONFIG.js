// Example tailwind.config.js for a subdomain project
const sharedConfig = require('@appraisily/shared-components/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend the shared config
  ...sharedConfig,
  
  // Add project-specific configurations
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    // Include the node_modules path to the shared components
    './node_modules/@appraisily/shared-components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Include shared theme extensions
      ...sharedConfig.theme.extend,
      
      // Add subdomain-specific customizations
      colors: {
        // Merge with shared colors and add custom colors
        ...sharedConfig.theme.extend.colors,
        // Example of adding a custom color palette for this subdomain only
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          // ...more shades
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [
    // Add subdomain-specific plugins
  ],
};