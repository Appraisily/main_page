import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Appraisily</span>
            </div>
            <p className="mt-4 text-gray-400">
              Professional online art and antique appraisals. Get accurate valuations from certified experts.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/services" className="text-base text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-300 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/screener" className="text-base text-gray-300 hover:text-white">
                  Free AI Art Analysis
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/landing" className="text-base text-gray-300 hover:text-white">
                  Landing Page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@appraisily.com" className="text-gray-300 hover:text-white">
                  info@appraisily.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Appraisily. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}