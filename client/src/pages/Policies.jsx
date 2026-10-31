import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CreditCard, 
  Compass,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function Policies() {
  const [activeTab, setActiveTab] = useState('cancellation');

  const tabs = [
    { id: 'cancellation', label: 'Cancellation & Refunds', icon: FileText },
    { id: 'payment', label: 'Payment Terms & Schedule', icon: CreditCard },
    { id: 'altitude', label: 'High Altitude & Medical Terms', icon: AlertTriangle },
    { id: 'permits', label: 'Inner Line Permits (ILP)', icon: ShieldCheck },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
            Transparency & Safety First
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Terms, Cancellation & Travel Policies
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
            Clear, honest travel policies tailored for the unique geographical realities of the Ladakh trans-Himalayas.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-2 flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-10 text-slate-700 leading-relaxed space-y-6 text-sm">
          
          {/* TAB 1: CANCELLATION */}
          {activeTab === 'cancellation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">
                  Cancellation & Refund Policy
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  We understand travel plans can shift unexpectedly due to flight changes or personal emergencies. Our refund schedule is clear and predictable:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider">
                      <th className="p-3.5 border-b border-slate-200">Notice Period Before Tour Start</th>
                      <th className="p-3.5 border-b border-slate-200">Cancellation Charge</th>
                      <th className="p-3.5 border-b border-slate-200">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">30+ Days Prior to Travel Date</td>
                      <td className="p-3.5 text-slate-600">₹1,500 / person processing fee</td>
                      <td className="p-3.5 font-bold text-emerald-600">100% of Balance Refunded</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">15 to 29 Days Prior</td>
                      <td className="p-3.5 text-slate-600">25% of Total Tour Cost</td>
                      <td className="p-3.5 font-bold text-slate-800">75% Refunded</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">7 to 14 Days Prior</td>
                      <td className="p-3.5 text-slate-600">50% of Total Tour Cost</td>
                      <td className="p-3.5 font-bold text-slate-800">50% Refunded</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-slate-900">Less than 7 Days / No-show</td>
                      <td className="p-3.5 text-rose-600 font-medium">100% of Total Tour Cost</td>
                      <td className="p-3.5 text-slate-400">Non-refundable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="font-bold flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-600" />
                  Free Rescheduling Guarantee
                </div>
                <p>
                  If your flight into Leh is cancelled by the airline due to weather or technical reasons, you may reschedule your tour dates within 12 months with ZERO penalty fee (subject to seasonal hotel rate differences).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENT */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">
                  Payment Schedule & Accepted Methods
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  We maintain a flexible milestone-based payment structure to keep your booking risk-free:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-amber-600 font-serif mb-1">30%</div>
                  <div className="text-sm font-bold text-slate-900">At Time of Booking</div>
                  <p className="text-xs text-slate-500 mt-2">
                    Secures hotel reservations in Leh & luxury campsites at Pangong / Nubra.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-amber-600 font-serif mb-1">50%</div>
                  <div className="text-sm font-bold text-slate-900">10 Days Prior to Travel</div>
                  <p className="text-xs text-slate-500 mt-2">
                    Enables vehicle allocation, driver assignment, and government ILP permit generation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-amber-600 font-serif mb-1">20%</div>
                  <div className="text-sm font-bold text-slate-900">Upon Arrival in Leh</div>
                  <p className="text-xs text-slate-500 mt-2">
                    Pay the remaining balance during your orientation welcome at our Leh Basecamp.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Accepted Payment Modes</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Direct Bank NEFT / RTGS Transfer (Current Account)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> UPI / Google Pay / PhonePe / Paytm</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Credit & Debit Cards (Visa, MasterCard, Amex)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> International Wire / SWIFT Transfers</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ALTITUDE */}
          {activeTab === 'altitude' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">
                  High Altitude Health & Acclimatization
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Ladakh sits between 10,000 ft and 18,000 ft above sea level. Reduced oxygen levels can trigger Acute Mountain Sickness (AMS) if proper protocols are not followed.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Mandatory First 24-Hour Rest</h4>
                  <p className="text-xs text-slate-600">
                    Per Ladakh Tourism and local health administration mandates, day 1 must be spent resting in your hotel. No high passes, strenuous walks, or monastery hikes on the day of arrival.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Hydration & Nutrition</h4>
                  <p className="text-xs text-slate-600">
                    Drink at least 3.5 to 4 liters of clean water, garlic soup, and electrolyte solutions daily. Strictly avoid alcohol and smoking for the first 48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Emergency Oxygen Onboard</h4>
                  <p className="text-xs text-slate-600">
                    Every Aryavarta vehicle carries a portable medical oxygen cylinder and pulse oximeter. If a guest’s SpO2 level dips below 75% or severe headache persists, our driver has standing orders to descend immediately to lower altitude and visit the nearest medical center.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PERMITS */}
          {activeTab === 'permits' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">
                  Inner Line Permits (ILP) & Protected Areas
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Certain sectors in Ladakh lie close to international borders and require official Inner Line Permits issued by the Leh District Administration.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>Regions Requiring Permits:</strong> Pangong Tso Lake, Nubra Valley (Diskit, Hunder, Sumur), Turtuk, Tyakshi, Tso Moriri Lake, Korzok, Hanle, Nyoma, Chushul, and Zanskar.
                </p>
                <p>
                  <strong>Documents Required:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Indian Nationals: Clear scan/photo of Valid Govt Photo ID (Aadhaar Card, Passport, Voter ID, Driving License).</li>
                  <li>Foreign Nationals: Valid Passport with valid Indian Visa or e-Visa (Protected Area Permit PAP required).</li>
                </ul>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                  Aryavarta Travel handles all paperwork, DC office submission, and environmental tax payments on your behalf. Printed sets are handed to you in the vehicle upon pickup.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
