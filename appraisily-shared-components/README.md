# Appraisily Shared Components

A library of shared UI components for Appraisily subdomains.

## Installation

```bash
npm install @appraisily/shared-components
```

## Usage

```jsx
import { Header, Footer } from '@appraisily/shared-components';
import '@appraisily/shared-components/dist/styles.css'; // Import styles

function App() {
  return (
    <div>
      <Header currentSubdomain="main" />
      <main>Your app content</main>
      <Footer currentSubdomain="main" />
    </div>
  );
}
```

## Components

### Header

```jsx
<Header 
  currentSubdomain="main"
  user={user}
  isAuthenticated={isAuthenticated}
  onLogin={() => {}}
  onLogout={() => {}}
/>
```

### Footer

```jsx
<Footer currentSubdomain="main" />
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode for development
npm run dev
```
