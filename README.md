# Appraisily - Professional Art & Antique Appraisals

Professional art and antique appraisal platform built with React, TypeScript, and Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Component Guidelines](#component-guidelines)
- [Authentication](#authentication)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

## Overview

Appraisily provides professional art and antique appraisal services, combining expert knowledge with AI-powered analysis tools. The platform offers both free instant AI analysis and comprehensive professional appraisals.

## Features

- Free AI-powered artwork analysis
- Professional appraisal services
- Bulk appraisal functionality for multiple items
- Secure image upload with chunked uploading
- User authentication and dashboard
- Protected routes for logged-in users
- Detailed market analysis and reporting
- Expert valuations within 48 hours
- Insurance and tax appraisal options

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/appraisily.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Development

### Build Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate sitemap
npm run generate-sitemap

# Type checking
npx tsc --noEmit

# Lint code
npx eslint "src/**/*.{ts,tsx}"
```

### Environment Variables
Create a `.env` file with the following variables for local development only:
```
# NOTE: This .env file is only for local development reference.
# In production, all variables should be set in Netlify's environment settings.

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

# Google Tag Manager
VITE_GOOGLE_TAG_MANAGER_ID=your-gtm-id

# API Security
VITE_SHARED_SECRET=your-shared-secret
VITE_STRIPE_SHARED_SECRET=your-stripe-shared-secret

# API Endpoints (optional - these have defaults in the code)
VITE_PAYMENT_API_URL=your-payment-api-url
VITE_SITE_URL=your-site-url
VITE_WP_API_URL=your-wordpress-api-url
```

## Component Guidelines

### Using shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible UI components. Follow these steps when adding new components:

1. Initialize shadcn/ui (only needed once):
```bash
npx shadcn-ui@latest init
```

2. Add components as needed:
```bash
npx shadcn-ui@latest add [component-name]
```

3. Import and use components:
```tsx
import { Button } from "@/components/ui/button"
```

### Component Best Practices

- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for component props
- Follow shadcn/ui styling conventions with Tailwind CSS
- Implement proper accessibility features
- Use React.lazy() for code splitting of larger components

## Authentication

The application uses a custom authentication system with:
- Google authentication integration
- Protected routes for authenticated users
- User dashboard and profile management
- JWT-based session handling

### Important Note on Auth Directory

The `src/pages/Auth` directory is intentionally excluded from git tracking as it belongs to a separate repository. This structure allows the authentication system to be maintained independently while being integrated into this main application.

- Do not attempt to add Auth files to git
- When developing locally, ensure the Auth files are properly copied to this location
- The build process expects these files to exist even though they're not tracked in git
- For deployment, the CI/CD pipeline handles the Auth component integration

## Tech Stack

- React 18
- TypeScript
- Vite build system
- Tailwind CSS
- Radix UI primitives with shadcn/ui
- React Router v6
- Supabase for backend functionality
- Stripe for payment processing
- Netlify for deployment (with edge functions)

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions, API services, and types
│   ├── api/           # API service functions
│   ├── auth/          # Authentication utilities
│   └── types/         # TypeScript type definitions
├── pages/             # Page components
├── App.tsx            # Application routes and layout
└── main.tsx           # Application entry point
```

## Deployment

The site is deployed on Netlify with the following features:
- Edge functions for server-side functionality
- Automatic sitemap generation during build
- Optimization for images and assets
- Generated sitemaps for main site and subdomains
- TypeScript build verification

### Subdomains and Sitemaps

The application integrates with several subdomains that are managed in the footer and sitemap:
- Main site: appraisily.com
- Screener: screener.appraisily.com  
- Appraiser Service: landing-appraisers.appraisily.com
- Art Appraisers Directory: art-appraiser-directory.appraisily.com
- Antique Appraisers Directory: antique-appraiser-directory.appraisily.com
- Articles: articles.appraisily.com

When adding new subdomains:
1. Update the network links in the Footer component
2. Add the subdomain to the sitemap generation script in `scripts/generate-sitemap.cjs`
3. Update the sitemap-index.xml file to include the new subdomain's sitemap

## License

Copyright © 2024 Appraisily. All rights reserved.

## Firebase Authentication Setup

This website uses Firebase Authentication for user management. To set up Firebase Authentication:

1. Install the Firebase dependency:
   ```bash
   npm install firebase
   ```

2. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyA0raiTWLhzvG-qnKaKwCEMQjs6-a3Pf6Y
   VITE_FIREBASE_AUTH_DOMAIN=appraisily.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=appraisily
   VITE_FIREBASE_STORAGE_BUCKET=appraisily.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=768257804794
   VITE_FIREBASE_APP_ID=1:768257804794:web:de9bbc399bd812048bbc43
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Authentication Features

- **Email/Password Login**: Standard email and password authentication
- **Google Login**: Social login with Google
- **Automatic Account Creation**: Creates accounts after successful payments
- **Dashboard Integration**: View appraisals associated with your account

## File Structure

The authentication system consists of the following files:

- `src/lib/firebase/config.ts` - Firebase configuration
- `src/lib/firebase/firebaseAuth.ts` - Firebase authentication service
- `src/lib/auth/AuthContext.tsx` - Authentication context provider
- `src/lib/auth/ProtectedRoute.tsx` - Route protection component
- `src/pages/Auth/Login.tsx` - Login page
- `src/pages/Auth/Signup.tsx` - Signup page
- `src/lib/stripe/handlePaymentSuccess.ts` - Automatic account creation after payment
- `src/pages/Success.tsx` - Payment success page with account creation

## API Integration

The authentication system works with the WordPress REST API to fetch appraisals by user email. The integration is handled by `src/lib/api/dashboardApi.ts`.

## Environment Variables and Deployment

### Netlify Environment Variables
This project does not use `.env` files for production deployment. Instead, all environment variables are configured directly in Netlify's environment settings. This approach ensures better security as sensitive credentials are never committed to the GitHub repository.

The following runtime variables are configured in Netlify for this project:

- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_FIREBASE_APP_ID`: Firebase App ID
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_SHARED_SECRET`: Shared secret for secure API access
- `VITE_STRIPE_SHARED_SECRET`: Secret for Stripe integration

All variables have the same value across all deployment contexts and are injected by Netlify at build time.

### Development vs Production
- **Development**: For local development, create a `.env` file with the appropriate values as described in the "Environment Variables" section above.
- **Production**: Variables are managed in the Netlify dashboard and automatically injected during the build process.

### Deployment Process
1. Code is pushed to GitHub
2. Netlify automatically detects changes and triggers a build
3. During build, Netlify injects the environment variables from its configuration
4. No `.env` files are needed or included in the repository