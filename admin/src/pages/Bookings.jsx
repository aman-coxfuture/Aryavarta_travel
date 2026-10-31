import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Eye, Check, DollarSign, RotateCcw,
  Calendar, Download, Users, CreditCard, Phone, Trash2
} from 'lucide-react';
import api from '../api/axios'; // Backend connect karne ke liye
import BookingDetailsModal from '../components/BookingDetailsModal';
import PaymentModal from '../components/PaymentModal';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState(null);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState(null);

  // 1. Backend se Bookings fetch karo
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/admin/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // 2. Status Update API Call
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Backend me status lower-case me save hota hai (jaise 'new', 'confirmed')
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

  // 3. Payment Update API Call
  const handleConfirmPayment = async () => {
    const booking = selectedBookingForPayment;
    if (!booking) return;

    const bookingId = booking._id || booking.id;
    const amountToPay = booking.packagePrice ?? booking.totalAmount ?? 0;

    try {
      await api.put(`/admin/bookings/${booking._id}/payment`, {
        paymentStatus: 'paid',
        amountPaid: booking.packagePrice,
      });

      // Update local state so UI updates to 'Paid' without refreshing
      setBookings((prev) =>
        prev.map((b) => {
          if (b._id === bookingId || b.id === bookingId) {
            return {
              ...b,
              paymentStatus: 'paid',
              amountPaid: amountToPay,
              paidAmount: amountToPay,
            };
          }
          return b;
        })
      );

      // Keep details modal synced if open
      if (selectedBookingForDetails && (selectedBookingForDetails._id === bookingId || selectedBookingForDetails.id === bookingId)) {
        setSelectedBookingForDetails((prev) => ({
          ...prev,
          paymentStatus: 'paid',
          amountPaid: amountToPay,
          paidAmount: amountToPay,
        }));
      }

      setSelectedBookingForPayment(null);
    } catch (error) {
      console.error("Failed to update payment:", error);
      alert("Failed to update payment. Please try again.");
    }
  };

  // 4. Delete Booking API Call
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await api.delete('/admin/bookings/' + id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Failed to delete booking:", error);
      alert("Failed to delete booking. Please try again.");
    }
  };

  // Filtering logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (search) {
        const q = search.toLowerCase();
        const matchName = b.name?.toLowerCase().includes(q);
        const matchPhone = b.phone?.toLowerCase().includes(q);
        const matchId = b._id?.toLowerCase().includes(q);
        const matchPkg = b.packageTitle?.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchId && !matchPkg) return false;
      }

      // Status Filter (lowercase matching)
      if (statusFilter !== 'ALL' && b.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;

      // Payment Filter
      if (paymentFilter !== 'ALL' && b.paymentStatus?.toLowerCase() !== paymentFilter.toLowerCase()) return false;

      // Source Filter ('form' vs 'Website Form', 'whatsapp' vs 'WhatsApp')
      if (sourceFilter !== 'ALL') {
        if (sourceFilter === 'Website Form' && b.source !== 'form') return false;
        if (sourceFilter === 'WhatsApp' && b.source !== 'whatsapp') return false;
      }

      return true;
    });
  }, [bookings, search, statusFilter, paymentFilter, sourceFilter]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setPaymentFilter('ALL');
    setSourceFilter('ALL');
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Bookings...</div>;

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Reservations Roster
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Bookings Management
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Track traveler reservations, manage payment milestones, and coordinate WhatsApp communications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Exporting current bookings roster as CSV...')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, booking ID, package..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div className="lg:col-span-2">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
            >
              <option value="ALL">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="lg:col-span-2">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
            >
              <option value="ALL">All Sources</option>
              <option value="Website Form">Website Form</option>
              <option value="WhatsApp">WhatsApp Direct</option>
            </select>
          </div>

          {/* Reset */}
          <div className="lg:col-span-1 text-center">
            <button
              onClick={resetFilters}
              className="p-2 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4 mx-auto" />
            </button>
          </div>

        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 uppercase font-semibold tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Booking ID & Customer</th>
                <th className="py-3.5 px-4">Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  return (
                    <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name & ID */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                          <span className="font-mono text-amber-700 bg-amber-50 px-1.5 rounded">{b._id.slice(-6).toUpperCase()}</span>
                          <span>•</span>
                          <a href={`tel:${b.phone}`} className="hover:text-slate-800">{b.phone}</a>
                        </div>
                      </td>

                      {/* Package */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 line-clamp-1" title={b.packageTitle}>
                          {b.packageTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                          <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> {b.guests} Guests</span>
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.source === 'whatsapp' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {b.source === 'whatsapp' ? 'WhatsApp' : 'Website'}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            b.status === 'contacted' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            b.status === 'new' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                            b.status === 'completed' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                            'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            b.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}></span>
                          <span className="font-bold text-slate-900 capitalize">{b.paymentStatus}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          ₹{(b.amountPaid || 0).toLocaleString('en-IN')} / ₹{b.packagePrice?.toLocaleString('en-IN')}
                        </div>
                      </td>

                      {/* ACTION BUTTONS */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          
                          {/* Hide 'Mark Paid' when already Paid */}
                          {b.paymentStatus?.toLowerCase() !== 'paid' && (
                            <button
                              type="button"
                              onClick={() => setSelectedBookingForPayment(b)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold border bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 transition-colors"
                            >
                              Mark Paid
                            </button>
                          )}

                          {/* Fix 'Eye' (View) button */}
                          <button
                            type="button"
                            onClick={() => setSelectedBookingForDetails(b)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                            title="View Booking Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete Booking Button (Only for completed or cancelled) */}
                          {(b.status === 'completed' || b.status === 'cancelled') && (
                            <button
                              type="button"
                              onClick={() => handleDelete(b._id)}
                              className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedBookingForDetails && (
        <BookingDetailsModal
          booking={selectedBookingForDetails}
          onClose={() => setSelectedBookingForDetails(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {selectedBookingForPayment && (
        <PaymentModal
          booking={selectedBookingForPayment}
          onClose={() => setSelectedBookingForPayment(null)}
          onConfirm={handleConfirmPayment}
        />
      )}

    </div>
  );
}