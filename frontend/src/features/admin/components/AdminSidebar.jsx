import React from 'react';
import { 
  ShoppingBag, 
  UtensilsCrossed, 
  PartyPopper, 
  ChefHat, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Download, 
  LogOut, 
  ExternalLink,
  Radio,
  X,
  ShieldCheck,
  Sliders,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminSidebar = ({
  activeTab,
  setActiveTab,
  ordersCount,
  tableQrCount = 0,
  diningCount,
  cateringCount,
  soundEnabled,
  onToggleSound,
  soundSettings,
  onOpenSoundSettings,
  onRefresh,
  isRefreshing,
  onExportCSV,
  onOpenKitchenSheet,
  onLogout,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    {
      id: 'orders',
      label: 'Food Orders',
      icon: ShoppingBag,
      count: ordersCount,
      badgeColor: 'bg-emerald-500 text-white',
      desc: 'Online & Counter Orders'
    },
    {
      id: 'table_qr',
      label: 'Table QR Orders',
      icon: Smartphone,
      count: tableQrCount,
      badgeColor: 'bg-amber-500 text-white',
      desc: 'Live QR Table Orders'
    },
    {
      id: 'dining',
      label: 'Dining Bookings',
      icon: UtensilsCrossed,
      count: diningCount,
      badgeColor: 'bg-[#D4731A] text-white',
      desc: 'Table Reservations'
    },
    {
      id: 'catering',
      label: 'Catering Events',
      icon: PartyPopper,
      count: cateringCount,
      badgeColor: 'bg-purple-600 text-white',
      desc: 'Weddings & Celebrations'
    },
    {
      id: 'menu_sheet',
      label: 'Menu Manager',
      icon: ChefHat,
      desc: 'Database Management',
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1B4332] text-[#FFF8EC] border-r-2 border-[#D4731A]/30 shadow-2xl select-none">
      
      {/* Brand Header */}
      <div className="p-3.5 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to="/" target="_blank" title="View customer website" className="shrink-0 hover:opacity-90 transition-opacity">
            <img 
              src="/logo-sm.svg" 
              alt="Logo" 
              className="h-9 w-auto object-contain rounded-md bg-white/10 p-1" 
            />
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading font-extrabold text-sm sm:text-base text-[#E0B030] tracking-wide leading-none">
                Super Admin
              </h1>
              <ShieldCheck size={13} className="text-[#E0B030]" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#FFF8EC]/70 mt-0.5 font-medium">
              Sri Mahalakshmi Caters
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        {isOpenMobile && (
          <button 
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF8EC] transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>


      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
        <p className="px-2.5 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#E0B030]/80">
          Operation Desks
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isExternal) {
                  window.open(item.url, '_blank');
                  if (onCloseMobile) onCloseMobile();
                } else {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4731A] to-[#B05D10] text-white shadow-md font-bold'
                  : 'hover:bg-white/10 text-[#FFF8EC]/90 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-[#E0B030]'}`}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs sm:text-sm font-semibold truncate leading-tight">{item.label}</span>
                  <span className={`block text-[10px] leading-tight truncate ${isActive ? 'text-white/80' : 'text-[#FFF8EC]/50'}`}>
                    {item.desc}
                  </span>
                </div>
              </div>

              {typeof item.count === 'number' && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black shadow-xs shrink-0 ml-1 ${item.badgeColor}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Master Sheet Link */}
        <div className="pt-2 px-0.5">
          <button
            onClick={() => {
              onOpenKitchenSheet();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-[#E0B030]/30 transition-all text-xs font-bold text-[#E0B030] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ChefHat size={15} />
              <span className="text-xs">Today's Kitchen Sheet</span>
            </div>
            <span className="text-[10px] bg-[#E0B030] text-[#1B4332] px-1.5 py-0.5 rounded font-black">
              Batch
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Controls & System Utilities */}
      <div className="p-3 border-t border-white/10 bg-[#112A1F] space-y-1.5">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#FFF8EC]/90">
            <span className="font-semibold text-xs flex items-center gap-1">
              <span>🔔 Sound Alert</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenSoundSettings}
                className="p-1 px-1.5 rounded bg-white/10 hover:bg-white/20 text-[#FFF8EC] text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                title="Change Alert Sound & Volume"
              >
                <Sliders size={11} className="text-[#D4731A]" />
                <span>Options</span>
              </button>
              <button
                onClick={onToggleSound}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  soundEnabled ? 'bg-[#D4731A] text-white shadow-xs' : 'bg-white/10 text-stone-400'
                }`}
                title={soundEnabled ? 'Click to Mute' : 'Click to Enable Sound'}
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>
            </div>
          </div>
          <div className="text-[10px] text-white/50 flex justify-between px-0.5">
            <span>Vol: {Math.round((soundSettings?.volume || 0.9) * 100)}%</span>
            <span>Rings: {soundSettings?.repeatCount || 2}x</span>
          </div>
        </div>

        <button
          onClick={onExportCSV}
          className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center justify-center gap-1.5 text-[#FFF8EC] transition-all cursor-pointer"
        >
          <Download size={12} className="text-[#E0B030]" /> Export Data to CSV
        </button>

        <div className="pt-0.5 flex items-center justify-between">
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1 text-[11px] text-[#FFF8EC]/60 hover:text-white transition-colors"
          >
            <ExternalLink size={11} /> Visit Website
          </Link>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
          >
            <LogOut size={11} /> Logout
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed left) */}
      <aside className="hidden md:block w-60 lg:w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden animate-fade-in"
          onClick={onCloseMobile}
        >
          <div 
            className="w-72 max-w-[85vw] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
