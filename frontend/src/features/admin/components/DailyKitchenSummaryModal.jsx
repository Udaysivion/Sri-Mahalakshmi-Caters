import React from 'react';
import { X, Printer, ChefHat } from 'lucide-react';
import { parseOrderItems } from './KitchenTicketPrint';
import { printThermalReceipt } from '../../../utils/printReceiptService';

export const DailyKitchenSummaryModal = ({ orders, onClose }) => {
  // Aggregate items across all selected/today's orders
  const itemSummaryMap = new Map();
  let totalDishes = 0;

  orders.forEach(order => {
    const items = parseOrderItems(order);
    items.forEach(item => {
      const name = item.name.trim();
      const qty = item.quantity || 1;
      totalDishes += qty;
      if (itemSummaryMap.has(name)) {
        itemSummaryMap.set(name, itemSummaryMap.get(name) + qty);
      } else {
        itemSummaryMap.set(name, qty);
      }
    });
  });

  const sortedItems = Array.from(itemSummaryMap.entries()).sort((a, b) => b[1] - a[1]);

  const handlePrint = () => {
    printThermalReceipt('daily-kitchen-sheet', {
      paperWidth: 'full',
      title: 'Daily_Kitchen_Production_Sheet'
    });
  };

  const todayStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in no-print-overlay">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-[#1B4332] overflow-hidden max-h-[90vh] flex flex-col no-print-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Header */}
        <div className="bg-[#1B4332] text-[#FFF8EC] p-4 flex items-center justify-between no-print border-b-2 border-[#D4731A]">
          <div className="flex items-center gap-2">
            <ChefHat size={24} className="text-[#E0B030]" />
            <div>
              <h3 className="font-heading text-lg font-bold text-[#E0B030]">
                Daily Kitchen Production Sheet
              </h3>
              <p className="text-xs text-[#FFF8EC]/80">
                Master Prep & Dispatch List for Kitchen Team
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#D4731A] hover:bg-[#B05D10] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Printer size={15} /> Print Daily Sheet
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF8EC] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Master Sheet */}
        <div className="p-6 overflow-y-auto bg-stone-50 print-clean-wrapper">
          <div
            id="daily-kitchen-sheet"
            className="bg-white p-6 border border-stone-300 rounded-lg shadow-xs text-stone-900 font-sans"
          >
            {/* Header with Website Logo */}
            <div className="text-center pb-4 border-b-2 border-stone-800 flex flex-col items-center">
              <img
                src="/logo-sm.svg"
                alt="Logo"
                className="h-12 w-auto object-contain mb-1.5"
              />
              <h2 className="text-xl font-black uppercase text-[#1B4332]" style={{ fontFamily: "'Playfair Display', serif" }}>
                SRI MAHALAKSHMI CATERS
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D4731A] mt-0.5">
                Daily Kitchen Department Dispatch & Prep Sheet
              </p>
              <p className="text-[11px] text-stone-600 mt-1 font-medium">
                Date: {todayStr} • Printed at {new Date().toLocaleTimeString('en-IN')}
              </p>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-stone-100 rounded-lg border border-stone-200 text-center text-xs">
              <div>
                <span className="text-stone-500 block font-semibold">Total Orders:</span>
                <span className="text-lg font-black text-[#1B4332]">{orders.length}</span>
              </div>
              <div>
                <span className="text-stone-500 block font-semibold">Total Portions to Cook:</span>
                <span className="text-lg font-black text-[#D4731A]">{totalDishes} items</span>
              </div>
              <div>
                <span className="text-stone-500 block font-semibold">Unique Dishes:</span>
                <span className="text-lg font-black text-stone-800">{sortedItems.length} dishes</span>
              </div>
            </div>

            {/* Aggregated Dishes (Head Chef Preparation Count) */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-800 border-b-2 border-stone-800 pb-1 mb-2 flex items-center justify-between">
                <span>1. Dish Preparation Quantities (Batch Cook List)</span>
                <span className="text-[10px] text-stone-500">Sorted by Highest Demand</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sortedItems.map(([name, qty], idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 text-xs">
                    <span className="font-bold text-stone-800">{name}</span>
                    <span className="font-black text-sm px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {qty} portions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order by Order Execution Table */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-800 border-b-2 border-stone-800 pb-1 mb-2">
                2. Order-Wise Production & Delivery Sequence
              </h4>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-200 text-stone-800 border-b border-stone-300">
                    <th className="p-2 w-24">Order ID</th>
                    <th className="p-2 w-32">Customer</th>
                    <th className="p-2">Items to Prepare</th>
                    <th className="p-2 w-32">Chef Instructions</th>
                    <th className="p-2 w-16 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {orders.map((ord, idx) => (
                    <tr key={ord.orderId || idx} className="hover:bg-stone-50">
                      <td className="p-2 font-mono font-bold text-[#1B4332]">
                        #{ord.orderId}
                      </td>
                      <td className="p-2 font-semibold text-stone-800">
                        {ord.customerName}
                        {ord.phone && <span className="block text-[10px] text-stone-500">{ord.phone}</span>}
                      </td>
                      <td className="p-2 font-bold text-stone-900">
                        {ord.items}
                      </td>
                      <td className="p-2 text-[11px] text-amber-900 italic font-medium">
                        {ord.notes ? `"${ord.notes}"` : '-'}
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block w-4 h-4 border-2 border-stone-400 rounded"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kitchen Signoff Footer */}
            <div className="mt-8 pt-4 border-t-2 border-dashed border-stone-400 flex justify-between text-xs text-stone-600">
              <div>
                <span>Head Chef Signature: _______________________</span>
              </div>
              <div>
                <span>Kitchen Supervisor Dispatch: _______________________</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end gap-2 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-300"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-lg bg-[#1B4332] text-white text-xs font-bold hover:bg-[#112A1F] flex items-center gap-1.5 shadow-sm"
          >
            <Printer size={15} /> Print Dispatch Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
