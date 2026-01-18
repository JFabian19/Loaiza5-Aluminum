import React from 'react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

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

export default ContactPage;
