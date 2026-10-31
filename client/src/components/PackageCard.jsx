import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mountain, Star, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

export default function PackageCard({ pkg }) {
  // Safe fallbacks taaki UI na tute
  const priceToUse = pkg.pricePerAdult || pkg.startingPrice || 0;
  const imageUrl = pkg.coverImage || pkg.image || 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2';
  const durationStr = pkg.durationText || `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
  const altitudeStr = pkg.altitudeInfo || pkg.maxAltitude || 'High Altitude';
  const taglineStr = pkg.shortDescription || pkg.tagline || '';
  const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' → ') : (pkg.route || '');
  const packageSlug = pkg.slug || pkg._id; // Backend ke liye slug ya _id dono chalega

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(priceToUse);

  const formattedOriginalPrice = pkg.originalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(pkg.originalPrice)
    : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Image Container with Badges */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
        <img
          src={imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {pkg.isBestseller && (
              <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                Bestseller
              </span>
            )}
            {pkg.permitRequired && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Permit
              </span>
            )}
          </div>

          <div className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span>{pkg.rating || '5.0'}</span>
            <span className="text-slate-500 text-[10px] ml-1">({pkg.reviewsCount || '15'})</span>
          </div>
        </div>

        {/* Bottom image overlay details */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center space-x-3 text-xs text-slate-200 font-medium">
            <span className="flex items-center bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
              {durationStr}
            </span>
            <span className="flex items-center bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
              <Mountain className="w-3.5 h-3.5 mr-1 text-sky-400" />
              {/* Altitude string ko trim kar rahe hain taaki lamba na dikhe */}
              {altitudeStr.split('(')[0].substring(0, 15)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Route text */}
          <div className="flex items-center text-xs text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 mr-1 text-amber-600 flex-shrink-0" />
            <span className="truncate">{routeStr}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            {pkg.title}
          </h3>

          <p className="text-slate-600 text-xs line-clamp-2 mt-2 leading-relaxed">
            {taglineStr}
          </p>

          {/* Highlights pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.permitRequired && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                Permits Included
              </span>
            )}
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Medical Oxygen in Cab
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between">
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Starting from</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500">per person + all taxes</span>
          </div>

          {/* Yahan humne pkg.slug use kiya hai */}
          <Link
            to={`/packages/${packageSlug}`}
            className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-amber-600 shadow-md group-hover:shadow-amber-500/20 transition-all space-x-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}