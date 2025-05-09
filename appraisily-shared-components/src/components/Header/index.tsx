import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react';
import './styles.css';

export interface HeaderProps {
  currentSubdomain: 'main' | 'screener' | 'articles' | 'directory' | string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    [key: string]: any;
  } | null;
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  customLinks?: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
  navigationItems?: {
    about?: Array<{name: string; href: string; description?: string}>;
    services?: Array<{name: string; href: string; description?: string}>;
    expertise?: Array<{name: string; href: string; description?: string}>;
    knowledge?: Array<{name: string; href: string; description?: string}>;
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentSubdomain = 'main',
  user = null,
  isAuthenticated = false,
  onLogin = () => {},
  onLogout = () => {},
  customLinks,
  navigationItems
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  
  React.useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scrolling performance
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Default navigation items
  const defaultNavItems = {
    about: [
      { name: 'About Us', href: '/about', description: 'Learn about our mission and values' },
      { name: 'Our Team', href: '/team', description: 'Meet our expert appraisers' },
      { name: 'Qualified Appraisals', href: '/qualified-appraisals', description: 'Why professional appraisals matter' }
    ],
    services: [
      { name: 'Our Services', href: '/services', description: 'Explore our appraisal services' },
      { name: 'How It Works', href: '/how-it-works', description: 'Learn about our appraisal process' }
    ],
    expertise: [
      { name: 'Our Expertise', href: '/expertise', description: 'Areas of specialization' }
    ],
    knowledge: [
      { name: 'Articles', href: 'https://articles.appraisily.com/', description: 'Educational articles and market insights' },
      { name: 'Art Appraiser Directory', href: 'https://art-appraiser-directory.appraisily.com/', description: 'Find certified art appraisers in your area' },
      { name: 'Antique Appraiser Directory', href: 'https://antique-appraiser-directory.appraisily.com/', description: 'Connect with experienced antique appraisers' }
    ]
  };

  // Merge default navigation items with any custom items provided
  const mergedNavItems = {
    about: navigationItems?.about || defaultNavItems.about,
    services: navigationItems?.services || defaultNavItems.services,
    expertise: navigationItems?.expertise || defaultNavItems.expertise,
    knowledge: navigationItems?.knowledge || defaultNavItems.knowledge
  };

  // Default nav links for mobile view
  const defaultNavLinks = [
    { name: 'About', href: '/about' },
    { name: 'Qualified Appraisals', href: '/qualified-appraisals' },
    { name: 'Services', href: '/services' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Screener', href: 'https://screener.appraisily.com/', external: true }
  ];

  // Use custom links if provided, otherwise use default
  const navLinks = customLinks || defaultNavLinks;

  // Helper function to conditionally apply classes
  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  return (
    <nav className={cn(
      "header-nav fixed w-full z-50 top-0 left-0 right-0 will-change-transform",
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm md:shadow-md" 
        : "bg-white/80 backdrop-blur-md",
      "transition-[background,shadow] duration-300"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638" 
                alt="Appraisily Logo" 
                className="h-7 w-auto"
                loading="eager"
              />
              <span className="text-lg font-semibold text-gray-900">Appraisily</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-end w-full pl-8">
            <div className="flex items-center space-x-4">
              <nav className="header-nav-menu">
                <ul className="header-nav-list">
                  <li className="header-nav-item">
                    <button className="header-nav-trigger">About</button>
                    <div className="header-nav-content">
                      <div className="w-[280px] p-2">
                        {mergedNavItems.about.map((item) => (
                          <Link 
                            key={item.name}
                            to={item.href} 
                            className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <p className="text-sm text-gray-600">{item.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="header-nav-item">
                    <button className="header-nav-trigger">Services</button>
                    <div className="header-nav-content">
                      <div className="w-[250px] p-2">
                        {mergedNavItems.services.map((item) => (
                          <Link 
                            key={item.name}
                            to={item.href} 
                            className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <p className="text-sm text-gray-600">{item.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="header-nav-item">
                    <button className="header-nav-trigger">Expertise</button>
                    <div className="header-nav-content">
                      <div className="w-[250px] p-2">
                        {mergedNavItems.expertise.map((item) => (
                          <Link 
                            key={item.name}
                            to={item.href} 
                            className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <p className="text-sm text-gray-600">{item.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="header-nav-item">
                    <button className="header-nav-trigger">Knowledge</button>
                    <div className="header-nav-content">
                      <div className="w-[400px] p-3">
                        {mergedNavItems.knowledge.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 space-y-1 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <p className="text-sm text-gray-600">{item.description}</p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="header-nav-item">
                    <a
                      href="https://screener.appraisily.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="header-nav-link"
                    >
                      Screener
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <div className="header-dropdown">
                      <button className="header-dropdown-trigger">
                        <User className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate max-w-[150px]">
                        {user?.firstName || 'Profile'}
                        </span>
                      </button>
                      <div className="header-dropdown-content">
                        <Link to="/profile" className="header-dropdown-item">
                          <User className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Link>
                        <div className="header-dropdown-separator"></div>
                        <button onClick={onLogout} className="header-dropdown-item text-red-600">
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={onLogin}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </button>
                )}
                <Link
                  to="/start"
                  id="start-appraisal-nav"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
                >
                  Start Appraisal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
                <div className="header-dropdown">
                  <button className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors">
                    <User className="h-5 w-5 flex-shrink-0" />
                    <span className="sr-only">Profile Menu</span>
                  </button>
                  <div className="header-dropdown-content">
                    <Link to="/profile" className="w-full flex items-center header-dropdown-item">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                    <div className="header-dropdown-separator"></div>
                    <button onClick={onLogout} className="text-red-600 flex items-center header-dropdown-item">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Log In</span>
              </button>
            )}
            <Link
              to="/start"
              id="start-appraisal-nav-mobile"
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
            >
              Start
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className={cn(
            "px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg mx-2 rounded-xl",
            isScrolled ? "shadow-md" : ""
          )}>
            {navLinks.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
            {/* Mobile auth links */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  Log In
                </button>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;