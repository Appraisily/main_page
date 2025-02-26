import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About the Appraiser Directory</h1>
      <p className="text-lg mb-8">
        This directory is a comprehensive resource for finding qualified appraisers
        specializing in art, antiques, collectibles, and other valuable items.
      </p>
      
      <div className="prose prose-lg max-w-none">
        <h2>Our Mission</h2>
        <p>
          Our mission is to connect collectors, estates, insurance companies, and individuals
          with qualified appraisers who can provide accurate valuations and expert opinions.
        </p>
        
        <h2>Appraiser Verification</h2>
        <p>
          All appraisers listed in our directory undergo a verification process to ensure
          they have the appropriate credentials, experience, and professional standing
          to provide reliable appraisal services.
        </p>
        
        <h2>How to Use This Directory</h2>
        <p>
          You can search for appraisers by specialty, location, or credentials. Each appraiser
          profile includes their areas of expertise, professional background, contact information,
          and testimonials from past clients.
        </p>
      </div>
    </div>
  );
} 