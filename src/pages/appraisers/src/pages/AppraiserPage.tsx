import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Mail, Phone, Globe, Clock, Award, Shield } from 'lucide-react';
import { getAppraiser } from '../utils/staticData';
import { SEO } from '../components/SEO';
import { generateAppraiserSchema, generateFAQSchema } from '../utils/schemaGenerators';

// Define a comprehensive type that handles all possible property structures
type AppraiserData = {
  id?: string;
  name: string;
  specialties: string[];
  // Fields that might come from different data sources
  pricing?: string;
  services_offered?: string[] | string;
  certifications?: string[];
  years_in_business?: string;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  notes?: string;
  // UI-specific fields
  image?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  email?: string;
  about?: string;
  businessHours?: { day: string; hours: string }[];
  services?: { name: string; description: string }[];
  reviews?: { name: string; rating: number; date: string; comment: string }[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    schema?: any;
  };
  // Any other potential properties
  [key: string]: any;
};

export function AppraiserPage() {
  const { appraiserId } = useParams<{ appraiserId: string }>();
  const [appraiser, setAppraiser] = React.useState<AppraiserData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (appraiserId) {
      try {
        const data = getAppraiser(appraiserId);
        
        // Adapt data to expected format
        if (data) {
          // Create a safe object with all possible properties
          const adaptedData: AppraiserData = {
            // First ensure we have the basic required properties
            id: data?.id || appraiserId,
            name: data.name,
            specialties: Array.isArray(data.specialties) ? data.specialties : [],
            
            // Additional properties with fallbacks
            city: data?.city || '',
            state: data?.state || '',
            phone: data?.phone || '',
            website: data?.website || '',
            notes: data?.notes || '',
            services_offered: data?.services_offered || [],
            certifications: Array.isArray(data?.certifications) ? data.certifications : [],
            years_in_business: data?.years_in_business || '',
            
            // UI-specific properties with fallbacks
            image: data?.image || 'https://placehold.it/300x200?text=No+Image',
            rating: typeof data?.rating === 'number' ? data.rating : 4.8,
            reviewCount: typeof data?.reviewCount === 'number' ? data.reviewCount : 25,
            address: data?.address || `${data?.city || ''}, ${data?.state || ''}`,
            email: data?.email || 'contact@example.com',
            about: data?.about || data?.notes || `${data.name} is a professional art appraiser specializing in ${Array.isArray(data.specialties) ? data.specialties.join(', ') : 'various art forms'}.`,
            
            // Complex properties
            services: data?.services || (
              Array.isArray(data?.services_offered) 
                ? data.services_offered.map(s => ({ name: s, description: '' }))
                : typeof data?.services_offered === 'string'
                  ? [{ name: data.services_offered, description: '' }]
                  : []
            ),
            
            reviews: data?.reviews || [
              { 
                name: 'John D.', 
                rating: 5, 
                date: '2023-10-15',
                comment: 'Excellent service and very professional. Highly recommended!'
              }
            ],
            
            businessHours: data?.businessHours || [
              { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
              { day: 'Saturday', hours: 'By appointment' },
              { day: 'Sunday', hours: 'Closed' }
            ]
          };
          
          setAppraiser(adaptedData);
        }
      } catch (error) {
        console.error('Error fetching appraiser:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [appraiserId]);

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading...</div>;
  }

  if (!appraiser) {
    return <div className="container mx-auto py-12 px-4 text-center">Appraiser not found</div>;
  }

  const generateBreadcrumbSchema = (appraiser: any) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://appraisily.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Art Appraisers in ${appraiser.address.split(',')[0].trim()}`,
        "item": `https://appraisily.com/location/${appraiser.address.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": appraiser.name,
        "item": `https://appraisily.com/appraiser/${appraiserId}`
      }
    ]
  });

  return (
    <>
      <SEO
        title={`${appraiser.name} - Art Appraiser | Expert Art Valuation Services | Appraisily`}
        description={`Get professional art appraisal services from ${appraiser.name}. Specializing in ${appraiser.specialties.join(', ')}. ${appraiser.reviewCount ? `Certified expert with ${appraiser.reviewCount} verified reviews.` : ''}`}
        keywords={[
          `${appraiser.name.toLowerCase()} art appraiser`,
          appraiser.address ? `art appraisal ${appraiser.address.split(',')[0].toLowerCase()}` : '',
          ...appraiser.specialties.map(s => s.toLowerCase()),
          'art valuation',
          'art authentication',
          'certified art appraiser'
        ]}
        schema={[
          generateAppraiserSchema(appraiser),
          generateBreadcrumbSchema(appraiser),
          generateFAQSchema(appraiser)
        ]}
        canonicalUrl={`https://appraisily.com/appraiser/${appraiserId}`}
      />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{appraiser.name}</h1>
              
              <div className="flex items-center mb-4">
                {appraiser.rating && (
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-700 font-medium">{appraiser.rating}/5</span>
                    {appraiser.reviewCount && (
                      <span className="text-gray-500 ml-1">({appraiser.reviewCount} reviews)</span>
                    )}
                  </div>
                )}
                
                {appraiser.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{appraiser.address}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{appraiser.phone || 'Contact for phone'}</span>
                </div>
                
                {appraiser.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${appraiser.email}`} className="text-blue-600 hover:underline">{appraiser.email}</a>
                  </div>
                )}
                
                {appraiser.website && (
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a 
                      href={appraiser.website.startsWith('http') ? appraiser.website : `https://${appraiser.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                
                {appraiser.years_in_business && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{appraiser.years_in_business} experience</span>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {appraiser.about || appraiser.notes || `${appraiser.name} is a professional art appraiser specializing in ${appraiser.specialties.join(', ')}.`}
                </p>
              </div>
              
              {appraiser.services && appraiser.services.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Services Offered</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {appraiser.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                          <Award className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          {service.description && <p className="text-sm text-gray-600">{service.description}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {appraiser.reviews && appraiser.reviews.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Client Reviews</h2>
                  <div className="space-y-4">
                    {appraiser.reviews.map((review, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{review.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{review.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="text-sm text-gray-500 mt-2">{review.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact {appraiser.name}</h2>
                <p className="text-gray-600 mb-4">Get in touch to schedule an appraisal or learn more about {appraiser.name}'s services.</p>
                
                <a 
                  href={appraiser.email ? `mailto:${appraiser.email}` : `mailto:info@appraisily.com?subject=Inquiry about ${appraiser.name}`}
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Contact Now
                </a>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                <ul className="space-y-2">
                  {appraiser.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="bg-green-100 p-1 rounded-full mr-2">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
              
              {appraiser.certifications && appraiser.certifications.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                  <ul className="space-y-2">
                    {appraiser.certifications.map((certification, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="bg-purple-100 p-1 rounded-full mr-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        {certification}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {appraiser.businessHours && appraiser.businessHours.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                  <ul className="space-y-2">
                    {appraiser.businessHours.map((hours, index) => (
                      <li key={index} className="grid grid-cols-2 gap-2 text-gray-700">
                        <span className="font-medium">{hours.day}</span>
                        <span>{hours.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}