import React from 'react';
import { Volume2, VolumeX, RefreshCw, Download, ExternalLink, LogOut, ShieldCheck, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminNavbar = ({
  lastSyncTime,
  isRefreshing,
  onRefresh,
  soundEnabled,
  onToggleSound,
  onExportCSV,
  onOpenDailyKitchenSheet,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#1B4332] text-[#FFF8EC] border-b-2 border-[#D4731A] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Brand & Live Status */}
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" title="View customer website" className="shrink-0 hover:opacity-90 transition-opacity">
              <img
                src="/logo-sm.svg"
                alt="Sri Mahalakshmi Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-md"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span
                    className="font-extrabold leading-none text-white text-base sm:text-lg"
                    style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}
                  >
                    Sri Mahalakshmi
                  </span>
                  <span
                    className="leading-none text-[#E0B030] text-[0.62rem] sm:text-[0.68rem] tracking-[0.14em] font-bold uppercase mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Kitchen & Caterers
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#D4731A] text-white uppercase tracking-wider ml-1">
                  Admin Hub
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                  Live Auto-Sync Active
                </span>
                <span className="text-[11px] text-[#FFF8EC]/60 hidden md:inline">
                  • Last: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Audio chime toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${soundEnabled
                  ? 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40 hover:bg-emerald-800/60'
                  : 'bg-stone-850 text-stone-400 border-stone-700 hover:bg-stone-800'
                }`}
              title={soundEnabled ? 'Order sound alert is ON' : 'Order sound alert is MUTED'}
            >
              {soundEnabled ? <Volume2 size={16} className="text-[#E0B030]" /> : <VolumeX size={16} />}
              <span className="hidden md:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF8EC] text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/20 disabled:opacity-50"
              title="Sync latest orders now"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-[#E0B030]' : ''} />
              <span className="hidden sm:inline">Sync Now</span>
            </button>

            {/* Kitchen Prep Sheet */}
            <button
              onClick={onOpenDailyKitchenSheet}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-[#FFF8EC] text-xs font-bold transition-all border border-emerald-500/50 shadow-xs"
              title="Print Today's Master Kitchen Production & Prep Sheet"
            >
              <ChefHat size={15} className="text-[#E0B030]" />
              <span className="hidden sm:inline">Kitchen Prep Sheet</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={onExportCSV}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D4731A] hover:bg-[#B05D10] text-white text-xs font-bold transition-all shadow-xs"
              title="Export all orders to Excel / CSV"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>

            {/* View Customer Website */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 text-[#FFF8EC] text-xs font-medium transition-all border border-white/10"
              title="Open public restaurant website in new tab"
            >
              <ExternalLink size={14} />
              <span>Visit Site</span>
            </Link>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-red-900/40 hover:bg-red-900/70 text-red-200 border border-red-700/50 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Logout from Admin Hub"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
