import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { data } = await registerApi(form);
      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
            <UserPlus size={28} color="#0f172a" />
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 600, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Create account
          </h1>
          <p style={{ color: '#64748b' }}>Start finding the best deals today</p>
        </div>

        <div className="glass" style={{ padding: 40, background: '#ffffff', borderRadius: 16 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Full Name</label>
              <input name="name" type="text" required value={form.name} onChange={handleChange}
                className="input-dark" placeholder="John Doe" autoComplete="name" style={{ height: 48 }} />
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                className="input-dark" placeholder="you@example.com" autoComplete="email" style={{ height: 48 }} />
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Password</label>
              <input name="password" type="password" required minLength={6} value={form.password} onChange={handleChange}
                className="input-dark" placeholder="Min. 6 characters" autoComplete="new-password" style={{ height: 48 }} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', height: 48, marginTop: 8 }}>
              {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#64748b', marginTop: 24, fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
