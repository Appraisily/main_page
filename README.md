# Appraisily Monorepo

This repository is organized as a Turborepo monorepo for the Appraisily platform, enabling efficient code sharing between applications.

## What's inside?

This Turborepo includes the following:

### Apps

- `main`: The main [Vite](https://vitejs.dev/) React application deployed to Netlify

### Packages

- `ui`: A shared React component library with UI components
- `utils`: Shared JavaScript/TypeScript utilities
- `tailwind-config`: Shared Tailwind CSS configuration
- `eslint-config`: Shared ESLint configurations
- `tsconfig`: Shared TypeScript configurations

## Development

### Installation

```bash
# Install dependencies
npm install
```

### Running the Development Server

```bash
# Run the main application in development mode
npm run dev

# Run specific applications or packages
npm run dev --filter=@repo/main
```

### Building for Production

```bash
# Build all applications and packages
npm run build

# Build specific applications
npm run build --filter=@repo/main
```

## Adding a New Application

1. Create a new directory in `apps/` (e.g., `apps/blog`)
2. Set up the application with dependencies on shared packages:
```json
{
  "name": "@repo/blog",
  "dependencies": {
    "@repo/ui": "*",
    "@repo/utils": "*"
  },
  "devDependencies": {
    "@repo/eslint-config": "*",
    "@repo/tailwind-config": "*",
    "@repo/tsconfig": "*"
  }
}
```

## Deploying to Netlify

This monorepo is set up for deployment to Netlify. The `netlify.toml` file has been configured to:

1. Use `npm run netlify:build` as the build command
2. Publish the `apps/main/dist` directory
3. Set appropriate environment variables and configurations

## Useful Turborepo Commands

- `npm run build` - Build all applications and packages
- `npm run dev` - Develop all applications and packages
- `npm run lint` - Lint all applications and packages
- `npm run clean` - Clean all applications and packages

## Documentation

- [Turborepo](https://turbo.build/repo/docs)
- [Vite](https://vitejs.dev/)
- [Netlify](https://docs.netlify.com/)