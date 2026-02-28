import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, SERVICE_AREAS } from '../constants';
import { IMAGES } from '../images';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-gray-300 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={IMAGES.LOGO}
                alt={`${BUSINESS_INFO.name} Logo`}
                className="h-10 w-auto object-contain bg-white/10 rounded px-1"
              />
              <span className="text-white font-bold text-lg">{BUSINESS_INFO.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner for aluminum structures in Florida. Quality materials, clear communication, and over {BUSINESS_INFO.experience} of experience.
            </p>
            <div className="space-y-2 pt-2">
              <a href={`tel:+${BUSINESS_INFO.phoneClean}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-accent" />
                {BUSINESS_INFO.phone}
              </a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                {BUSINESS_INFO.email}
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                {BUSINESS_INFO.location}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to={service.path} className="text-sm hover:text-accent transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Service Areas</h3>
            <ul className="space-y-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area.id}>
                  <Link to={area.path} className="text-sm hover:text-accent transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="text-sm hover:text-accent transition-colors">Project Gallery</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-accent transition-colors">Request a Quote</Link></li>
              <li><Link to="/privacy-policy" className="text-sm hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col items-center justify-center text-center text-sm text-gray-500 gap-2">
          <p>&copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p>
            Made by{' '}
            <a href="https://tymasolutions.lat" target="_blank" rel="noopener noreferrer" className="font-bold tracking-wide hover:opacity-80 transition-opacity">
              <span className="text-sky-400">tyma</span>
              <span className="text-white">solutions</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;