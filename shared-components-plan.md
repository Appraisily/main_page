# Shared Components Implementation Plan

## Overview
This plan outlines how to implement shared header and footer components across multiple subdomains/repositories to ensure consistent UI/UX and ease of maintenance.

## Implementation Options

### 1. NPM Package (Recommended)

#### Approach
Create a private NPM package containing shared components that all subdomains can install as a dependency.

#### Steps to Implement:
1. **Create a new repository for shared components**
   ```bash
   mkdir appraisily-shared-components
   cd appraisily-shared-components
   npm init -y
   ```

2. **Set up the package structure**
   ```
   appraisily-shared-components/
   ├── dist/            # Compiled output
   ├── src/             # Source code
   │   ├── components/
   │   │   ├── Header/
   │   │   │   ├── index.tsx
   │   │   │   └── styles.css
   │   │   ├── Footer/
   │   │   │   ├── index.tsx
   │   │   │   └── styles.css
   │   │   └── index.ts  # Export all components
   │   └── utils/        # Shared utilities
   ├── package.json
   ├── tsconfig.json
   ├── vite.config.ts    # Or other build config
   └── README.md
   ```

3. **Extract and adapt the current Header and Footer components**
   - Move Header.tsx and Footer.tsx to the new package
   - Make them configurable with props for subdomain-specific needs
   - Ensure all dependencies are properly declared

4. **Configure package.json**
   ```json
   {
     "name": "@appraisily/shared-components",
     "version": "1.0.0",
     "description": "Shared React components for Appraisily subdomains",
     "main": "dist/index.js",
     "module": "dist/index.esm.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "vite build",
       "dev": "vite build --watch",
       "prepublishOnly": "npm run build"
     },
     "peerDependencies": {
       "react": ">=17.0.0",
       "react-dom": ">=17.0.0",
       "react-router-dom": ">=6.0.0",
       "tailwindcss": ">=3.0.0"
     }
   }
   ```

5. **Set up build configuration**
   Configure Vite, Rollup, or another build tool to:
   - Bundle components
   - Generate TypeScript declarations
   - Handle CSS/styles properly

6. **Publish to private registry**
   - Use GitHub Packages, npm private packages, or a self-hosted registry
   - Set up access controls if needed

7. **Install in each subdomain project**
   ```bash
   npm install @appraisily/shared-components
   ```

8. **Use components in each project**
   ```tsx
   import { Header, Footer } from '@appraisily/shared-components';
   
   function App() {
     return (
       <>
         <Header currentSubdomain="main" />
         {/* Page content */}
         <Footer currentSubdomain="main" />
       </>
     );
   }
   ```

9. **Set up CI/CD for automated package updates**
   - Automate version bumping and publishing
   - Use semantic versioning for releases
   - Create a workflow that updates all repositories when the shared package changes

#### Advantages:
- Clear versioning and dependency management
- Proper encapsulation
- TypeScript type definitions
- Scales well as the number of shared components grows
- Each subdomain can choose when to update to newer versions

### 2. Monorepo Approach

#### Approach
Use a monorepo setup like Nx, Turborepo, or Lerna to manage all subdomain projects in a single repository with shared components.

#### Steps to Implement:
1. **Set up a monorepo**
   ```bash
   # Example with Nx
   npx create-nx-workspace appraisily-web
   cd appraisily-web
   ```

2. **Create a shared library**
   ```bash
   # With Nx
   nx g @nrwl/react:lib shared-ui
   ```

3. **Move existing subdomains into the monorepo**
   - Create applications for each subdomain
   - Migrate codebase into the monorepo structure

4. **Move Header and Footer components to shared library**
   - Similar to the NPM package approach
   - Create flexible, configurable components

5. **Import shared components in each application**
   ```tsx
   import { Header, Footer } from '@appraisily/shared-ui';
   ```

#### Advantages:
- Simpler dependency management
- Atomic commits across projects
- Built-in tools for managing cross-project changes
- Single source of truth

#### Disadvantages:
- More complex initial setup
- All subdomains are part of the same repository
- More complex CI/CD requirements

### 3. Git Submodules

#### Approach
Use Git submodules to include the shared components repository in each subdomain project.

#### Steps to Implement:
1. **Create a repository for shared components**
   ```bash
   mkdir appraisily-shared-components
   cd appraisily-shared-components
   git init
   ```

2. **Add as a submodule to each project**
   ```bash
   cd your-subdomain-repo
   git submodule add https://github.com/your-org/appraisily-shared-components.git src/shared
   ```

3. **Reference components in each project**
   ```tsx
   import Header from '../shared/components/Header';
   import Footer from '../shared/components/Footer';
   ```

#### Advantages:
- Simple to set up initially
- Works with any build system

#### Disadvantages:
- Git submodules can be confusing to manage
- Requires manual updating in each repository
- Less flexible than package-based approaches

## Implementation Recommendation

The **NPM Package approach** is recommended because:

1. It provides proper versioning and dependency management
2. It allows individual repositories to update at their own pace
3. It scales well as the number of shared components grows
4. It follows standard practices for component sharing in the React ecosystem
5. It's easier to maintain long-term than alternatives

## Tailwind CSS Considerations

Since the components use Tailwind CSS, there are a few additional considerations:

1. **Option 1: Bundle styles with components**
   - Pre-compile Tailwind CSS into the package
   - Ensures styles are consistent but less customizable

2. **Option 2: Share Tailwind configuration**
   - Export a base Tailwind configuration from the shared package
   - Each subdomain extends the shared config
   - Example:
     ```js
     // In shared package
     module.exports = {
       theme: {
         colors: {
           blue: { /* common color palette */ },
         }
       }
     };
     
     // In subdomain project
     const sharedConfig = require('@appraisily/shared-components/tailwind.config');
     module.exports = {
       ...sharedConfig,
       // Subdomain-specific overrides
     };
     ```

## Handling Authentication Across Subdomains

1. **Create shared authentication context/hooks**
   - Include in the shared package
   - Implement consistent authentication flow

2. **Use a domain-wide cookie or JWT**
   - Set cookies on .appraisily.com to be accessible across subdomains
   - Share authentication state between applications

## Testing & Maintenance Plan

1. **Visual regression testing**
   - Set up Storybook for component documentation and testing
   - Implement visual regression tests to catch unintended UI changes

2. **Versioning strategy**
   - Use semantic versioning (MAJOR.MINOR.PATCH)
   - Document breaking changes thoroughly

3. **Maintenance workflow**
   1. Make changes to shared components
   2. Test in isolation with Storybook
   3. Version and publish the new package
   4. Update dependencies in affected repositories
   5. Test integration
   6. Deploy updates

## Implementation Timeline

1. **Week 1: Setup & Extraction**
   - Create shared components repository
   - Extract and adapt Header and Footer components
   - Set up build pipeline

2. **Week 2: Initial Integration**
   - Publish the package to a private registry
   - Integrate with one subdomain (main site)
   - Test and refine

3. **Week 3: Complete Integration**
   - Roll out to all remaining subdomains
   - Document usage and customization

4. **Week 4: Finalize & Automate**
   - Set up automation for updates
   - Create development workflow documentation
   - Implement monitoring for component usage

## Conclusion

By implementing shared components as an NPM package, Appraisily can maintain consistent UI/UX across all subdomains while also establishing a scalable approach for future shared functionality. This approach balances ease of maintenance with flexibility for subdomain-specific needs.