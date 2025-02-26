import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Find Expert Appraisers</h1>
      <p className="text-lg mb-8">
        Connect with qualified art and antique appraisers specializing in various fields.
        Our directory includes experts with credentials and experience to provide accurate valuations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Search by Specialty</h3>
          <p>Find appraisers who specialize in specific categories like fine art, antiques, jewelry, and more.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Filter by Location</h3>
          <p>Connect with appraisers in your area or those who offer remote valuation services.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Verified Credentials</h3>
          <p>Browse professionals with verified credentials, certifications, and experience in the field.</p>
        </div>
      </div>
    </div>
  );
} 