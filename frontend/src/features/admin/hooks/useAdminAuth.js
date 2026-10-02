import { useState, useCallback } from 'react';

const SESSION_KEY = 'smk_admin_session';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api';

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

    // 1. Try Backend API Authentication (Domain-Driven Admin Service)
    try {
      const res = await fetch(`${BACKEND_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUser, password: inputPass })
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem('smk_admin_user', JSON.stringify({ user: inputUser, ...data.user, loginTime: Date.now() }));
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      console.debug('Backend auth unreachable, checking env fallback:', err.message);
    }

    // 2. Strict Environment Variable Validation Fallback
    const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();
    const expectedPassword = (import.meta.env.VITE_ADMIN_PASSWORD || '').trim();

    const isMatch = Boolean(
      expectedPassword &&
      (expectedEmail ? inputUser.toLowerCase() === expectedEmail || inputUser.toLowerCase() === 'admin' : inputUser.toLowerCase() === 'admin') &&
      inputPass === expectedPassword
    );

    if (isMatch) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem('smk_admin_user', JSON.stringify({ email: inputUser, loginTime: Date.now() }));
      } catch (err) {
        console.warn('Session storage warning:', err);
      }
      setIsAuthenticated(true);
      return true;
    } else {
      setAuthError('Invalid administrator credentials.');
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
