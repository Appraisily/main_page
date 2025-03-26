# Appraisily Shared Components

A library of shared UI components for Appraisily subdomains.

## Features

- **Consistent UI/UX**: Ensures all Appraisily properties maintain the same look and feel
- **Centralized Updates**: Update components in one place, deploy everywhere 
- **Configurable Components**: Easily customize for subdomain-specific needs
- **TypeScript Support**: Full type definitions for all components
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Installation

```bash
# Add the registry config to .npmrc
echo "@appraisily:registry=https://npm.pkg.github.com" >> .npmrc

# Authenticate with GitHub Packages
npm login --scope=@appraisily --registry=https://npm.pkg.github.com

# Install the package
npm install @appraisily/shared-components
```

## Quick Start

```jsx
import { Header, Footer } from '@appraisily/shared-components';
import '@appraisily/shared-components/dist/styles.css'; // Import styles

function App() {
  return (
    <div>
      <Header currentSubdomain="articles" />
      <main>Your app content</main>
      <Footer currentSubdomain="articles" />
    </div>
  );
}
```

## Components

### Header

```jsx
<Header 
  currentSubdomain="main"
  user={user}
  isAuthenticated={isAuthenticated}
  onLogin={() => {}}
  onLogout={() => {}}
/>
```

### Footer

```jsx
<Footer 
  currentSubdomain="main"
  contactEmail="custom@example.com"
/>
```

## Tailwind CSS Integration

This package includes a shared Tailwind configuration that you can extend in your project:

```js
// tailwind.config.js
const sharedConfig = require('@appraisily/shared-components/tailwind.config');

module.exports = {
  ...sharedConfig,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@appraisily/shared-components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      ...sharedConfig.theme.extend,
      // Add your custom theme extensions
    },
  },
};
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode for development
npm run dev
```

## Documentation

For detailed documentation on how to implement and customize these components, please see:

- [Implementation Guide](./IMPLEMENTATION-GUIDE.md)
- [Component API Reference](./API-REFERENCE.md)

## Examples

Check out these example files in the repository:

- [Example App.tsx](./EXAMPLE-APP.tsx)
- [Example package.json](./EXAMPLE-SCREENER-package.json)
- [Example Tailwind Config](./EXAMPLE-TAILWIND-CONFIG.js)

## Publishing Updates

```bash
# Update version in package.json (follow semver)
npm version patch  # or minor, or major

# Build the package
npm run build

# Publish to GitHub Packages
npm publish
```

## Contact

If you have any questions or issues, please contact the Appraisily development team.