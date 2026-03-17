import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Phone, AlertTriangle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const ThankYou: React.FC = () => {
  const [showClosedAlert, setShowClosedAlert] = useState(false);

  const checkBusinessHours = () => {
    // Get current time in Florida/Tampa (EST/EDT)
    const nowLocal = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const nowFlorida = new Date(nowLocal);

    const day = nowFlorida.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = nowFlorida.getHours(); // 0 to 23

    // Business Hours: Monday-Saturday, 8:00 AM to 6:00 PM
    if (day === 0) return false; // Closed on Sundays
    if (hour >= 8 && hour < 18) return true; // 8:00 AM to 5:59 PM
    return false;
  };

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!checkBusinessHours()) {
      e.preventDefault();
      setShowClosedAlert(true);
      // Hide the alert automatically after 5 seconds
      setTimeout(() => setShowClosedAlert(false), 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thank You | Loaiza 5 Aluminum LLC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <section className="bg-gray-50 flex items-center justify-center min-h-[75vh] py-16 px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 sm:p-12 transform transition-all border border-gray-100 opacity-0 animate-fadeInDown">
          <div className="flex justify-center mb-8 opacity-0 animate-[fadeInDown_0.6s_ease-out_0.2s_forwards]">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-500 drop-shadow-md animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight opacity-0 animate-[fadeInDown_0.6s_ease-out_0.3s_forwards]">
            Thank You!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium opacity-0 animate-[fadeInDown_0.6s_ease-out_0.4s_forwards]">
            Thank you for trusting us with your project. Our experts will get in touch with you as soon as possible.
          </p>
          
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-10 shadow-sm relative overflow-hidden opacity-0 animate-[fadeInDown_0.6s_ease-out_0.5s_forwards]">
            {showClosedAlert && (
              <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-4 z-10 animate-fadeIn">
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                  <p className="text-red-700 font-bold text-center text-sm">
                    Warning: Our office is currently closed.
                  </p>
                  <p className="text-red-600 text-xs text-center mt-1">
                    Florida (Tampa) Hours: Mon-Sat, 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            )}

            <h3 className="text-blue-900 font-bold mb-2">Is this urgent?</h3>
            <p className="text-blue-800 text-sm mb-4">
              If your request is urgent, you can call us directly during our business hours 
              (Mon-Sat: 8:00 AM - 6:00 PM, Florida Time).
            </p>
            
            <a 
              href={`tel:+${BUSINESS_INFO.phoneClean}`}
              onClick={handleCallClick}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-sm w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              Call Now: {BUSINESS_INFO.phone}
            </a>
          </div>

          <div className="flex justify-center opacity-0 animate-[fadeInDown_0.6s_ease-out_0.6s_forwards]">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-primary font-semibold py-2 px-6 rounded-lg transition-all text-sm"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
