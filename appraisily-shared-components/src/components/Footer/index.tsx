import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, Globe, Link2, Phone } from 'lucide-react';
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

  // Helper function to conditionally apply classes
  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  return (
    <footer className="footer-container">
      {/* Background Elements */}
      <div className="footer-background">
        {/* Base gradient */}
        <div className="footer-gradient-base" />
        
        {/* Grid pattern */}
        <div className="footer-blob" />
        
        {/* Grid overlay */}
        <div className="footer-grid-overlay" />
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-company-info">
            <div className="footer-logo">
              <img 
                src={logoUrl}
                alt={`${companyName} Logo`}
                className="footer-logo-image"
                loading="lazy"
              />
              <span className="footer-company-name">{companyName}</span>
            </div>
            <p className="footer-description">
              {description}
            </p>
            <a href={callToAction.href} className="footer-cta-button">
              {callToAction.text} <ArrowRight className="footer-cta-icon" />
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="footer-links-column">
            <h3 className="footer-column-title">
              <Link2 className="footer-icon-small" /> Quick Links
            </h3>
            <ul className="footer-links-list">
              {mergedLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a 
                      href={link.href}
                      className="footer-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className="footer-link"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Network */}
          <div className="footer-links-column">
            <h3 className="footer-column-title">
              <Globe className="footer-icon-small" /> Our Network
            </h3>
            <ul className="footer-links-list">
              {mergedLinks.submodules.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="footer-link"
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
          <div className="footer-links-column">
            <h3 className="footer-column-title">
              <Phone className="footer-icon-small" /> Contact Us
            </h3>
            <div className="footer-contact-info">
              <a 
                href={`mailto:${contactEmail}`}
                className="footer-contact-link"
              >
                <Mail className="footer-icon-small" />
                {contactEmail}
              </a>
              <div className="footer-social">
                {mergedLinks.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="footer-social-link"
                      aria-label={`Visit our ${social.name} page`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="footer-social-icon" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-separator"></div>
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <span className="footer-copyright-symbol">©</span>
              <span className="footer-copyright-year">{new Date().getFullYear()} {companyName}.</span>
              <span className="footer-copyright-text">All rights reserved.</span>
            </div>
            <nav className="footer-legal-nav">
              {mergedLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="footer-legal-link"
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