import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Download, 
  Calendar, 
  CheckCircle2, 
  FileSpreadsheet, 
  Layers
} from 'lucide-react';
import { 
  exportOrdersToCSV, 
  exportDiningToCSV, 
  exportCateringToCSV 
} from '../services/adminOrderService';

/**
 * Accurately determines if an order is a Dine-In Table QR order.
 * Checks order ID prefix, payment method, customer notes, phone tag, and table address.
 */
export const isTableOrder = (order) => {
  if (!order) return false;
  const id = String(order.orderId || '');
  if (id.startsWith('TBL-') || id.includes('TBL')) return true;

  const method = String(order.paymentMethod || '').toLowerCase();
  if (method.includes('table')) return true;

  const phone = String(order.phone || '').toLowerCase();
  if (phone.startsWith('table')) return true;

  const name = String(order.customerName || '').toLowerCase();
  if (name.includes('table')) return true;

  const addr = String(order.address || '').toLowerCase();
  if (/\btable\s*#?\s*\d+/i.test(addr) || addr.startsWith('table')) return true;

  return false;
};

export const ExportOrdersModal = ({ 
  isOpen, 
  onClose, 
  orders = [], 
  diningReservations = [], 
  cateringInquiries = [],
  initialChannel = 'all'
}) => {
  if (!isOpen) return null;

  // Range type: 'all' (default) | 'today' | 'yesterday' | 'this_month' | 'prev_month' | 'custom'
  const [rangeType, setRangeType] = useState('all');
  
  // Custom date bounds (YYYY-MM-DD)
  const now = new Date();
  const formatIsoDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatIsoDate(now));
  const [endDate, setEndDate] = useState(formatIsoDate(now));

  // Channel filter: 'all' | 'delivery' | 'table' | 'dining' | 'catering'
  const [channelFilter, setChannelFilter] = useState(initialChannel);

  // Status filter: 'all' | 'paid' | 'pending'
  const [statusFilter, setStatusFilter] = useState('all');

  // Keep channel filter in sync with caller's active desk
  useEffect(() => {
    if (initialChannel) {
      setChannelFilter(initialChannel);
    }
  }, [initialChannel, isOpen]);

  // Compute matched items and revenue in real-time
  const { matchedItems, totalRevenue, generatedFilename, itemTypeLabel } = useMemo(() => {
    const todayStr = formatIsoDate(now);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = formatIsoDate(yesterdayDate);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const prevYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth();

    // 1. Determine base source dataset based on selected channel
    let sourceList = [];
    let typeLabel = 'Orders';

    if (channelFilter === 'dining') {
      sourceList = diningReservations;
      typeLabel = 'Dining Reservations';
    } else if (channelFilter === 'catering') {
      sourceList = cateringInquiries;
      typeLabel = 'Catering Inquiries';
    } else {
      sourceList = orders;
      if (channelFilter === 'delivery') {
        sourceList = orders.filter(o => !isTableOrder(o));
        typeLabel = 'Delivery & Counter Orders';
      } else if (channelFilter === 'table') {
        sourceList = orders.filter(o => isTableOrder(o));
        typeLabel = 'Table QR Orders';
      } else {
        typeLabel = 'All Food Orders';
      }
    }

    // 2. Filter by Date Range
    let filenameSuffix = '';

    const filtered = sourceList.filter(item => {
      const rawDate = item.timestamp || item.created_at || item.createdAt || item.date || item.bookingDate || item.eventDate;
      const itemDate = rawDate ? new Date(rawDate) : null;
      const isValidDate = itemDate && !isNaN(itemDate.getTime());

      if (rangeType === 'today') {
        filenameSuffix = `Today_${todayStr}`;
        if (!isValidDate) return false;
        const localD = formatIsoDate(itemDate);
        const utcD = itemDate.toISOString().slice(0, 10);
        if (localD !== todayStr && utcD !== todayStr) return false;
      } else if (rangeType === 'yesterday') {
        filenameSuffix = `Yesterday_${yesterdayStr}`;
        if (!isValidDate) return false;
        const localD = formatIsoDate(itemDate);
        const utcD = itemDate.toISOString().slice(0, 10);
        if (localD !== yesterdayStr && utcD !== yesterdayStr) return false;
      } else if (rangeType === 'this_month') {
        filenameSuffix = `Month_${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
        if (!isValidDate) return false;
        if (itemDate.getFullYear() !== currentYear || itemDate.getMonth() !== currentMonth) {
          return false;
        }
      } else if (rangeType === 'prev_month') {
        filenameSuffix = `Month_${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;
        if (!isValidDate) return false;
        if (itemDate.getFullYear() !== prevYear || itemDate.getMonth() !== prevMonth) {
          return false;
        }
      } else if (rangeType === 'custom') {
        filenameSuffix = `Range_${startDate}_to_${endDate}`;
        if (!isValidDate) return false;
        const localD = formatIsoDate(itemDate);
        if (startDate && localD < startDate) return false;
        if (endDate && localD > endDate) return false;
      } else if (rangeType === 'all') {
        filenameSuffix = 'All_Time';
      }

      // 3. Payment Status Check (Only applicable for food / table orders)
      if (channelFilter !== 'dining' && channelFilter !== 'catering') {
        const status = String(item.paymentStatus || '').toLowerCase();
        const isPaid = status.includes('paid') || status.includes('completed');

        if (statusFilter === 'paid' && !isPaid) return false;
        if (statusFilter === 'pending' && isPaid) return false;
      }

      return true;
    });

    // 4. Calculate total revenue (for food & table orders)
    const revenue = (channelFilter === 'dining' || channelFilter === 'catering')
      ? 0
      : filtered.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

    const channelPrefix = channelFilter === 'dining' 
      ? 'Dining_Reservations' 
      : channelFilter === 'catering' 
      ? 'Catering_Inquiries' 
      : channelFilter === 'table' 
      ? 'Table_QR_Orders' 
      : channelFilter === 'delivery' 
      ? 'Delivery_Orders' 
      : 'Orders';

    const filename = `Sri_Mahalakshmi_${channelPrefix}_${filenameSuffix}.csv`;

    return {
      matchedItems: filtered,
      totalRevenue: revenue,
      generatedFilename: filename,
      itemTypeLabel: typeLabel
    };
  }, [orders, diningReservations, cateringInquiries, rangeType, startDate, endDate, channelFilter, statusFilter]);

  const handleDownload = () => {
    if (channelFilter === 'dining') {
      exportDiningToCSV(matchedItems, generatedFilename);
    } else if (channelFilter === 'catering') {
      exportCateringToCSV(matchedItems, generatedFilename);
    } else {
      exportOrdersToCSV(matchedItems, generatedFilename);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-[#1B4332] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-[#FFF8EC] p-4.5 flex items-center justify-between border-b-2 border-[#D4731A]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4731A] text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet size={18} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#E0B030] leading-tight">
                Export Orders & Bookings to CSV
              </h3>
              <p className="text-xs text-[#FFF8EC]/75 mt-0.5">
                Download Excel & Google Sheets compatible CSV files
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#FFF8EC] transition-colors cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-stone-700">

          {/* Section 1: Order Channel Selection */}
          <div>
            <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Layers size={14} className="text-[#D4731A]" />
              Select Order Channel
            </label>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 font-bold text-xs text-stone-800 outline-none focus:ring-2 focus:ring-[#D4731A] cursor-pointer"
            >
              <option value="all">📦 All Food Orders (Delivery + Dine-In Tables)</option>
              <option value="delivery">🛵 Counter & Home Delivery Only (Online Menu)</option>
              <option value="table">📱 Dine-In Table QR Orders Only</option>
              <option value="dining">🪑 Table Dining Reservations Only</option>
              <option value="catering">🎉 Catering & Bulk Event Inquiries Only</option>
            </select>
          </div>

          {/* Section 2: Date Selection Range */}
          <div>
            <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Calendar size={14} className="text-[#D4731A]" />
              Select Date Range
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Time (All Records)' },
                { id: 'today', label: 'Today' },
                { id: 'yesterday', label: 'Yesterday' },
                { id: 'this_month', label: 'This Month' },
                { id: 'prev_month', label: 'Previous Month' },
                { id: 'custom', label: 'Custom Range' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRangeType(opt.id)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border cursor-pointer text-center ${
                    rangeType === opt.id
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Custom Range Date Pickers */}
            {rangeType === 'custom' && (
              <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="font-bold text-stone-700 block text-[11px]">Select Start & End Dates:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-stone-500 font-semibold block mb-0.5">From Date:</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs font-semibold text-stone-800 outline-none focus:ring-2 focus:ring-[#D4731A]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 font-semibold block mb-0.5">To Date:</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs font-semibold text-stone-800 outline-none focus:ring-2 focus:ring-[#D4731A]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Payment Status Filter (For food orders only) */}
          {channelFilter !== 'dining' && channelFilter !== 'catering' && (
            <div>
              <label className="font-bold text-stone-800 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#D4731A]" />
                Payment Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-semibold text-xs text-stone-800 outline-none focus:ring-2 focus:ring-[#D4731A] cursor-pointer"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid Only</option>
                <option value="pending">Pending / Unpaid Only</option>
              </select>
            </div>
          )}

          {/* Section 4: Live Preview & Summary Card */}
          <div className="p-4 rounded-xl bg-[#FFF8EC] border border-[#C4960A]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-[#6B4423] tracking-wide">
                Live Preview ({itemTypeLabel})
              </span>
              <span className="font-mono text-[11px] font-bold text-[#1B4332] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                {matchedItems.length} {matchedItems.length === 1 ? 'Record' : 'Records'} Matched
              </span>
            </div>

            {channelFilter !== 'dining' && channelFilter !== 'catering' && (
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-stone-600 font-medium">Total Revenue in Range:</span>
                <span className="font-heading font-extrabold text-base text-[#1B4332]">
                  ₹{Number(totalRevenue).toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <p className="text-[11px] text-stone-500 font-mono truncate pt-1 border-t border-[#C4960A]/15">
              📁 {generatedFilename}
            </p>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={matchedItems.length === 0}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#112A1F] disabled:bg-stone-300 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
          >
            <Download size={14} className="text-[#E0B030]" />
            <span>Download CSV ({matchedItems.length})</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExportOrdersModal;
