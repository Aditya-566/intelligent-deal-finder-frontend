import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Save, Bookmark, Bell, User, LogOut } from 'lucide-react';

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
      background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 24px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#0f172a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff',
        }}>
          <Search size={18} strokeWidth={3} />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
          Deal<span style={{ color: '#64748b' }}>Finder</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {isAuthenticated ? (
          <>
            <Link to="/saved-searches" style={navLinkStyle}>
              <Save size={16} /> Saved
            </Link>
            <Link to="/bookmarks" style={navLinkStyle}>
              <Bookmark size={16} /> Bookmarks
            </Link>
            <Link to="/price-alerts" style={navLinkStyle}>
              <Bell size={16} /> Alerts
            </Link>
            
            <div style={{ width: 1, height: 24, background: '#e2e8f0', margin: '0 12px' }} />
            
            <span style={{ color: '#475569', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, marginRight: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={16} color="#64748b" />
              </div>
              {user?.name?.split(' ')[0]}
            </span>
            
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem', color: '#64748b', borderColor: 'transparent', background: 'transparent' }} title="Logout">
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary" style={{ padding: '8px 18px', textDecoration: 'none', fontSize: '0.9rem', borderColor: 'transparent', background: 'transparent' }}>
              Sign In
            </Link>
            <Link to="/register" className="btn-primary" style={{ padding: '8px 18px', textDecoration: 'none', fontSize: '0.9rem' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
      
      <style>{`
        a[href="/saved-searches"]:hover, a[href="/bookmarks"]:hover, a[href="/price-alerts"]:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
      `}</style>
    </nav>
  );
}

const navLinkStyle = {
  display: 'flex', alignItems: 'center', gap: 6,
  color: '#64748b', textDecoration: 'none', padding: '8px 12px',
  borderRadius: 8, fontSize: '0.9rem', fontWeight: 500,
  transition: 'all 0.2s', cursor: 'pointer',
};
