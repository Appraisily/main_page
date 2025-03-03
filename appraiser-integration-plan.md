# Art Appraiser Landing Page Integration Plan

## Overview
This document outlines the plan to integrate the standalone Art Appraiser Landing Page project into the main Appraisily.com monorepo as a module, accessible via the `/appraiser-landing` route.

## Implementation Steps

### 1. Project Structure Setup

- [x] Move the Art Appraiser Landing Page code into `modules/ArtAppraiserLandingPage/`
- [x] Ensure the module has its own package.json with proper dependencies
- [x] Add the module to the workspace configuration in the root package.json
  ```json
  "workspaces": [
    "apps/*",
    "packages/*",
    "modules/*"
  ]
  ```
- [x] Run `pnpm install` or `yarn install` to update dependencies

### 2. Module Configuration

- [x] Create an index.js file in the module to export components:
  ```javascript
  // modules/ArtAppraiserLandingPage/index.js
  export { default as ArtAppraiserLandingPage } from './src/ArtAppraiserLandingPage';
  // Export any other components needed
  ```
- [x] Adapt any relative imports in the module to work within the monorepo structure
- [x] Identify and resolve any dependency conflicts with the main project

### 3. Routing Configuration

- [x] Create the route in the main app (assuming Next.js):
  ```javascript
  // app/appraiser-landing/page.jsx
  import { ArtAppraiserLandingPage } from '@/modules/ArtAppraiserLandingPage';
  
  export default function AppraiserLandingPage() {
    return <ArtAppraiserLandingPage />;
  }
  ```
- [ ] Update navigation components to include links to the new route
- [ ] Add the new route to any sitemaps or route configurations

### 4. Asset Management

- [x] Move any assets (images, fonts, etc.) to the appropriate locations
- [x] Update asset references in the code
- [ ] Ensure public assets are properly served

### 5. Styling Integration

- [x] Resolve any CSS/styling conflicts between the projects
- [x] Consider using CSS modules or styled-components to isolate styles
- [ ] Adapt the landing page to use any shared design system components

### 6. Build Process Updates

- [ ] Update build scripts to include the new module
- [ ] Configure any module-specific build steps in the Turborepo pipeline
- [ ] Add scripts to package.json if needed:
  ```json
  "scripts": {
    "build:appraiser-landing": "...",
    "dev:appraiser-landing": "..."
  }
  ```

### 7. Testing

- [x] Test the integrated landing page in development environment
- [ ] Create integration tests if applicable
- [ ] Verify all functionality works as expected
- [ ] Test responsive behavior and cross-browser compatibility

### 8. Deployment

- [ ] Update deployment configurations to include the new module
- [ ] Test the deployment process
- [ ] Verify the route `/appraiser-landing` works in production

### 9. Documentation

- [x] Update project documentation to include information about the new module
- [ ] Document any special considerations for developers working on this module
- [ ] Create usage examples if the module exposes reusable components

## Future Considerations

- Consider extracting common components into shared packages
- Plan for additional modules that might be integrated later
- Establish conventions for module integration to streamline future efforts

## Timeline

- Module integration setup: 1 day
- Routing and functionality integration: 1-2 days
- Testing and refinement: 1 day
- Documentation: 0.5 day

Total estimated time: 3.5-4.5 days