import React from 'react';
import { Calendar, X, Clock, CalendarDays } from 'lucide-react';

/**
 * AdminDateFilter Component
 * A compact calendar and date-wise filter for the admin dashboard.
 * Supports quick presets (All, Today, Yesterday) and custom calendar date selection.
 */
export const AdminDateFilter = ({
  selectedDate,
  onDateChange,
  totalCount,
  label = "Date Filter"
}) => {
  // Format today & yesterday as YYYY-MM-DD in local time
  const getLocalDateStr = (d = new Date()) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateStr(new Date());
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateStr(yesterday);

  const isToday = selectedDate === todayStr;
  const isYesterday = selectedDate === yesterdayStr;
  const isCustom = Boolean(selectedDate && !isToday && !isYesterday);

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-');
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      {/* Quick Filter Buttons */}
      <div className="inline-flex bg-white/80 p-0.5 rounded-xl border border-stone-300 shadow-2xs">
        <button
          type="button"
          onClick={() => onDateChange('')}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
            !selectedDate
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          All Dates
        </button>

        <button
          type="button"
          onClick={() => onDateChange(todayStr)}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer flex items-center gap-1 ${
            isToday
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Today</span>
          {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#E0B030]"></span>}
        </button>

        <button
          type="button"
          onClick={() => onDateChange(yesterdayStr)}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
            isYesterday
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Yesterday
        </button>
      </div>

      {/* Small Calendar Date Picker input */}
      <div className="relative inline-flex items-center bg-white border border-stone-300 rounded-xl px-2.5 py-1 text-xs shadow-2xs focus-within:ring-2 focus-within:ring-[#D4731A] focus-within:border-transparent transition-all">
        <Calendar size={13} className={`${selectedDate ? 'text-[#D4731A]' : 'text-stone-400'} mr-1.5 shrink-0`} />
        
        <input
          type="date"
          value={selectedDate || ''}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-transparent border-none text-xs font-semibold text-stone-800 outline-none cursor-pointer focus:ring-0 p-0"
          title="Pick a specific date from calendar"
        />

        {selectedDate && (
          <button
            type="button"
            onClick={() => onDateChange('')}
            className="ml-1.5 p-0.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 cursor-pointer"
            title="Clear date filter"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Active Date Tag Pill */}
      {selectedDate && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D4731A]/10 text-[#D4731A] border border-[#D4731A]/30 text-[11px] font-bold">
          <CalendarDays size={11} />
          <span>{formatDisplayDate(selectedDate)}</span>
          {totalCount !== undefined && (
            <span className="bg-[#D4731A] text-white px-1.5 py-0.2 rounded-full text-[10px]">
              {totalCount}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default AdminDateFilter;
