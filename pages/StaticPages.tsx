import React from 'react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../constants';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <div className="py-16 bg-cream min-h-screen">
    <SEO
      title="About Our Aluminum Experts | 10+ Years Experience"
      description="Learn more about Loaiza5 Aluminum LLC. A family-owned, trusted aluminum construction company supplying Florida homeowners with durable pool cages and enclosures."
      canonical="/about"
    />
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Loaiza5 Aluminum LLC</h1>
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          For over 10 years, <strong>{BUSINESS_INFO.name}</strong> has been providing top-tier aluminum construction services across the state of Florida.
          As a family-owned and operated business, we treat every home as if it were our own.
        </p>
        <p>
          We specialize in designing and building durable, high-quality pool cages, screen rooms, and lanais that withstand the harsh Florida climate.
          Our mission is to help homeowners reclaim their outdoor spaces from bugs, debris, and intense sun, allowing you to enjoy the beautiful weather year-round.
        </p>
        <h2 className="text-2xl font-bold text-primary mt-8">Our Core Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Quality Integrity:</strong> We never cut corners on materials or fasteners.</li>
          <li><strong>Safety First:</strong> Whether it's a new build or a dangerous tear-down, safety is paramount.</li>
          <li><strong>Customer Focus:</strong> Clear communication and respecting your property is our standard.</li>
        </ul>
      </div>
    </div>
  </div>
);

export const ServiceAreasHub: React.FC = () => (
  <div className="py-16 bg-white min-h-screen">
    <SEO
      title="Service Areas | Tampa, Orlando, Miami & Southwest Florida"
      description="Loaiza5 Aluminum LLC serves the entire state of Florida. From Tampa Bay to South Florida, count on us for professional pool cage and screen installations."
      canonical="/service-areas"
    />
    <div className="max-w-7xl mx-auto px-4 text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Areas We Serve</h1>
      <p className="text-lg text-gray-600">Proudly serving homeowners throughout the entire state of Florida.</p>
    </div>
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SERVICE_AREAS.map(area => (
        <div key={area.id} className="bg-cream p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {area.name}
          </h2>
          <ul className="space-y-2 mb-6">
            {area.cities.map(city => (
              <li key={city} className="text-gray-700 border-b border-gray-200 pb-1 last:border-0">{city}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div className="py-16 max-w-3xl mx-auto px-4 prose prose-sky">
    <h1>Privacy Policy</h1>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <p>At {BUSINESS_INFO.name}, we are committed to protecting your privacy. This policy outlines how we handle your data.</p>
    <h3>Information We Collect</h3>
    <p>We collect information you provide directly to us via our contact forms, including name, phone number, email, and address.</p>
    <h3>How We Use Your Information</h3>
    <p>We use this information solely to provide quotes, schedule services, and communicate regarding your project. We do not sell your data to third parties.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="py-16 max-w-3xl mx-auto px-4 prose prose-sky">
    <h1>Terms of Service</h1>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <h3>Agreement</h3>
    <p>By using this website and requesting our services, you agree to these terms.</p>
    <h3>Estimates</h3>
    <p>Quotes provided online are estimates based on provided information. Final pricing is subject to on-site inspection.</p>
  </div>
);