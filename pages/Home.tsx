import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SERVICES, BUSINESS_INFO, TESTIMONIALS, DOMAIN } from '../constants';
import { IMAGES } from '../images';
import {
  Check,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  Phone,
  Star,
  Quote,
  HelpCircle,
  Users
} from 'lucide-react';

import QuickQuoteForm from '../components/QuickQuoteForm';

// Lazy load CountUp since it's below the fold
const CountUp = lazy(() => import('../components/CountUp'));

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BUSINESS_INFO.name,
    "url": DOMAIN
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="Best Pool Cages, Screen Enclosures & Aluminum Repairs in FL"
        description="Premium custom aluminum services: Pool Cages, Screen Enclosures, Storm Repairs, Glass Rooms, and Lanais. Trusted experts in Tampa, Orlando, Miami and all FL."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(webSiteSchema)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center text-white overflow-hidden pt-28 pb-12 md:pt-28 md:pb-0">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={IMAGES.MAIN_HERO_MOBILE} />
            <img
              src={IMAGES.MAIN_HERO}
              alt="Premium pool cage and screen enclosure installation in Florida by Loaiza5 Aluminum"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              // @ts-ignore
              fetchpriority="high"
              width={1920}
              height={1080}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex flex-col md:items-start items-center gap-3 mb-2">
                <div className="inline-block bg-accent/90 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase opacity-0 animate-dropIn">
                  Serving All of Florida
                </div>
                <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg opacity-0 animate-dropInDelay1">
                  🔥 This Week Only: 10% Off New Projects!
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg opacity-0 animate-dropInDelay2">
                Premium Pool Cages & <span className="text-accent">Screen Enclosures in FL</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 font-medium drop-shadow-md max-w-xl mx-auto md:mx-0 opacity-0 animate-dropInDelay3">
                Transform your outdoor space with Florida's trusted aluminum experts. High-quality materials, professional installation, and over 15 years of experience.
              </p>

              <div className="hidden md:flex flex-wrap gap-4 pt-4 opacity-0 animate-dropInDelay4">
                <a
                  href={`tel:+${BUSINESS_INFO.phoneClean}`}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold py-3 px-8 rounded-lg shadow-xl transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {BUSINESS_INFO.phone}
                </a>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-xl transition-colors flex items-center gap-2"
                >
                  More Details
                </Link>
              </div>

              {/* Mobile Only Buttons (below text context) */}
              <div className="md:hidden flex flex-col gap-3 pt-6 w-full opacity-0 animate-dropInDelay4">
                <a
                  href={`tel:+${BUSINESS_INFO.phoneClean}`}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now — Free Estimate
                </a>
                <p className="text-center text-white/70 text-xs">Or scroll down to fill out our quick 30-second form ↓</p>
              </div>
            </div>

            {/* Right Content - Form */}
            <div className="flex justify-center md:justify-end w-full opacity-0 animate-dropInDelay5">
              <QuickQuoteForm />
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="bg-sky-100 p-4 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                <Suspense fallback={<span>15+</span>}>
                  <CountUp end={15} suffix="+" duration={2000} />
                </Suspense> Years
              </h2>
              <p className="text-gray-600 text-sm">Of aluminum construction experience in FL.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-sky-100 p-4 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                <Suspense fallback={<span>500+</span>}>
                  <CountUp end={500} suffix="+" duration={2500} />
                </Suspense> Projects
              </h2>
              <p className="text-gray-600 text-sm">Completed across all of Florida.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-sky-100 p-4 rounded-full mb-4">
                <ThumbsUp className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Quality Materials</h2>
              <p className="text-gray-600 text-sm">High-grade aluminum and Phifer screen rated for FL weather.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-sky-100 p-4 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Clear Communication</h2>
              <p className="text-gray-600 text-sm">From the first call to final walkthrough.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Custom Aluminum & Pool Enclosure Services</h2>
            <p className="text-lg text-gray-600">We specialize in custom aluminum solutions designed to enhance your home and withstand the elements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              // Dynamically get icon
              const IconComponent = service.icon || HelpCircle;

              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={service.details.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width={700}
                      height={467}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="p-8">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-sky-800 font-semibold text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-block border-2 border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Pool Cage Construction Process</h2>
              <p className="text-gray-600 mb-10 text-lg">We make improving your home easy and stress-free. Here is what you can expect when you work with Loaiza5 Aluminum.</p>

              <div className="space-y-8">
                {[
                  { title: "Request a Quote", desc: "Fill out our form or call us to share your project details." },
                  { title: "Free Consultation", desc: "We visit your property, measure, and provide a clear estimate." },
                  { title: "Professional Installation", desc: "Our experienced team arrives on time and works efficiently." },
                  { title: "Final Walkthrough", desc: "We make sure you are 100% satisfied with our work." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.PROJECTS.STORM_REPAIR}
                alt="Professional aluminum pool cage repair and installation by Loaiza5 in Florida"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={700}
                height={467}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Florida Homeowners Choose Us</h2>
            <p className="text-gray-300 text-lg">We deliver superior craftsmanship at competitive prices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "15+ Years of Local Experience",
              "Top-Grade Aluminum Alloys",
              "Phifer Screen (Standard & Pet)",
              "Owner-Operated Attention",
              "Clean Job Sites",
              "Fast Turnaround Times"
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <Check className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="font-semibold text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600">Trusted by homeowners across Florida</p>
          </div>

          <div className="max-w-4xl mx-auto relative bg-cream rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/10 rotate-180" />

            <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center text-center px-4 ${index === currentTestimonial ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <p className="text-xl md:text-2xl text-gray-800 italic mb-6 leading-relaxed relative z-10">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                    <p className="text-sky-800 font-medium text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA for people who didn't convert on hero */}
      <section className="py-16 bg-cream border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 text-lg mb-8">Our team is ready to help. Send us a text for a quick response, or call us directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`sms:+${BUSINESS_INFO.phoneClean}?body=${encodeURIComponent("Hi! I have a question about your aluminum services.")}`}
              className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-bold py-4 px-10 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              💬 Text Us Now
            </a>
            <a
              href={`tel:+${BUSINESS_INFO.phoneClean}`}
              className="bg-white border-2 border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white text-lg font-bold py-4 px-10 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-sky-700 to-sky-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-md">
            🎉 Limited Spots Available This Month
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Upgrade Your Outdoor Space?</h2>
          <p className="text-sky-100 text-xl mb-10">Join 500+ Florida homeowners who trust Loaiza5 Aluminum. Get a free, no-obligation quote today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-extrabold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
              Get My Free Quote →
            </Link>
            <a
              href={`tel:+${BUSINESS_INFO.phoneClean}`}
              className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 text-lg font-bold py-4 px-10 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;