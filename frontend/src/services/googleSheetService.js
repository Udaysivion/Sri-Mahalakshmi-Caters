/**
 * Service to record restaurant orders into Google Sheets.
 * Uses a Google Apps Script Web App attached to the spreadsheet.
 */

export const submitOrderToGoogleSheet = async (orderData) => {
  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_ORDERS_URL;

  // Prepare normalized order payload
  const formattedItems = Array.isArray(orderData.items)
    ? orderData.items.map(item => `${item.quantity}x ${item.name} (₹${item.price})`).join(', ')
    : String(orderData.items || '');

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
    orderId: orderData.orderId || `SMK-${Date.now().toString().slice(-5)}`,
    customerName: orderData.customerName || orderData.name || 'Guest',
    phone: orderData.phone || '',
    address: orderData.address || '',
    items: formattedItems,
    itemsRaw: orderData.items || [],
    totalAmount: orderData.totalAmount || orderData.total || 0,
    paymentMethod: orderData.paymentMethod || 'Online',
    paymentStatus: orderData.paymentStatus || 'Completed',
    paymentId: orderData.paymentId || 'N/A',
    notes: orderData.notes || ''
  };

  // 1. Always store locally in order history as backup
  try {
    const existing = JSON.parse(localStorage.getItem('smk_orders_history') || '[]');
    existing.unshift(payload);
    localStorage.setItem('smk_orders_history', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not cache order in localStorage:', err);
  }

  // 2. If Google Apps Script Webhook URL is set, send data to Google Sheets
  if (SCRIPT_URL && SCRIPT_URL.includes('docs.google.com/spreadsheets')) {
    console.error('VITE_GOOGLE_SHEET_ORDERS_URL is pointing to the Google Sheet web view, not an Apps Script Web App URL.');
    return { 
      success: true, 
      orderId: payload.orderId, 
      sheetSaved: false, 
      error: 'Invalid Webhook URL: You provided the Google Sheet view link instead of the Google Apps Script Web App URL.' 
    };
  }

  if (SCRIPT_URL && SCRIPT_URL.startsWith('http')) {
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // standard for Google Apps Script Web Apps to prevent cross-origin block
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return { success: true, orderId: payload.orderId, sheetSaved: true };
    } catch (err) {
      console.error('Failed to send order to Google Sheets:', err);
      // Still succeed locally so customer order experience is not broken
      return { success: true, orderId: payload.orderId, sheetSaved: false, error: err.message };
    }
  } else {
    console.warn('VITE_GOOGLE_SHEET_ORDERS_URL is not configured yet in .env.');
    return { success: true, orderId: payload.orderId, sheetSaved: false, note: 'Script URL not configured' };
  }
};
