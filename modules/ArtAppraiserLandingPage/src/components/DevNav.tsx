import React from 'react';
import { Palette, UserCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DevNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-4">
      <button
        onClick={() => navigate('/painting-value')}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-200 ${
          location.pathname === '/painting-value'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Palette className="h-4 w-4" />
        Painting Value
      </button>
      <button
        onClick={() => navigate('/art-appraiser')}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-200 ${
          location.pathname === '/art-appraiser'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <UserCheck className="h-4 w-4" />
        Art Appraiser
      </button>
    </div>
  );
};

export default DevNav;