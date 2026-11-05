import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, TrendingUp, CreditCard, Users, ArrowRight, 
  Eye, MessageCircle, CheckCircle, AlertCircle, Clock, 
  Sparkles, Mountain, ChevronRight
} from 'lucide-react';
import api from '../api/axios'; // Real API connection
import BookingDetailsModal from '../components/BookingDetailsModal';
import PaymentModal from '../components/PaymentModal';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState(null);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState(null);

  // 1. Fetch real bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/admin/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // 2. Format Currency Helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  // 3. Status Change (Backend Update)
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { status: newStatus.toLowerCase() });
      
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus.toLowerCase() } : b))
      );
      if (selectedBookingForDetails && selectedBookingForDetails._id === bookingId) {
        setSelectedBookingForDetails((prev) => ({ ...prev, status: newStatus.toLowerCase() }));
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 4. Payment Update (Backend Update)
  const handleConfirmPayment = async (bookingId, paymentData) => {
    try {
      const payload = {
        paymentStatus: 'paid',
        amountPaid: paymentData.amount,
        paymentMode: paymentData.method || 'cash',
        paymentDate: new Date().toISOString()
      };
      
      await api.put(`/admin/bookings/${bookingId}/payment`, payload);

      setBookings((prev) =>
        prev.map((b) => {
          if (b._id === bookingId) {
            return { ...b, paymentStatus: 'paid', amountPaid: paymentData.amount };
          }
          return b;
        })
      );
      setSelectedBookingForPayment(null);
    } catch (error) {
      alert("Failed to update payment");
    }
  };

  // 5. Calculate Dynamic KPIs
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amountPaid || 0), 0);
  
  // Pending payments total amount aur count
  const pendingPaymentsAmount = bookings.reduce((sum, b) => {
    if (b.paymentStatus !== 'paid') {
      return sum + (b.packagePrice - (b.amountPaid || 0));
    }
    return sum;
  }, 0);
  const pendingPaymentsCount = bookings.filter(b => b.paymentStatus !== 'paid').length;
  
  const activeLeads = bookings.filter(b => b.status === 'new').length;

  // Recent 5 bookings
  const recentBookings = bookings.slice(0, 5);

  if (loading) return <div className="p-10 text-center font-bold">Loading Dashboard...</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Season 2026 Overview
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
            Operations Dashboard
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time status of bookings, high-altitude logistics, and cashflow in Leh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <Link to="/packages" className="px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            Manage Packages
          </Link>
          <Link to="/bookings" className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-amber-600 shadow-sm transition-colors flex items-center space-x-1">
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* KPI 1: Total Bookings */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              {totalBookings}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Live Data
            </div>
          </div>
        </div>

        {/* KPI 2: Total Revenue */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Collected Amount
            </div>
          </div>
        </div>

        {/* KPI 3: Pending Payments */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Payments</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-rose-600 font-serif">
              {formatCurrency(pendingPaymentsAmount)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Across {pendingPaymentsCount} pending reservations
            </div>
          </div>
        </div>

        {/* KPI 4: Active Leads */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              {activeLeads}
            </div>
            <div className="text-xs text-amber-700 font-semibold mt-1 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Needs action
            </div>
          </div>
        </div>

      </div>

      {/* Operational Highlights Banner (Static UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 md:p-6 shadow-md border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Mountain className="w-4 h-4" />
              <span>Leh Basecamp Alert</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
              Tomorrow: 3 Expeditions Departing for Nubra & Pangong
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              All 3 vehicles (Innova Crysta JK-10 and Scorpio 4x4) have completed pre-departure tire checks, oximeter battery replacement, and medical oxygen canister inspection at Leh motor garage.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
            <span>Khardung La Pass status: <strong>Open & Clear (BRO)</strong></span>
            <span className="text-emerald-400 font-semibold">100% Permits Ready</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Bookings By Circuit
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1"><span>Pangong & Nubra Classic</span><span>48%</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-2 rounded-full w-[48%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1"><span>Royal Enfield Bike Odyssey</span><span>28%</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-sky-500 h-2 rounded-full w-[28%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1"><span>Zanskar & Shinku La</span><span>14%</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-2 rounded-full w-[14%]"></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE (Dynamic) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Recent Bookings & Reservations</h3>
            <p className="text-xs text-slate-500">Latest requests received via website and direct WhatsApp.</p>
          </div>
          <Link to="/bookings" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center">
            <span>View All ({bookings.length})</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 uppercase font-semibold tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Booking ID & Customer</th>
                <th className="py-3.5 px-4">Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{b.name}</div>
                    <div className="text-[11px] text-slate-500">{b._id.slice(-6).toUpperCase()} • {b.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-slate-800 truncate" title={b.packageTitle}>{b.packageTitle}</div>
                    <div className="text-[11px] text-slate-500">{b.guests} Guests</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                    {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.source === 'whatsapp' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {b.source === 'whatsapp' ? 'WhatsApp' : 'Website Form'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                      b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      b.status === 'contacted' ? 'bg-amber-100 text-amber-800' :
                      b.status === 'new' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        b.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}></span>
                      <span className="font-semibold text-slate-800 capitalize">{b.paymentStatus}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">₹{b.packagePrice?.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button onClick={() => setSelectedBookingForDetails(b)} className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      {b.paymentStatus !== 'paid' && (
                        <button onClick={() => setSelectedBookingForPayment(b)} className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold">
                          Mark Paid
                        </button>
                      )}
                      <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(b.name)}!`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">No recent bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedBookingForDetails && (
        <BookingDetailsModal booking={selectedBookingForDetails} onClose={() => setSelectedBookingForDetails(null)} onStatusChange={handleStatusChange} />
      )}
      {selectedBookingForPayment && (
        <PaymentModal booking={selectedBookingForPayment} onClose={() => setSelectedBookingForPayment(null)} onConfirm={handleConfirmPayment} />
      )}

    </div>
  );
}