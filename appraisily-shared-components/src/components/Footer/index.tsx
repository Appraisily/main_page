import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, Globe, Link2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import './styles.css';

export interface FooterProps {
  currentSubdomain?: 'main' | 'screener' | 'articles' | 'directory' | string;
  links?: {
    quickLinks?: Array<{ name: string; href: string }>;
    submodules?: Array<{ name: string; href: string }>;
    legal?: Array<{ name: string; href: string }>;
    social?: Array<{ name: string; icon: React.ElementType; href: string }>;
  };
  contactEmail?: string;
  logoUrl?: string;
  companyName?: string;
  description?: string;
  callToAction?: {
    text: string;
    href: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  currentSubdomain = 'main',
  links,
  contactEmail = 'info@appraisily.com',
  logoUrl = 'https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638',
  companyName = 'Appraisily',
  description = 'Professional online art and antique appraisals. Get accurate valuations from certified experts within 48 hours.',
  callToAction = { text: 'Start Appraisal', href: '/start' }
}) => {
  // Default links configuration
  const defaultLinks = {
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
      { name: 'Antique Appraisers Directory', href: 'https://antique-appraiser-directory.appraisily.com/' },
      { name: 'Articles', href: 'https://articles.appraisily.com/' }
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

  // Merge provided links with default links
  const mergedLinks = {
    quickLinks: links?.quickLinks || defaultLinks.quickLinks,
    submodules: links?.submodules || defaultLinks.submodules,
    legal: links?.legal || defaultLinks.legal,
    social: links?.social || defaultLinks.social
  };

  return (
    <footer className="relative overflow-hidden">
      {/* New improved background */}
      <div className="absolute inset-0">
        {/* Base gradient from white */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
        
        {/* Dotted grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Subtle wave pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.5 1.1 2.745 10.275 6.09 10.275 1.21 0 2.305-4.5 3.73-7.972.857-2.163 1.98-4.54 2.267-5.97.368-1.846.558-3.764.69-4.23.243-.863 1.187-.865 1.19-.03 0 .833-.087 2.365-.13 3.3a1.32 1.32 0 0 1-2.12.155 18.51 18.51 0 0 1-.537-1.932c-.16-.678-.325-1.37-.368-1.383a.77.77 0 0 0-1.088-.452c-.18.092-.15.28-.34.593-.9 1.5-1.758 3.342-3.152 5.395-1.423 2.095-2.883 3.89-4.5 5.972C20.94 20.933 19.306 20 17.5 20a5.27 5.27 0 0 1-.7-.05A13.62 13.62 0 0 1 16 19.75c-.13.16-.7.2-1.6.1-.932-.11-1.91-.31-2.95-.55a43.73 43.73 0 0 1-.625-.11 10.59 10.59 0 0 0-.585-.07c-.01-.004-.03 0-.012 0a2.19 2.19 0 0 0-.748.28 3.02 3.02 0 0 0-.562.43A3.17 3.17 0 0 0 8.328 20C6.615 20 5.3 18.1 5.3 15.77c0-2.62 1.67-4.83 4.027-4.83 2.205 0 3.673 1.984 3.673c2.617 0 4.33 2.2 4.33 4.83 0 1.165-.47 2.283-1.273 3.13a6.12 6.12 0 0 1-2.146 1.372z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 20px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="flex items-center">
              <img 
                src={logoUrl}
                alt={`${companyName} Logo`}
                className="h-8 w-auto mr-3"
                loading="lazy"
              />
              <span className="text-2xl font-bold text-gray-900">{companyName}</span>
            </div>
            <p className="text-gray-600 max-w-md">
              {description}
            </p>
            <Button 
              asChild
              variant="outline"
              className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
            >
              <a href={callToAction.href} className="w-full flex justify-center items-center">
                {callToAction.text} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          {/* Quick Links - added Link2 icon */}
          <div className="col-span-1 md:col-span-2 space-y-4 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
              <Link2 className="h-4 w-4 mr-2 text-gray-900" /> Quick Links
            </h3>
            <ul className="space-y-3 flex-grow">
              {mergedLinks.quickLinks.map((link) => (
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

          {/* Our Network - changed icon color to black */}
          <div className="col-span-1 md:col-span-3 space-y-4 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-900" /> Our Network
            </h3>
            <ul className="space-y-3 flex-grow">
              {mergedLinks.submodules.map((link) => (
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

          {/* Contact Info - added Phone icon and fixed alignment */}
          <div className="col-span-1 md:col-span-3 space-y-4 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-900" /> Contact Us
            </h3>
            <div className="space-y-3 flex-grow">
              <a 
                href={`mailto:${contactEmail}`}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                {contactEmail}
              </a>
              <div className="flex space-x-4">
                {mergedLinks.social.map((social) => {
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
              <span className="text-gray-900 font-medium">{new Date().getFullYear()} {companyName}.</span>
              <span className="text-gray-600">All rights reserved.</span>
            </div>
            <nav className="flex items-center gap-6">
              {mergedLinks.legal.map((link) => (
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
};

export default Footer;