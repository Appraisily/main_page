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
Create a `.env` file with the following variables:
```
VITE_GOOGLE_TAG_MANAGER_ID=your-gtm-id
VITE_AUTH_API_URL=your-auth-api-url
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