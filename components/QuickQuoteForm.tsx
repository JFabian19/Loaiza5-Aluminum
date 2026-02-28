import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SERVICES } from '../constants';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0iAnw8T5nKgyZEoBlcQhuprL5gvWPt7fn0jU5i4JIi5J5h8nGKF8mFpxBx31W9bo5/exec';

const QuickQuoteForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('phone', formData.phone);
        dataToSend.append('service', formData.service);
        dataToSend.append('message', formData.message);
        dataToSend.append('source', 'Quick Quote Hero');
        dataToSend.append('created_at', new Date().toISOString());

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: dataToSend,
                mode: 'no-cors'
            });
            setStatus('success');
            setFormData({ name: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error("Error submitting form", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center border-t-4 border-accent animate-fadeIn min-h-[400px] flex flex-col items-center justify-center max-w-md w-full mx-auto md:mx-0">
                <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke="#fff" />
                </svg>
                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Form Submitted!</h3>
                <p className="text-gray-600 mb-8 text-lg font-medium">We will call you as soon as possible.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-primary font-semibold underline hover:text-accent transition-colors"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-accent max-w-md w-full mx-auto md:mx-0">
            <div className="mb-6 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Get a Fast Quote</h3>
                <p className="text-sm text-gray-600">Enter your details and we'll contact you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="hero-name" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <input
                        required
                        type="text"
                        id="hero-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label htmlFor="hero-phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        id="hero-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="(555) 555-5555"
                    />
                </div>

                <div>
                    <label htmlFor="hero-service" className="block text-sm font-semibold text-gray-700 mb-1">Service Needed</label>
                    <select
                        required
                        id="hero-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                    >
                        <option value="">Select Service...</option>
                        {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="hero-message" className="text-sm font-semibold text-gray-700">Description</label>
                        <span className="text-xs text-gray-400">{formData.message.length}/500</span>
                    </div>
                    <textarea
                        id="hero-message"
                        name="message"
                        rows={2}
                        maxLength={500}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-gray-900"
                        placeholder="Briefly describe what you need..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Sending...' : 'Get Free Quote'}
                    {!status.includes('submit') && <Send className="w-4 h-4" />}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Failed to send. Please try again or call us.
                    </p>
                )}
            </form>
        </div>
    );
};

export default QuickQuoteForm;
