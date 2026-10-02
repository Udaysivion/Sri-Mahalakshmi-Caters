/**
 * Feature: Bookings Module
 * Service: Table Dining & Catering Event Inquiries API
 * Direct Neon PostgreSQL Database integration via Express REST API.
 */

const SESSION_DINING_KEY = 'smk_dining_bookings';
const SESSION_CATERING_KEY = 'smk_catering_bookings';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api';

/**
 * Submit Table Dining Reservation directly to PostgreSQL DB
 */
export const submitDiningReservation = async (reservationData) => {
  const payload = {
    bookingId: reservationData.bookingId || `DIN-${Date.now().toString().slice(-6)}`,
    customerName: reservationData.name || reservationData.customerName || 'Guest',
    phone: reservationData.phone || '',
    date: reservationData.date || new Date().toISOString().slice(0, 10),
    time: reservationData.time || '12:30 PM',
    guests: reservationData.guests || '2 People',
    status: reservationData.status || 'Pending',
    message: reservationData.message || '',
    timestamp: new Date().toISOString()
  };

  // 1. Cache in session storage for instant UI response and cross-tab event
  try {
    const existing = JSON.parse(sessionStorage.getItem(SESSION_DINING_KEY) || '[]');
    existing.unshift(payload);
    sessionStorage.setItem(SESSION_DINING_KEY, JSON.stringify(existing.slice(0, 50)));
    window.dispatchEvent(new Event('smk_booking_created'));
  } catch (err) {
    console.warn('Could not cache dining booking in session:', err);
  }

  // 2. Save directly to PostgreSQL Database
  try {
    const pgRes = await fetch(`${BACKEND_URL}/dining`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (pgRes.ok) {
      const data = await pgRes.json();
      console.log('✅ Dining reservation successfully stored in PostgreSQL DB:', data);
      return { success: true, bookingId: payload.bookingId, dbSaved: true };
    }
  } catch (err) {
    console.warn('Could not connect to PostgreSQL backend:', err.message);
  }

  return { success: true, bookingId: payload.bookingId, dbSaved: false };
};

/**
 * Submit Catering & Bulk Event Inquiry directly to PostgreSQL DB
 */
export const submitCateringInquiry = async (cateringData) => {
  const payload = {
    inquiryId: cateringData.inquiryId || `CAT-${Date.now().toString().slice(-6)}`,
    customerName: cateringData.name || cateringData.customerName || 'Guest',
    phone: cateringData.phone || '',
    eventType: cateringData.eventType || 'Wedding/Event',
    guests: cateringData.guests || '',
    date: cateringData.date || '',
    message: cateringData.message || '',
    status: cateringData.status || 'New',
    timestamp: new Date().toISOString()
  };

  // 1. Cache in session storage for instant UI response
  try {
    const existing = JSON.parse(sessionStorage.getItem(SESSION_CATERING_KEY) || '[]');
    existing.unshift(payload);
    sessionStorage.setItem(SESSION_CATERING_KEY, JSON.stringify(existing.slice(0, 50)));
    window.dispatchEvent(new Event('smk_booking_created'));
  } catch (err) {
    console.warn('Could not cache catering booking in session:', err);
  }

  // 2. Save directly to PostgreSQL Database
  try {
    const pgRes = await fetch(`${BACKEND_URL}/catering`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (pgRes.ok) {
      const data = await pgRes.json();
      console.log('✅ Catering inquiry successfully stored in PostgreSQL DB:', data);
      return { success: true, inquiryId: payload.inquiryId, dbSaved: true };
    }
  } catch (err) {
    console.warn('Could not connect to PostgreSQL backend:', err.message);
  }

  return { success: true, inquiryId: payload.inquiryId, dbSaved: false };
};

/**
 * Fetch all Table Dining Reservations directly from PostgreSQL DB
 */
export const fetchAllDiningReservations = async () => {
  let pgList = [];

  // Fetch from PostgreSQL Backend API
  try {
    const res = await fetch(`${BACKEND_URL}/dining`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.reservations)) {
        pgList = data.reservations;
      }
    }
  } catch (err) {
    console.debug('PostgreSQL dining fetch notice:', err.message);
  }

  // Retrieve session cache for offline redundancy
  let localList = [];
  try {
    const raw = sessionStorage.getItem(SESSION_DINING_KEY);
    if (raw) localList = JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading session dining storage:', err);
  }

  // Deduplicate and merge: PostgreSQL primary
  const map = new Map();
  localList.forEach(item => map.set(item.bookingId, item));
  pgList.forEach(item => map.set(item.bookingId, item));

  const merged = Array.from(map.values());
  merged.sort((a, b) => new Date(b.timestamp || b.created_at || 0).getTime() - new Date(a.timestamp || a.created_at || 0).getTime());
  return merged;
};

/**
 * Fetch all Catering Event Inquiries directly from PostgreSQL DB
 */
export const fetchAllCateringInquiries = async () => {
  let pgList = [];

  // Fetch from PostgreSQL Backend API
  try {
    const res = await fetch(`${BACKEND_URL}/catering`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.inquiries)) {
        pgList = data.inquiries;
      }
    }
  } catch (err) {
    console.debug('PostgreSQL catering fetch notice:', err.message);
  }

  // Retrieve session cache for offline redundancy
  let localList = [];
  try {
    const raw = sessionStorage.getItem(SESSION_CATERING_KEY);
    if (raw) localList = JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading session catering storage:', err);
  }

  // Deduplicate and merge: PostgreSQL primary
  const map = new Map();
  localList.forEach(item => map.set(item.inquiryId, item));
  pgList.forEach(item => map.set(item.inquiryId, item));

  const merged = Array.from(map.values());
  merged.sort((a, b) => new Date(b.timestamp || b.created_at || 0).getTime() - new Date(a.timestamp || a.created_at || 0).getTime());
  return merged;
};

/**
 * Update dining status directly in PostgreSQL DB
 */
export const updateLocalDiningStatus = async (bookingId, newStatus) => {
  // Update session storage
  try {
    const raw = sessionStorage.getItem(SESSION_DINING_KEY);
    if (raw) {
      let list = JSON.parse(raw);
      list = list.map(item => item.bookingId === bookingId ? { ...item, status: newStatus } : item);
      sessionStorage.setItem(SESSION_DINING_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (err) {
    console.error('Error updating dining status in sessionStorage:', err);
  }

  // Update in PostgreSQL DB
  try {
    await fetch(`${BACKEND_URL}/dining/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) {
    console.warn('Could not update status on PostgreSQL server:', err.message);
  }

  return true;
};

/**
 * Update catering status directly in PostgreSQL DB
 */
export const updateLocalCateringStatus = async (inquiryId, newStatus) => {
  // Update session storage
  try {
    const raw = sessionStorage.getItem(SESSION_CATERING_KEY);
    if (raw) {
      let list = JSON.parse(raw);
      list = list.map(item => item.inquiryId === inquiryId ? { ...item, status: newStatus } : item);
      sessionStorage.setItem(SESSION_CATERING_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (err) {
    console.error('Error updating catering status in sessionStorage:', err);
  }

  // Update in PostgreSQL DB
  try {
    await fetch(`${BACKEND_URL}/catering/${inquiryId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) {
    console.warn('Could not update catering status on PostgreSQL server:', err.message);
  }

  return true;
};
