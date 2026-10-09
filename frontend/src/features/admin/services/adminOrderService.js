/**
 * Sri Mahalakshmi Caters - Admin Order Service
 * Direct PostgreSQL Database integration via Express REST API.
 */

import toast from 'react-hot-toast';

const SESSION_STORAGE_KEY = 'smk_orders_history';
let BACKEND_URL = (import.meta.env.VITE_BACKEND_API_URL || 'https://sri-mahalakshmi-caters.onrender.com/api').replace(/\/+$/, '');
if (!BACKEND_URL.endsWith('/api')) { BACKEND_URL += '/api'; }

/**
 * Fetch all orders directly from PostgreSQL Database
 */
export const fetchAllOrders = async () => {
  let pgOrders = [];

  // 1. Fetch from PostgreSQL Express API
  try {
    const res = await fetch(`${BACKEND_URL}/orders`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.orders)) {
        pgOrders = data.orders;
      }
    }
  } catch (err) {
    console.debug('PostgreSQL orders fetch notice:', err.message);
  }

  // 2. Retrieve session cached orders for fallback
  let localOrders = [];
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      localOrders = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading session orders:', err);
  }

  // Merge and deduplicate by orderId with PostgreSQL primary
  const orderMap = new Map();

  localOrders.forEach(order => {
    const id = String(order.orderId || order.timestamp);
    orderMap.set(id, { ...order, source: 'session' });
  });

  pgOrders.forEach(order => {
    const id = String(order.orderId || order.timestamp);
    orderMap.set(id, { ...order, source: 'postgres' });
  });

  // Convert to array and sort newest first
  const merged = Array.from(orderMap.values());
  merged.sort((a, b) => {
    const timeA = new Date(a.timestamp || a.created_at || 0).getTime() || 0;
    const timeB = new Date(b.timestamp || b.created_at || 0).getTime() || 0;
    return timeB - timeA;
  });

  return merged;
};

/**
 * Update an order's status directly in PostgreSQL Database
 */
export const updateLocalOrderStatus = async (orderId, newStatus) => {
  // Update session storage
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      let orders = JSON.parse(raw);
      orders = orders.map(ord => {
        if (ord.orderId === orderId) {
          return { ...ord, paymentStatus: newStatus };
        }
        return ord;
      });
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(orders));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (err) {
    console.error('Failed to update status in sessionStorage:', err);
  }

  // Update in PostgreSQL
  try {
    await fetch(`${BACKEND_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus: newStatus })
    });
  } catch (err) {
    console.warn('Could not update order status on PostgreSQL server:', err.message);
  }

  return true;
};

/**
 * Helper to export orders to CSV for accountant/owner
 */
export const exportOrdersToCSV = (orders, customFilename) => {
  if (!orders || !orders.length) {
    toast.error('No orders available to export.');
    return;
  }

  try {
    const headers = ['Order ID', 'Channel', 'Timestamp', 'Customer Name', 'Phone', 'Address / Table', 'Items', 'Total (INR)', 'Payment Method', 'Status', 'Payment ID', 'Notes'];
    
    const rows = orders.map(o => {
      const id = String(o.orderId || '');
      const method = String(o.paymentMethod || '').toLowerCase();
      const phone = String(o.phone || '').toLowerCase();
      const addr = String(o.address || '').toLowerCase();
      const isTable = id.startsWith('TBL-') || id.includes('TBL') || method.includes('table') || phone.startsWith('table') || addr.startsWith('table') || /\btable\s*#?\s*\d+/i.test(addr);
      const channel = isTable ? 'Dine-In Table QR' : 'Counter & Delivery';

      return [
        `"${String(o.orderId || '').replace(/"/g, '""')}"`,
        `"${channel}"`,
        `"${String(o.timestamp || '').replace(/"/g, '""')}"`,
        `"${String(o.customerName || '').replace(/"/g, '""')}"`,
        `"${String(o.phone || '').replace(/"/g, '""')}"`,
        `"${String(o.address || '').replace(/"/g, '""')}"`,
        `"${String(o.items || '').replace(/"/g, '""')}"`,
        Number(o.totalAmount) || 0,
        `"${String(o.paymentMethod || '').replace(/"/g, '""')}"`,
        `"${String(o.paymentStatus || '').replace(/"/g, '""')}"`,
        `"${String(o.paymentId || '').replace(/"/g, '""')}"`,
        `"${String(o.notes || '').replace(/"/g, '""')}"`
      ];
    });

    // \uFEFF is UTF-8 Byte Order Mark so Excel and Google Sheets open Indian Rupee & symbols correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const finalFilename = customFilename || `Sri_Mahalakshmi_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', finalFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${orders.length} orders successfully!`);
  } catch (err) {
    console.error('CSV Export Error:', err);
    toast.error('Failed to export CSV. Please try again.');
  }
};

