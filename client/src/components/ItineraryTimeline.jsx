import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Mountain, 
  Hotel, 
  Utensils, 
  Compass, 
  Calendar,
  Layers
} from 'lucide-react';

export default function ItineraryTimeline({ itinerary = [] }) {
  // If no itinerary is provided, display a graceful fallback
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
        <Compass className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-75" />
        <p className="text-sm font-semibold text-slate-700">Detailed Day-by-Day Plan</p>
        <p className="text-xs text-slate-500 mt-1">
          Customized daily itinerary details are available upon request. Contact our travel desk for full schedule.
        </p>
      </div>
    );
  }

  const isLongItinerary = itinerary.length >= 6;

  // For long itineraries (8-10 days), open first 3 days by default to keep mobile view clean
  // For shorter tours (<= 5 days), open all days
  const [openDays, setOpenDays] = useState(() => {
    return itinerary.reduce((acc, _, index) => {
      acc[index] = isLongItinerary ? index < 3 : true;
      return acc;
    }, {});
  });

  const toggleDay = (index) => {
    setOpenDays((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAll = (expand) => {
    const nextState = {};
    itinerary.forEach((_, index) => {
      nextState[index] = expand;
    });
    setOpenDays(nextState);
  };

  const handleJumpToDay = (index) => {
    // Ensure the day is expanded
    setOpenDays((prev) => ({
      ...prev,
      [index]: true,
    }));
    // Scroll to the day element smoothly
    setTimeout(() => {
      const el = document.getElementById(`itinerary-day-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {/* Top Header & Global Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 font-serif">
            Day-by-Day Expedition Itinerary
          </h3>
          <span className="text-[11px] sm:text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full whitespace-nowrap border border-amber-200">
            {itinerary.length} Days Plan
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs font-medium text-slate-600 self-start sm:self-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => toggleAll(true)}
            className="hover:text-amber-600 transition-colors underline font-semibold cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={() => toggleAll(false)}
            className="hover:text-amber-600 transition-colors underline font-semibold cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Quick Jump Bar for 6+ Days Itineraries (8 & 10 days) */}
      {isLongItinerary && (
        <div className="bg-slate-50/80 p-2 sm:p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <Layers className="w-3 h-3 mr-1 text-amber-600" /> Quick Day Jump
            </span>
            <span className="text-[10px] text-slate-400">Tap to expand & jump</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {itinerary.map((item, idx) => {
              const isOpen = !!openDays[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleJumpToDay(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                    isOpen
                      ? 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-600'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                  title={item.title}
                >
                  D{item.day || idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Vertical Timeline container with line alignment */}
      <div className="relative border-l-2 border-amber-400/80 ml-4 sm:ml-5 pl-5 sm:pl-7 space-y-4 sm:space-y-6 pt-2">
        {itinerary.map((item, index) => {
          const isOpen = openDays[index] !== false;
          const dayNumber = item.day || index + 1;

          return (
            <div 
              key={dayNumber} 
              id={`itinerary-day-${index}`} 
              className="relative group transition-all duration-300 scroll-mt-24"
            >
              {/* Day Circle Node centered precisely on the border-l-2 line */}
              <div 
                onClick={() => toggleDay(index)}
                className={`absolute -left-[31px] sm:-left-[39px] top-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-center flex items-center justify-center font-bold text-[11px] sm:text-xs shadow-md cursor-pointer transition-all flex-shrink-0 z-10 ${
                  isOpen 
                    ? 'bg-slate-900 border-amber-400 text-amber-400 scale-105' 
                    : 'bg-white border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600'
                }`}
                title={`Toggle Day ${dayNumber}`}
              >
                {dayNumber}
              </div>

              {/* Day Card */}
              <div className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'border-amber-200 shadow-sm' 
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}>
                {/* Header (clickable accordion) */}
                <button
                  type="button"
                  onClick={() => toggleDay(index)}
                  className="w-full text-left p-3.5 sm:p-5 flex items-start justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 pr-2 sm:pr-4 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        Day {dayNumber}
                      </span>
                      {item.altitude && item.altitude.trim() !== '' && (
                        <span className="inline-flex items-center text-[10px] sm:text-[11px] bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200/80 font-medium">
                          <Mountain className="w-3 h-3 mr-1 text-sky-600 flex-shrink-0" />
                          <span className="truncate max-w-[140px] sm:max-w-none">{item.altitude}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 break-words leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 flex-shrink-0 mt-0.5">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100 space-y-3 sm:space-y-4">
                    {/* Stay & Meal pills - only shown if at least one is present */}
                    {(item.stay || item.meals) && (
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs text-slate-600 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/60">
                        {item.stay && (
                          <div className="flex items-center">
                            <Hotel className="w-4 h-4 mr-1.5 text-amber-600 flex-shrink-0" />
                            <span><strong className="text-slate-800">Stay:</strong> {item.stay}</span>
                          </div>
                        )}
                        {item.meals && (
                          <div className="flex items-center">
                            <Utensils className="w-4 h-4 mr-1.5 text-emerald-600 flex-shrink-0" />
                            <span><strong className="text-slate-800">Meals:</strong> {Array.isArray(item.meals) ? item.meals.join(', ') : item.meals}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Detailed activity description with whitespace formatting */}
                    <div className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words whitespace-pre-line">
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
