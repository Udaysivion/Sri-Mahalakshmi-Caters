/**
 * Format a number into Indian Rupee currency format (e.g., ₹1,200)
 */
export const formatINR = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `₹${num.toLocaleString('en-IN')}`;
};

/**
 * Format date string into readable format (e.g., 05 Oct 2026)
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
