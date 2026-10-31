import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mountain, Hotel, Utensils, CheckCircle } from 'lucide-react';

export default function ItineraryTimeline({ itinerary = [] }) {
  // Allow toggling specific days or expand all
  const [openDays, setOpenDays] = useState(
    itinerary.reduce((acc, _, index) => {
      acc[index] = true; // Open all by default for readability
      return acc;
    }, {})
  );

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

  return (
    <div className="space-y-4">
      {/* Top controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 flex items-center">
          <span>Day-by-Day Expedition Itinerary</span>
          <span className="ml-3 text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
            {itinerary.length} Days Detailed Plan
          </span>
        </h3>
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
          <button
            onClick={() => toggleAll(true)}
            className="hover:text-amber-600 transition-colors underline"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            onClick={() => toggleAll(false)}
            className="hover:text-amber-600 transition-colors underline"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l-2 border-amber-400/60 ml-4 md:ml-6 pl-6 md:pl-8 space-y-6 pt-2">
        {itinerary.map((item, index) => {
          const isOpen = openDays[index] !== false;

          return (
            <div key={item.day || index} className="relative group">
              {/* Day Circle Node on line */}
              <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-400 flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                {item.day}
              </div>

              {/* Day Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Header (clickable) */}
                <button
                  type="button"
                  onClick={() => toggleDay(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        Day {item.day}
                      </span>
                      {item.altitude && (
                        <span className="inline-flex items-center text-[11px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200/60 font-medium">
                          <Mountain className="w-3 h-3 mr-1 text-sky-500" />
                          {item.altitude}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {item.title}
                    </h4>
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                    {/* Stay & Meal pills */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {item.stay && (
                        <div className="flex items-center">
                          <Hotel className="w-4 h-4 mr-1.5 text-amber-600 flex-shrink-0" />
                          <span><strong className="text-slate-800">Stay:</strong> {item.stay}</span>
                        </div>
                      )}
                      {item.meals && (
                        <div className="flex items-center">
                          <Utensils className="w-4 h-4 mr-1.5 text-emerald-600 flex-shrink-0" />
                          <span><strong className="text-slate-800">Meals:</strong> {item.meals}</span>
                        </div>
                      )}
                    </div>

                    {/* Detailed activity description */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
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
