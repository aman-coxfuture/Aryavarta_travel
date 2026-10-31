import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../api/axios'; // Backend se connect karne ke liye

export default function Login() {
  const navigate = useNavigate();
  
  // Tune Postman me ye credentials banaye the, toh maine default me yahi daal diye hain
  const [email, setEmail] = useState('admin@aryavarta.com'); 
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Purana error clear karo

    try {
      // Backend API call
      const response = await api.post('/auth/login', { email, password });
      
      // Token aur User data localStorage me save karo
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data));
      
      setLoading(false);
      // Dashboard pe redirect karo
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      // Agar backend se error aaya (jaise galat password)
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Mountain Photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2000&q=85')`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-auto p-1 bg-white rounded-2xl shadow-lg border border-slate-200/80 inline-flex items-center justify-center overflow-hidden mx-auto mb-4">
            <img src="/logo.png" alt="Aryavarta Travel" className="h-full w-auto object-contain rounded-xl" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">
            Aryavarta <span className="text-amber-600">Travel</span>
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
            Admin Operations Panel
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aryavarta.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-amber-600 focus:ring-amber-500" />
              <span>Remember this device</span>
            </label>
            <span className="text-amber-600 hover:underline cursor-pointer">Forgot key?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 group mt-2 disabled:opacity-70"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Leh Basecamp Station • Server Time 2026
        </div>

      </div>
    </div>
  );
}