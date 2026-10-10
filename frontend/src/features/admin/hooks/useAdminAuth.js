import { useState, useCallback } from 'react';

const SESSION_KEY = 'smk_admin_session';
let BACKEND_URL = (import.meta.env.VITE_BACKEND_API_URL || 'https://sri-mahalakshmi-caters.onrender.com/api').replace(/\/+$/, '');
if (!BACKEND_URL.endsWith('/api')) { BACKEND_URL += '/api'; }
export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [authError, setAuthError] = useState(null);

  const login = useCallback(async (emailOrUsername, password) => {
    setAuthError(null);

    const inputUser = (emailOrUsername || '').trim();
    const inputPass = (password || '').trim();

    if (!inputUser || !inputPass) {
      setAuthError('Please enter both username/email and password.');
      return false;
    }

    // Strictly authenticate via Backend API (reads credentials from backend .env)
    try {
      const res = await fetch(`${BACKEND_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUser, password: inputPass })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(
          'smk_admin_user',
          JSON.stringify({
            username: inputUser,
            role: data.user?.role || 'SUPER_ADMIN',
            loginTime: Date.now()
          })
        );
        setIsAuthenticated(true);
        return true;
      } else {
        setAuthError(data.message || 'Invalid administrator credentials.');
        return false;
      }
    } catch (err) {
      console.error('Backend authentication error:', err);
      setAuthError('Authentication server unreachable. Please make sure the backend server is running.');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem('smk_admin_user');
    } catch (err) {
      console.warn('Session clear warning:', err);
    }
    setIsAuthenticated(false);
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    setAuthError(null);
    const cleanEmail = (email || '').trim();

    if (!cleanEmail) {
      setAuthError('Please enter your administrator email address.');
      return { success: false, message: 'Email address is required.' };
    }

    try {
      const res = await fetch(`${BACKEND_URL}/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message,
          resetToken: data.resetToken,
          previewOtp: data.previewOtp
        };
      } else {
        const errorMsg = data.message || 'Unable to request password reset. Please try again.';
        setAuthError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (err) {
      console.error('Password reset request error:', err);
      const errorMsg = 'Server unreachable. Please check backend connection.';
      setAuthError(errorMsg);
      return { success: false, message: errorMsg };
    }
  }, []);

  const resetPassword = useCallback(async ({ email, otpCode, resetToken, newPassword }) => {
    setAuthError(null);

    if (!email || !otpCode || !resetToken || !newPassword) {
      setAuthError('Please fill in all recovery details.');
      return { success: false, message: 'All fields are required.' };
    }

    if (newPassword.length < 6) {
      setAuthError('New password must contain at least 6 characters.');
      return { success: false, message: 'Password too short.' };
    }

    try {
      const res = await fetch(`${BACKEND_URL}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          otpCode: otpCode.trim(),
          resetToken,
          newPassword
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message || 'Password reset successfully!'
        };
      } else {
        const errorMsg = data.message || 'Verification failed. Please check the code.';
        setAuthError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (err) {
      console.error('Password reset confirmation error:', err);
      const errorMsg = 'Server unreachable. Please check backend connection.';
      setAuthError(errorMsg);
      return { success: false, message: errorMsg };
    }
  }, []);

  return {
    isAuthenticated,
    authError,
    setAuthError,
    login,
    logout,
    requestPasswordReset,
    resetPassword
  };
};
