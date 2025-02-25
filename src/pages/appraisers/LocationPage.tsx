import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Appraiser, City } from './types';

// This would be imported from your data source
import { fetchAppraisersByCity, fetchCityBySlug } from './api';

const LocationPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [appraisers, setAppraisers] = useState<Appraiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (!citySlug) {
          throw new Error("City slug is required");
        }
        
        setLoading(true);
        // These functions would fetch data from your API or static data
        const cityData = await fetchCityBySlug(citySlug);
        const appraisersData = await fetchAppraisersByCity(citySlug);
        
        setCity(cityData);
        setAppraisers(appraisersData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appraisers for this location');
        setLoading(false);
        console.error(err);
      }
    }

    loadData();
  }, [citySlug]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-xl">Loading location data...</div>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error || "Location not found"}</p>
          <Link to="/appraisers" className="underline mt-2 inline-block">
            Return to Appraiser Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Art Appraisers in {city.name}, {city.state} | Appraisily</title>
        <meta 
          name="description" 
          content={`Find qualified art appraisers in ${city.name}, ${city.state}. Professional art appraisal services for all types of artwork, antiques, and collectibles.`}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Art Appraisers in {city.name}, {city.state}
        </h1>

        <p className="text-gray-600 mb-8">
          {city.numberOfAppraisers} Professional Art {city.numberOfAppraisers === 1 ? 'Appraiser' : 'Appraisers'} Available
        </p>

        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/appraisers" className="hover:text-blue-600">Appraiser Directory</Link>
          <span className="mx-2">›</span>
          <Link to={`/state/${city.stateSlug}`} className="hover:text-blue-600">{city.state}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{city.name}</span>
        </div>

        {/* Appraisers List */}
        <div className="space-y-8 mb-12">
          {appraisers.length === 0 ? (
            <p className="text-gray-700">No appraisers found in this location. Please try another location.</p>
          ) : (
            appraisers.map((appraiser) => (
              <div key={appraiser.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {appraiser.image && (
                    <div className="w-32 h-32 flex-shrink-0">
                      <img 
                        src={appraiser.image} 
                        alt={appraiser.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      <Link to={`/appraiser/${appraiser.slug}`} className="hover:text-blue-600">
                        {appraiser.name}
                      </Link>
                    </h2>
                    {appraiser.title && <p className="text-gray-600 mb-2">{appraiser.title}</p>}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {appraiser.credentials.map((credential, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {credential}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">{appraiser.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mr-1">Specialties:</h3>
                      {appraiser.specialties.map((specialty, index) => (
                        <span key={index} className="text-sm text-gray-600">
                          {specialty}{index < appraiser.specialties.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      to={`/appraiser/${appraiser.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPage; 