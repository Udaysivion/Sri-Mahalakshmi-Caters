import React from 'react';
import { CheckCircle2, Clock, Banknote, AlertCircle } from 'lucide-react';

export const OrderStatusBadge = ({ status, method }) => {
  const s = (status || '').toLowerCase();
  const m = (method || '').toLowerCase();

  if (s.includes('paid') || s.includes('completed')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <CheckCircle2 size={13} className="text-emerald-600" />
        Paid • Online
      </span>
    );
  }

  if (m.includes('cash') || m.includes('cod')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
        <Banknote size={13} className="text-amber-600" />
        Cash on Delivery
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
      <Clock size={13} className="text-blue-600" />
      {status || 'Pending'}
    </span>
  );
};
