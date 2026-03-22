import React from 'react';
import { BUSINESS_INFO, SERVICE_AREAS, SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <div className="py-16 bg-cream min-h-screen">
    <SEO
      title="About Our Aluminum Experts | 15+ Years Experience"
      description="Learn more about Loaiza5 Aluminum LLC. A family-owned, trusted aluminum construction company supplying Florida homeowners with durable pool cages and enclosures."
      canonical="/about"
    />
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Loaiza5 Aluminum LLC</h1>
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          For over 15 years, <strong>{BUSINESS_INFO.name}</strong> has been providing top-tier aluminum construction services across the state of Florida.
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

        {/* CTA */}
        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Work With Us?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-primary hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors">
              Get a Free Quote
            </Link>
            <a
              href={`tel:+${BUSINESS_INFO.phoneClean}`}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

import { useParams, Navigate } from 'react-router-dom';

// Unique descriptive content per Service Area for SEO
const AREA_CONTENT: Record<string, {
  headline: string;
  intro: string;
  benefits: string[];
  closingText: string;
}> = {
  'tampa-bay': {
    headline: 'Tampa Bay\'s Trusted Aluminum Contractors',
    intro: 'From Clearwater beaches to Brandon backyards, Loaiza5 Aluminum has been serving Tampa Bay homeowners with premium pool cages, screen enclosures, and storm repairs for over 15 years. We understand the unique weather conditions of the Bay Area — from summer thunderstorms to hurricane season — and build structures designed to withstand it all.',
    benefits: [
      'Experienced with Tampa Bay building codes and permits',
      'Fast response times across Hillsborough, Pinellas & Pasco counties',
      'Hurricane-rated aluminum structures',
      'Trusted by hundreds of Tampa Bay families'
    ],
    closingText: 'Whether you need a new pool cage in Riverview, a rescreen in St. Petersburg, or storm damage repair in Clearwater, our team is ready to help.'
  },
  'central-florida': {
    headline: 'Central Florida\'s Pool Cage Experts',
    intro: 'Central Florida homeowners love their outdoor living spaces — and we help protect them. From Orlando to Lakeland, our team installs custom pool enclosures, screen rooms, and carports built to handle Florida\'s heat, rain, and occasional severe weather.',
    benefits: [
      'Serving Orange, Osceola, Polk & Seminole counties',
      'Expert pool cage design for Central FL home styles',
      'Competitive pricing with no hidden fees',
      'Quick turnaround — most projects done in 1-3 days'
    ],
    closingText: 'From Kissimmee to Winter Haven, we bring the same professional quality to every project in Central Florida.'
  },
  'south-florida': {
    headline: 'South Florida Aluminum Solutions',
    intro: 'South Florida demands the best in outdoor living construction. With intense sun, salt air, and hurricane-force winds, your pool cage and screen enclosures need to be built right. Loaiza5 Aluminum uses marine-grade fasteners and heavy-duty aluminum to ensure your investment lasts for years.',
    benefits: [
      'Hurricane-tested construction methods',
      'Serving Miami-Dade, Broward & Palm Beach counties',
      'Salt-resistant materials for coastal properties',
      'Custom designs to complement South Florida architecture'
    ],
    closingText: 'From Miami to Boca Raton, we deliver quality aluminum work that stands up to South Florida\'s demanding climate.'
  },
  'southwest-florida': {
    headline: 'Southwest Florida Screen Enclosure Specialists',
    intro: 'The Gulf Coast lifestyle deserves premium outdoor spaces. Loaiza5 Aluminum is proud to serve homeowners in Fort Myers, Naples, Cape Coral, and Sarasota with custom pool cages, lanai enclosures, and storm repair services.',
    benefits: [
      'Deep experience with SW FL building requirements',
      'Serving Lee, Collier, Charlotte & Sarasota counties',
      'Storm damage repair specialists — fast response',
      'Beautiful designs that enhance your home\'s curb appeal'
    ],
    closingText: 'Whether it\'s a brand-new glass room in Naples or a full rescreen in Port Charlotte, Loaiza5 has you covered.'
  },
  'north-florida': {
    headline: 'North Florida Aluminum Construction',
    intro: 'From Jacksonville to Gainesville, North Florida homeowners trust Loaiza5 Aluminum for reliable pool cage construction, screen enclosures, and repair services. We bring the same premium quality to every project, no matter where you are in the region.',
    benefits: [
      'Covering Duval, Alachua, Marion & St. Johns counties',
      'Experience with North FL property styles and codes',
      'Year-round availability',
      'Professional team with over 15 years of experience'
    ],
    closingText: 'Contact us today for a free estimate on your North Florida aluminum project.'
  }
};

export const ServiceAreasHub: React.FC = () => {
  const { area } = useParams<{ area: string }>();

  if (area) {
    const activeArea = SERVICE_AREAS.find(a => a.path.includes(area));
    if (!activeArea) return <Navigate to="/service-areas" replace />;

    const content = AREA_CONTENT[area] || {
      headline: `${activeArea.name} Aluminum Contractors`,
      intro: `Loaiza5 Aluminum proudly serves homeowners in ${activeArea.cities.join(', ')} with premium pool cages, screen enclosures, and aluminum construction services.`,
      benefits: ['Professional quality', 'Fast turnaround', 'Competitive pricing', 'Over 15 years experience'],
      closingText: `Contact us today for a free estimate in ${activeArea.name}.`
    };

    return (
      <div className="min-h-screen">
        <SEO
          title={`Pool Cages & Screen Enclosures in ${activeArea.name}`}
          description={`Top-rated aluminum construction in ${activeArea.cities.join(', ')}. Expert pool cages, screen repairs, and lanais by Loaiza5 Aluminum. Free estimates.`}
          canonical={`/service-areas/${area}`}
        />

        {/* Hero */}
        <div className="bg-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-accent text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              {activeArea.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.headline}</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{content.intro}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Cities Served */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cities We Serve in {activeArea.name}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {activeArea.cities.map(city => (
                <span key={city} className="bg-cream border border-primary/20 text-gray-800 px-4 py-2 rounded-full font-medium text-sm">
                  <MapPin className="w-3 h-3 inline mr-1 text-primary" />{city}
                </span>
              ))}
            </div>
          </div>

          {/* Why Choose Us in This Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Loaiza5 in {activeArea.name}?</h2>
              <div className="space-y-4">
                {content.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-6 text-lg">{content.closingText}</p>
            </div>

            {/* Services in This Area */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Services Available</h2>
              <div className="space-y-3">
                {SERVICES.map(s => (
                  <Link
                    key={s.id}
                    to={s.path}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{s.title}</h3>
                      <p className="text-sm text-gray-500">{s.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your {activeArea.name} Project?</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">Our experts are ready to give you a free, no-obligation estimate.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg">
                Get a Free Quote in {activeArea.name}
              </Link>
              <a
                href={`tel:+${BUSINESS_INFO.phoneClean}`}
                className="bg-sky-700 text-white border border-sky-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-sky-800 transition-colors text-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
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
    <div className="min-h-screen">
      <SEO
        title="Florida Service Areas | Tampa, Orlando, Southwest FL Pool Cages"
        description="Loaiza5 Aluminum LLC serves all of Florida. From Tampa Bay to South Florida, count on us for professional pool cage and screen installations."
        canonical="/service-areas"
      />

      {/* Hero */}
      <div className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Areas We Serve in Florida</h1>
          <p className="text-lg text-gray-300">Find reliable aluminum contractors near you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_AREAS.map(a => (
            <Link key={a.id} to={a.path} className="bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg hover:border-primary/30 transition-all group">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2 group-hover:text-sky-700">
                <MapPin className="w-6 h-6" />
                {a.name}
              </h2>
              <ul className="space-y-2 mb-6">
                {a.cities.map(city => (
                  <li key={city} className="text-gray-700 border-b border-gray-200 pb-1 last:border-0">{city}</li>
                ))}
              </ul>
              <span className="inline-flex items-center text-primary font-semibold text-sm">
                View Service Area <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Area?</h2>
          <p className="text-sky-100 text-lg mb-8">We serve all of Florida. Contact us and we'll confirm we can help with your project.</p>
          <Link to="/contact" className="bg-white text-primary font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => (
  <div className="py-16 max-w-3xl mx-auto px-4 prose prose-sky">
    <SEO
      title="Privacy Policy"
      description="Read the privacy policy of Loaiza5 Aluminum LLC. We are committed to protecting your personal information."
      canonical="/privacy-policy"
    />
    <h1>Privacy Policy</h1>
    <p>Last updated: March 2026</p>
    <p>At {BUSINESS_INFO.name}, we are committed to protecting your privacy. This policy outlines how we handle your data.</p>
    <h3>Information We Collect</h3>
    <p>We collect information you provide directly to us via our contact forms, including name, phone number, email, and address.</p>
    <h3>How We Use Your Information</h3>
    <p>We use this information solely to provide quotes, schedule services, and communicate regarding your project. We do not sell your data to third parties.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="py-16 max-w-3xl mx-auto px-4 prose prose-sky">
    <SEO
      title="Terms of Service"
      description="Read the terms of service for Loaiza5 Aluminum LLC website and services."
      canonical="/terms"
    />
    <h1>Terms of Service</h1>
    <p>Last updated: March 2026</p>
    <h3>Agreement</h3>
    <p>By using this website and requesting our services, you agree to these terms.</p>
    <h3>Estimates</h3>
    <p>Quotes provided online are estimates based on provided information. Final pricing is subject to on-site inspection.</p>
  </div>
);