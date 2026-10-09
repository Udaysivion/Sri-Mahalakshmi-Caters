import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminOrders } from '../hooks/useAdminOrders';
import { exportOrdersToCSV, exportDiningToCSV, exportCateringToCSV } from '../services/adminOrderService';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminStats } from '../components/AdminStats';
import { OrdersTable } from '../components/OrdersTable';
import { DiningReservationsTable } from '../components/DiningReservationsTable';
import { CateringInquiriesTable } from '../components/CateringInquiriesTable';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { KitchenTicketPrint } from '../components/KitchenTicketPrint';
import { DailyKitchenSummaryModal } from '../components/DailyKitchenSummaryModal';
import { ExportOrdersModal } from '../components/ExportOrdersModal';
import SoundSettingsModal from '../components/SoundSettingsModal';
import { MenuManagerPage } from './MenuManagerPage';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import {
  Menu,
  RefreshCw,
  Volume2,
  VolumeX,
  ChefHat,
  Download,
  LogOut,
  ShoppingBag,
  UtensilsCrossed,
  PartyPopper,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Sliders,
  Smartphone
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [kotOrder, setKotOrder] = useState(null);
  const [showDailyKitchenModal, setShowDailyKitchenModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Hook handles auto-reloading every 6s, audio chime on new orders/dining/catering, and storage sync
  const {
    activeTab,
    setActiveTab,
    orders,
    rawOrders,
    diningReservations,
    cateringInquiries,
    isLoading,
    isRefreshing,
    lastSyncTime,
    soundEnabled,
    setSoundEnabled,
    soundSettings,
    updateSoundSettings,
    isSoundModalOpen,
    setIsSoundModalOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    refreshOrders,
    handleUpdateOrderStatus,
    handleUpdateDiningStatus,
    handleUpdateCateringStatus,
    stats,
    unviewedCounts
  } = useAdminOrders(6000);

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleExportCSV = () => {
    setShowExportModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] text-[#2C1A00] flex flex-col md:flex-row font-sans">
      {/* Super Admin Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ordersCount={unviewedCounts?.foodOrders || 0}
        tableQrCount={unviewedCounts?.tableQr || 0}
        diningCount={unviewedCounts?.dining || 0}
        cateringCount={unviewedCounts?.catering || 0}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        soundSettings={soundSettings}
        onOpenSoundSettings={() => setIsSoundModalOpen(true)}
        onRefresh={refreshOrders}
        isRefreshing={isRefreshing}
        onOpenKitchenSheet={() => setShowDailyKitchenModal(true)}
        onLogout={logout}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#C4960A]/30 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[#1B4332] text-[#E0B030] hover:bg-[#112A1F] transition-colors"
              title="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-lg sm:text-xl text-[#1B4332] tracking-tight">
                  {activeTab === 'orders' && 'Food & Counter Orders'}
                  {activeTab === 'table_qr' && '📱 Live On-Table QR Orders'}
                  {activeTab === 'dining' && 'Table Dining Reservations'}
                  {activeTab === 'catering' && 'Catering & Event Inquiries'}
                  {activeTab === 'menu_sheet' && 'Menu Database Manager'}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D4731A]/15 text-[#D4731A] border border-[#D4731A]/30">
                  Super Admin Desk
                </span>
              </div>
              <p className="text-[11px] text-[#6B4423] hidden sm:block">
                Real-time multi-channel booking console for Sri Mahalakshmi Caters
              </p>
            </div>
          </div>

          {/* Quick Bar Controls */}
          <div className="flex items-center gap-2">

            {/* Audio Controls & Settings */}
            <div className="flex items-center bg-white border border-[#C4960A]/30 rounded-xl p-1 shadow-2xs">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${soundEnabled
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                title={soundEnabled ? 'Order sound alert is ON (click to mute)' : 'Order sound alert is MUTED'}
              >
                {soundEnabled ? <Volume2 size={15} className="text-[#E0B030]" /> : <VolumeX size={15} />}
                <span className="hidden xl:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>

              <button
                onClick={() => setIsSoundModalOpen(true)}
                className="p-1.5 px-2 rounded-lg text-xs font-bold text-[#1B4332] hover:bg-[#D4731A]/10 flex items-center gap-1 transition-colors"
                title="Change alert tone, customize volume, or test sounds"
              >
                <Sliders size={13} className="text-[#D4731A]" />
                <span className="hidden md:inline">Sound Options</span>
              </button>
            </div>


            {/* Export Range Reports Quick Action */}
            <button
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#1B4332] text-[#FFF8EC] hover:bg-[#112A1F] transition-all shadow-xs cursor-pointer"
              title="Export Orders by Range (Day / Month / Custom)"
            >
              <Download size={14} className="text-[#E0B030]" />
              <span className="hidden sm:inline">Export Range CSV</span>
              <span className="sm:hidden">Export</span>
            </button>

            {/* Kitchen Prep Sheet Quick Action */}
            <button
              onClick={() => setShowDailyKitchenModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#E0B030] text-[#1B4332] hover:bg-[#cfa024] transition-all shadow-xs"
              title="Print Today's Master Kitchen Production & Prep Sheet"
            >
              <ChefHat size={15} />
              <span>Kitchen Sheet</span>
            </button>
          </div>
        </header>

        {/* Tab Switching Ribbon (Mobile & Tablet fast navigation) */}
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'orders'
              ? 'bg-[#1B4332] text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            <ShoppingBag size={14} />
            <span>Orders {unviewedCounts?.foodOrders > 0 ? `(${unviewedCounts.foodOrders})` : ''}</span>
          </button>
          <button
            onClick={() => setActiveTab('table_qr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'table_qr'
              ? 'bg-amber-600 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            <Smartphone size={14} />
            <span>Table QR {unviewedCounts?.tableQr > 0 ? `(${unviewedCounts.tableQr})` : ''}</span>
          </button>
          <button
            onClick={() => setActiveTab('dining')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'dining'
              ? 'bg-[#D4731A] text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            <UtensilsCrossed size={14} />
            <span>Dining {unviewedCounts?.dining > 0 ? `(${unviewedCounts.dining})` : ''}</span>
          </button>
          <button
            onClick={() => setActiveTab('catering')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'catering'
              ? 'bg-purple-700 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            <PartyPopper size={14} />
            <span>Catering {unviewedCounts?.catering > 0 ? `(${unviewedCounts.catering})` : ''}</span>
          </button>
          <button
            onClick={() => setActiveTab('menu_sheet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'menu_sheet'
              ? 'bg-[#1B4332] text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            <ChefHat size={14} />
            <span>Menu Manager</span>
          </button>
        </div>

        {/* Main Workspace Body - Optimized for 100% Viewport Zoom & Responsive Screen Sizes */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 no-print max-w-[1600px] w-full mx-auto overflow-x-hidden">

          {/* Desk 1: Food Orders (Counter & Online Orders Only) */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Financial & Volume Metrics */}
              <AdminStats stats={stats} />

              {/* Orders Table - Excludes Table QR Orders so they appear only once */}
              <OrdersTable
                channelName="Counter & Delivery"
                orders={orders.filter(o => {
                  const m = (o.paymentMethod || '').toLowerCase();
                  const a = (o.address || '').toLowerCase();
                  return !m.includes('table') && !a.includes('table');
                })}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onSelectOrder={(order) => setSelectedOrder(order)}
                onPrintKOT={(order, mode = 'customer') => setKotOrder({ ...order, printMode: mode })}
                onExportCSV={(tableOrders) => {
                  const dateStr = new Date().toISOString().slice(0, 10);
                  exportOrdersToCSV(
                    tableOrders,
                    `Sri_Mahalakshmi_Counter_Delivery_Orders_${dateStr}.csv`
                  );
                }}
              />
            </div>
          )}

          {/* Desk 2: Table QR Live Orders */}
          {activeTab === 'table_qr' && (
            <div className="space-y-6">
              {/* Highlight Cards for Table QR Orders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Total QR Table Orders</p>
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
                      <Smartphone size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#1B4332] mt-2 font-heading">
                    {stats.tableQrOrders}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Live customer table scans</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Active Tables Ordering</p>
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <UtensilsCrossed size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-800 mt-2 font-heading">
                    {new Set(orders.filter(o => (o.paymentMethod || '').toLowerCase().includes('table') || (o.address || '').toLowerCase().includes('table')).map(o => o.address)).size}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Tables with placed orders</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Table Orders Revenue</p>
                    <span className="p-2 rounded-xl bg-amber-100 text-[#D4731A]">
                      <ShoppingBag size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#D4731A] mt-2 font-heading">
                    ₹{Number(stats.tableQrRevenue).toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Dine-in QR sales revenue</p>
                </div>
              </div>

              {/* Table QR Orders Table */}
              <OrdersTable
                channelName="Table QR"
                orders={orders.filter(o => (o.paymentMethod || '').toLowerCase().includes('table') || (o.address || '').toLowerCase().includes('table'))}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter="ALL"
                onStatusFilterChange={() => {}}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onSelectOrder={(order) => setSelectedOrder(order)}
                onPrintKOT={(order, mode = 'customer') => setKotOrder({ ...order, printMode: mode })}
                onExportCSV={(tableOrders) => {
                  const dateStr = new Date().toISOString().slice(0, 10);
                  exportOrdersToCSV(
                    tableOrders,
                    `Sri_Mahalakshmi_Table_QR_Orders_${dateStr}.csv`
                  );
                }}
              />
            </div>
          )}

          {/* Desk 2: Dining Table Reservations */}
          {activeTab === 'dining' && (
            <div className="space-y-6">
              {/* Dining Stats Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Total Reservations</p>
                    <span className="p-2 rounded-xl bg-orange-100 text-[#D4731A]">
                      <UtensilsCrossed size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#1B4332] mt-2 font-heading">
                    {diningReservations.length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Lifetime dining bookings</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Pending Review</p>
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Clock size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-amber-700 mt-2 font-heading">
                    {stats.pendingDining}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Requires table confirmation</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Confirmed Guests</p>
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Users size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-800 mt-2 font-heading">
                    {diningReservations.filter(d => (d.status || '').toLowerCase().includes('confirm')).length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Tables allocated</p>
                </div>
              </div>

              {/* Dining Table */}
              <DiningReservationsTable
                reservations={diningReservations}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateDiningStatus}
                onExportCSV={(filteredReservations) => {
                  const dateStr = new Date().toISOString().slice(0, 10);
                  exportDiningToCSV(
                    filteredReservations,
                    `Sri_Mahalakshmi_Dining_Reservations_${dateStr}.csv`
                  );
                }}
              />
            </div>
          )}

          {/* Desk 3: Catering Event Inquiries */}
          {activeTab === 'catering' && (
            <div className="space-y-6">
              {/* Catering Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Total Event Inquiries</p>
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                      <PartyPopper size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#1B4332] mt-2 font-heading">
                    {cateringInquiries.length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Weddings, birthdays & corporate</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">New Inquiries</p>
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Sparkles size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-[#D4731A] mt-2 font-heading">
                    {stats.newCatering}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Awaiting custom menu quotation</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B4423]">Booked Events</p>
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Calendar size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-800 mt-2 font-heading">
                    {cateringInquiries.filter(c => (c.status || '').toLowerCase().includes('book')).length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Confirmed catering orders</p>
                </div>
              </div>

              {/* Catering Table */}
              <CateringInquiriesTable
                inquiries={cateringInquiries}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateCateringStatus}
                onExportCSV={(filteredInquiries) => {
                  const dateStr = new Date().toISOString().slice(0, 10);
                  exportCateringToCSV(
                    filteredInquiries,
                    `Sri_Mahalakshmi_Catering_Inquiries_${dateStr}.csv`
                  );
                }}
              />
            </div>
          )}

          {/* Desk 4: Menu Manager */}
          {activeTab === 'menu_sheet' && (
            <MenuManagerPage />
          )}

        </main>

        {/* Order Details Modal */}
        {selectedOrder && (
          <ErrorBoundary onReset={() => setSelectedOrder(null)}>
            <OrderDetailsModal
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
              onPrintKOT={(order, mode = 'customer') => setKotOrder({ ...order, printMode: mode })}
            />
          </ErrorBoundary>
        )}

        {/* Real-time Order Receipt & Kitchen KOT Print Modal */}
        {kotOrder && (
          <ErrorBoundary onReset={() => setKotOrder(null)}>
            <KitchenTicketPrint
              order={kotOrder}
              initialMode={kotOrder.printMode || 'customer'}
              onClose={() => setKotOrder(null)}
            />
          </ErrorBoundary>
        )}

        {/* Master Daily Kitchen Prep & Production Sheet Modal */}
        {showDailyKitchenModal && (
          <DailyKitchenSummaryModal
            orders={orders}
            onClose={() => setShowDailyKitchenModal(false)}
          />
        )}

        {/* Range-Based Orders CSV Export Modal (Day / Month / Custom) */}
        {showExportModal && (
          <ErrorBoundary onReset={() => setShowExportModal(false)}>
            <ExportOrdersModal
              isOpen={showExportModal}
              onClose={() => setShowExportModal(false)}
              orders={rawOrders}
              diningReservations={diningReservations}
              cateringInquiries={cateringInquiries}
              initialChannel={activeTab === 'table_qr' ? 'table' : activeTab === 'dining' ? 'dining' : activeTab === 'catering' ? 'catering' : activeTab === 'orders' ? 'delivery' : 'all'}
            />
          </ErrorBoundary>
        )}

        {/* Audio Alert Customization Modal */}
        <SoundSettingsModal
          isOpen={isSoundModalOpen}
          onClose={() => setIsSoundModalOpen(false)}
          onSettingsChange={updateSoundSettings}
        />

        {/* Subtle Admin Footer */}
        <footer className="border-t border-[#C4960A]/20 bg-white py-4 text-center text-xs text-[#5C2D0E]/70 no-print mt-auto">
          <p>Sri Mahalakshmi Caters — Super Admin Command Center • Authentic Village Flavours & Catering</p>
        </footer>

      </div>
    </div>
  );
};
