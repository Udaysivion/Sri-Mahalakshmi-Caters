import React from 'react';
import OrderReceiptPrintModal from './OrderReceiptPrintModal';

/**
 * Parses raw items string or array into structured list of dishes
 * Handles rates, amounts, multi-item quantities, and clean text wrapping
 */
export const parseOrderItems = (order) => {
  if (!order) return [];

  // 1. Structured items array (from cart or itemsRaw)
  if (order.itemsRaw && Array.isArray(order.itemsRaw) && order.itemsRaw.length > 0) {
    return order.itemsRaw.map((item, idx) => {
      const qty = Number(item.quantity) || 1;
      const unitRate = item.price !== undefined && item.price !== null ? Number(item.price) : 0;
      return {
        id: item.id || idx + 1,
        quantity: qty,
        name: item.name || 'Delicious Dish',
        rate: unitRate,
        price: unitRate,
        amount: unitRate > 0 ? unitRate * qty : 0,
        notes: item.notes || ''
      };
    });
  }

  // 2. Parsed from formatted items string
  if (typeof order.items === 'string' && order.items.trim()) {
    // E.g. "2x Masala Dosa (₹120), 1x Filter Coffee (₹40)" or newline separated
    const rawTokens = order.items.includes('\n')
      ? order.items.split('\n')
      : order.items.split(',');

    const parsed = rawTokens
      .map(str => str.trim())
      .filter(Boolean)
      .map((str, idx) => {
        // Pattern A: "2x Masala Dosa (₹120)" or "2 x Masala Dosa (120)"
        const matchWithQty = str.match(/^(\d+)\s*x\s*([^(\n]+?)(?:\s*\(\s*(?:₹|Rs\.?)?\s*([0-9.]+)\s*\))?$/i);
        if (matchWithQty) {
          const qty = parseInt(matchWithQty[1], 10) || 1;
          const name = matchWithQty[2].trim();
          const rateVal = matchWithQty[3] ? parseFloat(matchWithQty[3]) : 0;
          return {
            id: idx + 1,
            quantity: qty,
            name: name,
            rate: rateVal,
            price: rateVal,
            amount: rateVal > 0 ? rateVal * qty : 0,
            notes: ''
          };
        }

        // Pattern B: "Masala Dosa x 2 (₹120)"
        const matchSuffixQty = str.match(/^([^(\n]+?)\s*x\s*(\d+)(?:\s*\(\s*(?:₹|Rs\.?)?\s*([0-9.]+)\s*\))?$/i);
        if (matchSuffixQty) {
          const name = matchSuffixQty[1].trim();
          const qty = parseInt(matchSuffixQty[2], 10) || 1;
          const rateVal = matchSuffixQty[3] ? parseFloat(matchSuffixQty[3]) : 0;
          return {
            id: idx + 1,
            quantity: qty,
            name: name,
            rate: rateVal,
            price: rateVal,
            amount: rateVal > 0 ? rateVal * qty : 0,
            notes: ''
          };
        }

        // Pattern C: "Mysore Bonda (₹50)" or "Mysore Bonda"
        const matchWithPrice = str.match(/^([^(\n]+?)(?:\s*\(\s*(?:₹|Rs\.?)?\s*([0-9.]+)\s*\))?$/);
        if (matchWithPrice) {
          const name = matchWithPrice[1].trim();
          const rateVal = matchWithPrice[2] ? parseFloat(matchWithPrice[2]) : 0;
          return {
            id: idx + 1,
            quantity: 1,
            name: name,
            rate: rateVal,
            price: rateVal,
            amount: rateVal,
            notes: ''
          };
        }

        return {
          id: idx + 1,
          quantity: 1,
          name: str,
          rate: 0,
          price: 0,
          amount: 0,
          notes: ''
        };
      });

    // Auto-reconcile single item total if rate was missing
    if (parsed.length === 1 && parsed[0].amount === 0 && order.totalAmount) {
      const tot = Number(order.totalAmount) || 0;
      parsed[0].amount = tot;
      parsed[0].rate = Math.round(tot / (parsed[0].quantity || 1));
      parsed[0].price = parsed[0].rate;
    }

    return parsed;
  }

  return [];
};

/**
 * KitchenTicketPrint Component
 * Re-exports OrderReceiptPrintModal with default unified Customer Bill view
 */
export const KitchenTicketPrint = ({ order, initialMode = 'customer', onClose }) => {
  return (
    <OrderReceiptPrintModal
      order={order}
      initialMode={initialMode}
      onClose={onClose}
    />
  );
};

export default KitchenTicketPrint;
