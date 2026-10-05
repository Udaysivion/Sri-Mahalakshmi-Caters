import React from 'react';
import OrderReceiptPrintModal from './OrderReceiptPrintModal';

/**
 * Parses raw items string or array into structured list of dishes
 */
export const parseOrderItems = (order) => {
  if (!order) return [];

  // 1. If structured itemsRaw array exists
  if (order.itemsRaw && Array.isArray(order.itemsRaw) && order.itemsRaw.length > 0) {
    return order.itemsRaw.map(item => ({
      quantity: Number(item.quantity) || 1,
      name: item.name || 'Dish Item',
      price: Number(item.price) || 0,
      notes: item.notes || ''
    }));
  }

  // 2. If items string exists
  if (typeof order.items === 'string' && order.items.trim()) {
    const rawParts = order.items.split(',').map(s => s.trim()).filter(Boolean);
    
    return rawParts.map(part => {
      let quantity = 1;
      let name = part;
      let price = 0;

      // Extract price if formatted like (₹120) or (120)
      const priceMatch = part.match(/\((?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*\)/i);
      if (priceMatch) {
        price = parseFloat(priceMatch[1]);
      }

      // Pattern 1: "2x Masala Dosa" or "2 x Masala Dosa"
      const leadingQty = part.match(/^(\d+)\s*x\s*(.+)/i);
      // Pattern 2: "Masala Dosa x 2" or "Idly (4) x 2"
      const trailingQty = part.match(/^(.+?)\s*x\s*(\d+)$/i);

      if (leadingQty) {
        quantity = parseInt(leadingQty[1], 10);
        name = leadingQty[2].trim();
      } else if (trailingQty) {
        quantity = parseInt(trailingQty[2], 10);
        name = trailingQty[1].trim();
      }

      // Remove price string from dish name if present
      name = name.replace(/\((?:₹|rs\.?|inr)?\s*\d+(?:\.\d+)?\s*\)/gi, '').trim();

      return {
        quantity: quantity || 1,
        name: name || part,
        price: price || 0,
        notes: ''
      };
    });
  }

  return [];
};

/**
 * KitchenTicketPrint Component
 * Re-exports OrderReceiptPrintModal with dual Chef KOT and Customer Bill capabilities
 */
export const KitchenTicketPrint = ({ order, initialMode = 'both', onClose }) => {
  return (
    <OrderReceiptPrintModal
      order={order}
      initialMode={initialMode}
      onClose={onClose}
    />
  );
};

export default KitchenTicketPrint;
