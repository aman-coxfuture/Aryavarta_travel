import React from 'react';
import { 
  X, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  Car, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function BookingDetailsModal({ booking, onClose, onStatusChange }) {
  if (!booking) return null;

  const displayId = booking.id || (booking._id ? `BK-${booking._id.slice(-6).toUpperCase()}` : 'BK-0000');
  const customerName = booking.customerName || booking.name || 'Traveler';
  const packageName = booking.packageName || booking.packageTitle || 'Ladakh Tour Package';
  const totalAmount = booking.packagePrice ?? booking.totalAmount ?? 0;
  const paidAmount = booking.amountPaid ?? booking.paidAmount ?? 0;
  const dueAmount = Math.max(0, totalAmount - paidAmount);
  const bookingIdentifier = booking._id || booking.id;

  const travelDateDisplay = booking.travelDate 
    ? (typeof booking.travelDate === 'string' && !booking.travelDate.includes('T') 
        ? booking.travelDate 
        : new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }))
    : 'Upcoming';

  const createdAtDisplay = booking.createdAt
    ? (typeof booking.createdAt === 'string' && !booking.createdAt.includes('T')
        ? booking.createdAt
        : new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }))
    : 'Recently';

  const notesContent = booking.notes || booking.message || booking.adminNotes || '';

  // Clean phone number for WhatsApp
  const cleanPhone = (booking.phone || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(customerName)}!%20This%20is%20Aryavarta%20Travel%20Operations%20in%20Leh%20regarding%20your%20Ladakh%20booking%20(${displayId}).`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              {displayId.includes('-') ? displayId.split('-')[1] : displayId.slice(-4)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{displayId}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-300">Booked on {createdAtDisplay}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {customerName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          
          {/* Quick Action Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500">Booking Status:</span>
              <select
                value={booking.status?.toLowerCase() || 'new'}
                onChange={(e) => onStatusChange(bookingIdentifier, e.target.value)}
                className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white capitalize"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp Customer
              </a>
              {booking.phone && (
                <a
                  href={`tel:${booking.phone}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  Call
                </a>
              )}
            </div>
          </div>

          {/* Two-column overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                Customer Information
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Full Name:</span>
                  <strong className="text-slate-900 text-sm">{customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone / WhatsApp:</span>
                  <a href={`tel:${booking.phone}`} className="text-amber-600 font-semibold">{booking.phone || 'N/A'}</a>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <a href={`mailto:${booking.email}`} className="text-slate-800">{booking.email || 'N/A'}</a>
                </div>
                <div>
                  <span className="text-slate-500 block">Booking Source:</span>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {booking.source === 'whatsapp' ? 'WhatsApp' : 'Website Form'}
                  </span>
                </div>
              </div>
            </div>

            {/* Expedition Specs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                Expedition Details
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Package:</span>
                  <strong className="text-slate-900">{packageName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Travel Date:</span>
                  <span className="text-slate-900 font-semibold">{travelDateDisplay}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Guests:</span>
                  <span className="text-slate-900 font-semibold">{booking.guests || 1} Travelers</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Vehicle Allocated:</span>
                  <span className="text-slate-900 font-semibold">{booking.vehicle || 'Innova Crysta / Scorpio 4x4'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Payment Status Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Financial Status
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Total Cost</span>
                <span className="text-sm font-bold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Paid to Date</span>
                <span className="text-sm font-bold text-emerald-600">₹{paidAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Balance Due</span>
                <span className="text-sm font-bold text-rose-600">
                  ₹{dueAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests / Notes */}
          {notesContent && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Special Requirements & Guest Notes
              </h4>
              <p className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {notesContent}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
