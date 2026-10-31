import React, { useState } from 'react';
import { X, Check, CreditCard, ShieldCheck } from 'lucide-react';

export default function PaymentModal({ booking, onClose, onConfirm }) {
  if (!booking) return null;

  const totalAmount = booking.packagePrice ?? booking.totalAmount ?? 0;
  const paidAmount = booking.amountPaid ?? booking.paidAmount ?? 0;
  const dueAmount = Math.max(0, totalAmount - paidAmount);
  const displayId = booking.id || (booking._id ? `BK-${booking._id.slice(-6).toUpperCase()}` : '');
  const customerName = booking.customerName || booking.name || 'Traveler';
  const packageName = booking.packageName || booking.packageTitle || 'Ladakh Tour Package';

  const [amount, setAmount] = useState(dueAmount > 0 ? dueAmount : totalAmount);
  const [method, setMethod] = useState('UPI / GPay');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(booking._id || booking.id, {
      amount: Number(amount),
      method,
      transactionRef,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Payment Settlement
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Mark Booking as Paid ({displayId})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Booking Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <strong className="text-slate-900">{customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Package:</span>
              <span className="text-slate-900 font-medium truncate max-w-xs">{packageName}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200 text-sm">
              <span className="text-slate-700 font-semibold">Total Package Price:</span>
              <strong className="text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Already Paid:</span>
              <span className="text-emerald-600 font-bold">₹{paidAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Current Balance Due:</span>
              <span className="text-rose-600 font-bold">₹{dueAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Payment Amount to Record (₹) *
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Payment Method *
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="UPI / GPay">UPI / Google Pay / PhonePe</option>
              <option value="Direct Bank NEFT / RTGS">Direct Bank Transfer (NEFT / RTGS)</option>
              <option value="Cash at Leh Office">Cash Received at Leh Basecamp Office</option>
              <option value="Credit / Debit Card">Credit / Debit Card POS</option>
              <option value="International Wire (SWIFT)">International Wire / SWIFT</option>
            </select>
          </div>

          {/* Transaction / Reference Number */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Transaction Ref / UTR / Receipt No.
            </label>
            <input
              type="text"
              placeholder="e.g. UPI/1234567890/SBI"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Settlement Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Internal Notes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. 50% advance confirmed. Balance to be paid in Leh."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            ></textarea>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Mark Paid</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
