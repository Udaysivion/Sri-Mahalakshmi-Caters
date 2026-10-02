/**
 * Admin Domain Service
 * High-level analytics and secure authentication.
 * All secrets are read strictly from environment configuration.
 */

const { query } = require('../../config/database');
const env = require('../../config/env');

class AdminService {
  async getDashboardStats() {
    const [ordersRes, diningRes, cateringRes] = await Promise.all([
      query('SELECT total_amount, payment_method, payment_status, created_at FROM orders'),
      query('SELECT status FROM dining_reservations'),
      query('SELECT status FROM catering_inquiries')
    ]);

    const totalOrders = ordersRes.rows.length;
    const totalRevenue = ordersRes.rows.reduce((sum, r) => sum + Number(r.total_amount || 0), 0);
    const paidOrders = ordersRes.rows.filter(r => {
      const s = (r.payment_status || '').toLowerCase();
      return s.includes('paid') || s.includes('completed');
    }).length;
    const codOrders = ordersRes.rows.filter(r => {
      const m = (r.payment_method || '').toLowerCase();
      return m.includes('cash') || m.includes('cod');
    }).length;
    const pendingDining = diningRes.rows.filter(r => (r.status || 'Pending').toLowerCase() === 'pending').length;
    const newCatering = cateringRes.rows.filter(r => (r.status || 'New').toLowerCase() === 'new').length;

    return {
      totalOrders,
      totalRevenue,
      paidOrders,
      codOrders,
      pendingDining,
      newCatering,
      totalDining: diningRes.rows.length,
      totalCatering: cateringRes.rows.length
    };
  }

  verifyCredentials(usernameOrEmail, password) {
    if (!usernameOrEmail || !password) {
      return false;
    }

    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const isEmailMatch = cleanInput === env.admin.email.toLowerCase();
    const isUsernameMatch = cleanInput === env.admin.username.toLowerCase();

    if (!isEmailMatch && !isUsernameMatch) {
      return false;
    }

    const isPrimaryPass = password === env.admin.password;
    const isAltPass = password === env.admin.altPassword;

    return isPrimaryPass || isAltPass;
  }
}

module.exports = new AdminService();
