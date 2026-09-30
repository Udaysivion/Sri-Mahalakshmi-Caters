import React, { useState, useEffect } from 'react';
import { ShoppingBag, RefreshCw, CheckCircle, Clock, Truck, CheckCheck, XCircle, MapPin, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';
import orderApi from '@/features/cart/api/orderApi';

const STATUS_CONFIG = {
  PENDING: { label: 'Pending', bg: 'bg-amber-50 text-amber-800 border-amber-300', icon: Clock },
  CONFIRMED: { label: 'Confirmed', bg: 'bg-blue-50 text-blue-800 border-blue-300', icon: CheckCircle },
  PREPARING: { label: 'Preparing', bg: 'bg-purple-50 text-purple-800 border-purple-300', icon: RefreshCw },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', bg: 'bg-indigo-50 text-indigo-800 border-indigo-300', icon: Truck },
  DELIVERED: { label: 'Delivered', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCheck },
  CANCELLED: { label: 'Cancelled', bg: 'bg-rose-50 text-rose-800 border-rose-300', icon: XCircle },
};

export const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const filters = statusFilter !== 'ALL' ? { status: statusFilter } : {};
      const data = await orderApi.getAllOrders(filters);
      setOrders(data || []);
    } catch (err) {
      console.warn('Could not fetch orders:', err.message);
      toast.error('Unable to fetch live orders from PostgreSQL database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}!`);
      fetchOrders();
    } catch (err) {
      toast.error(err.message || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === st ? 'bg-[#1B4332] text-white shadow-sm' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
            >
              {st}
            </button>
          ))}
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Orders
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400 flex flex-col items-center gap-3">
            <RefreshCw size={24} className="animate-spin text-[#D4731A]" />
            <p className="text-sm">Fetching orders from PostgreSQL database...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400">
            <ShoppingBag size={36} className="mx-auto mb-2 opacity-40 text-stone-300" />
            <p className="text-sm font-semibold">No orders found in database.</p>
            <p className="text-xs mt-1">Orders placed via the cart checkout will appear here in real-time.</p>
          </div>
        ) : (
          orders.map((order) => {
            const statusMeta = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.PENDING;
            const StatusIcon = statusMeta.icon;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-lg text-[#1B4332]">
                      #{order.orderNumber}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${statusMeta.bg}`}>
                      <StatusIcon size={12} /> {statusMeta.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-medium">Update Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none text-[#1B4332]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PREPARING">PREPARING</option>
                      <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                {/* Customer and Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-start gap-2 text-stone-700">
                    <User size={15} className="text-[#D4731A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-900">{order.customerName}</p>
                      <p className="text-stone-500 font-mono mt-0.5">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-stone-700 md:col-span-2">
                    <MapPin size={15} className="text-[#D4731A] shrink-0 mt-0.5" />
                    <p className="text-stone-600 leading-relaxed">{order.deliveryAddress}</p>
                  </div>
                </div>

                {/* Order Items Pill list */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Order Items:</p>
                  <div className="space-y-1.5">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-stone-700">
                        <span>
                          <span className="font-bold text-[#1B4332]">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="font-mono font-semibold">₹{item.total}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-stone-200 mt-3 pt-2 flex justify-between items-center text-sm font-bold text-[#1B4332]">
                    <span>Total Amount ({order.paymentMethod})</span>
                    <span className="font-mono text-base">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