/**
 * Helper to export dining table reservations to CSV
 */
export const exportDiningToCSV = (reservations, customFilename) => {
  if (!reservations || !reservations.length) {
    toast.error('No dining reservations available to export.');
    return;
  }

  try {
    const headers = ['Booking ID', 'Booking Date', 'Time Slot', 'Customer Name', 'Phone', 'Guests Count', 'Status', 'Special Requests', 'Created At'];
    const rows = reservations.map(r => [
      `"${String(r.bookingId || '').replace(/"/g, '""')}"`,
      `"${String(r.date || r.bookingDate || '').replace(/"/g, '""')}"`,
      `"${String(r.time || r.timeSlot || '').replace(/"/g, '""')}"`,
      `"${String(r.name || r.customerName || '').replace(/"/g, '""')}"`,
      `"${String(r.phone || '').replace(/"/g, '""')}"`,
      Number(r.guests || r.guestsCount) || 1,
      `"${String(r.status || 'Pending').replace(/"/g, '""')}"`,
      `"${String(r.specialRequests || r.notes || '').replace(/"/g, '""')}"`,
      `"${String(r.timestamp || r.created_at || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const finalFilename = customFilename || `Sri_Mahalakshmi_Dining_Reservations_${new Date().toISOString().slice(0, 10)}.csv`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', finalFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${reservations.length} dining reservations successfully!`);
  } catch (err) {
    console.error('Dining CSV Export Error:', err);
    toast.error('Failed to export reservations CSV.');
  }
};

/**
 * Helper to export catering inquiries to CSV
 */
export const exportCateringToCSV = (inquiries, customFilename) => {
  if (!inquiries || !inquiries.length) {
    toast.error('No catering inquiries available to export.');
    return;
  }

  try {
    const headers = ['Inquiry ID', 'Event Date', 'Customer Name', 'Phone', 'Event Type', 'Guests Count', 'Venue / Location', 'Status', 'Special Requirements', 'Created At'];
    const rows = inquiries.map(c => [
      `"${String(c.inquiryId || '').replace(/"/g, '""')}"`,
      `"${String(c.eventDate || c.date || '').replace(/"/g, '""')}"`,
      `"${String(c.name || c.customerName || '').replace(/"/g, '""')}"`,
      `"${String(c.phone || '').replace(/"/g, '""')}"`,
      `"${String(c.eventType || 'Event').replace(/"/g, '""')}"`,
      Number(c.guests || c.guestCount) || 0,
      `"${String(c.location || c.venue || '').replace(/"/g, '""')}"`,
      `"${String(c.status || 'New').replace(/"/g, '""')}"`,
      `"${String(c.notes || c.details || '').replace(/"/g, '""')}"`,
      `"${String(c.timestamp || c.created_at || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const finalFilename = customFilename || `Sri_Mahalakshmi_Catering_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', finalFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${inquiries.length} catering inquiries successfully!`);
  } catch (err) {
    console.error('Catering CSV Export Error:', err);
    toast.error('Failed to export catering CSV.');
  }
};
