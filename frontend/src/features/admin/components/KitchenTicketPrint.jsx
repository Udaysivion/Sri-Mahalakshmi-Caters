import React from 'react';
import OrderReceiptPrintModal from './OrderReceiptPrintModal';

/**
 * Parses raw items string or array into structured list of dishes
 */
export const parseOrderItems = (order) => {
  if (!order) return [];
  if (order.itemsRaw && Array.isArray(order.itemsRaw) && order.itemsRaw.length > 0) {
    return order.itemsRaw.map(item => ({
      quantity: item.quantity || 1,
      name: item.name || 'Dish Item',
      price: item.price || 0,
      notes: item.notes || ''
    }));
  }

  if (typeof order.items === 'string' && order.items.trim()) {
    // E.g. "2x Masala Dosa (₹120), 1x Filter Coffee (₹40)"
    return order.items.split(',').map(str => {
      const trimmed = str.trim();
      const match = trimmed.match(/^(\d+)\s*x\s*([^(\n]+)(?:\(([^)]+)\))?/i);
      if (match) {
        return {
          quantity: parseInt(match[1], 10),
          name: match[2].trim(),
          price: match[3] ? match[3].replace(/[^0-9.]/g, '') : '',
          notes: ''
        };
      }
      return {
        quantity: 1,
        name: trimmed,
        price: '',
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
