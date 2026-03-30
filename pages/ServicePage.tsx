import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES, BUSINESS_INFO } from '../constants';
import { CheckCircle, HelpCircle, ArrowRight, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const service = SERVICES.find(s => s.path.includes(id || ''));

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.details.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Service Schema
  const serviceSchema = {
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Loaiza5 Aluminum LLC",
      "telephone": BUSINESS_INFO.phone,
      "url": "https://loaiza5aluminum.online"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "description": service.description
  };

  return (
    <div className="flex flex-col">
      <SEO
        title={`${service.title} in Tampa, Orlando & FL | Loaiza5 Aluminum`}
        description={`Top-rated ${service.title.toLowerCase()} in Tampa Bay, Orlando, and Southwest FL. ${service.description} Guaranteed quality & 15+ Years Experience.`}
        canonical={service.path}
        schema={serviceSchema}
      />
      {/* FAQ Schema - separate so it doesn't get nested in @graph wrong */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Service Hero */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src={service.details.heroImage}
            alt={`${service.title} in Florida - Professional aluminum construction by Loaiza5`}
            className="w-full h-full object-cover"
            width={700}
            height={467}
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-200">{service.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">

            {/* What We Do */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.details.whatWeDo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-primary pl-4">Included in Service</h2>
              <ul className="space-y-4">
                {service.details.included.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">Our Process</h2>
              <div className="space-y-6">
                {service.details.process.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-800">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs with proper semantic markup */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">Common Questions</h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {service.details.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <div className="flex gap-3 mb-2">
                      <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <h4 className="font-bold text-gray-900" itemProp="name">{faq.question}</h4>
                    </div>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-600 pl-8" itemProp="text">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm />

              <div className="mt-8 bg-secondary p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {SERVICES.filter(s => s.id !== service.id).map(s => (
                    <li key={s.id}>
                      <Link to={s.path} className="flex items-center justify-between hover:text-accent transition-colors">
                        <span className="text-sm">{s.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Need expert help with your {service.title}?</h2>
          <p className="text-sky-100 text-lg mb-8">Get a free, no-obligation quote today. Our team is ready to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg">
              Get Your Free Quote Now
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
      </section>
    </div>
  );
};

export default ServicePage;