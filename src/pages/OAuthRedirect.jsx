import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * OAuthRedirect — Landing page after Google OAuth callback.
 * URL: /oauth-redirect?token=JWT_HERE
 *
 * Reads the token from the URL query parameter, stores it via AuthContext,
 * then redirects to the home page.
 */
export default function OAuthRedirect() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    if (token) {
      loginWithToken(token);
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, loginWithToken]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #0f0f1a)',
      color: '#f1f5f9',
      gap: '16px',
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '4px solid rgba(99,102,241,0.3)',
        borderTop: '4px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Signing you in with Google…</p>
    </div>
  );
}
