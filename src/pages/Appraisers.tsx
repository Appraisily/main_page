import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Appraisers = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Find Art Appraisers | Appraisily</title>
        <meta 
          name="description" 
          content="Find qualified art appraisers in the US and Canada. Our comprehensive directory helps you locate professional appraisers specializing in various art forms and collectibles."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Art Appraiser Directory</h1>
        
        <div className="prose prose-lg mb-8">
          <p>
            Welcome to our comprehensive directory of qualified art appraisers across the United States and Canada. 
            Find professional appraisers specializing in various art forms, antiques, and collectibles.
          </p>
          <p>
            Each appraiser profile includes their credentials, specialties, location, and contact information
            to help you find the right expert for your appraisal needs.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Use Our Directory?</h2>
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-blue-600 mr-2">✓</span>
              <span>All listed appraisers are verified professionals</span>
            </li>
            <li className="flex">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Find experts specialized in your specific type of art or collectible</span>
            </li>
            <li className="flex">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Locate appraisers near you with our geographical search</span>
            </li>
            <li className="flex">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Access detailed profiles with credentials and specialties</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Browse by Location</h3>
            <p className="mb-4">Find appraisers in your state or province</p>
            <a 
              href="/appraisers/locations/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Search by Location
            </a>
          </div>
          
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Browse by Specialty</h3>
            <p className="mb-4">Find appraisers by art type or specialty</p>
            <a 
              href="/appraisers/specialties/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Search by Specialty
            </a>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need an Appraisal?</h2>
          <p className="mb-6">
            If you're looking for a professional art appraisal, Appraisily offers comprehensive 
            appraisal services by certified experts.
          </p>
          <Link 
            to="/services" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Our Appraisal Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Appraisers; 