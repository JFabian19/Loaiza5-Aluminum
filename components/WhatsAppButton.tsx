import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const MessageButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [hasShown, setHasShown] = useState(false);

  // Show the tooltip bubble after 5 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        // Auto-hide after 8s
        setTimeout(() => setIsOpen(false), 8000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasShown]);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in getting a free quote for aluminum services. Can you help me?"
    );
    window.location.href = `sms:+${BUSINESS_INFO.phoneClean}?body=${message}`;
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col items-end gap-3" id="message-cta">
      {/* Chat bubble tooltip */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] border border-gray-100 animate-fadeInDown relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
          <p className="text-sm text-gray-800 font-medium mb-3">
            👋 Need a quick quote? <br />
            <span className="text-gray-600 font-normal">Text us for an instant response!</span>
          </p>
          <button
            onClick={handleClick}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            Text Us — It's Free
          </button>
        </div>
      )}

      {/* Message floating button */}
      <button
        onClick={() => {
          if (isOpen) {
            handleClick();
          } else {
            setIsOpen(true);
          }
        }}
        className={`bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${showPulse ? 'animate-bounce' : ''}`}
        aria-label="Text us"
        onAnimationEnd={() => setShowPulse(false)}
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};

export default MessageButton;
