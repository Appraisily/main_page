import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Appraisily</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-gray-800 hover:text-blue-600 transition-colors">
                Team
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}