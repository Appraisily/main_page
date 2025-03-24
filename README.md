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

## License

Copyright © 2024 Appraisily. All rights reserved.