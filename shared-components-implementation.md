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

## Development and Export Process for Main Repo

When developing and exporting Header and Footer components from the main repository:

### 1. Local Development in Main Repo

```bash
# Navigate to the main repository
cd /mnt/c/Users/Andres/Documents/Github/main_page

# Navigate to the shared components directory
cd appraisily-shared-components

# Install dependencies (if needed)
npm install

# Start development mode (watches for changes and rebuilds)
npm run dev
```

This will start Rollup in watch mode, which will automatically rebuild the package when changes are detected in the source files.

### 2. Making Changes to Components

When modifying the Header or Footer:

1. Edit the component source files in `appraisily-shared-components/src/components/`
2. The development server will automatically rebuild the package
3. Use the local version in the main application for testing

### 3. Testing in the Main Repository

You can test changes directly within the main repository by:

```bash
# In one terminal, keep the shared components in watch mode
cd appraisily-shared-components
npm run dev

# In another terminal, run the main application
cd ..
npm run dev
```

### 4. Building for Production

When your changes are ready for production:

```bash
# Navigate to the shared components directory
cd appraisily-shared-components

# Build the package for production
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Bundle components using Rollup
- Extract and process CSS
- Generate type definitions
- Create both ESM and CommonJS versions

### 5. Publishing Process

To make the components available to other repositories:

```bash
# Update the version in package.json following semantic versioning
# - PATCH (1.0.x): Bug fixes
# - MINOR (1.x.0): New features (backward compatible)
# - MAJOR (x.0.0): Breaking changes

# Build the package
npm run build

# Publish to GitHub Packages
npm publish
```

### 6. Workspaces Integration

The main repository uses npm workspaces for better integration:

```json
// package.json in the main repository
{
  "name": "appraisily-website",
  "workspaces": [
    "appraisily-shared-components"
  ],
  // other configuration...
}
```

This allows for:
- Single `npm install` command to install dependencies for both projects
- Simplified development workflow
- Local testing of the shared components package

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

## Making Updates to Shared Components

### 1. Development Workflow

When updating the Header or Footer components:

```bash
# Start the development server for shared components
cd appraisily-shared-components
npm run dev

# In a separate terminal, run the main application
cd ..
npm run dev
```

### 2. Component Modification Process

1. **Identify what needs to change**: Is it styling, functionality, or structure?

2. **Make changes to the source files**:
   - Header component: `appraisily-shared-components/src/components/Header/index.tsx`
   - Footer component: `appraisily-shared-components/src/components/Footer/index.tsx`
   - Shared styles: `appraisily-shared-components/src/components/Header/styles.css` or `/Footer/styles.css`

3. **Test changes in the main application**:
   - Check mobile and desktop layouts
   - Verify all interactive elements
   - Test with different props configurations

4. **Document any API changes**:
   - If you've added or modified props, update documentation
   - Write clear commit messages explaining the changes

### 3. Publishing Updates

When your changes are ready for all subdomains:

```bash
# Update the version number in package.json
# Following semantic versioning:
# - PATCH (1.0.x): Bug fixes and minor changes
# - MINOR (1.x.0): New features (backward compatible)
# - MAJOR (x.0.0): Breaking changes

# Build the package for production
npm run build

# Publish to GitHub Packages
npm publish
```

### 4. Testing with Local Projects

To test with other local projects before publishing:

```bash
# In the shared-components directory
npm link

# In the target project directory
npm link @appraisily/shared-components
```

After testing, unlink and restore the published version:

```bash
# In the target project
npm unlink @appraisily/shared-components
npm install
```

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