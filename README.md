# Appraisily Monorepo

This repository is organized as a Turborepo monorepo for the Appraisily platform, enabling efficient code sharing between applications.

## What's inside?

This Turborepo includes the following:

### Apps

- `main`: The main [Vite](https://vitejs.dev/) React application deployed to Netlify
- `appraisers`: A directory app for finding qualified art and antique appraisers

### Packages

- `ui`: A shared React component library with UI components
- `utils`: Shared JavaScript/TypeScript utilities
- `tailwind-config`: Shared Tailwind CSS configuration
- `eslint-config`: Shared ESLint configurations
- `tsconfig`: Shared TypeScript configurations

## Development

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server:
   - For all apps: `npm run dev`
   - For main app only: `npm run dev:main` or `npm run dev -- --filter=@repo/main`
   - For appraisers app only: `npm run dev:appraisers` or `npm run dev -- --filter=@repo/appraisers`

### Building

- Build all apps: `npm run build`
- Build main app: `npm run build:main`
- Build appraisers app: `npm run build:appraisers`

### Preview Production Build

To preview the production build locally before deployment:

- Preview main app: `npm run preview:main`
- Preview appraisers app: `npm run preview:appraisers`

These commands will start a local server to serve the production build of each app, allowing you to test the optimized build before deployment.

## Apps Structure

### Main App

The main application serves as the primary site for Appraisily's appraisal services.

- **URL**: `/`
- **Features**:
  - Art and antique appraisal services
  - Professional valuation reports
  - Expert appraiser team profiles
  - Service information and pricing

### Appraisers Directory

A directory application to help users find qualified art and antique appraisers.

- **URL**: `/directory/`
- **Features**:
  - Browse appraisers by specialty and location
  - View appraiser profiles and qualifications
  - Contact information for listed appraisers
  - Information about the verification process

## Deployment

The project is deployed to Netlify with the following configuration:

- Main app is served at the root domain
- Appraisers directory is served at the `/directory` path
- Build command uses Turborepo to build both apps efficiently
- Post-build script copies the appraisers app build to the appropriate directory

## PowerShell Notes

When working with PowerShell, note that the `&&` operator for command chaining isn't supported. Instead, use semicolons or separate commands. This repository includes PowerShell-friendly scripts:

```powershell
# Instead of: cd .. && cd .. && npm run dev
cd ..; cd ..; npm run dev
```

### PowerShell-Friendly Scripts

This repository includes several cross-platform scripts that work on Windows PowerShell, Mac, and Linux:

- **Running Development Servers**:
  - `npm run dev:main` - Run the main app in development mode
  - `npm run dev:appraisers` - Run the appraisers app in development mode

- **Building Apps**:
  - `npm run build:main` - Build only the main app
  - `npm run build:appraisers` - Build only the appraisers app

- **Post-Build Processing**:
  - The `postbuild` script is implemented as a Node.js script for cross-platform compatibility

- **Preview Production Builds**:
  - `npm run preview:main` - Preview the built main app
  - `npm run preview:appraisers` - Preview the built appraisers app

These scripts are available in the root `package.json` and handle directory navigation and command execution properly regardless of operating system.

## Documentation

- [Turborepo](https://turbo.build/repo/docs)
- [Vite](https://vitejs.dev/)
- [Netlify](https://docs.netlify.com/)

## License

This project is licensed under the MIT License.