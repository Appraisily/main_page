# Shared Components Implementation Documentation

This document explains how we implemented the shared components approach for Appraisily and provides instructions for integrating it with other subdomains.

## What We've Built

We've created a shared components package that centralizes common UI elements across all Appraisily subdomains. The package:

1. Contains reusable React components (Header and Footer)
2. Includes TypeScript type definitions
3. Has a consistent styling system using CSS and Tailwind
4. Is configurable for different subdomains
5. Can be published to a private npm registry

## The Implementation Approach

We chose the NPM package approach because it offers:

1. **Clear versioning**: Each subdomain can specify which version to use
2. **Isolated updates**: Updates can be rolled out gradually across subdomains
3. **Standard tooling**: Uses familiar npm/yarn workflows
4. **Easy integration**: Simple import statements in each project

## Package Structure

The package has this structure:

```
appraisily-shared-components/
├── dist/                 # Compiled output (generated)
├── src/
│   ├── components/
│   │   ├── Header/       # Header component
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── Footer/       # Footer component
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   └── index.ts      # Exports all components
│   └── index.ts          # Main entry point
├── package.json          # Package configuration
├── rollup.config.js      # Build configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Shared Tailwind configuration
└── README.md             # Documentation
```

## Key Features

### 1. Configurable Components

Both the Header and Footer components accept props to customize their appearance and behavior:

```tsx
// Header customization props
interface HeaderProps {
  currentSubdomain: string;             // Which subdomain is using it
  user?: object | null;                 // User data if authenticated
  isAuthenticated?: boolean;            // Authentication state
  onLogin?: () => void;                 // Login callback
  onLogout?: () => void;                // Logout callback
  customLinks?: Array<LinkType>;        // Custom navigation links
  navigationItems?: NavigationItems;    // Custom dropdown content
}

// Footer customization props
interface FooterProps {
  currentSubdomain?: string;            // Which subdomain is using it
  links?: LinksConfig;                  // Custom link sections
  contactEmail?: string;                // Contact email
  logoUrl?: string;                     // Custom logo URL
  companyName?: string;                 // Company name
  description?: string;                 // Description text
  callToAction?: CTAConfig;             // Custom call-to-action
}
```

### 2. Shared Styling System

The components use a combination of:

1. **Component-specific CSS**: For component styling
2. **Tailwind CSS**: For utility classes and theming
3. **Shared configuration**: A common Tailwind configuration that can be extended

### 3. Build System

The package uses Rollup to:

1. Bundle the components
2. Process TypeScript
3. Handle CSS
4. Generate type declarations
5. Create ESM and CommonJS outputs

## How to Use in Another Subdomain

### Step 1: Set Up GitHub Packages Access

First, configure your subdomain project to use the GitHub Packages registry:

```bash
# Create or update .npmrc in your project
echo "@appraisily:registry=https://npm.pkg.github.com" >> .npmrc

# Authenticate (for development)
npm login --scope=@appraisily --registry=https://npm.pkg.github.com
```

For CI/CD environments, add authentication token to your workflow:

```yaml
# .github/workflows/your-workflow.yml
steps:
  - name: Set up Node.js
    uses: actions/setup-node@v3
    with:
      node-version: '18'
      registry-url: 'https://npm.pkg.github.com'
      scope: '@appraisily'
  - name: Install dependencies
    run: npm ci
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Step 2: Install the Package

```bash
npm install @appraisily/shared-components
```

### Step 3: Configure Tailwind CSS

Create or update your tailwind.config.js:

```js
// tailwind.config.js
const sharedConfig = require('@appraisily/shared-components/tailwind.config');

module.exports = {
  // Extend the shared config
  ...sharedConfig,
  
  // Add your content paths
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@appraisily/shared-components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Include shared theme
      ...sharedConfig.theme.extend,
      // Add subdomain-specific customizations
    },
  },
};
```

### Step 4: Integrate Components

Import and use the components in your app:

```tsx
// App.tsx or similar
import { Header, Footer } from '@appraisily/shared-components';
import '@appraisily/shared-components/dist/styles.css';

// Import your auth context if available
import { useAuth } from './your-auth-context';

function App() {
  // Get auth state
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      <Header 
        currentSubdomain="your-subdomain-name" 
        user={user}
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
      />
      
      <main>
        {/* Your app content */}
      </main>
      
      <Footer 
        currentSubdomain="your-subdomain-name"
      />
    </div>
  );
}
```

### Step 5: Customize for Your Subdomain

You can customize the components for your specific subdomain:

```tsx
// Example: Customizing navigation items
<Header 
  currentSubdomain="screener"
  navigationItems={{
    // Only override the sections you want to change
    about: [
      { name: 'About Screener', href: '/about', description: 'Learn about our AI art analysis tool' },
      { name: 'Our Team', href: '/team', description: 'Meet our expert data scientists' },
    ],
    // Other sections will use the defaults
  }}
/>

// Example: Customizing footer
<Footer 
  currentSubdomain="screener"
  description="AI-powered art analysis tool for instant artwork valuation"
  callToAction={{
    text: "Try Free Analysis",
    href: "/analyze"
  }}
/>
```

## Updating the Package

When making changes to the shared components:

1. Make the changes in the appraisily-shared-components directory
2. Update the version in package.json following semantic versioning:
   - PATCH (1.0.x): Bug fixes and minor changes
   - MINOR (1.x.0): New features in a backward compatible manner
   - MAJOR (x.0.0): Breaking changes
3. Build the package: `npm run build`
4. Publish to GitHub Packages: `npm publish`
5. Update dependencies in each subdomain project: `npm update @appraisily/shared-components`

## Best Practices

1. **Keep components generic**: Components should work across all subdomains
2. **Allow customization via props**: Don't hardcode values that might need to change
3. **Document API changes**: When adding or changing props, update documentation
4. **Test across subdomains**: Verify changes work in all environments
5. **Use semantic versioning**: Follow versioning rules to prevent unexpected breaks
6. **Consider backward compatibility**: Avoid breaking changes when possible

## Troubleshooting Common Issues

### Missing Styles

If styles are missing:

```tsx
// Make sure to import the styles
import '@appraisily/shared-components/dist/styles.css';
```

### TypeScript Errors

For TypeScript errors:

1. Make sure the package is properly installed
2. Check that your tsconfig.json includes node_modules in the compilation

### Authentication Integration

For authentication issues:

1. Pass the correct auth state and callbacks to the Header component
2. Make sure your auth context is properly set up

## Future Enhancements

Future improvements to consider:

1. Add more shared components (buttons, cards, modals, etc.)
2. Create a Storybook documentation site
3. Add visual regression testing
4. Implement versioned documentation
5. Add automatic change detection and versioning