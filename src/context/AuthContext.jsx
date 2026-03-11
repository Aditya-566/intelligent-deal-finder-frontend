import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Decode a JWT payload (base64) without verifying signature.
 * Only for extracting user info client-side — server always verifies the real token.
 */
function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('idf_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('idf_user');
    const storedToken = localStorage.getItem('idf_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  /** Used by LoginPage / RegisterPage after email+password auth */
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('idf_user', JSON.stringify(userData));
    localStorage.setItem('idf_token', tokenData);
  };

  /** Used by OAuthRedirect after Google sign-in: decodes user from JWT */
  const loginWithToken = (tokenData) => {
    const payload = decodeJwtPayload(tokenData);
    // payload contains { id, iat, exp } — fetch full user from /api/auth/me
    const userData = payload
      ? { id: payload.id, name: payload.name || 'User', email: payload.email || '' }
      : { id: payload?.id };
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('idf_user', JSON.stringify(userData));
    localStorage.setItem('idf_token', tokenData);

    // Fetch full user details in background and refresh state
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
      headers: { Authorization: `Bearer ${tokenData}` },
    })
      .then((r) => r.json())
      .then(({ user: fullUser }) => {
        if (fullUser) {
          setUser(fullUser);
          localStorage.setItem('idf_user', JSON.stringify(fullUser));
        }
      })
      .catch(() => { /* ignore */ });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('idf_user');
    localStorage.removeItem('idf_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithToken, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
