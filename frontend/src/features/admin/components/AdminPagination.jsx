import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const AdminPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate visible page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-3 sm:p-4 border-t border-stone-200 bg-[#FFF8EC]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 select-none">
      
      {/* Information & Per Page Selector */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <p className="font-medium text-stone-700">
          Showing <span className="font-extrabold text-[#1B4332]">{startItem}</span> to{' '}
          <span className="font-extrabold text-[#1B4332]">{endItem}</span> of{' '}
          <span className="font-extrabold text-[#D4731A]">{totalItems}</span> records
        </p>

        {onItemsPerPageChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-[11px] text-stone-500 hidden md:inline">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="px-2 py-1 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 focus:outline-none focus:border-[#D4731A] cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          title="First Page"
        >
          <ChevronsLeft size={15} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-1.5 text-stone-400 font-bold">
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4332] text-[#E0B030] border border-[#1B4332] shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight size={15} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          title="Last Page"
        >
          <ChevronsRight size={15} />
        </button>
      </div>

    </div>
  );
};
