import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LogIn, User, LogOut } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, authenticated, logout, loading } = useAuth();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Directory', href: 'https://art-appraiser-directory.appraisily.com/', external: true },
    { name: 'Screener', href: 'https://screener.appraisily.com/', external: true }
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 top-0 left-0 right-0 will-change-transform",
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
          <div className="hidden md:flex items-center space-x-3">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors",
                          "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        )}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors",
                          location.pathname === item.href
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth buttons - Desktop */}
            <div className="flex items-center space-x-2">
              {loading ? (
                <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
              ) : authenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="inline-flex items-center justify-center px-2.5 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {user?.firstName || 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center px-2.5 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-2.5 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Log In
                </Link>
              )}
              <Link
                to="/start"
                id="start-appraisal-nav"
                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors gap-1.5 shadow-sm hover:shadow-md"
              >
                Start Appraisal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {authenticated ? (
              <Link
                to="/profile"
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Log In</span>
              </Link>
            )}
            <Link
              to="/start"
              id="start-appraisal-nav-mobile"
              className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
            >
              Start
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {navItems.map((item) => (
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
            {authenticated ? (
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
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  Log In
                </Link>
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
}