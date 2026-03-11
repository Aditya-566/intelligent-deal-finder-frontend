import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px', height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
        }}>🔍</div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#f1f5f9' }}>
          Deal<span className="gradient-text">Finder</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isAuthenticated ? (
          <>
            <Link to="/saved-searches" style={navLinkStyle}>💾 Saved</Link>
            <Link to="/bookmarks" style={navLinkStyle}>🔖 Bookmarks</Link>
            <Link to="/price-alerts" style={navLinkStyle}>🔔 Alerts</Link>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>👤 {user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary" style={{ padding: '8px 18px', textDecoration: 'none', fontSize: '0.9rem' }}>
              Sign In
            </Link>
            <Link to="/register" className="btn-primary" style={{ padding: '8px 18px', textDecoration: 'none', fontSize: '0.9rem' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: '#94a3b8', textDecoration: 'none', padding: '6px 12px',
  borderRadius: '8px', fontSize: '0.88rem', fontWeight: 500,
  transition: 'all 0.2s', cursor: 'pointer',
};
