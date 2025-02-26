import React from 'react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Our Appraiser Directory | Art & Antique Appraisals"
        description="Learn about our directory of certified art and antique appraisers. Discover how we verify credentials and how to find the right expert for your valuation needs."
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">About the Appraiser Directory</h1>
        
        <p className="text-lg mb-10">
          Our directory connects collectors, estates, and institutions with qualified appraisers 
          who specialize in art, antiques, and collectibles. We're committed to maintaining 
          a trusted network of professionals with verified credentials and expertise.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p>
              We aim to make it simple to find qualified appraisers for your valuable items. 
              Whether you need an appraisal for insurance, estate planning, donation, or sale purposes, 
              our directory helps you connect with the right professional for your specific needs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Appraiser Verification</h2>
            <p>
              All appraisers listed in our directory undergo a verification process to confirm their 
              credentials, certifications, and experience. We review professional memberships, education, 
              and client references to ensure you're connecting with qualified experts.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How to Use This Directory</h2>
            <p>
              Browse our directory by specialty or location to find appraisers who match your needs. 
              Each profile includes details about the appraiser's expertise, experience, service area, 
              and contact information so you can reach out directly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 