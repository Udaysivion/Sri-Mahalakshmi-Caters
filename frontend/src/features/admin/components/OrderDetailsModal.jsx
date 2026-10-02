import React from 'react';
import { X, Phone, MessageSquare, Printer, CheckCircle, Clock, MapPin, Receipt, Utensils, ChefHat } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';

export const OrderDetailsModal = ({ order, onClose, onPrintKOT }) => {
  if (!order) return null;

  const handlePrint = () => {
    if (onPrintKOT) {
      onPrintKOT(order);
    } else {
      window.print();
    }
  };

  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Namaste ${order.customerName}! This is Sri Mahalakshmi Caters regarding your order #${order.orderId}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FFF8EC] rounded-2xl shadow-2xl border-2 border-[#D4731A] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1B4332] text-[#FFF8EC] p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#D4731A]">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-sm.svg" 
              alt="Logo" 
              className="h-10 sm:h-12 w-auto object-contain rounded-md bg-white/10 p-1" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#E0B030]">
                  Order Details • #{order.orderId}
                </h3>
              </div>
              <p className="text-xs text-[#FFF8EC]/80 mt-0.5">
                Received on {order.timestamp || 'Just now'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#FFF8EC] transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#C4960A]/30 shadow-xs">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#6B4423] font-semibold block mb-1">
                Payment Status
              </span>
              <OrderStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
            </div>

            <div className="flex items-center gap-2">
              {order.phone && (
                <>
                  <a
                    href={`tel:${order.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#112A1F] transition-all"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-all"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                </>
              )}
              <button
                onClick={() => onPrintKOT ? onPrintKOT(order, 'customer') : handlePrint()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B4332] text-white hover:bg-[#112A1F] text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Print Continuous Customer Bill / Tax Invoice"
              >
                <Printer size={14} className="text-[#E0B030]" /> Print Bill
              </button>
              <button
                onClick={() => onPrintKOT ? onPrintKOT(order, 'kitchen') : handlePrint()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition-all border border-stone-300 cursor-pointer"
                title="Print Chef KOT Slip Only"
              >
                <ChefHat size={13} /> Chef KOT
              </button>
              <button
                onClick={() => onPrintKOT ? onPrintKOT(order, 'both') : handlePrint()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition-all border border-stone-300 cursor-pointer"
                title="Print Both (Chef KOT + Customer Bill)"
              >
                <Layers size={13} /> Both
              </button>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#C4960A]/20 shadow-xs">
              <h4 className="text-xs font-bold text-[#6B4423] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4731A]"></span> Customer Profile
              </h4>
              <p className="font-bold text-base text-[#2C1A00]">{order.customerName || 'Guest Customer'}</p>
              <p className="text-sm text-[#5C2D0E] font-medium mt-1 flex items-center gap-1.5">
                <Phone size={14} className="text-[#D4731A]" />
                {order.phone || 'No phone provided'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#C4960A]/20 shadow-xs">
              <h4 className="text-xs font-bold text-[#6B4423] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#D4731A]" /> Delivery Address
              </h4>
              <p className="text-sm text-[#2C1A00] leading-relaxed">
                {order.address || 'Takeaway / Pickup at Restaurant'}
              </p>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="bg-white p-4 rounded-xl border border-[#C4960A]/20 shadow-xs">
            <h4 className="text-xs font-bold text-[#6B4423] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Utensils size={14} className="text-[#D4731A]" /> Ordered Delicacies
            </h4>
            
            <div className="divide-y divide-stone-100">
              {order.itemsRaw && Array.isArray(order.itemsRaw) && order.itemsRaw.length > 0 ? (
                order.itemsRaw.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#D4731A]">{item.quantity}x</span>
                      <span className="text-[#2C1A00] font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-[#1B4332]">₹{item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <div className="py-2 text-sm text-[#2C1A00] font-medium leading-relaxed bg-[#FFF8EC] p-3 rounded-lg border border-[#C4960A]/20">
                  {order.items || 'No items description found.'}
                </div>
              )}
            </div>

            {/* Total summary */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#C4960A]/30 flex items-center justify-between">
              <span className="font-heading font-bold text-base text-[#2C1A00]">Total Bill Amount:</span>
              <span className="font-heading font-extrabold text-2xl text-[#1B4332]">
                ₹{Number(order.totalAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Payment & Audit Info */}
          <div className="bg-white p-4 rounded-xl border border-[#C4960A]/20 shadow-xs text-xs space-y-2">
            <h4 className="font-bold text-[#6B4423] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Receipt size={14} className="text-[#D4731A]" /> Payment & Audit Metadata
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-stone-700">
              <div>
                <span className="text-stone-400 block">Payment Method:</span>
                <span className="font-semibold text-stone-800">{order.paymentMethod || 'Online'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Gateway / Ref ID:</span>
                <span className="font-mono font-semibold text-stone-800 break-all">{order.paymentId || 'N/A'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Sync Source:</span>
                <span className="font-semibold text-[#1B4332] uppercase">{order.source || 'Cloud Webhook'}</span>
              </div>
            </div>

            {order.notes && (
              <div className="mt-3 pt-2 border-t border-stone-100">
                <span className="text-stone-500 font-semibold block">Customer Special Instructions:</span>
                <p className="mt-0.5 text-stone-700 italic bg-amber-50 p-2 rounded border border-amber-200">
                  "{order.notes}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#1B4332] text-white font-semibold text-sm hover:bg-[#112A1F] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
