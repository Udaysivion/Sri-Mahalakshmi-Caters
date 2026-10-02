/**
 * Sri Mahalakshmi Caters - Admin Order Service
 * Direct PostgreSQL Database integration via Express REST API.
 */

const SESSION_STORAGE_KEY = 'smk_orders_history';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api';

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
export const exportOrdersToCSV = (orders) => {
  if (!orders || !orders.length) return;
  const headers = ['Order ID', 'Timestamp', 'Customer Name', 'Phone', 'Address', 'Items', 'Total (INR)', 'Payment Method', 'Status', 'Payment ID', 'Notes'];
  
  const rows = orders.map(o => [
    `"${o.orderId || ''}"`,
    `"${o.timestamp || ''}"`,
    `"${(o.customerName || '').replace(/"/g, '""')}"`,
    `"${o.phone || ''}"`,
    `"${(o.address || '').replace(/"/g, '""')}"`,
    `"${(o.items || '').replace(/"/g, '""')}"`,
    o.totalAmount || 0,
    `"${o.paymentMethod || ''}"`,
    `"${o.paymentStatus || ''}"`,
    `"${o.paymentId || ''}"`,
    `"${(o.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Sri_Mahalakshmi_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
