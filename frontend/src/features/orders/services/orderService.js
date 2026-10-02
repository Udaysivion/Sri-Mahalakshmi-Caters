/**
 * Feature: Orders
 * Service: Order API communication
 * Communicates with the Backend Orders Domain on PostgreSQL
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api';

export const submitOrderToDatabase = async (orderData) => {
  const formattedItems = Array.isArray(orderData.items)
    ? orderData.items.map(item => `${item.quantity}x ${item.name} (₹${item.price})`).join(', ')
    : String(orderData.items || '');

  const payload = {
    orderId: orderData.orderId || `SMK-${Date.now().toString().slice(-6)}`,
    customerName: orderData.customerName || orderData.name || 'Valued Customer',
    phone: orderData.phone || '',
    address: orderData.address || '',
    items: formattedItems,
    totalAmount: Number(orderData.totalAmount || orderData.total || 0),
    paymentMethod: orderData.paymentMethod || 'Online',
    paymentStatus: orderData.paymentStatus || 'Completed',
    paymentId: orderData.paymentId || 'N/A'
  };

  // 1. Cache locally for instant UI response and cross-tab sync
  try {
    const existing = JSON.parse(localStorage.getItem('smk_orders_history') || '[]');
    existing.unshift({
      ...payload,
      itemsRaw: orderData.items || [],
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('smk_orders_history', JSON.stringify(existing.slice(0, 50)));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.warn('Could not cache order in localStorage:', err);
  }

  // 2. Primary: Store directly into PostgreSQL Database via Backend API
  try {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Order saved directly to PostgreSQL Database (Neon):', data);
      return { success: true, orderId: payload.orderId, dbSaved: true };
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.error('Database order insert returned error:', errorData);
      return { success: true, orderId: payload.orderId, dbSaved: false, error: errorData.message };
    }
  } catch (err) {
    console.error('Failed to connect to backend PostgreSQL API:', err);
    return { success: true, orderId: payload.orderId, dbSaved: false, error: err.message };
  }
};
