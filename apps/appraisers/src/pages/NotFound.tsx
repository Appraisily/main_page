import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found | Appraisers Directory"
        description="The page you are looking for doesn't exist. Navigate back to our appraiser directory to find qualified art and antique appraisers."
      />
      
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/"
            className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            Return Home
          </Link>
          
          <Link 
            to="/appraisers"
            className="border border-gray-900 text-gray-900 px-5 py-2 rounded-md hover:bg-gray-100"
          >
            Browse Appraisers
          </Link>
        </div>
      </div>
    </>
  );
} 