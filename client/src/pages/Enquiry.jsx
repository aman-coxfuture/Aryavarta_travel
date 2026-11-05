import React, { useState } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Phone, Mail, User, 
  Sparkles, CheckCircle2, MessageCircle, Check, Send, Loader2
} from 'lucide-react';
import api from '../api/axios'; // Backend API import kiya

export default function Enquiry() {
  const [destinations, setDestinations] = useState([
    'Pangong Tso Lake',
    'Nubra Valley & Hunder',
  ]);

  const [travelStyle, setTravelStyle] = useState('Family & Friends');
  const [duration, setDuration] = useState('6 - 8 Days');
  const [hotelTier, setHotelTier] = useState('3-Star Boutique & Swiss Tents');
  const [month, setMonth] = useState('June');
  const [guests, setGuests] = useState('2-4 Travelers');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state add ki

  const availableDestinations = [
    'Pangong Tso Lake',
    'Nubra Valley & Hunder',
    'Turtuk (Balti Border Village)',
    'Tso Moriri & Nomad Plateau',
    'Hanle (Dark Sky Reserve & Observatory)',
    'Zanskar Valley & Phugtal',
    'Sham Valley & Likir/Alchi',
    'Chadar Frozen River (Winter Only)',
  ];

  const handleDestinationToggle = (dest) => {
    if (destinations.includes(dest)) {
      setDestinations(destinations.filter((d) => d !== dest));
    } else {
      setDestinations([...destinations, dest]);
    }
  };

  // --- BACKEND CONNECTION LOGIC START ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Backend format ke hisaab se data ready karo
      const payload = {
        name: fullName,
        phone: phone,
        email: email,
        travelDates: month, // Backend me 'travelDates' string hai
        groupSize: 2, // Default value (kyunki UI me exact number input nahi hai)
        // Saari extra details ko message me format karke bhej rahe hain
        message: `
Destinations: ${destinations.join(', ')}
Style: ${travelStyle}
Duration: ${duration}
Stay Category: ${hotelTier}
Travelers: ${guests}
Notes: ${notes || 'None'}
        `.trim()
      };

      // 2. API Call
      await api.post('/enquiries', payload);
      
      // 3. Success State
      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry Submit Error:", error);
      alert("Failed to send enquiry. Please try again or contact on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- BACKEND CONNECTION LOGIC END ---

  const waEnquiryText = encodeURIComponent(
    `Hello Aryavarta Travel! I would like a custom Ladakh itinerary quote.\n` +
    `• Destinations: ${destinations.join(', ')}\n` +
    `• Style: ${travelStyle}\n` +
    `• Duration: ${duration}\n` +
    `• Month: ${month}\n` +
    `• Travelers: ${guests}\n` +
    `• Name: ${fullName || 'Traveler'}`
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1800&q=80')`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Tailor-Made Custom Trips</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Design Your Dream Ladakh Journey
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Want to combine Hanle Dark Sky stargazing with Turtuk apricot orchards? Choose your wishlist below and our mountain itinerary designers will curate it for you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 md:p-10">
          
          {submitted ? (
            <div className="text-center py-8 sm:py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Custom Trip Request Received!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName || 'Explorer'}</strong>! We are currently tailoring your personalized Ladakh blueprint with our Leh logistics team. We will send the complete day-by-day plan to <strong>{email || phone}</strong>.
              </p>
              <div className="pt-4 flex justify-center space-x-3">
                <a
                  href={`https://wa.me/919622971598?text=${waEnquiryText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Chat on WhatsApp Directly
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              
              {/* Step 1: Destination Wishlist */}
              <div>
                <label className="text-sm font-bold text-slate-900 block mb-3 flex items-center">
                  <MapPin className="w-4 h-4 text-amber-500 mr-2" />
                  1. Which places do you want to explore? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableDestinations.map((dest) => {
                    const isSelected = destinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => handleDestinationToggle(dest)}
                        className={`text-left p-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-amber-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{dest}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Trip Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Travel Style */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    2. Travel Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="Family & Friends">Family & Friends (Leisure & Comfort)</option>
                    <option value="Honeymoon & Couples">Romantic & Honeymoon (Luxury & Privacy)</option>
                    <option value="Royal Enfield Biker Tour">Royal Enfield Motorcycle Expedition</option>
                    <option value="Off-road 4x4 Overland">Rugged 4x4 Overlanding Expedition</option>
                    <option value="Senior Citizens Friendly">Senior Citizen Friendly (Low Altitude & Extra Care)</option>
                    <option value="Photography & Stargazing">Astro-Photography & Dark Sky Tour</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    3. Duration Preference
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="4 - 5 Days">Short (4 - 5 Days)</option>
                    <option value="6 - 8 Days">Standard (6 - 8 Days - Recommended)</option>
                    <option value="9 - 11 Days">Comprehensive (9 - 11 Days)</option>
                    <option value="12+ Days">Grand Trans-Himalayan (12+ Days)</option>
                  </select>
                </div>

                {/* Target Month */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    4. Planned Travel Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    {['May', 'June', 'July', 'August', 'September', 'October', 'Winter (Jan/Feb Chadar)'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Hotel Tier */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    5. Stay Category
                  </label>
                  <select
                    value={hotelTier}
                    onChange={(e) => setHotelTier(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="3-Star Boutique & Swiss Tents">3-Star Boutique Hotels & Deluxe Camps</option>
                    <option value="4-Star Luxury & Glamping">4-Star Premium Resorts & Heated Glamping</option>
                    <option value="Standard Homestays & Guesthouses">Authentic Ladakhi Village Homestays</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  6. Where should we send your customized itinerary?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <textarea
                    rows="2"
                    placeholder="Any specific requests? (e.g. traveling with kids, need photography spots, bike rental requirements)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  ></textarea>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1" />
                      <span>Request Custom Plan & Quote</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/919622971598?text=${waEnquiryText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}