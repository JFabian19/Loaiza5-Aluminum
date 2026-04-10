import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ShieldCheck, Star, Clock, Users } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0iAnw8T5nKgyZEoBlcQhuprL5gvWPt7fn0jU5i4JIi5J5h8nGKF8mFpxBx31W9bo5/exec';

const QuickQuoteForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Simulated live activity
    const [recentCount, setRecentCount] = useState(3);
    useEffect(() => {
        const interval = setInterval(() => {
            setRecentCount(prev => {
                const delta = Math.random() > 0.5 ? 1 : -1;
                const next = prev + delta;
                return Math.max(2, Math.min(7, next));
            });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('phone', formData.phone);
        dataToSend.append('service', 'General - Quick Quote');
        dataToSend.append('message', 'Quick quote request from hero form');
        dataToSend.append('source', 'Quick Quote Hero');
        dataToSend.append('created_at', new Date().toISOString());

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: dataToSend
            });

            if (response.ok) {
                sessionStorage.setItem('formSubmitted', 'true');
                navigate('/thank-you');
                setFormData({ name: '', phone: '' });
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500 max-w-md w-full mx-auto md:mx-0 opacity-0 animate-fadeInDown" id="quick-quote-form">
            {/* Social Proof Header */}
            <div className="mb-5 text-center md:text-left opacity-0 animate-[fadeInDown_0.6s_ease-out_0.2s_forwards]">
                <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm font-bold text-gray-700 ml-1">5.0</span>
                    <span className="text-xs text-gray-500">(47 reviews)</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">Get Your Free Quote</h2>
                <p className="text-sm text-gray-500 mt-1">Takes less than 30 seconds — we call you back fast</p>
            </div>

            {/* Urgency Badge */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg mb-5 text-xs font-semibold opacity-0 animate-[fadeInDown_0.6s_ease-out_0.3s_forwards]">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>🎉 Limited Time: <strong>10% Off</strong> for new customers this week!</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.4s_forwards]">
                    <input
                        required
                        type="text"
                        id="hero-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium text-base"
                        placeholder="Your Name"
                    />
                </div>

                <div className="opacity-0 animate-[fadeInDown_0.6s_ease-out_0.5s_forwards]">
                    <input
                        required
                        type="tel"
                        inputMode="tel"
                        pattern="[0-9\-() ]*"
                        id="hero-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium text-lg"
                        placeholder="(555) 555-5555"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg opacity-0 animate-[fadeInDown_0.6s_ease-out_0.6s_forwards]"
                >
                    {status === 'submitting' ? 'Sending...' : 'Get My Free Quote →'}
                </button>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-1 opacity-0 animate-[fadeInDown_0.6s_ease-out_0.7s_forwards]">
                    <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Free. No spam. We respect your time.
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                        <Users className="w-3.5 h-3.5 text-green-500" />
                        <span className="flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            {recentCount} people requested quotes today
                        </span>
                    </div>
                </div>

                {status === 'error' && (
                    <p className="text-red-500 text-xs text-center">
                        Failed to send. Please try again or call us at {' '}
                        <a href="tel:+18137846949" className="underline font-bold">(813) 784-6949</a>
                    </p>
                )}
            </form>
        </div>
    );
};

export default QuickQuoteForm;
