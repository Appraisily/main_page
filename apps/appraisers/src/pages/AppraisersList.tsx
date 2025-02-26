import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - would come from an API in a real app
const MOCK_APPRAISERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Fine Art',
    location: 'New York, NY',
    rating: 4.8,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Antique Furniture',
    location: 'San Francisco, CA',
    rating: 4.7,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    specialty: 'Jewelry & Gems',
    location: 'Chicago, IL',
    rating: 4.9,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: '4',
    name: 'David Williams',
    specialty: 'Collectibles',
    location: 'Los Angeles, CA',
    rating: 4.6,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: '5',
    name: 'Olivia Smith',
    specialty: 'Asian Antiques',
    location: 'Boston, MA',
    rating: 4.7,
    verified: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    id: '6',
    name: 'James Wilson',
    specialty: 'Modern Art',
    location: 'Miami, FL',
    rating: 4.5,
    verified: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg'
  }
];

export default function AppraisersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  
  // Filter appraisers based on search and filters
  const filteredAppraisers = MOCK_APPRAISERS.filter(appraiser => {
    const matchesSearch = appraiser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appraiser.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appraiser.location.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesSpecialty = specialty === '' || appraiser.specialty === specialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Find an Appraiser</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, specialty, or location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select
              id="specialty"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Fine Art">Fine Art</option>
              <option value="Antique Furniture">Antique Furniture</option>
              <option value="Jewelry & Gems">Jewelry & Gems</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Asian Antiques">Asian Antiques</option>
              <option value="Modern Art">Modern Art</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <p className="text-gray-600 mb-4">Showing {filteredAppraisers.length} appraisers</p>
      
      {/* Appraisers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppraisers.map(appraiser => (
          <Link 
            key={appraiser.id}
            to={`/appraisers/${appraiser.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                src={appraiser.imageUrl} 
                alt={appraiser.name}
                className="object-cover h-48 w-full"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{appraiser.name}</h3>
                {appraiser.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{appraiser.specialty}</p>
              <p className="text-gray-600 text-sm mb-2">{appraiser.location}</p>
              <div className="flex items-center">
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
                <span className="ml-2 text-gray-600">{appraiser.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* No Results */}
      {filteredAppraisers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appraisers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
} 