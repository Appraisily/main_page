import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

interface CookieBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    onDecline?.();
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <div className="cookie-banner__inner">
          <Cookie className="cookie-banner__icon" />
          <div className="cookie-banner__body">
            <p className="cookie-banner__text">
              We use cookies to enhance your experience and analyze site usage.
              <a href="/privacy" className="cookie-banner__link">
                Learn more
              </a>
            </p>
            <div className="cookie-banner__actions">
              <button
                onClick={handleAccept}
                className="cookie-banner__button cookie-banner__button--primary"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="cookie-banner__button cookie-banner__button--secondary"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="cookie-banner__close"
          >
            <X className="cookie-banner__close-icon" />
          </button>
        </div>
      </div>
    </div>
  );
} 