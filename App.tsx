import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCallBar from './components/MobileCallBar';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Projects from './pages/Projects';
import ContactForm from './components/ContactForm';
import { About, ServiceAreasHub, PrivacyPolicy, Terms } from './pages/StaticPages';
import { SERVICES } from './constants';
import { ArrowRight } from 'lucide-react';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ServicesHub: React.FC = () => (
  <div className="min-h-screen bg-cream py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(s => (
          <div key={s.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-black">{s.title}</h2>
            <p className="text-gray-600 mb-6 flex-grow">{s.description}</p>
            <Link to={s.path} className="text-primary font-bold hover:text-sky-800 flex items-center gap-2 self-start">
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="bg-cream min-h-screen py-16">
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">Get a free quote or ask a question about your aluminum project.</p>
      </div>
      <ContactForm />
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <ScrollToTop />
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Service Routes */}
            <Route path="/services" element={<ServicesHub />} />
            {/* Dynamic matching for service details */}
            <Route path="/services/:id" element={<ServicePage />} />

            <Route path="/projects" element={<Projects />} />

            <Route path="/service-areas" element={<ServiceAreasHub />} />
            {/* Catch-all for specific service areas pointing to Hub for now, or could make dynamic area pages */}
            <Route path="/service-areas/:area" element={<ServiceAreasHub />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <Footer />
        <MobileCallBar />
      </div>
    </Router>
  );
};

export default App;