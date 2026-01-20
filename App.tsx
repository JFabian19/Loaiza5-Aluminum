import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCallBar from './components/MobileCallBar';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import ServicesHub from './pages/ServicesHub';
import Projects from './pages/Projects';
import ContactPage from './pages/ContactPage';
import { About, ServiceAreasHub, PrivacyPolicy, Terms } from './pages/StaticPages';

const App: React.FC = () => {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
};

export default App;