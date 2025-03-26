# Appraisily Shared Components - Implementation Guide

This guide provides step-by-step instructions for implementing the shared components package across all Appraisily subdomains.

## Overview

The `@appraisily/shared-components` package contains shared UI components to ensure consistent design and functionality across all Appraisily subdomains. Currently, it includes:

- Header component
- Footer component
- Shared styles and configurations

## Installation

### 1. Add the Private Package Repository

First, configure your project to use the private npm registry:

```bash
# Add the private registry configuration to .npmrc
echo "@appraisily:registry=https://npm.pkg.github.com" >> .npmrc
```

You'll need to authenticate with GitHub Packages. Create a Personal Access Token with the `read:packages` scope and configure it in your environment:

```bash
# For local development
npm login --scope=@appraisily --registry=https://npm.pkg.github.com

# For CI/CD environments
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
```

### 2. Install the Package

Install the shared components package:

```bash
npm install @appraisily/shared-components
```

### 3. Configure Your Build System

If you're using Webpack, make sure to configure it to handle the CSS imports:

```js
// webpack.config.js
module.exports = {
  // ...other config
  module: {
    rules: [
      // ...other rules
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

For Vite projects, no additional configuration is needed.

### 4. Set Up Tailwind CSS

The components use Tailwind CSS. You'll need to extend your Tailwind configuration to include the shared configuration:

```js
// tailwind.config.js
const sharedConfig = require('@appraisily/shared-components/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend the shared config
  ...sharedConfig,
  
  // Add your project-specific configurations
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    // Include the node_modules path to the shared components
    './node_modules/@appraisily/shared-components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Extend the shared theme with your project-specific theme
      ...sharedConfig.theme.extend,
      // Add your custom theme extensions
    },
  },
  plugins: [
    // Your plugins
  ],
};
```

## Usage

### Header Component

Import and use the Header component in your application:

```tsx
import React from 'react';
import { Header } from '@appraisily/shared-components';
import '@appraisily/shared-components/dist/styles.css';

// Optional: Import your own authentication context
import { useAuth } from './path/to/your/auth-context';

function App() {
  // If you have an auth context, use it to get authentication state and user info
  const { isAuthenticated, user, login, logout } = useAuth();
  
  return (
    <div>
      <Header 
        currentSubdomain="your-subdomain" // e.g., "articles", "screener", etc.
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={login}
        onLogout={logout}
        // Optional: Override navigation items
        navigationItems={{
          // Example of customizing just the expertise section
          expertise: [
            { name: 'Custom Item', href: '/custom-path', description: 'Custom description' },
            // ...more items
          ],
          // Other sections use defaults if not specified
        }}
      />
      
      {/* The rest of your application */}
    </div>
  );
}
```

### Footer Component

Import and use the Footer component:

```tsx
import React from 'react';
import { Footer } from '@appraisily/shared-components';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <Footer 
        currentSubdomain="your-subdomain"
        // Optional: Override default properties
        contactEmail="custom@example.com"
        companyName="Custom Name"
        // Optional: Custom links
        links={{
          quickLinks: [
            { name: 'Custom Link', href: '/custom' },
            // ...more links
          ],
          // Other link sections use defaults if not specified
        }}
      />
    </div>
  );
}
```

## Customization

### Header Customization

The Header component accepts several props for customization:

```tsx
<Header 
  // Required: Identifies which subdomain is using the component
  currentSubdomain="main"
  
  // Authentication state and callbacks
  user={user}
  isAuthenticated={isAuthenticated}
  onLogin={() => {}}
  onLogout={() => {}}
  
  // Custom navigation links for mobile view
  customLinks={[
    { name: 'Custom Page', href: '/custom' },
    { name: 'External Link', href: 'https://example.com', external: true },
  ]}
  
  // Custom navigation items for desktop dropdowns
  navigationItems={{
    about: [
      { name: 'About Us', href: '/about', description: 'Learn about us' },
      // ...more items
    ],
    services: [...],
    expertise: [...],
    knowledge: [...]
  }}
/>
```

### Footer Customization

The Footer component also accepts several customization props:

```tsx
<Footer 
  // Identifies which subdomain is using the component
  currentSubdomain="main"
  
  // Override contact information
  contactEmail="contact@example.com"
  
  // Override branding
  logoUrl="https://example.com/logo.png"
  companyName="Your Company"
  description="Your custom description"
  
  // Custom call to action
  callToAction={{
    text: "Custom CTA",
    href: "/custom-path"
  }}
  
  // Custom links
  links={{
    quickLinks: [...],
    submodules: [...],
    legal: [...],
    social: [
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/example' },
      // ...more social links
    ]
  }}
/>
```

## Troubleshooting

### Common Issues

1. **Missing styles**:
   - Ensure you've imported the CSS file: `import '@appraisily/shared-components/dist/styles.css';`
   - Check that your bundler is configured to handle CSS imports

2. **Authentication integration**:
   - The Header component expects authentication callbacks and state to be passed as props
   - Make sure to correctly integrate with your authentication system

3. **React Router integration**:
   - The components use React Router's `Link` component
   - Make sure your app is wrapped in a `BrowserRouter` or `HashRouter`

4. **TypeScript errors**:
   - Make sure TypeScript is configured to handle node_modules
   - The package includes TypeScript definitions

### Getting Help

If you encounter issues not covered in this guide, please contact the Appraisily development team:

- Create an issue in the shared-components repository
- Contact the development team via [Slack/Email/etc.]

## Updating the Shared Components

When the shared components package is updated, you should update your dependencies:

```bash
npm update @appraisily/shared-components
```

Check the CHANGELOG.md file in the package repository for details about the changes between versions.