import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

export const AdminLoginPage = () => {
  // Modes: 'login' | 'forgot_request' | 'forgot_verify' | 'success'
  const [mode, setMode] = useState('login');

  // Input states
  const [email, setEmail] = useState('admin@srimahalakshmi.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password flow states
  const [resetEmail, setResetEmail] = useState('admin@srimahalakshmi.com');
  const [otpCode, setOtpCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [previewOtp, setPreviewOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // UI state
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    login,
    authError,
    setAuthError,
    requestPasswordReset,
    resetPassword
  } = useAdminAuth();

  const navigate = useNavigate();

  // Handle Standard Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);
    setStatusMessage(null);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Step 1: Request Password Reset Code
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);
    setStatusMessage(null);

    try {
      const res = await requestPasswordReset(resetEmail);
      if (res.success) {
        setResetToken(res.resetToken);
        setPreviewOtp(res.previewOtp || '');
        setStatusMessage(`Verification code sent for ${resetEmail}.`);
        setMode('forgot_verify');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Step 2: Confirm OTP & Reset Password
  const handleCompleteReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);
    setStatusMessage(null);

    if (newPassword !== confirmPassword) {
      setAuthError('New password and confirmation password do not match.');
      setIsSubmitting(false);
      return;
    }

    if (newPassword.length < 6) {
      setAuthError('New password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await resetPassword({
        email: resetEmail,
        otpCode,
        resetToken,
        newPassword
      });

      if (res.success) {
        setStatusMessage(res.message);
        setMode('success');
        setPassword(newPassword);
        setEmail(resetEmail);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOtpToInput = () => {
    if (previewOtp) {
      setOtpCode(previewOtp);
      setCopiedOtp(true);
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06120C] via-[#0B2117] to-[#040D08] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#E0B030] selection:text-black">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#1B4332]/40 via-[#D4731A]/10 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-24 -left-20 w-80 h-80 rounded-full bg-[#1B4332]/30 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#E0B030]/10 blur-[100px] pointer-events-none" />

      {/* Faint luxury background lattice grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">

        {/* Back to site pill link */}
        <div className="mb-5 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFF8EC]/80 hover:text-white transition-all bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm hover:shadow"
          >
            <ArrowLeft size={13} className="text-[#E0B030]" />
            <span>Back to Customer Website</span>
          </Link>
        </div>

        {/* Brand Crest & Heading */}
        <div className="text-center flex flex-col items-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4731A] via-[#E0B030] to-[#1B4332] opacity-40 blur-md group-hover:opacity-75 transition-opacity" />
            <div className="relative inline-flex items-center justify-center p-3 rounded-2xl bg-[#0F261C] border border-[#E0B030]/40 shadow-2xl backdrop-blur-md">
              <img
                src="/logo-sm.svg"
                alt="Sri Mahalakshmi Caters Logo"
                className="h-14 w-auto object-contain rounded-md drop-shadow"
              />
            </div>
          </div>

          <h1
            className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#FFF8EC] tracking-tight drop-shadow-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sri Mahalakshmi
          </h1>
          <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-white/[0.05] border border-[#E0B030]/20">
            <Sparkles size={11} className="text-[#E0B030]" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E0B030] font-bold">
              Kitchen & Caterers • Executive Portal
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#0E2319]/90 backdrop-blur-xl py-8 px-6 sm:px-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] rounded-3xl border border-[#E0B030]/25 relative overflow-hidden">
          
          {/* Top subtle golden rim highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E0B030] to-transparent" />

          {/* Feedback Messages */}
          {authError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-medium flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{authError}</span>
            </div>
          )}

          {statusMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{statusMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: SIGN IN MODE                                      */}
          {/* ========================================================= */}
          {mode === 'login' && (
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#E0B030] transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@srimahalakshmi.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#FFF8EC] placeholder-stone-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider">
                    Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setStatusMessage(null);
                      setResetEmail(email || 'admin@srimahalakshmi.com');
                      setMode('forgot_request');
                    }}
                    className="text-xs text-[#E0B030]/90 hover:text-[#FFF8EC] font-semibold underline-offset-4 hover:underline transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#E0B030] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#FFF8EC] placeholder-stone-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#FFF8EC] transition-colors p-0.5"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl text-[#0A1812] font-extrabold text-sm bg-gradient-to-r from-[#E0B030] via-[#F4C542] to-[#D4731A] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/40 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin text-[#0A1812]" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} className="text-[#0A1812]" />
                    <span>Access Dashboard</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: FORGOT PASSWORD - STEP 1 (REQUEST CODE)           */}
          {/* ========================================================= */}
          {mode === 'forgot_request' && (
            <form className="space-y-5" onSubmit={handleRequestReset}>
              <div className="text-center pb-1">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E0B030]/10 border border-[#E0B030]/30 text-[#E0B030] mb-2">
                  <KeyRound size={18} />
                </div>
                <h2 className="text-base font-bold text-[#FFF8EC]">
                  Reset Admin Password
                </h2>
                <p className="text-xs text-stone-300 mt-1">
                  Enter your registered admin email address. A 6-digit verification code will be generated for recovery.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider mb-2">
                  Administrator Email
                </label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#E0B030] transition-colors" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@srimahalakshmi.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#FFF8EC] placeholder-stone-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-[#0A1812] font-extrabold text-sm bg-gradient-to-r from-[#E0B030] via-[#F4C542] to-[#D4731A] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/40 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin text-[#0A1812]" />
                      <span>Generating Code...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound size={16} className="text-[#0A1812]" />
                      <span>Generate Recovery Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null);
                    setStatusMessage(null);
                    setMode('login');
                  }}
                  className="w-full py-2 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer text-center"
                >
                  Cancel and Return to Sign In
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: FORGOT PASSWORD - STEP 2 (ENTER OTP & NEW PASS)   */}
          {/* ========================================================= */}
          {mode === 'forgot_verify' && (
            <form className="space-y-4" onSubmit={handleCompleteReset}>
              <div className="text-center pb-0.5">
                <h2 className="text-base font-bold text-[#FFF8EC]">
                  Set New Password
                </h2>
                <p className="text-xs text-stone-300 mt-1">
                  Enter the 6-digit verification code sent to <span className="text-[#E0B030] font-semibold">{resetEmail}</span>.
                </p>
              </div>

              {/* Instant Verification Code Card (Ensures no lockouts) */}
              {previewOtp && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-[#E0B030]/30 flex items-center justify-between gap-2">
                  <div className="text-xs text-[#FFF8EC]">
                    <span className="text-stone-300">Security Code: </span>
                    <span className="font-mono font-bold tracking-widest text-[#E0B030] text-sm">{previewOtp}</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyOtpToInput}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A1812] bg-[#E0B030] hover:bg-[#F4C542] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedOtp ? (
                      <>
                        <Check size={12} /> Applied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Auto-Fill
                      </>
                    )}
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full py-2.5 text-center text-lg tracking-[0.35em] font-mono font-bold bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#E0B030] placeholder-stone-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider mb-1.5">
                  New Admin Password
                </label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#E0B030] transition-colors" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#FFF8EC] placeholder-stone-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#FFF8EC] transition-colors p-0.5"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0B030] uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#E0B030] transition-colors" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#06140D]/80 border border-stone-700/80 rounded-xl focus:outline-none focus:border-[#E0B030] focus:ring-2 focus:ring-[#E0B030]/20 text-[#FFF8EC] placeholder-stone-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-[#0A1812] font-extrabold text-sm bg-gradient-to-r from-[#E0B030] via-[#F4C542] to-[#D4731A] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/40 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin text-[#0A1812]" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} className="text-[#0A1812]" />
                      <span>Update Password & Save</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between px-1 text-xs text-stone-300">
                  <button
                    type="button"
                    onClick={handleRequestReset}
                    className="hover:text-[#E0B030] transition-colors cursor-pointer"
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setStatusMessage(null);
                      setMode('login');
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: SUCCESS CONFIRMATION                              */}
          {/* ========================================================= */}
          {mode === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#FFF8EC]">
                  Password Reset Complete!
                </h2>
                <p className="text-xs text-stone-300 mt-1.5 max-w-xs mx-auto">
                  Your administrator password has been updated securely. You can now access the portal with your new credentials.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={async () => {
                    setIsSubmitting(true);
                    try {
                      const success = await login(email, password);
                      if (success) {
                        navigate('/admin');
                      } else {
                        setMode('login');
                      }
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl text-[#0A1812] font-extrabold text-sm bg-gradient-to-r from-[#E0B030] via-[#F4C542] to-[#D4731A] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={18} className="text-[#0A1812]" />
                  <span>Sign In Immediately</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStatusMessage(null);
                    setMode('login');
                  }}
                  className="w-full py-2 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  Return to Login Screen
                </button>
              </div>
            </div>
          )}

          {/* Footer Security Badge */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] text-center">
            <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TLS / SSL 256-bit Protected Administrator Authentication</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
