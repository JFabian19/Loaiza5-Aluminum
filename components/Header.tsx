import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, ChevronRight, Facebook } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO, DOMAIN } from '../constants';
import { IMAGES } from '../images';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

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
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(navigationSchema)}
        </script>
      </Helmet>

      {/* Top Bar for Desktop - Professional Touch */}
      <div className="hidden lg:flex bg-secondary text-gray-300 py-2 text-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex space-x-6">
            <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4 text-accent" />
              {BUSINESS_INFO.email}
            </a>
            <a href="https://www.facebook.com/loaiza5/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Facebook className="w-4 h-4 text-accent" />
              Facebook
            </a>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              Mon-Sat: 8:00 AM - 6:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`${isHome ? 'fixed' : 'sticky'} w-full z-40 transition-all duration-300 ${isHome && !scrolled ? 'lg:top-[40px] top-0' : 'top-0'} ${isTransparent ? 'bg-transparent lg:py-6 py-4' : scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4 shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <div className="relative overflow-hidden flex-shrink-0">
                <img
                  src={IMAGES.LOGO}
                  alt={`${BUSINESS_INFO.name} Logo`}
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                  width={112}
                  height={112}
                  decoding="async"
                />
              </div>
              <div className="flex flex-col flex-shrink-0">
                <span className={`font-extrabold text-[15px] sm:text-lg lg:text-xl tracking-tight leading-none uppercase transition-colors ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                  Loaiza5 Aluminum
                </span>
                <span className={`text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-widest uppercase mt-0.5 sm:mt-1 transition-colors ${isTransparent ? 'text-white/90' : 'text-primary'}`}>
                  Premium Enclosures
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all duration-200 group overflow-hidden ${isActive(link.path)
                      ? (isTransparent ? 'text-accent' : 'text-primary')
                      : (isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-primary')
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                  <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Action */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <a
                href={`tel:+${BUSINESS_INFO.phoneClean}`}
                className={`flex items-center gap-2 font-bold transition-colors group ${isTransparent ? 'text-white hover:text-accent' : 'text-gray-900 hover:text-primary'}`}
              >
                <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-xs font-semibold leading-none ${isTransparent ? 'text-white/80' : 'text-gray-500'}`}>Call Now</span>
                  <span className="text-base">{BUSINESS_INFO.phone}</span>
                </div>
              </a>
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile Actions Container (To make it less empty) */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:+${BUSINESS_INFO.phoneClean}`}
                className="flex items-center justify-center bg-primary text-white p-2.5 rounded-full shadow-sm hover:bg-sky-700 transition-colors animate-pulse"
                aria-label="Call Us"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>
              <Link
                to="/contact"
                className="hidden sm:flex bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-xs shadow-sm whitespace-nowrap"
              >
                Quote
              </Link>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg border shadow-sm transition-colors focus:ring-2 focus:ring-primary focus:outline-none ml-1 ${isTransparent
                    ? 'text-white bg-white/10 border-white/20 hover:bg-white/20'
                    : 'text-gray-900 bg-gray-50 border-gray-100 hover:bg-gray-100'
                  }`}
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOVED OUTSIDE OF <header> TO FIX Z-INDEX CONTEXT ISSUES */}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[85%] sm:w-80 bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <span className="font-extrabold text-primary text-xl uppercase tracking-tighter">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 border border-gray-200 rounded-full bg-white text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-bold tracking-wide transition-all ${isActive(link.path)
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              {link.name}
              <ChevronRight className={`w-5 h-5 ${isActive(link.path) ? 'text-white/70' : 'text-gray-400'}`} />
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
          <a
            href={`tel:+${BUSINESS_INFO.phoneClean}`}
            className="flex items-center justify-center gap-3 w-full bg-white border-2 border-sky-800 text-sky-800 font-bold py-4 rounded-xl hover:bg-primary/5 transition-all shadow-sm"
            aria-label={`Call us at ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-6 h-6" />
            {BUSINESS_INFO.phone}
          </a>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="flex justify-center w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-md transition-all uppercase tracking-wider text-sm"
          >
            Request Free Quote
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;