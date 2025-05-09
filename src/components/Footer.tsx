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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Base gradient - Soft Frosted-Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9fbff] via-[#e7efff] to-[#e3ecff]" />
        
        {/* Optional subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABBtJREFUWEe1l1uoVVUUhj/UJE0xTQQDC4seTFApoYKugpFE0U1C8imE7EHqQSuQHnp46EIRQRdIuklQQQR2wYeMLpJkXioTBMm8lJGVl/KG9ccs1mbtcy5n77PCZvac/xprjP+fa/xjtNBgJE0HDgNdQAcwHrgi/38FXAKOmdkhlza72oQkTQA2AYuAR3NLY4HTwO/AbmCfmV0aSoegASQtBD4AHsltPCLpBjAL+DyEKOe/boCkacDhIi2vAjOBbcByMzsSouJmA0iaA3xdRHIXWGFmO1Nrc8QASRuB9zOP/wRmmNmJ+pKGGCAp2D0H/JI5ujHb97kx2gFSXDpQcDLfzHY1m8Ah8SMGANOAw9lb/mtm9nKshqEGzAIOZc58aWYvxTg/ZADQW+A4+jE7NrXHQwxYC3yULTlgZotCnB9qwKJsn8dGrBuqgigDgFnAwcwTS6qmPmNS6h1kFcwCDmQXzcH8mF8HDEOuCZ0BYDqQ4vX/jcxsW1nkkrQaeLfEvptAZ3LYzL6JNaCKAWAHsDjb553AiLQnqS+WoDUGkLSsVBF/B/qANTPbX+ZQlTQMGQCsAlKK9htR0gyMydLiJ2AFsDPb/HuB2WZ2pTJD6rEMHYQfA6s7gO5sGt4CktZ/AD4F4tE0oEPSATNbEOJgkZZDUKokdXUCY4CvgBnA51nYkfweoA/4GjgIPJLqgJktiXG+ygzcY4CkWcD+7PHd2VdqCpDij95Ul8ws9fSuqhGIiUCVadiQ2WT2gKTV2RP6smMySZL3NKBnNLXjoQY8D+zKJOfMbG4ZgaQJwNfAC5kBu4GXs/CcGeMbqoVhBmBngRNzzaylKktmQBGxr64XmUUaXsUASa8B72QX3TczV+VkRrwBvJ89fy0VvLEGxBpQhhbfAt4skZHjZuaqvNr/SXoWSLuhdUhqzwBJLveqEE/MXNerc8O9dKOlBkiaCKQe4s1MTf4PwHPAceCp7MdTdXkfmGhmP1dZCTFrIKYWlO6B4lJJvpUu5fINfCW7Mw7D9mZ+UVkN02wGmhogaTzwbX7AHDCzNxqLjaQlWYrdEMnxmulnJbUjVKu5BvKSS1KciZdLC5KknsxVPeTIz0c9HU1vWYoaZkB7BJL0BPBT7rgn4bZmZ0QbGu3GQF9IaLbGAEnTspohrzDvAs+Y2W/t1gCSTgJPZyT0eqDFzH5qtwGu49M+0L2nGEiOm9nMdiOQlKri/MZL55yZvRAaB6rMQJr6Ul04aGYLQ52PLoiiDXBNaGZXQx2vYsAnwNJsNQ9k9X7TCijJgCVA2vtF9cEqw+AGjCrEE+lVM3NJWV8DRQLcJXKrNOFIoLgtOIU/DHSb2S9VZ6JWE45mw5HkqX5iXjB9D/wInALqL6f/ANX3xJ9qUYnGAAAAAElFTkSuQmCC")`
          }}
        />
        
        {/* Glass-blur effect (supported browsers only) */}
        <div className="absolute inset-0 backdrop-blur-sm backdrop-saturate-[1.8] bg-white/55" />
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