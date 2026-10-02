import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  ChefHat, 
  Receipt, 
  Layers, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Scissors
} from 'lucide-react';
import { parseOrderItems } from './KitchenTicketPrint';

export const OrderReceiptPrintModal = ({ order, initialMode = 'customer', onClose }) => {
  const [printMode, setPrintMode] = useState(initialMode); // 'customer', 'kitchen', 'both'
  const [paperWidth, setPaperWidth] = useState('80mm');   // '80mm', '58mm', 'full'

  if (!order) return null;

  const items = parseOrderItems(order);

  const totalItemCount = items.length > 0 
    ? items.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
    : 1;

  const handleTriggerPrint = () => {
    window.print();
  };

  const restaurantPhone = import.meta.env.VITE_RESTAURANT_PHONE || '8125940023';
  const restaurantName = import.meta.env.VITE_RESTAURANT_NAME || 'Sri Mahalakshmi Caters';

  const widthStyle = {
    fontFamily: "'Courier New', Courier, monospace, sans-serif",
    width: '100%',
    maxWidth: paperWidth === '58mm' ? '56mm' : paperWidth === '80mm' ? '80mm' : '100%',
    boxSizing: 'border-box'
  };

  const isDineIn = order.address && order.address.toLowerCase().includes('table');
  const serviceType = isDineIn ? 'Dine-In Table' : order.address ? 'Home Delivery' : 'Takeaway / Pickup';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in no-print-overlay">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-[#1B4332] overflow-hidden max-h-[94vh] flex flex-col no-print-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on paper print) */}
        <div className="bg-[#1B4332] text-[#FFF8EC] p-4 flex flex-col gap-3 no-print border-b-2 border-[#D4731A] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D4731A] text-white flex items-center justify-center shadow-sm">
                <Receipt size={18} />
              </div>
              <div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#E0B030]">
                  Print Order Bill • #{order.orderId}
                </h3>
                <p className="text-[11px] text-[#FFF8EC]/70">
                  Continuous extending Tax Invoice & POS Bill for Customer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleTriggerPrint}
                className="px-4 py-2 rounded-xl bg-[#D4731A] hover:bg-[#b85f12] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Printer size={15} /> Print Bill
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF8EC] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs - Single Customer Bill is Default */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
            <div className="flex bg-black/30 p-1 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setPrintMode('customer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  printMode === 'customer'
                    ? 'bg-[#E0B030] text-[#1B4332] shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Receipt size={13} />
                <span>Customer Bill (Invoice)</span>
              </button>
              <button
                type="button"
                onClick={() => setPrintMode('kitchen')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  printMode === 'kitchen'
                    ? 'bg-[#E0B030] text-[#1B4332] shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <ChefHat size={13} />
                <span>Chef KOT Only</span>
              </button>
              <button
                type="button"
                onClick={() => setPrintMode('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  printMode === 'both'
                    ? 'bg-[#E0B030] text-[#1B4332] shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Dual (KOT + Bill)</span>
              </button>
            </div>

            {/* Paper Size selector */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-white/60">
              <span>Width:</span>
              <button
                type="button"
                onClick={() => setPaperWidth('80mm')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${paperWidth === '80mm' ? 'bg-white/20 text-white' : 'text-white/50'}`}
              >
                80mm POS
              </button>
              <button
                type="button"
                onClick={() => setPaperWidth('58mm')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${paperWidth === '58mm' ? 'bg-white/20 text-white' : 'text-white/50'}`}
              >
                58mm
              </button>
              <button
                type="button"
                onClick={() => setPaperWidth('full')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${paperWidth === 'full' ? 'bg-white/20 text-white' : 'text-white/50'}`}
              >
                A4
              </button>
            </div>
          </div>
        </div>

        {/* Printable Preview Container - Dynamic height expansion without centering clipping */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-stone-200 flex justify-center items-start print-clean-wrapper">
          
          <div 
            id="dual-order-slip"
            className={`thermal-receipt-print w-full bg-white shadow-lg border border-stone-300 p-4 sm:p-5 text-stone-900 leading-relaxed shrink-0 my-2 paper-${paperWidth}`}
            style={widthStyle}
          >
            {/* ═════════════════════════════════════════════════════════
                SECTION 1: KITCHEN ORDER TICKET (CHEF COPY)
                (Rendered only if Chef KOT or Dual mode selected)
            ═════════════════════════════════════════════════════════ */}
            {(printMode === 'both' || printMode === 'kitchen') && (
              <div className="kitchen-slip-section pb-4">
                {/* Header */}
                <div className="text-center pb-2.5 border-b-2 border-dashed border-stone-900 flex flex-col items-center">
                  <div className="text-sm font-black tracking-wider uppercase">
                    {restaurantName}
                  </div>
                  <div className="text-[12px] font-black bg-stone-900 text-white px-2 py-0.5 mt-1 uppercase tracking-wider">
                    *** CHEF KITCHEN TICKET (KOT) ***
                  </div>
                  <div className="text-[10px] font-bold text-stone-600 mt-0.5">
                    Cooking & Preparation Station
                  </div>
                </div>

                {/* Token / Order Info */}
                <div className="py-2 border-b border-dashed border-stone-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">TOKEN / ORDER:</span>
                    <span className="text-base font-black px-2 py-0.5 bg-stone-100 border border-stone-400">
                      {order.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">TIME:</span>
                    <span>{order.timestamp || new Date().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">CUSTOMER:</span>
                    <span className="font-black uppercase">{order.customerName || 'Online Order'}</span>
                  </div>
                  {order.phone && (
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold">PHONE:</span>
                      <span>{order.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">SERVICE TYPE:</span>
                    <span className="font-extrabold uppercase bg-stone-100 px-1">
                      {serviceType}
                    </span>
                  </div>
                </div>

                {/* Chef Special Instructions */}
                {order.notes && (
                  <div className="my-2 p-2 bg-amber-50 border-2 border-dashed border-amber-800 text-stone-900">
                    <span className="font-black text-[11px] block uppercase text-amber-950">
                      ⚠️ CHEF INSTRUCTION:
                    </span>
                    <span className="font-bold text-xs italic">
                      "{order.notes}"
                    </span>
                  </div>
                )}

                {/* Dish Cooking Items List */}
                <div className="py-2.5 border-b-2 border-dashed border-stone-900">
                  <div className="flex justify-between text-[11px] font-black pb-1 border-b border-stone-400 uppercase">
                    <span className="w-14">QTY</span>
                    <span className="flex-1">DISH DESCRIPTION</span>
                  </div>

                  <div className="divide-y divide-stone-200 mt-1">
                    {items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-start text-xs font-bold bill-item-row">
                        <div className="w-14 text-sm font-black text-stone-950 shrink-0">
                          [{item.quantity}x]
                        </div>
                        <div className="flex-1 font-black text-sm uppercase text-stone-900 leading-snug break-words">
                          {item.name}
                          {item.notes && (
                            <span className="block text-[10px] text-stone-600 font-normal italic mt-0.5">
                              ({item.notes})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Units for Cook Check */}
                <div className="pt-2 flex justify-between items-center text-xs font-black">
                  <span>TOTAL DISHES TO COOK:</span>
                  <span className="text-sm bg-stone-100 px-2 py-0.5 border border-stone-300">
                    {totalItemCount} UNITS
                  </span>
                </div>

                <div className="pt-2 text-center text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  *** END OF KITCHEN SLIP ***
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                CUT / PERFORATION SEPARATOR
                (Only shown in Dual Print mode between KOT & Bill)
            ═════════════════════════════════════════════════════════ */}
            {printMode === 'both' && (
              <div className="my-4 py-2 border-y-2 border-dashed border-stone-500 text-center flex items-center justify-center gap-1.5 text-[10px] font-black text-stone-600 bg-stone-50">
                <Scissors size={12} className="rotate-90" />
                <span>- - - - - - [ CUT HERE / TEAR FOR CHEF ] - - - - - -</span>
                <Scissors size={12} className="-rotate-90" />
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                SECTION 2: COMPLETE EXTENDED CUSTOMER TAX INVOICE & BILL
                (Single unified receipt - dynamically extends with items)
            ═════════════════════════════════════════════════════════ */}
            {(printMode === 'both' || printMode === 'customer') && (
              <div className="customer-slip-section pt-1">
                {/* Brand Header */}
                <div className="text-center pb-2.5 border-b-2 border-dashed border-stone-900 flex flex-col items-center">
                  <img 
                    src="/logo-sm.svg" 
                    alt="Logo" 
                    className="h-10 w-auto object-contain mb-1" 
                  />
                  <h2 className="text-base font-black tracking-wider uppercase text-stone-900 leading-tight">
                    {restaurantName}
                  </h2>
                  <p className="text-[11px] font-bold text-stone-800 mt-0.5">
                    Authentic South Indian & Village Cuisine
                  </p>
                  <p className="text-[10px] text-stone-600 font-semibold">
                    Orders / Catering Helpline: +91 {restaurantPhone}
                  </p>
                  <div className="text-[11px] font-black bg-stone-900 text-white px-3 py-0.5 mt-2 uppercase tracking-wider">
                    *** TAX INVOICE / CASH BILL ***
                  </div>
                </div>

                {/* Invoice Meta Information */}
                <div className="py-2.5 border-b border-dashed border-stone-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">INVOICE / BILL NO:</span>
                    <span className="font-black text-sm bg-stone-100 px-1.5 py-0.5 border border-stone-300">
                      #{order.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">DATE & TIME:</span>
                    <span>{order.timestamp || new Date().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">BILLED TO:</span>
                    <span className="font-black uppercase text-stone-900">{order.customerName || 'Walk-in Guest'}</span>
                  </div>
                  {order.phone && (
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold">CONTACT:</span>
                      <span className="font-bold">{order.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold">SERVICE TYPE:</span>
                    <span className="font-bold uppercase bg-stone-100 px-1">
                      {serviceType}
                    </span>
                  </div>
                  {order.address && (
                    <div className="flex justify-between text-[11px] pt-0.5 items-start">
                      <span className="font-bold shrink-0 mr-2">ADDRESS:</span>
                      <span className="text-right font-medium break-words leading-tight">{order.address}</span>
                    </div>
                  )}
                </div>

                {/* Extended Itemized Bill Table (Dynamically Expands With Dishes) */}
                <div className="py-2.5 border-b-2 border-dashed border-stone-900">
                  <div className="flex items-center text-[10px] font-black pb-1.5 border-b border-stone-800 uppercase tracking-wider">
                    <span className="w-6 text-center">#</span>
                    <span className="flex-1 px-1">ITEM DESCRIPTION</span>
                    <span className="w-10 text-center">QTY</span>
                    <span className="w-14 text-right">RATE</span>
                    <span className="w-16 text-right">AMOUNT</span>
                  </div>

                  {/* Clean row-by-row item list that smoothly extends downwards */}
                  <div className="divide-y divide-stone-200 mt-1">
                    {items.map((item, idx) => {
                      const itemRate = item.rate || item.price || 0;
                      const itemAmount = item.amount || (itemRate ? itemRate * item.quantity : 0);

                      return (
                        <div key={idx} className="py-2 flex items-start text-xs font-bold bill-item-row">
                          <span className="w-6 text-center text-stone-500 font-mono text-[11px] pt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1 px-1 leading-snug break-words pr-1.5">
                            <span className="uppercase font-black text-stone-900 block text-xs">
                              {item.name}
                            </span>
                            {item.notes && (
                              <span className="block text-[10px] text-stone-500 font-normal italic">
                                ({item.notes})
                              </span>
                            )}
                          </div>
                          <span className="w-10 text-center font-black text-stone-950 text-xs">
                            {item.quantity}x
                          </span>
                          <span className="w-14 text-right font-semibold text-stone-700 text-xs">
                            {itemRate > 0 ? `₹${itemRate}` : '-'}
                          </span>
                          <span className="w-16 text-right font-black text-stone-950 text-xs">
                            {itemAmount > 0 ? `₹${itemAmount}` : (order.totalAmount && items.length === 1 ? `₹${order.totalAmount}` : '-')}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Items and Units summary count */}
                  <div className="pt-2 mt-1 border-t border-dashed border-stone-300 flex justify-between text-[11px] font-bold text-stone-700">
                    <span>TOTAL ITEMS: {items.length}</span>
                    <span>TOTAL UNITS: {totalItemCount}</span>
                  </div>
                </div>

                {/* Financial Summary & Total */}
                <div className="py-2.5 border-b border-dashed border-stone-800 space-y-1 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-700">Item Subtotal:</span>
                    <span className="font-bold">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-700">GST / Service Charges:</span>
                    <span className="font-bold">₹0.00 (Inclusive)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-black pt-1.5 mt-1 border-t-2 border-stone-900">
                    <span className="uppercase tracking-wide text-sm font-black">GRAND TOTAL:</span>
                    <span className="text-base font-black bg-stone-900 text-white px-2.5 py-0.5 tracking-tight border border-stone-900">
                      ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Payment Badge & Settlement Details */}
                <div className="py-2 border-b border-dashed border-stone-800 flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800">PAYMENT STATUS:</span>
                  <span className="font-black uppercase bg-stone-100 px-2 py-0.5 border border-stone-400 text-[11px]">
                    {order.paymentMethod || 'CASH ON DELIVERY'} • {order.paymentStatus || 'CONFIRMED'}
                  </span>
                </div>

                {/* Special Instructions (if any) */}
                {order.notes && (
                  <div className="my-2 p-2 bg-stone-50 border border-dashed border-stone-400 text-stone-800 text-xs">
                    <span className="font-bold block uppercase text-[10px] text-stone-600">CUSTOMER INSTRUCTION:</span>
                    <span className="italic">"{order.notes}"</span>
                  </div>
                )}

                {/* Customer Thank You Footer */}
                <div className="pt-3 text-center text-[10px] text-stone-600 space-y-1">
                  <p className="font-black text-xs text-stone-900 tracking-wide">
                    🙏 THANK YOU FOR DINING WITH US!
                  </p>
                  <p className="font-semibold text-stone-700">
                    Taste The Authentic South Indian Tradition • Visit Again!
                  </p>
                  <p className="text-[9px] text-stone-500">
                    Sri Mahalakshmi Caters • Quality Food & Premium Catering
                  </p>
                  <div className="pt-1 text-[9px] font-mono text-stone-400">
                    *** END OF INVOICE ***
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-stone-100 p-3 sm:p-4 border-t border-stone-200 flex items-center justify-between no-print shrink-0">
          <div className="text-xs text-stone-600 font-medium">
            {printMode === 'customer' && '🧾 Standard: Extended Customer Tax Invoice'}
            {printMode === 'kitchen' && '👨‍🍳 Kitchen: Chef Preparation Ticket'}
            {printMode === 'both' && '📑 Dual Mode: Chef KOT + Customer Bill'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleTriggerPrint}
              className="px-5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#112A1F] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Printer size={15} /> Print {printMode === 'kitchen' ? 'Kitchen Slip' : 'Bill'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceiptPrintModal;
