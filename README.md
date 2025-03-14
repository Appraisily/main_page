<!-- omit in toc -->
# Appraisily - Professional Art & Antique Appraisals

Professional art and antique appraisal platform built with React, TypeScript, and Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Component Guidelines](#component-guidelines)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sitemap Generation](#sitemap-generation)

## Overview

Appraisily provides professional art and antique appraisal services, combining expert knowledge with AI-powered analysis tools. The platform offers both free instant AI analysis and comprehensive professional appraisals.

## Features

- Free AI-powered artwork analysis
- Professional appraisal services
- Secure image upload and processing
- Detailed market analysis
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

Example:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

3. Import and use components:
```tsx
import { Button } from "@/components/ui/button"
```

### Component Best Practices

- Keep components small and focused
- Use TypeScript interfaces for props
- Follow shadcn/ui styling conventions
- Maintain consistent naming conventions
- Implement proper accessibility features

## API Documentation

### Upload Temporary Image

Endpoint for temporarily storing uploaded images and creating an analysis session.

**Endpoint:** `POST /upload-temp`

**Purpose:**
- Temporarily stores uploaded images
- Creates a session for tracking the analysis
- Returns a temporary URL without performing image analysis

**Request Format:**
```javascript
// FormData
const formData = new FormData();
formData.append('image', imageFile); // imageFile is your image blob/file
```

**Headers:**
```json
{
  "Content-Type": "multipart/form-data"
}
```

**Response:**
```typescript
{
  success: boolean,      // true/false
  message: string,       // Status message
  tempUrl: string,       // URL to access the uploaded image
  sessionId: string      // Unique session identifier
}
```

**Example Usage:**
```javascript
// Using fetch
const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp', {
  method: 'POST',
  body: formData
});

// Using axios
const response = await axios.post('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Limitations:**
- Max file size: 5MB
- Supported formats: JPEG, PNG, WebP
- Temporary URLs expire after 1 hour

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- React Router
- React Hook Form
- Radix UI Components
- ImageKit.io for image optimization

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/             # Utility functions and constants
├── pages/           # Page components
├── screener/        # AI analysis module
└── landing/         # Landing page module
```

## Sitemap Generation

This project includes an automated sitemap generator that creates a `sitemap.xml` file during the build process.

### How it works:
- The sitemap is generated automatically when running `npm run build`
- It extracts routes from the `App.tsx` file using regex
- Static routes are included in the sitemap, while dynamic routes (with parameters) are excluded
- The sitemap is saved to `public/sitemap.xml`

### Manual Generation:
You can manually generate the sitemap by running:
```bash
npm run generate-sitemap
```

### Configuration:
- The base URL is set to `https://appraisily.com` by default
- To change the base URL, modify the `generate-sitemap` script in `package.json`

## License

Copyright © 2024 Appraisily. All rights reserved.