import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants';

const MobileCallBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex">
      <a
        href={`tel:+${BUSINESS_INFO.phoneClean}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold hover:bg-sky-700 transition-colors"
      >
        <Phone className="w-5 h-5" />
        Call Now
      </a>
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-white font-bold hover:bg-sky-500 transition-colors"
      >
        <FileText className="w-5 h-5" />
        Get Quote
      </Link>
    </div>
  );
};

export default MobileCallBar;