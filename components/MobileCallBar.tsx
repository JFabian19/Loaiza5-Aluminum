import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const MobileCallBar: React.FC = () => {
  const handleMessage = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in getting a free quote for aluminum services."
    );
    window.location.href = `sms:+${BUSINESS_INFO.phoneClean}?body=${message}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex" id="mobile-cta-bar">
      <a
        href={`tel:+${BUSINESS_INFO.phoneClean}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold hover:bg-sky-700 transition-colors"
      >
        <Phone className="w-5 h-5 fill-current" />
        Call Now
      </a>
      <button
        onClick={handleMessage}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-sky-800 text-white font-bold hover:bg-sky-900 transition-colors"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        Text Us
      </button>
    </div>
  );
};

export default MobileCallBar;