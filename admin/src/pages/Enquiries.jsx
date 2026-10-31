import React, { useState, useEffect } from 'react';
import { 
  MessageSquareText, Search, MessageCircle, Phone, Mail, MapPin, 
  Calendar, CheckCircle, Clock, Sparkles
} from 'lucide-react';
import api from '../api/axios'; // Backend API import

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // 1. Fetch Enquiries from Backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await api.get('/admin/enquiries');
        setEnquiries(res.data);
      } catch (error) {
        console.error("Error fetching enquiries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  // 2. Update Status via Backend
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/enquiries/${id}`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 3. Search Filter (Backend data fields ke hisaab se)
  const filtered = enquiries.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(q) ||
      e.phone?.includes(q) ||
      e.email?.toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="p-10 text-center font-bold">Loading Enquiries...</div>;

  return (
    <div className="space-y-6">
      
      {/* Header (UI Same) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Bespoke Trip Inquiries
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Custom Trip Enquiries
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Tailor-made itineraries requested through the client Custom Trip Planner form.
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Enquiries Grid / List */}
      <div className="space-y-4">
        {filtered.map((enq) => {
          const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
          const waMessage = encodeURIComponent(
            `Julley ${enq.name}! We received your custom Ladakh trip inquiry for ${enq.travelDates}. We've prepared a draft itinerary for you.`
          );
          const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}`;

          // Backend fields ko UI ke hisaab se map kar rahe hain with fallbacks
          const displayId = enq._id ? enq._id.slice(-4).toUpperCase() : 'NEW';
          const createdDate = enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Just now';
          const destinationsArray = enq.destinations || [enq.travelDates || 'Custom Trip', 'Ladakh'];

          return (
            <div 
              key={enq._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    {displayId}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{enq.name}</h3>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                      <span>{enq.phone}</span>
                      <span>•</span>
                      <span>{enq.email}</span>
                      <span>•</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={enq.status || 'new'}
                    onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 capitalize"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted to Booking</option>
                    <option value="closed">Closed</option>
                  </select>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Lead</span>
                  </a>
                </div>
              </div>

              {/* Trip Preferences tags */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                <div className="md:col-span-8 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-500">Requested Details:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {destinationsArray.map((d, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium text-[11px]">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {enq.message && (
                    <p className="text-slate-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60 text-xs">
                      <strong>Client Note:</strong> {enq.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center space-y-1 text-slate-600">
                  <div><strong>Group Size:</strong> {enq.groupSize || 'N/A'} People</div>
                  <div><strong>Travel Dates:</strong> {enq.travelDates || 'Flexible'}</div>
                  <div><strong>Status:</strong> <span className="capitalize font-bold text-slate-800">{enq.status || 'new'}</span></div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
            No enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}