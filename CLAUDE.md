# CLAUDE.md - Development Reference

## Build Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production (TypeScript + Vite + sitemap generation)
- `npm run preview` - Preview production build locally
- `npm run generate-sitemap` - Generate sitemap manually with base URL
- `npx tsc --noEmit` - Run TypeScript type checking without emitting files
- `npx eslint "src/**/*.{ts,tsx}"` - Lint TypeScript files using ESLint

## Code Style Guidelines
- **TypeScript**: Use TypeScript with interfaces for types; strict mode optional but recommended
- **React**: Functional components with React hooks for state management
- **Components**: Use PascalCase for component files; React.lazy() for code splitting
- **Hooks**: Prefix custom hooks with `use`; extract complex logic to hooks
- **Imports**: Group by: 1) React/external libs 2) components 3) hooks 4) utils; use `@/` alias
- **Exports**: Named exports for utils/components; default exports for pages
- **Formatting**: 2-space indent, semicolons, single quotes; align with eslint config
- **Error Handling**: Try/catch with specific error types; manage error state in hooks
- **UI Components**: Use Radix UI + Tailwind; use `cn()` utility for class merging
- **Naming**: Descriptive names; boolean variables prefixed with "is"/"has"
- **File Structure**: Follow established patterns in /components, /hooks, /lib, /pages
- **Module Imports**: Avoid file extensions in regular imports; include .tsx extensions in React.lazy() imports
- **Suspense/Lazy**: Use React.Suspense for component loading; wrap lazy-loaded routes with error boundaries
- **Netlify Deployment**: Ensure build compatibility with Netlify CI environment