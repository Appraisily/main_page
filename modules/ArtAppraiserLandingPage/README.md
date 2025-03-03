# Art Appraisal Landing Pages

A modern React application showcasing professional art appraisal services.

## Live URLs

Live Site: [https://creative-squirrel-688c9c.netlify.app](https://creative-squirrel-688c9c.netlify.app)

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Lucide React for icons
- React Router for navigation

## Features

- Responsive design optimized for all devices
- Performance optimized with code splitting and lazy loading
- Beautiful animations and transitions
- SEO friendly with proper meta tags
- Optimized image loading with ImageKit.io
- Google Tag Manager integration

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
│   └── ArtAppraiser.tsx        # Main landing page
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with ImageKit.io
- Critical CSS inlining
- Resource hints (preconnect, dns-prefetch)
- Lazy loading of non-critical components
- Efficient bundle chunking strategy

## Deployment

The application is deployed on Netlify with automatic deployments from the main branch. The build configuration is defined in `netlify.toml` with:

- Custom cache headers
- Security headers
- Asset optimization
- Proper redirects for SPA routing

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on all screen sizes
- Progressive enhancement for older browsers