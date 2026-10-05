import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchAllOrders, updateLocalOrderStatus } from '../services/adminOrderService';
import { 
  fetchAllDiningReservations, 
  fetchAllCateringInquiries, 
  updateLocalDiningStatus, 
  updateLocalCateringStatus 
} from '../../../services/bookingService';
import toast from 'react-hot-toast';
import { 
  playOrderAlertSound, 
  getSoundSettings, 
  saveSoundSettings 
} from '../utils/audioAlerts';

export const useAdminOrders = (pollingIntervalMs = 6000) => {
  // Food Orders
  const [orders, setOrders] = useState([]);
  // Dining Table Reservations
  const [diningReservations, setDiningReservations] = useState([]);
  // Catering & Event Inquiries
  const [cateringInquiries, setCateringInquiries] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  
  // Audio Alert Settings
  const [soundSettings, setSoundSettings] = useState(getSoundSettings);
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);
  
  const soundEnabled = soundSettings.enabled;
  const setSoundEnabled = (val) => {
    const nextVal = typeof val === 'function' ? val(soundSettings.enabled) : val;
    const updated = { ...soundSettings, enabled: nextVal };
    setSoundSettings(updated);
    saveSoundSettings(updated);
  };

  const updateSoundSettings = (newSettings) => {
    setSoundSettings(newSettings);
    saveSoundSettings(newSettings);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState(''); // 'YYYY-MM-DD' or '' for all
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'dining', 'catering'

  // Refs for change tracking
  const prevOrdersCountRef = useRef(null);
  const knownOrderIdsRef = useRef(new Set());

  const prevDiningCountRef = useRef(null);
  const knownDiningIdsRef = useRef(new Set());

  const prevCateringCountRef = useRef(null);
  const knownCateringIdsRef = useRef(new Set());

  // Master fetch function
  const loadAllData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const [ordersData, diningData, cateringData] = await Promise.all([
        fetchAllOrders(),
        fetchAllDiningReservations(),
        fetchAllCateringInquiries()
      ]);

      // ─────────────────────────────────────────────────────────
      // 1. Check for incoming new FOOD ORDERS
      // ─────────────────────────────────────────────────────────
      if (prevOrdersCountRef.current !== null && ordersData.length > 0) {
        const newlyArrived = ordersData.filter(o => !knownOrderIdsRef.current.has(o.orderId));
        if (newlyArrived.length > 0) {
          const newest = newlyArrived[0];
          if (soundEnabled) playOrderAlertSound();

          toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#1B4332] border-2 border-[#D4731A] shadow-2xl rounded-2xl pointer-events-auto flex p-4 text-white`}>
              <div className="flex-1 w-0">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🔔</div>
                  <div>
                    <p className="text-xs font-bold text-[#E0B030] uppercase tracking-wider">
                      New Food Order Received!
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      #{newest.orderId} • {newest.customerName}
                    </p>
                    <p className="text-xs text-[#FFF8EC]/80">
                      ₹{newest.totalAmount} • {newest.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white/20 pl-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full p-2 flex items-center justify-center text-xs font-bold text-[#E0B030] hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ), { duration: 6000 });
        }
      }

      // ─────────────────────────────────────────────────────────
      // 2. Check for incoming new DINING TABLE RESERVATIONS
      // ─────────────────────────────────────────────────────────
      if (prevDiningCountRef.current !== null && diningData.length > 0) {
        const newlyArrivedDining = diningData.filter(d => !knownDiningIdsRef.current.has(d.bookingId));
        if (newlyArrivedDining.length > 0) {
          const newestDining = newlyArrivedDining[0];
          if (soundEnabled) playOrderAlertSound({ soundType: soundSettings.soundType === 'siren' ? 'siren' : 'bell' });

          toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#1B4332] border-2 border-[#E0B030] shadow-2xl rounded-2xl pointer-events-auto flex p-4 text-white`}>
              <div className="flex-1 w-0">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🍽️</div>
                  <div>
                    <p className="text-xs font-bold text-[#E0B030] uppercase tracking-wider">
                      New Table Reservation!
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      #{newestDining.bookingId} • {newestDining.customerName}
                    </p>
                    <p className="text-xs text-[#FFF8EC]/80">
                      {newestDining.guests} • {newestDining.date} at {newestDining.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white/20 pl-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full p-2 flex items-center justify-center text-xs font-bold text-[#E0B030] hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ), { duration: 6000 });
        }
      }

      // ─────────────────────────────────────────────────────────
      // 3. Check for incoming new CATERING EVENT INQUIRIES
      // ─────────────────────────────────────────────────────────
      if (prevCateringCountRef.current !== null && cateringData.length > 0) {
        const newlyArrivedCatering = cateringData.filter(c => !knownCateringIdsRef.current.has(c.inquiryId));
        if (newlyArrivedCatering.length > 0) {
          const newestCat = newlyArrivedCatering[0];
          if (soundEnabled) playOrderAlertSound({ soundType: 'chime' }); // G5 pitch

          toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-[#1B4332] to-[#112A1F] border-2 border-purple-400 shadow-2xl rounded-2xl pointer-events-auto flex p-4 text-white`}>
              <div className="flex-1 w-0">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🎉</div>
                  <div>
                    <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      New Catering Event Inquiry!
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      #{newestCat.inquiryId} • {newestCat.customerName}
                    </p>
                    <p className="text-xs text-[#FFF8EC]/80">
                      {newestCat.eventType} • {newestCat.guests || 'Custom'} guests
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white/20 pl-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full p-2 flex items-center justify-center text-xs font-bold text-purple-300 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ), { duration: 7000 });
        }
      }

      // Update refs
      prevOrdersCountRef.current = ordersData.length;
      ordersData.forEach(o => { if (o.orderId) knownOrderIdsRef.current.add(o.orderId); });

      prevDiningCountRef.current = diningData.length;
      diningData.forEach(d => { if (d.bookingId) knownDiningIdsRef.current.add(d.bookingId); });

      prevCateringCountRef.current = cateringData.length;
      cateringData.forEach(c => { if (c.inquiryId) knownCateringIdsRef.current.add(c.inquiryId); });

      setOrders(ordersData);
      setDiningReservations(diningData);
      setCateringInquiries(cateringData);
      setLastSyncTime(new Date());
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  }, [soundEnabled]);

  // Initial load & Polling loop
  useEffect(() => {
    loadAllData();

    const interval = setInterval(() => {
      loadAllData(false);
    }, pollingIntervalMs);

    // Cross-tab synchronization
    const handleStorage = (e) => {
      if (
        !e.key || 
        e.key === 'smk_orders_history' || 
        e.key === 'smk_dining_bookings' || 
        e.key === 'smk_catering_bookings'
      ) {
        loadAllData(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('smk_booking_created', () => loadAllData(false));

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('smk_booking_created', () => loadAllData(false));
    };
  }, [loadAllData, pollingIntervalMs]);

  // Update Status Handlers
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateLocalOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, paymentStatus: newStatus } : o));
    toast.success(`Order #${orderId} marked as ${newStatus}`);
  };

  const handleUpdateDiningStatus = (bookingId, newStatus) => {
    updateLocalDiningStatus(bookingId, newStatus);
    setDiningReservations(prev => prev.map(d => d.bookingId === bookingId ? { ...d, status: newStatus } : d));
    toast.success(`Dining Booking #${bookingId} marked as ${newStatus}`);
  };

  const handleUpdateCateringStatus = (inquiryId, newStatus) => {
    updateLocalCateringStatus(inquiryId, newStatus);
    setCateringInquiries(prev => prev.map(c => c.inquiryId === inquiryId ? { ...c, status: newStatus } : c));
    toast.success(`Catering Inquiry #${inquiryId} marked as ${newStatus}`);
  };

  // Filtered orders list
  const filteredOrders = orders.filter(order => {
    // 1. Date Filter (matches YYYY-MM-DD in local time or ISO UTC)
    if (selectedDate) {
      const ts = order.timestamp || order.created_at;
      if (!ts) return false;
      const orderDate = new Date(ts);
      if (isNaN(orderDate.getTime())) return false;

      const localDateStr = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}-${String(orderDate.getDate()).padStart(2, '0')}`;
      const utcDateStr = orderDate.toISOString().slice(0, 10);

      if (localDateStr !== selectedDate && utcDateStr !== selectedDate) {
        return false;
      }
    }

    // 2. Status Filter
    if (statusFilter !== 'ALL') {
      const pMethod = (order.paymentMethod || '').toLowerCase();
      const pStatus = (order.paymentStatus || '').toLowerCase();
      const addr = (order.address || '').toLowerCase();

      if (statusFilter === 'TABLE_QR') {
        if (!pMethod.includes('table') && !addr.includes('table')) return false;
      } else if (statusFilter === 'PAID') {
        if (!pStatus.includes('completed') && !pStatus.includes('paid')) return false;
      } else if (statusFilter === 'COD') {
        if (!pMethod.includes('cash') && !pMethod.includes('cod')) return false;
      } else if (statusFilter === 'PENDING') {
        if (pStatus.includes('completed') || pStatus.includes('paid')) return false;
      }
    }

    // 3. Search Query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (order.orderId && order.orderId.toLowerCase().includes(q)) ||
      (order.customerName && order.customerName.toLowerCase().includes(q)) ||
      (order.phone && order.phone.toLowerCase().includes(q)) ||
      (order.items && order.items.toLowerCase().includes(q)) ||
      (order.address && order.address.toLowerCase().includes(q))
    );
  });

  // Analytics computation
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0),
    paidOrders: orders.filter(o => {
      const s = (o.paymentStatus || '').toLowerCase();
      return s.includes('completed') || s.includes('paid');
    }).length,
    codOrders: orders.filter(o => {
      const m = (o.paymentMethod || '').toLowerCase();
      return m.includes('cash') || m.includes('cod');
    }).length,
    todayOrders: orders.filter(o => {
      if (!o.timestamp) return false;
      return new Date(o.timestamp).toDateString() === new Date().toDateString();
    }).length,
    pendingDining: diningReservations.filter(d => (d.status || 'Pending').toLowerCase() === 'pending').length,
    newCatering: cateringInquiries.filter(c => (c.status || 'New').toLowerCase() === 'new').length
  };

  return {
    activeTab,
    setActiveTab,
    orders: filteredOrders,
    rawOrders: orders,
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
    refreshOrders: () => loadAllData(true),
    handleUpdateOrderStatus,
    handleUpdateDiningStatus,
    handleUpdateCateringStatus,
    stats
  };
};
