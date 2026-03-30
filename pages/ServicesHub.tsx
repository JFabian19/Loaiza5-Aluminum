import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { SERVICES, BUSINESS_INFO } from '../constants';

const ServicesHub: React.FC = () => (
    <div className="min-h-screen bg-cream">
        <SEO
            title="Professional Aluminum Services in FL | Pool Cages & Enclosures"
            description="Explore our range of premium aluminum services including Custom Pool Cages, Tear-Down repairs, Glass Rooms, Carports, and Porch Enclosures across Florida."
            canonical="/services"
        />

        {/* Header */}
        <div className="bg-secondary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Aluminum & Screening Services</h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">Expert craftsmanship for every project. From new builds to storm repairs, we've got Florida covered.</p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.map(s => (
                    <Link key={s.id} to={s.path} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={s.details.heroImage}
                                alt={`${s.title} services in Florida by Loaiza5 Aluminum`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                                width={700}
                                height={467}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold mb-4 text-black group-hover:text-sky-800 transition-colors">{s.title}</h2>
                            <p className="text-gray-600 mb-6 flex-grow">{s.description}</p>
                            <span className="inline-flex items-center text-sky-800 font-bold text-sm self-start">
                                View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Not Sure What You Need?</h2>
                <p className="text-white text-lg mb-8 max-w-2xl mx-auto">No problem! Contact us and our team will help you find the best solution for your home.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact" className="bg-white text-sky-800 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg">
                        Get a Free Quote
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
        </div>
    </div>
);

export default ServicesHub;
