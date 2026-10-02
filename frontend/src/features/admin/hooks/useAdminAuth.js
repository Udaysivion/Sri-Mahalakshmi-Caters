import { useState, useCallback } from 'react';

const SESSION_KEY = 'smk_admin_session';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
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

  return {
    isAuthenticated,
    authError,
    setAuthError,
    login,
    logout
  };
};
