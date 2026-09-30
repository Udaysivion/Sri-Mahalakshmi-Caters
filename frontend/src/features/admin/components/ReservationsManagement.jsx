import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, User, Users, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import reservationApi from '@/features/reservation/api/reservationApi';

export const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await reservationApi.getReservations();
      setReservations(data || []);
    } catch (err) {
      console.warn('Could not fetch reservations:', err.message);
      toast.error('Unable to fetch reservations from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await reservationApi.updateReservationStatus(id, status);
      toast.success(`Reservation marked as ${status}!`);
      fetchReservations();
    } catch (err) {
      toast.error(err.message || 'Failed to update reservation status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm">
        <h3 className="font-bold text-base text-[#1B4332]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Table Reservations ({reservations.length})
        </h3>
        <button
          onClick={fetchReservations}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400 flex flex-col items-center gap-3">
            <RefreshCw size={24} className="animate-spin text-[#D4731A]" />
            <p className="text-sm">Fetching table reservations...</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400">
            <Calendar size={36} className="mx-auto mb-2 opacity-40 text-stone-300" />
            <p className="text-sm font-semibold">No table reservations found in database.</p>
          </div>
        ) : (
          reservations.map((r) => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-base text-stone-900">{r.name}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${r.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : r.status === 'CANCELLED' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-amber-50 text-amber-700 border-amber-300'}`}>
                    {r.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-mono"><Phone size={12} className="text-[#D4731A]" /> {r.phone}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-[#D4731A]" /> {r.reservationDate}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-[#D4731A]" /> {r.reservationTime}</span>
                  <span className="flex items-center gap-1"><Users size={12} className="text-[#D4731A]" /> {r.guests}</span>
                </div>
                {r.specialRequests && (
                  <p className="text-xs text-stone-600 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                    "{r.specialRequests}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {r.status !== 'CONFIRMED' && (
                  <button
                    onClick={() => handleStatusUpdate(r.id, 'CONFIRMED')}
                    className="flex items-center gap-1 bg-emerald-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle size={14} /> Confirm
                  </button>
                )}
                {r.status !== 'CANCELLED' && (
                  <button
                    onClick={() => handleStatusUpdate(r.id, 'CANCELLED')}
                    className="flex items-center gap-1 border border-rose-300 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-50 transition-colors"
                  >
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReservationsManagement;
