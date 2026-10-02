import React from 'react';
import { ShoppingBag, IndianRupee, CheckCircle, Calendar } from 'lucide-react';

export const AdminStats = ({ stats }) => {
  const avgOrderValue = stats.totalOrders > 0
    ? Math.round(stats.totalRevenue / stats.totalOrders)
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

      {/* Total Revenue */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-semibold text-[#6B4423]">Total Revenue</p>
          <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332]">
            <IndianRupee size={18} />
          </div>
        </div>
        <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1B4332] mt-2">
          ₹{stats.totalRevenue.toLocaleString('en-IN')}
        </p>
        <p className="text-[11px] text-[#5C2D0E] font-medium mt-1">
          Avg ₹{avgOrderValue} per order
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1B4332]"></div>
      </div>

      {/* Total Orders */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-semibold text-[#6B4423]">Total Bookings</p>
          <div className="w-8 h-8 rounded-full bg-[#D4731A]/10 flex items-center justify-center text-[#D4731A]">
            <ShoppingBag size={18} />
          </div>
        </div>
        <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#D4731A] mt-2">
          {stats.totalOrders}
        </p>
        <p className="text-[11px] text-[#5C2D0E] font-medium mt-1">
          All catering & online orders
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4731A]"></div>
      </div>

      {/* Today's Orders */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-semibold text-[#6B4423]">Today's Activity</p>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <Calendar size={18} />
          </div>
        </div>
        <p className="font-heading font-extrabold text-2xl sm:text-3xl text-blue-900 mt-2">
          {stats.todayOrders}
        </p>
        <p className="text-[11px] text-stone-500 font-medium mt-1">
          Received today
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
      </div>

      {/* Online Paid vs Cash */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-1.5 border-[#C4960A]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-semibold text-[#6B4423]">Settled Online</p>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <CheckCircle size={18} />
          </div>
        </div>
        <p className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-800 mt-2">
          {stats.paidOrders}
        </p>
        <p className="text-[11px] text-stone-500 font-medium mt-1">
          {stats.codOrders} Cash on Delivery
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"></div>
      </div>

    </div>
  );
};
