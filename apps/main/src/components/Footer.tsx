import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-blue-600">Appraisily</Link>
            <p className="text-gray-600 mt-2">Professional Art & Antique Appraisals</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/team" className="text-gray-600 hover:text-blue-600">
              Team
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Appraisily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}