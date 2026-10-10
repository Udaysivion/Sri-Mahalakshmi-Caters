const crypto = require('crypto');
const { query } = require('../../config/database');
const env = require('../../config/env');

class AdminService {
  constructor() {
    this.activeAdminPassword = env.admin.password || 'Mahalakshmi@2026';
    this.activeAdminEmail = (env.admin.email || 'admin@srimahalakshmi.com').toLowerCase().trim();
    this.activeAdminUsername = (env.admin.username || 'admin').toLowerCase().trim();
    this.resets = new Map();

    // Async load persisted credentials if database table has previously updated password
    this.loadPersistedCredentials().catch((err) => {
      console.warn('⚠️ Could not sync admin credentials from DB on start:', err.message);
    });
  }

  async loadPersistedCredentials() {
    try {
      const res = await query(
        'SELECT password, email FROM admin_credentials WHERE username = $1 LIMIT 1',
        [this.activeAdminUsername]
      );
      if (res && res.rows && res.rows.length > 0) {
        this.activeAdminPassword = res.rows[0].password;
        if (res.rows[0].email) {
          this.activeAdminEmail = res.rows[0].email.toLowerCase().trim();
        }
        console.log('✅ Admin credentials synchronized from PostgreSQL.');
      }
    } catch {
      // Database might be initializing or offline, in-memory defaults remain active
    }
  }

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
    const isEmailMatch = cleanInput === this.activeAdminEmail || cleanInput === (env.admin.email || '').toLowerCase().trim();
    const isUsernameMatch = cleanInput === this.activeAdminUsername || cleanInput === (env.admin.username || '').toLowerCase().trim();

    if (!isEmailMatch && !isUsernameMatch) {
      return false;
    }

    const isCurrentPass = password === this.activeAdminPassword;
    const isPrimaryEnvPass = password === env.admin.password;
    const isAltPass = password === env.admin.altPassword;

    return isCurrentPass || isPrimaryEnvPass || isAltPass;
  }

  async requestPasswordReset(email) {
    if (!email || typeof email !== 'string') {
      return { success: false, message: 'A valid admin email address is required.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const isAuthorized =
      cleanEmail === this.activeAdminEmail ||
      cleanEmail === (env.admin.email || '').toLowerCase().trim();

    if (!isAuthorized) {
      return {
        success: false,
        message: 'No administrative account is registered under this email address.'
      };
    }

    // Generate 6-digit verification code & unique secure token
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = crypto.randomBytes(24).toString('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Store in-memory map
    this.resets.set(resetToken, {
      email: cleanEmail,
      otpCode,
      expiresAt,
      used: false
    });

    // Clean up older in-memory tokens for the same email
    for (const [key, val] of this.resets.entries()) {
      if (key !== resetToken && (val.email === cleanEmail || Date.now() > val.expiresAt)) {
        this.resets.delete(key);
      }
    }

    // Persist to PostgreSQL if reachable
    try {
      await query(
        `INSERT INTO admin_password_resets (email, otp_code, reset_token, expires_at, is_used)
         VALUES ($1, $2, $3, $4, FALSE)`,
        [cleanEmail, otpCode, resetToken, new Date(expiresAt)]
      );
    } catch (err) {
      console.warn('⚠️ Could not save reset token to DB (fallback to memory):', err.message);
    }

    return {
      success: true,
      message: `Recovery code generated for ${cleanEmail}.`,
      resetToken,
      previewOtp: otpCode,
      expiresInMinutes: 15
    };
  }

  async resetPassword({ email, otpCode, resetToken, newPassword }) {
    if (!email || !otpCode || !resetToken || !newPassword) {
      return { success: false, message: 'All fields (email, OTP, token, new password) are required.' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otpCode.trim();

    // Check memory store
    const session = this.resets.get(resetToken);

    if (session) {
      if (session.used) {
        return { success: false, message: 'This verification code has already been used.' };
      }
      if (Date.now() > session.expiresAt) {
        return { success: false, message: 'This verification code has expired. Please request a new one.' };
      }
      if (session.otpCode !== cleanOtp) {
        return { success: false, message: 'Invalid 6-digit verification code.' };
      }
      if (session.email !== cleanEmail) {
        return { success: false, message: 'Email address does not match this reset request.' };
      }

      session.used = true;
    } else {
      // Fallback check against DB
      try {
        const dbRes = await query(
          `SELECT id, otp_code, expires_at, is_used 
           FROM admin_password_resets 
           WHERE reset_token = $1 AND email = $2 
           ORDER BY created_at DESC LIMIT 1`,
          [resetToken, cleanEmail]
        );

        if (!dbRes || dbRes.rows.length === 0) {
          return { success: false, message: 'Invalid or expired password reset session.' };
        }

        const row = dbRes.rows[0];
        if (row.is_used) {
          return { success: false, message: 'This verification code has already been used.' };
        }
        if (new Date(row.expires_at).getTime() < Date.now()) {
          return { success: false, message: 'This verification code has expired.' };
        }
        if (row.otp_code !== cleanOtp) {
          return { success: false, message: 'Invalid 6-digit verification code.' };
        }

        await query('UPDATE admin_password_resets SET is_used = TRUE WHERE id = $1', [row.id]);
      } catch (err) {
        console.error('Database reset verification error:', err.message);
        return { success: false, message: 'Verification failed. Please request a new code.' };
      }
    }

    // Update active in-memory password
    this.activeAdminPassword = newPassword;

    // Persist updated password to PostgreSQL admin_credentials
    try {
      await query(
        `INSERT INTO admin_credentials (username, email, password, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (username) DO UPDATE 
         SET password = EXCLUDED.password, email = EXCLUDED.email, updated_at = NOW()`,
        [this.activeAdminUsername, cleanEmail, newPassword]
      );
      console.log('✅ Updated admin password persisted to PostgreSQL.');
    } catch (err) {
      console.warn('⚠️ Could not persist updated admin password to DB (in-memory updated):', err.message);
    }

    return {
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.'
    };
  }
}

module.exports = new AdminService();
