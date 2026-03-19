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

import { useParams, Navigate } from 'react-router-dom';

export const ServiceAreasHub: React.FC = () => {
  const { area } = useParams<{ area: string }>();

  if (area) {
    const activeArea = SERVICE_AREAS.find(a => a.path.includes(area));
    if (!activeArea) return <Navigate to="/service-areas" replace />;

    return (
      <div className="py-16 bg-white min-h-screen">
        <SEO
          title={`Pool Cages & Screen Enclosures in ${activeArea.name}`}
          description={`Top-rated aluminum construction in ${activeArea.cities.join(', ')}. Expert pool cages, screen repairs, and lanais by Loaiza5 Aluminum.`}
          canonical={`/service-areas/${area}`}
        />
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{activeArea.name} Aluminum Contractors</h1>
          <p className="text-lg text-gray-600">Proudly providing premium pool enclosures and screen rooms in <strong>{activeArea.cities.join(', ')}</strong>.</p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-cream p-10 rounded-xl border border-primary/20 shadow-md text-center">
             <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your outdoor space?</h2>
             <p className="text-gray-700 mb-8 text-lg">Our experts are stationed in {activeArea.name} and ready to give you a free estimate.</p>
             <Link to="/contact" className="bg-primary hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition-colors inline-block">
                Get a Free Quote in {activeArea.name}
             </Link>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/service-areas" className="text-primary hover:underline font-semibold flex items-center justify-center gap-2">
               ← Back to All Service Areas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white min-h-screen">
      <SEO
        title="Florida Service Areas | Tampa, Orlando, Southwest FL Pool Cages"
        description="Loaiza5 Aluminum LLC serves all of Florida. From Tampa Bay to South Florida, count on us for professional pool cage and screen installations."
        canonical="/service-areas"
      />
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Areas We Serve in Florida</h1>
        <p className="text-lg text-gray-600">Find reliable aluminum contractors near you.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICE_AREAS.map(a => (
          <Link key={a.id} to={a.path} className="bg-cream p-8 rounded-lg border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2 group-hover:text-sky-700">
              <MapPin className="w-6 h-6" />
              {a.name}
            </h2>
            <ul className="space-y-2 mb-6">
              {a.cities.map(city => (
                <li key={city} className="text-gray-700 border-b border-gray-200 pb-1 last:border-0">{city}</li>
              ))}
            </ul>
            <span className="text-sm font-semibold text-primary underline">View Service Area</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

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