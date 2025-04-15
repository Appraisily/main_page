# Using Appraisily Shared Components

This guide explains how to integrate the Appraisily shared components into your project.

## Option 1: Install from GitHub

You can install the package directly from GitHub:

```bash
npm install github:your-username/main_page/appraisily-shared-components
```

Replace `your-username` with your actual GitHub username.

## Option 2: Publish to GitHub Packages

For a more robust approach, publish the package to GitHub Packages:

### Step 1: Configure your package.json

Ensure your `package.json` in the shared components has the right configuration:

```json
{
  "name": "@your-org/appraisily-shared-components",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  ...
}
```

### Step 2: Set up authentication

Create or edit a `.npmrc` file in your home directory:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@your-org:registry=https://npm.pkg.github.com
```

Generate a GitHub token with `read:packages` and `write:packages` scopes.

### Step 3: Publish the package

```bash
cd appraisily-shared-components
npm publish
```

### Step 4: Install in your projects

```bash
npm install @your-org/appraisily-shared-components
```

## Using the Components

Once installed, you can import components in your React code:

```jsx
import { Header, Footer } from 'appraisily-shared-components';

function App() {
  return (
    <div>
      <Header 
        currentSubdomain="main"
        isAuthenticated={false}
        onLogin={() => {/* Your login logic */}}
      />
      
      {/* Your app content */}
      
      <Footer />
    </div>
  );
}
```

## Available Components

- `Header`: The main navigation header
- `Footer`: The page footer

## Configuration

### Header Props

```tsx
{
  currentSubdomain: 'main' | 'screener' | 'articles' | 'directory' | string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    [key: string]: any;
  } | null;
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  customLinks?: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
  navigationItems?: {
    about?: Array<{name: string; href: string; description?: string}>;
    services?: Array<{name: string; href: string; description?: string}>;
    expertise?: Array<{name: string; href: string; description?: string}>;
    knowledge?: Array<{name: string; href: string; description?: string}>;
  };
}
```

## Styling

The components use Tailwind CSS. Make sure your project has Tailwind configured with the same theme settings for consistent styling. Refer to the example Tailwind configuration in `EXAMPLE-TAILWIND-CONFIG.js`. 