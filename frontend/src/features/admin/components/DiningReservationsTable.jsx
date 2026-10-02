import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Clock, Users, CheckCircle, Clock3, XCircle, Search, Filter } from 'lucide-react';
import { AdminPagination } from './AdminPagination';
import LogoLoader from '../../../components/common/LogoLoader';

export const DiningReservationsTable = ({
  reservations,
  isLoading,
  onUpdateStatus
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const filtered = reservations.filter(res => {
    if (statusFilter !== 'ALL' && (res.status || 'Pending').toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      (res.bookingId && res.bookingId.toLowerCase().includes(q)) ||
      (res.customerName && res.customerName.toLowerCase().includes(q)) ||
      (res.phone && res.phone.toLowerCase().includes(q)) ||
      (res.guests && res.guests.toLowerCase().includes(q))
    );
  });

  const paginatedReservations = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const s = (status || 'Pending').toLowerCase();
    if (s.includes('confirm')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle size={12} /> Confirmed
        </span>
      );
    }
    if (s.includes('complete')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
          <CheckCircle size={12} /> Completed
        </span>
      );
    }
    if (s.includes('cancel')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <XCircle size={12} /> Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
        <Clock3 size={12} /> Pending Review
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#C4960A]/30 overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FFF8EC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2">
            <span>🍽️</span> Table Dining Reservations
          </h3>
          <p className="text-xs text-[#6B4423]">
            Total {reservations.length} table bookings received from website guests
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#D4731A]"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#D4731A] font-semibold text-stone-700"
          >
            <option value="ALL">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Guest Details</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Guests</th>
              <th className="py-3 px-4">Special Requests</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading && reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <LogoLoader size="sm" message="Syncing Dining Reservations..." subtext="Checking live Database" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-stone-400">
                  <p className="font-semibold text-stone-600">No reservations found</p>
                  <p className="text-[11px] mt-1">Table bookings made on the contact page will appear here instantly.</p>
                </td>
              </tr>
            ) : (
              paginatedReservations.map((res) => {
                const cleanPhone = (res.phone || '').replace(/[^0-9]/g, '');
                const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                  `Namaste ${res.customerName}! This is Sri Mahalakshmi Kitchen confirming your table reservation #${res.bookingId} for ${res.guests} on ${res.date} at ${res.time}.`
                )}`;

                return (
                  <tr key={res.bookingId} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1B4332] whitespace-nowrap">
                      #{res.bookingId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900 text-sm">{res.customerName}</p>
                      <p className="text-stone-500 font-mono text-[11px] mt-0.5">{res.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-stone-800 font-semibold">
                        <Calendar size={13} className="text-[#D4731A]" />
                        <span>{res.date || 'Today'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-500 text-[11px] mt-0.5">
                        <Clock size={13} />
                        <span>{res.time || '12:30 PM'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 font-bold text-stone-700">
                        <Users size={12} className="text-[#D4731A]" /> {res.guests}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      {res.message ? (
                        <span className="text-stone-700 italic block truncate" title={res.message}>
                          "{res.message}"
                        </span>
                      ) : (
                        <span className="text-stone-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(res.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {res.phone && (
                          <>
                            <a
                              href={`tel:${res.phone}`}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1B4332] transition-colors"
                              title="Call Customer"
                            >
                              <Phone size={14} />
                            </a>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1EBE5D] transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={14} />
                            </a>
                          </>
                        )}
                        <select
                          value={res.status || 'Pending'}
                          onChange={(e) => onUpdateStatus && onUpdateStatus(res.bookingId, e.target.value)}
                          className="px-2 py-1 text-xs rounded-lg border border-stone-200 bg-white font-semibold text-stone-700 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <AdminPagination
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};
