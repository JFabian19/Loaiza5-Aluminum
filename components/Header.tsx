import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO, DOMAIN } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navigationSchema = {
    "@context": "https://schema.org",
    "@graph": navLinks.map(link => ({
      "@type": "SiteNavigationElement",
      "name": link.name,
      "url": `${DOMAIN}${link.path}`
    }))
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white shadow-md">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(navigationSchema)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <img
              src="/image_11.png"
              alt={`${BUSINESS_INFO.name} Logo`}
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="font-bold text-gray-900 text-sm sm:text-lg md:text-xl tracking-tight leading-tight">
              {BUSINESS_INFO.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Call/CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:+1${BUSINESS_INFO.phoneClean}`} className="flex items-center gap-2 text-primary font-semibold hover:text-accent">
              <Phone className="w-4 h-4" />
              {BUSINESS_INFO.phone}
            </a>
            <Link
              to="/contact"
              className="bg-primary hover:bg-sky-700 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-all shadow-sm"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary p-2">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(link.path)
                  ? 'bg-sky-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={`tel:+1${BUSINESS_INFO.phoneClean}`}
                className="flex items-center gap-3 px-3 py-3 text-gray-800 font-semibold"
              >
                <Phone className="w-5 h-5 text-primary" />
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;