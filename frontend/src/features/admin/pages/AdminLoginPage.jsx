import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, authError, setAuthError } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    setTimeout(() => {
      const success = login(email, password);
      setIsSubmitting(false);
      if (success) {
        navigate('/admin');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience Decorations */}
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-[#1B4332] to-[#FFF8EC] -z-0"></div>
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#D4731A]/10 blur-3xl"></div>
      <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-[#1B4332]/10 blur-3xl"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">

        {/* Back to site link */}
        <div className="mb-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFF8EC]/90 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs"
          >
            <ArrowLeft size={14} /> Back to Customer Website
          </Link>
        </div>

        {/* Card Header with Website Logo */}
        <div className="text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/95 border-2 border-[#D4731A] shadow-xl mb-3 backdrop-blur-xs">
            <img
              src="/logo-sm.svg"
              alt="Sri Mahalakshmi Caters Logo"
              className="h-16 w-auto object-contain rounded-md"
            />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#FFF8EC] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sri Mahalakshmi
          </h2>
          <p
            className="mt-1 text-xs uppercase tracking-[0.18em] text-[#E0B030] font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Kitchen & Caterers • Admin Portal
          </p>
        </div>

        {/* Login Form Box */}
        <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border-2 border-[#C4960A]/40 relative">

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-[#6B4423] uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@srimahalakshmi.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4731A] focus:bg-white transition-all text-[#2C1A00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B4423] uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4731A] focus:bg-white transition-all text-[#2C1A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-[#1B4332] hover:bg-[#112A1F] active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} className="text-[#E0B030]" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-400">
              Credentials are authenticated securely via environment configuration.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
