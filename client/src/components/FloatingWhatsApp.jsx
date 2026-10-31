
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappNumber = "9622971598";

  const defaultMessage = encodeURIComponent(
    "Hello Aryavarta Travel! I am planning a Ladakh trip and would like itinerary recommendations and quotation."
  );

  const waUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col">

      {/* Tooltip */}
      {showTooltip && (
        <div className="mb-3 mr-1 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 flex items-center space-x-2 animate-bounce">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

          <span className="font-medium">
            Need instant help? Chat with local expert!
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Aryavarta Travel"
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >

        {/* Pulsing Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>

        {/* Official WhatsApp Icon */}
        <FaWhatsapp className="w-8 h-8 relative z-10" />

        {/* Hover Text */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block">
          WhatsApp Us
        </span>

      </a>
    </div>
  );
}
