import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Team', href: '/team' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://ik.imagekit.io/appraisily/WebPage/logo%20(1).jpg?updatedAt=1730826345943" 
                alt="Appraisily Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">Appraisily</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  location.pathname === link.href ? 'text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/start"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors gap-1"
            >
              Start Appraisal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/start"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Start
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 ${
                  location.pathname === link.href ? 'text-blue-600' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}