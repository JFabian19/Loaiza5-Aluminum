import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { SERVICES } from '../constants';

const ServicesHub: React.FC = () => (
    <div className="min-h-screen bg-cream py-16">
        <SEO
            title="Professional Aluminum Services in FL | Pool Cages & Enclosures"
            description="Explore our range of premium aluminum services including Custom Pool Cages, Tear-Down repairs, Glass Rooms, Carports, and Porch Enclosures across Florida."
            canonical="/services"
        />
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

export default ServicesHub;
