import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { login as loginApi } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Lock, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'oauth_failed') {
      toast.error('Google sign-in failed. Please try again.');
    }
  }, [searchParams]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginApi(form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 56, height: 56, background: '#ffffff', borderRadius: 16, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 20px', border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}>
            <Lock size={28} color="#0f172a" />
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 600, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ color: '#64748b' }}>Sign in to access your saved deals</p>
        </div>

        <div className="glass" style={{ padding: 40, background: '#ffffff', borderRadius: 16 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                className="input-dark" placeholder="you@example.com" autoComplete="email" style={{ height: 48 }} />
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Password</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange}
                className="input-dark" placeholder="••••••••" autoComplete="current-password" style={{ height: 48 }} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', height: 48, marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} />
            </button>
          </form>

          {/* ── Divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          {/* ── Google OAuth Button ── */}
          <a
            href={`${API_URL}/auth/google`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              width: '100%', height: 48, borderRadius: 8,
              background: '#ffffff', border: '1px solid #e2e8f0',
              color: '#0f172a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </a>

          <p style={{ textAlign: 'center', color: '#64748b', marginTop: 24, fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
