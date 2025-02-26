import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Art & Antique Appraisers Directory | Find Expert Appraisers"
        description="Find qualified art and antique appraisers for your valuable items. Search our directory of certified professionals by specialty and location."
      />
      
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Art & Antique Appraisers Directory</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Find qualified appraisers for your valuable items. Our directory connects you with trusted professionals who specialize in various types of art and antiques.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Search by Specialty</h2>
            <p className="mb-4">Find appraisers who specialize in specific categories such as fine art, furniture, jewelry, or collectibles.</p>
            <Link to="/appraisers" className="text-gray-900 font-medium underline">
              Browse specialties
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Filter by Location</h2>
            <p className="mb-4">Locate appraisers in your area or find those willing to work remotely for your convenience.</p>
            <Link to="/appraisers" className="text-gray-900 font-medium underline">
              Find local appraisers
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Verified Credentials</h2>
            <p className="mb-4">Our directory features appraisers with verified credentials and professional experience in their fields.</p>
            <Link to="/about" className="text-gray-900 font-medium underline">
              Learn about verification
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 