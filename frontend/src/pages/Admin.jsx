import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, Calendar, PartyPopper, Image as ImageIcon, ArrowLeft, ShieldCheck, Database, LogOut, Lock, Key, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminApi from '@/features/admin/api/adminApi';

// Modular Admin Feature Components
import { MenuManagement } from '@/features/admin/components/MenuManagement';
import { OrdersManagement } from '@/features/admin/components/OrdersManagement';
import { ReservationsManagement } from '@/features/admin/components/ReservationsManagement';
import { CateringManagement } from '@/features/admin/components/CateringManagement';
import { GalleryManagement } from '@/features/admin/components/GalleryManagement';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('admin_token'));
  });
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'gallery' | 'orders' | 'reservations' | 'catering'
  
  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const currentUser = adminApi.getCurrentUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter username and password');
      return;
    }

    setLoggingIn(true);
    try {
      await adminApi.login(username.trim(), password.trim());
      setIsAuthenticated(true);
      toast.success('Welcome back, Admin! 🪔');
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials configured in backend .env');
      toast.error('Invalid admin credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'menu', label: 'Dishes & Menu', icon: Utensils, countLabel: 'PostgreSQL DB' },
    { id: 'gallery', label: 'Gallery Showcase', icon: ImageIcon, countLabel: 'Photos & Food' },
    { id: 'orders', label: 'Online Orders', icon: ShoppingBag, countLabel: 'Cart Orders' },
    { id: 'reservations', label: 'Table Bookings', icon: Calendar, countLabel: 'Dinings' },
    { id: 'catering', label: 'Catering Leads', icon: PartyPopper, countLabel: 'Events' },
  ];

  // If Not Authenticated, render Admin Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#112A1F] flex items-center justify-center p-4 relative overflow-hidden">
        <Helmet>
          <title>Admin Login | Sri Mahalakshmi Kitchen & Caterers</title>
        </Helmet>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4731A]/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-stone-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1B4332] text-[#D4731A] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1B4332]/20">
              <Lock size={30} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4731A] block mb-1">
              Secure Operations Console
            </span>
            <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Authentication
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Credentials are authenticated directly against your backend <code className="bg-stone-100 px-1 py-0.5 rounded text-[#1B4332] font-mono">.env</code> file.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Admin Username or Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#1B4332] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#1B4332] transition-colors"
              />
            </div>

            <div className="bg-[#FFF8EC] border border-[#D4731A]/30 p-3 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
              <Key size={14} className="text-[#D4731A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1B4332]">Default configured credentials:</span>
                <p className="font-mono text-[11px] text-stone-700 mt-0.5">Username: <span className="font-bold">admin</span> | Password: <span className="font-bold">admin123</span></p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-[#1B4332] hover:bg-[#255b44] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                'Sign In to Admin Console'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-[#1B4332] transition-colors"
            >
              <ArrowLeft size={13} /> Back to Customer Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-stone-900 pb-20">
      <Helmet>
        <title>Admin Operations Console | Sri Mahalakshmi Kitchen & Caterers</title>
      </Helmet>

      {/* Admin Navbar */}
      <header className="bg-[#112A1F] text-white border-b border-[#D4731A]/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft size={14} /> Back to Website
            </Link>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sri Mahalakshmi
                </span>
                <span className="bg-[#D4731A] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-stone-300 flex items-center gap-1.5">
                <Database size={11} className="text-emerald-400" /> PostgreSQL Neon Cloud Connected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live DB Mode
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Logout from admin session"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4332] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#D4731A]' : 'text-stone-400'} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {tab.countLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <AnimatePresence mode="wait">
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MenuManagement />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryManagement />
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <OrdersManagement />
            </motion.div>
          )}

          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ReservationsManagement />
            </motion.div>
          )}

          {activeTab === 'catering' && (
            <motion.div
              key="catering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CateringManagement />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Admin;
