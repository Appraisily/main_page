# CLAUDE.md - Development Reference

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript check and sitemap generation)
- `npm run preview` - Preview production build locally
- `npm run generate-sitemap` - Generate sitemap manually

## Code Style Guidelines
- **TypeScript**: Use TypeScript for type safety (strict mode disabled but recommended for new code)
- **Components**: Functional components with named exports; PascalCase for component files
- **Hooks**: Custom hooks with `use` prefix; camelCase filenames
- **Imports**: Group imports by external libs, then internal paths; use `@/` alias for src paths
- **Formatting**: 2-space indentation, semicolons, single quotes preferred
- **Error Handling**: Try/catch with specific error types; error state management in hooks
- **UI Components**: Use Radix UI + Tailwind; leverage the `cn()` utility for class merging
- **Naming**: Descriptive variable names; boolean variables prefixed with "is"/"has"
- **File Organization**: Components in src/components; hooks in src/hooks; types in src/types
- **State Management**: React hooks for local state; API calls in custom hooks