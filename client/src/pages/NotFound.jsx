import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mountain, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-900 text-white px-4 py-20 relative overflow-hidden">
      {/* Background graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1800&q=80')`,
        }}
      ></div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        
        {/* Prayer flag visual */}
        <div className="prayer-flag-strip rounded-full max-w-xs mx-auto mb-6"></div>

        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Mountain className="w-4 h-4" />
          <span>Altitude: 17,982 ft — Oxygen Deprived</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-black font-serif text-amber-400 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
          Julley! You Wandered Off The Pass
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          The high mountain winds have swept this page away into the Nubra sand dunes, or the road over Khardung La is temporarily blocked. Let’s guide you safely back to basecamp.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl transition-all"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Basecamp (Home)</span>
          </Link>
          <Link
            to="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
          >
            <span>Explore Tour Packages</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
