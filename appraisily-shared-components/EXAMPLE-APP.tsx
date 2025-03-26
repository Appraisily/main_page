// Example App.tsx file for a subdomain using shared components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '@appraisily/shared-components';
import '@appraisily/shared-components/dist/styles.css';

// Import your authentication context if you have one
import { useAuth } from './auth/AuthContext';

// Import your page components
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

function App() {
  // Get auth state from your auth context
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Use the shared Header component */}
        <Header 
          currentSubdomain="screener" 
          user={user}
          isAuthenticated={isAuthenticated}
          onLogin={login}
          onLogout={logout}
          // Optionally customize navigation items for this subdomain
          navigationItems={{
            // Example of customizing just the expertise section
            expertise: [
              { name: 'AI Analysis', href: '/expertise/ai', description: 'Learn about our AI technology' },
              { name: 'Recognition Systems', href: '/expertise/recognition', description: 'How our recognition systems work' },
            ],
            // Other sections use defaults
          }}
        />
        
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        
        {/* Use the shared Footer component */}
        <Footer 
          currentSubdomain="screener"
          // Optionally customize footer for this subdomain
          description="AI-powered art analysis tool. Get instant insights about artwork style, artist, and estimated value."
          // Custom call to action for this subdomain
          callToAction={{
            text: "Analyze Your Art",
            href: "/analyze"
          }}
        />
      </div>
    </Router>
  );
}

export default App;