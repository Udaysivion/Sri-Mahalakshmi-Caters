import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Users, MapPin, CheckCircle, Clock3, XCircle, Search, Sparkles, Download } from 'lucide-react';
import { AdminPagination } from './AdminPagination';
import { AdminDateFilter } from './AdminDateFilter';
import LogoLoader from '../../../components/common/LogoLoader';

export const CateringInquiriesTable = ({
  inquiries,
  isLoading,
  onUpdateStatus,
  onExportCSV
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, dateFilter]);

  const filtered = inquiries.filter(inq => {
    // Date filter
    if (dateFilter) {
      const d = inq.date || inq.timestamp || '';
      if (!d.includes(dateFilter)) return false;
    }

    if (statusFilter !== 'ALL' && (inq.status || 'New').toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      (inq.inquiryId && inq.inquiryId.toLowerCase().includes(q)) ||
      (inq.customerName && inq.customerName.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.eventType && inq.eventType.toLowerCase().includes(q)) ||
      (inq.message && inq.message.toLowerCase().includes(q))
    );
  });

  const paginatedInquiries = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const s = (status || 'New').toLowerCase();
    if (s.includes('book')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle size={12} /> Booked & Confirmed
        </span>
      );
    }
    if (s.includes('quot')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
          <Sparkles size={12} /> Quote Sent
        </span>
      );
    }
    if (s.includes('contact')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
          <Clock3 size={12} /> Contacted
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
        <Clock3 size={12} /> New Inquiry
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#C4960A]/30 overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FFF8EC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2">
            <span>🎉</span> Catering & Large Event Bookings
          </h3>
          <p className="text-xs text-[#6B4423]">
            Total {inquiries.length} catering inquiries received from weddings, corporate & intimate functions
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
              placeholder="Search by event, name, phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#D4731A]"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#D4731A] font-semibold text-stone-700 cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Date Wise Filter */}
          <AdminDateFilter
            selectedDate={dateFilter}
            onDateChange={setDateFilter}
            totalCount={filtered.length}
          />

          {onExportCSV && (
            <button
              onClick={() => onExportCSV(filtered)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#112A1F] text-[#FFF8EC] text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title={`Export only these ${filtered.length} catering event inquiries to CSV`}
            >
              <Download size={13} className="text-[#E0B030]" />
              <span>Export Catering CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Inquiry ID</th>
              <th className="py-3 px-4">Client Name & Phone</th>
              <th className="py-3 px-4">Event Type</th>
              <th className="py-3 px-4">Est. Guests</th>
              <th className="py-3 px-4">Event Date</th>
              <th className="py-3 px-4">Venue & Preferences</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading && inquiries.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center">
                  <LogoLoader size="sm" message="Syncing Catering Inquiries..." subtext="Checking live Database" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-stone-400">
                  <p className="font-semibold text-stone-600">No catering inquiries found</p>
                  <p className="text-[11px] mt-1">Catering requests from weddings, parties & corporate events will appear here.</p>
                </td>
              </tr>
            ) : (
              paginatedInquiries.map((inq) => {
                const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                  `Namaste ${inq.customerName}! This is Sri Mahalakshmi Caters regarding your inquiry #${inq.inquiryId} for your upcoming ${inq.eventType} (${inq.guests} guests) on ${inq.date || 'your requested date'}. We would be delighted to customize your event feast!`
                )}`;

                return (
                  <tr key={inq.inquiryId} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#D4731A] whitespace-nowrap">
                      #{inq.inquiryId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900 text-sm">{inq.customerName}</p>
                      <p className="text-stone-500 font-mono text-[11px] mt-0.5">{inq.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {inq.eventType || 'Event'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-extrabold text-[#1B4332]">
                        <Users size={12} className="text-[#D4731A]" /> {inq.guests ? `${inq.guests} guests` : 'Custom'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-stone-700 font-semibold">
                        <Calendar size={13} className="text-[#D4731A]" />
                        <span>{inq.date || 'TBD'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      {inq.message ? (
                        <div className="text-stone-700 leading-relaxed truncate" title={inq.message}>
                          <MapPin size={11} className="inline text-[#D4731A] mr-1" />
                          {inq.message}
                        </div>
                      ) : (
                        <span className="text-stone-400">No venue specified</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {inq.phone && (
                          <>
                            <a
                              href={`tel:${inq.phone}`}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1B4332] transition-colors"
                              title="Call Client"
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
                          value={inq.status || 'New'}
                          onChange={(e) => onUpdateStatus && onUpdateStatus(inq.inquiryId, e.target.value)}
                          className="px-2 py-1 text-xs rounded-lg border border-stone-200 bg-white font-semibold text-stone-700 cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Booked">Booked</option>
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
