import React from 'react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { BUSINESS_INFO } from '../constants';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => (
    <div className="bg-cream min-h-screen py-16">
        <SEO
            title="Contact Us - Free Quote"
            description="Get a free quote for pool cages, screen rooms, and repairs. Call (813) 784-6949 or fill out our online form. Serving Tampa, Orlando, Fort Myers & all FL."
            canonical="/contact"
        />
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Fill out the form below or contact us directly. We typically respond within 1-2 business hours.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form - Main Content */}
                <div className="lg:col-span-2">
                    <ContactForm />
                </div>

                {/* Contact Info Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <a href={`tel:+${BUSINESS_INFO.phoneClean}`} className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                                    <p className="font-bold">{BUSINESS_INFO.phone}</p>
                                </div>
                            </a>
                            <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                    <p className="font-bold text-sm">{BUSINESS_INFO.email}</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Business Hours</p>
                                    <p className="font-bold text-sm">Mon-Sat: 8 AM - 6 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Service Area</p>
                                    <p className="font-bold text-sm">{BUSINESS_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary text-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">Prefer to Call?</h3>
                        <p className="text-gray-300 text-sm mb-4">Speak directly with our team for immediate assistance on your project.</p>
                        <a
                            href={`tel:+${BUSINESS_INFO.phoneClean}`}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            Call {BUSINESS_INFO.phone}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactPage;
