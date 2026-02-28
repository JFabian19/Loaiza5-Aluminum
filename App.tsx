import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCallBar from './components/MobileCallBar';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';

const ServicePage = React.lazy(() => import('./pages/ServicePage'));
const ServicesHub = React.lazy(() => import('./pages/ServicesHub'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Lazy loading named exports
const About = React.lazy(() => import('./pages/StaticPages').then(module => ({ default: module.About })));
const ServiceAreasHub = React.lazy(() => import('./pages/StaticPages').then(module => ({ default: module.ServiceAreasHub })));
const PrivacyPolicy = React.lazy(() => import('./pages/StaticPages').then(module => ({ default: module.PrivacyPolicy })));
const Terms = React.lazy(() => import('./pages/StaticPages').then(module => ({ default: module.Terms })));

const SuspenseFallback = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <ScrollToTop />
          <Header />

          <main className="flex-grow">
            <React.Suspense fallback={<SuspenseFallback />}>
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
            </React.Suspense>
          </main>

          <Footer />
          <MobileCallBar />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;