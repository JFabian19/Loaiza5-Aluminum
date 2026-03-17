import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../constants';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0iAnw8T5nKgyZEoBlcQhuprL5gvWPt7fn0jU5i4JIi5J5h8nGKF8mFpxBx31W9bo5/exec';

const QuickQuoteForm: React.FC = () => {
    const navigate = useNavigate();
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
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: dataToSend
            });

            if (response.ok) {
                navigate('/thank-you');
                setFormData({ name: '', phone: '', service: '', message: '' });
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-accent max-w-md w-full mx-auto md:mx-0 opacity-0 animate-fadeInDown">
            <div className="mb-6 text-center md:text-left opacity-0 animate-[fadeInDown_0.6s_ease-out_0.2s_forwards]">
                <h3 className="text-2xl font-bold text-gray-900">Get a Fast Quote</h3>
                <p className="text-sm text-gray-600">Enter your details and we'll contact you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.3s_forwards]">
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

                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.4s_forwards]">
                    <label htmlFor="hero-phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        inputMode="tel"
                        pattern="[0-9\-() ]*"
                        id="hero-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="(555) 555-5555"
                    />
                </div>

                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.5s_forwards]">
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

                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.6s_forwards]">
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
                    className="w-full bg-primary hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed opacity-0 animate-[fadeInDown_0.6s_ease-out_0.7s_forwards]"
                >
                    {status === 'submitting' ? 'Sending...' : 'Get Free Quote'}
                    {!status.includes('submit') && <Send className="w-4 h-4" />}
                </button>

                <p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center gap-1 opacity-0 animate-[fadeInDown_0.6s_ease-out_0.8s_forwards]">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Free Estimate. Fast & Secure.
                </p>

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
