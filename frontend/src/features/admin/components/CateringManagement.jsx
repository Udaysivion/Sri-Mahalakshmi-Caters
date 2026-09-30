import React, { useState, useEffect } from 'react';
import { PartyPopper, Calendar, Phone, Users, RefreshCw, MessageSquare, CheckCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import cateringApi from '@/features/catering/api/cateringApi';

export const CateringManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await cateringApi.getInquiries();
      setInquiries(data || []);
    } catch (err) {
      console.warn('Could not fetch catering inquiries:', err.message);
      toast.error('Unable to fetch catering inquiries from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await cateringApi.updateCateringStatus(id, status);
      toast.success(`Catering inquiry updated to ${status}!`);
      fetchInquiries();
    } catch (err) {
      toast.error(err.message || 'Failed to update catering inquiry status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm">
        <h3 className="font-bold text-base text-[#1B4332]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Catering & Bulk Order Inquiries ({inquiries.length})
        </h3>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400 flex flex-col items-center gap-3">
            <RefreshCw size={24} className="animate-spin text-[#D4731A]" />
            <p className="text-sm">Fetching catering inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-400">
            <PartyPopper size={36} className="mx-auto mb-2 opacity-40 text-stone-300" />
            <p className="text-sm font-semibold">No catering inquiries found in database.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-stone-900">{inq.name}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-[#D4731A] border border-amber-200">
                    {inq.eventType}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${inq.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : inq.status === 'QUOTED' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-stone-100 text-stone-700 border-stone-300'}`}>
                    {inq.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 font-medium">Status:</span>
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusUpdate(inq.id, e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none text-[#1B4332]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUOTED">QUOTED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="DECLINED">DECLINED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#D4731A]" />
                  <span className="font-mono font-bold text-stone-900">{inq.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#D4731A]" />
                  <span>Event Date: <strong className="text-stone-900">{inq.eventDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#D4731A]" />
                  <span>Expected Guests: <strong className="text-stone-900">{inq.guestCount}</strong></span>
                </div>
              </div>

              {inq.message && (
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700 flex items-start gap-2">
                  <MessageSquare size={14} className="text-stone-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{inq.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CateringManagement;
