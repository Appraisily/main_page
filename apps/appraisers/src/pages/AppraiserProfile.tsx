import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Mock data - would come from an API in a real app
const MOCK_APPRAISERS = {
  '1': {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Fine Art',
    location: 'New York, NY',
    rating: 4.8,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    certifications: ['International Society of Appraisers', 'American Society of Appraisers'],
    experience: '15+ years',
    bio: 'Sarah is a highly regarded fine art appraiser specializing in 19th and 20th century American and European paintings. With over 15 years of experience, she has worked with major museums, galleries, and private collectors.',
    expertise: ['19th Century Art', '20th Century Art', 'American Paintings', 'European Paintings'],
    services: ['Insurance Appraisals', 'Estate Valuation', 'Donation Appraisals', 'Collection Management'],
    education: ['M.A. Art History, Columbia University', 'B.A. Fine Arts, NYU'],
    contactInfo: {
      email: 'sarah.johnson@example.com',
      phone: '(212) 555-1234',
      website: 'www.sarahjohnsonappraisals.com'
    },
    reviews: [
      { id: 1, name: 'Robert Miller', rating: 5, content: 'Sarah provided an extremely thorough appraisal of my collection. Her knowledge of the market is exceptional.' },
      { id: 2, name: 'Lisa Wong', rating: 5, content: 'I needed an appraisal for insurance purposes, and Sarah delivered a comprehensive report with excellent documentation.' },
      { id: 3, name: 'Michael Davis', rating: 4, content: 'Professional, knowledgeable, and responsive throughout the entire process.' }
    ]
  }
};

export default function AppraiserProfile() {
  const { id } = useParams<{ id: string }>();
  
  // In a real application, you would fetch this data from an API
  const appraiser = id ? MOCK_APPRAISERS[id] : null;
  
  if (!appraiser) {
    return (
      <>
        <SEO 
          title="Appraiser Not Found | Appraisers Directory"
          description="The appraiser you're looking for could not be found. Browse our directory to find qualified art and antique appraisers."
        />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Appraiser Not Found</h1>
          <p className="mb-6">The appraiser you're looking for doesn't exist or has been removed.</p>
          <Link to="/appraisers" className="text-gray-900 underline">Return to appraisers list</Link>
        </div>
      </>
    );
  }
  
  return (
    <>
      <SEO 
        title={`${appraiser.name} - ${appraiser.specialty} Appraiser | Appraisers Directory`}
        description={`${appraiser.name} is a ${appraiser.specialty} appraiser with ${appraiser.experience} of experience. Based in ${appraiser.location}, offering professional appraisal services.`}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/appraisers" className="inline-flex items-center text-gray-900 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Appraisers
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-64 w-full object-cover md:w-64" 
                src={appraiser.imageUrl} 
                alt={appraiser.name} 
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{appraiser.name}</h1>
                {appraiser.verified && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Verified Appraiser
                  </span>
                )}
              </div>
              
              <div className="mt-2 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < Math.floor(appraiser.rating) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{appraiser.rating} ({appraiser.reviews.length} reviews)</span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <span className="text-gray-600">Specialty:</span>
                  <span className="ml-2 font-medium">{appraiser.specialty}</span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2 font-medium">{appraiser.location}</span>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <span className="ml-2 font-medium">{appraiser.experience}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-700">{appraiser.bio}</p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Areas of Expertise</h3>
                <ul className="space-y-1 list-disc list-inside text-gray-700">
                  {appraiser.expertise.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Services Offered</h3>
                <ul className="space-y-1 list-disc list-inside text-gray-700">
                  {appraiser.services.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Education & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-600 font-medium">Education</h4>
                  <ul className="mt-1 space-y-1 list-disc list-inside text-gray-700">
                    {appraiser.education.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-600 font-medium">Certifications</h4>
                  <ul className="mt-1 space-y-1 list-disc list-inside text-gray-700">
                    {appraiser.certifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-600 block">Email</span>
                <a href={`mailto:${appraiser.contactInfo.email}`} className="text-gray-900 hover:underline">
                  {appraiser.contactInfo.email}
                </a>
              </div>
              <div>
                <span className="text-gray-600 block">Phone</span>
                <a href={`tel:${appraiser.contactInfo.phone}`} className="text-gray-900 hover:underline">
                  {appraiser.contactInfo.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-600 block">Website</span>
                <a href={`https://${appraiser.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">
                  {appraiser.contactInfo.website}
                </a>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
            
            <div className="space-y-6">
              {appraiser.reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 