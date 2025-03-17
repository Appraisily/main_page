import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const links = {
  quickLinks: [
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Free AI Art Analysis', href: 'https://screener.appraisily.com/' },
    { name: 'Terms of Service', href: '/terms' }
  ],
  submodules: [
    { name: 'Screener', href: 'https://screener.appraisily.com/' },
    { name: 'Appraiser Service', href: 'https://landing-appraisers.appraisily.com/' },
    { name: 'Art Appraisers Directory', href: 'https://art-appraiser-directory.appraisily.com/' },
    { name: 'Antique Appraisers Directory', href: 'https://antique-appraiser-directory.appraisily.com/' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ]
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-0 -left-4 w-3/4 h-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.08] animate-blob" />
        <div className="absolute -bottom-8 right-0 w-3/4 h-3/4 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.08] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 -left-4 w-3/4 h-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.08] animate-blob animation-delay-4000" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="flex items-center">
              <img 
                src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638"
                alt="Appraisily Logo"
                className="h-8 w-auto mr-3"
                loading="lazy"
              />
              <span className="text-2xl font-bold text-gray-900">Appraisily</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Professional online art and antique appraisals. Get accurate valuations from certified experts within 48 hours.
            </p>
            <Button 
              asChild
              variant="default"
              className="bg-gray-900 hover:bg-gray-800"
            >
              <a href="https://appraisily.com/start">
                Start Appraisal <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a 
                      href={link.href}
                      className={cn(
                        "text-gray-600 hover:text-gray-900 transition-colors",
                        "text-sm"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className={cn(
                        "text-gray-600 hover:text-gray-900 transition-colors",
                        "text-sm"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Network */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
              <Globe className="h-4 w-4 mr-2 text-blue-600" /> Our Network
            </h3>
            <ul className="space-y-3">
              {links.submodules.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className={cn(
                      "text-gray-600 hover:text-gray-900 transition-colors",
                      "text-sm"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@appraisily.com"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@appraisily.com
              </a>
              <div className="flex space-x-4">
                {links.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      aria-label={`Visit our ${social.name} page`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-8">
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-gray-600">©</span>
              <span className="text-gray-900 font-medium">{new Date().getFullYear()} Appraisily.</span>
              <span className="text-gray-600">All rights reserved.</span>
            </div>
            <nav className="flex items-center gap-6">
              {links.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}