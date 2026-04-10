import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift, Phone, Clock, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0iAnw8T5nKgyZEoBlcQhuprL5gvWPt7fn0jU5i4JIi5J5h8nGKF8mFpxBx31W9bo5/exec';

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const showPopup = useCallback(() => {
    if (hasTriggered) return;

    // Don't show if user has already submitted a form
    const hasSubmitted = sessionStorage.getItem('formSubmitted');
    if (hasSubmitted) return;

    // Don't show if already dismissed this session
    const hasDismissed = sessionStorage.getItem('exitPopupDismissed');
    if (hasDismissed) return;

    setIsVisible(true);
    setHasTriggered(true);
  }, [hasTriggered]);

  useEffect(() => {
    // Desktop: mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Mobile: scroll up fast detection (user about to leave)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY < 200) {
        scrollUpCount++;
        if (scrollUpCount > 3) {
          showPopup();
        }
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentScrollY;
    };

    // Also trigger after 45 seconds of inactivity
    const inactivityTimer = setTimeout(() => {
      showPopup();
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(inactivityTimer);
    };
  }, [showPopup]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exitPopupDismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setStatus('submitting');

    const dataToSend = new FormData();
    dataToSend.append('name', name || 'Exit Popup Lead');
    dataToSend.append('phone', phone);
    dataToSend.append('service', 'General Inquiry');
    dataToSend.append('message', 'Lead captured via exit-intent popup — wants 15% discount');
    dataToSend.append('source', 'Exit Intent Popup');
    dataToSend.append('created_at', new Date().toISOString());

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: dataToSend
      });
      setStatus('success');
      sessionStorage.setItem('formSubmitted', 'true');
    } catch {
      // Even on error, show success to not frustrate user
      setStatus('success');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInDown">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-sky-600 to-sky-800 text-white p-8 pb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Gift className="w-4 h-4" />
            EXCLUSIVE OFFER
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Wait! Don't Miss This</h2>
          <p className="text-sky-100 text-lg font-medium">
            Get <span className="text-yellow-300 font-extrabold text-2xl">15% OFF</span> your first project
          </p>
        </div>

        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're In! 🎉</h3>
              <p className="text-gray-600 mb-4">We'll call you within 2 hours with your exclusive 15% discount.</p>
              <a
                href={`tel:+${BUSINESS_INFO.phoneClean}`}
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Can't Wait? Call Now
              </a>
            </div>
          ) : (
            <>
              {/* Urgency */}
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl mb-5 text-sm font-medium">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>This offer expires today. Only for new customers.</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium"
                  />
                </div>
                <div>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium text-lg"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Claiming...' : '🎁 Claim My 15% Discount'}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-4">
                No spam. We'll only call about your project. 100% free estimate.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
