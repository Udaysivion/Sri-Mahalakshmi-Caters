import React, { useState, useEffect } from 'react';
import { Search, Phone, MessageSquare, Eye, Utensils, AlertCircle, Printer, ChefHat, Calendar } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { AdminPagination } from './AdminPagination';
import { AdminDateFilter } from './AdminDateFilter';
import LogoLoader from '../../../components/common/LogoLoader';

export const OrdersTable = ({
  orders,
  isLoading = false,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedDate = '',
  onDateChange,
  onSelectOrder,
  onPrintKOT
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, selectedDate]);

  // Paginated slice
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="bg-white rounded-2xl border-1.5 border-[#C4960A]/30 shadow-sm overflow-hidden">

      {/* Search & Filter Toolbar */}
      <div className="p-3.5 sm:p-4 border-b border-stone-200 bg-[#FFF8EC]/40 flex flex-col gap-2.5">
        {/* Top Controls Row: Search Input & Status Pills */}
        <div className="flex flex-col md:flex-row gap-2.5 md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by Order ID, customer, phone, or dish..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4731A] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'ALL', label: 'All Orders' },
              { id: 'PAID', label: 'Paid Online' },
              { id: 'COD', label: 'Cash on Delivery' },
              { id: 'PENDING', label: 'Pending' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => onStatusFilterChange(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${statusFilter === f.id
                  ? 'bg-[#1B4332] text-[#FFF8EC] shadow-2xs border border-[#E0B030]'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Controls Row: Small Calendar Date Filter */}
        {onDateChange && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <Calendar size={13} className="text-[#D4731A]" />
                Filter by Date:
              </span>
              <AdminDateFilter
                selectedDate={selectedDate}
                onDateChange={onDateChange}
                totalCount={orders.length}
              />
            </div>

            {selectedDate && (
              <span className="text-[11px] text-stone-500 font-medium">
                Showing date-filtered results ({orders.length} orders found)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Orders Table - Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#1B4332]/5 text-[#5C2D0E] uppercase text-[11px] font-bold tracking-wider border-b border-stone-200">
              <th className="py-2.5 px-3.5">Order ID & Date</th>
              <th className="py-2.5 px-3.5">Customer</th>
              <th className="py-2.5 px-3.5">Items Summary</th>
              <th className="py-2.5 px-3.5">Amount</th>
              <th className="py-2.5 px-3.5">Payment</th>
              <th className="py-2.5 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading && orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <LogoLoader
                    size="sm"
                    message="Syncing Live Orders..."
                    subtext="Connecting to PostgreSQL Database"
                  />
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-stone-400">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Utensils size={28} className="text-stone-300" />
                    <p className="font-semibold text-stone-600 text-xs">No orders found matching your criteria</p>
                    <p className="text-[11px] text-stone-400">Incoming customer orders will automatically appear here live.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order, idx) => {
                const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

                return (
                  <tr
                    key={order.orderId || idx}
                    className="hover:bg-[#FFF8EC]/50 transition-colors cursor-pointer group"
                    onClick={() => onSelectOrder(order)}
                  >
                    {/* Order ID & Date */}
                    <td className="py-2.5 px-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-[#1B4332] group-hover:text-[#D4731A] transition-colors">
                          #{order.orderId}
                        </span>
                        {(order.paymentMethod === 'Table QR Order' || (order.address && order.address.includes('Table'))) && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                            📱 Table
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {order.timestamp || 'N/A'}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-xs sm:text-sm text-[#2C1A00] flex items-center gap-1.5">
                        <span>{order.customerName || 'Guest'}</span>
                      </div>
                      {order.address && order.address.includes('Table') && (
                        <span className="inline-block mt-0.5 text-xs font-bold text-[#D4731A] bg-stone-100 px-1.5 py-0.5 rounded">
                          {order.address.split('|')[0]}
                        </span>
                      )}
                      {order.phone && !order.phone.includes('Table') && (
                        <div className="flex items-center gap-2 mt-0.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${order.phone}`}
                            className="text-xs text-stone-500 hover:text-[#1B4332] flex items-center gap-1"
                            title="Call customer"
                          >
                            <Phone size={11} className="text-[#D4731A]" />
                            <span>{order.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Namaste ${order.customerName || 'Customer'}! Greetings from Sri Mahalakshmi Caters regarding your order #${order.orderId}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-0.5 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                            title="WhatsApp message"
                          >
                            <MessageSquare size={11} />
                          </a>
                        </div>
                      )}
                    </td>

                    {/* Items */}
                    <td className="py-2.5 px-3.5 max-w-xs">
                      <p className="text-xs text-stone-700 truncate font-medium">
                        {order.items || 'No item details'}
                      </p>
                      {order.notes && (
                        <p className="text-[11px] text-amber-700 truncate italic mt-0.5">
                          Note: {order.notes}
                        </p>
                      )}
                    </td>

                    {/* Total Amount */}
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <span className="font-heading font-extrabold text-sm sm:text-base text-[#1B4332]">
                        ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <OrderStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onPrintKOT(order, 'customer')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4332] hover:bg-[#112A1F] text-[#FFF8EC] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Print Customer Bill / Tax Invoice"
                        >
                          <Printer size={12} className="text-[#E0B030]" /> Print
                        </button>
                        <button
                          onClick={() => onSelectOrder(order)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FFF8EC] hover:bg-[#D4731A] text-[#1B4332] hover:text-white border border-[#C4960A]/40 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye size={12} /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Orders List - Mobile View (Optimized for Phones) */}
      <div className="md:hidden divide-y divide-stone-100">
        {isLoading && orders.length === 0 ? (
          <div className="py-10 text-center p-4">
            <LogoLoader
              size="sm"
              message="Syncing Live Orders..."
              subtext="Connecting to PostgreSQL Database"
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-10 text-center text-stone-400 p-4">
            <Utensils size={32} className="mx-auto mb-2 text-stone-300" />
            <p className="font-semibold text-stone-600">No orders found</p>
          </div>
        ) : (
          paginatedOrders.map((order, idx) => {
            const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
            const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

            return (
              <div
                key={order.orderId || idx}
                onClick={() => onSelectOrder(order)}
                className="p-4 hover:bg-[#FFF8EC]/40 transition-colors active:bg-[#FFF8EC]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#1B4332]">
                    #{order.orderId}
                  </span>
                  <span className="font-heading font-extrabold text-base text-[#1B4332]">
                    ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1 text-xs text-stone-500">
                  <span>{order.customerName || 'Guest'}</span>
                  <span>{order.timestamp || ''}</span>
                </div>

                <p className="text-xs text-stone-700 font-medium line-clamp-2 mt-2 bg-[#FFF8EC]/80 p-2 rounded border border-[#C4960A]/20">
                  {order.items}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                  <OrderStatusBadge status={order.paymentStatus} method={order.paymentMethod} />

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {order.phone && (
                      <>
                        <a
                          href={`tel:${order.phone}`}
                          className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-[#1B4332] hover:text-white transition-all"
                        >
                          <Phone size={13} />
                        </a>
                        <a
                          href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Namaste ${order.customerName || 'Customer'}! Greetings from Sri Mahalakshmi Caters regarding your order #${order.orderId}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                        >
                          <MessageSquare size={13} />
                        </a>
                      </>
                    )}
                    <button
                      onClick={() => onPrintKOT(order, 'customer')}
                      className="px-2.5 py-1 rounded-lg bg-[#1B4332] text-[#E0B030] border border-[#1B4332] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Print Customer Bill / Tax Invoice"
                    >
                      <Printer size={12} /> Print Bill
                    </button>
                    <button
                      onClick={() => onSelectOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      <AdminPagination
        currentPage={currentPage}
        totalItems={orders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

    </div>
  );
};
