import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedbackModal from './FeedbackModal';
import { Search, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [showFeedback, setShowFeedback] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: '40px 24px',
        marginTop: 'auto',
      }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff',
              }}>
                <Search size={16} strokeWidth={3} />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#0f172a', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                Intelligent Deal Finder
              </span>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/privacy-policy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s', fontWeight: 500 }}
                onMouseEnter={e => e.target.style.color = '#0f172a'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s', fontWeight: 500 }}
                onMouseEnter={e => e.target.style.color = '#0f172a'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                Terms of Service
              </Link>
              <button
                onClick={() => setShowFeedback(true)}
                style={{
                  background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8,
                  color: '#475569', fontSize: '0.85rem', padding: '6px 14px', cursor: 'pointer',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500
                }}
                onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#0f172a'; }}
                onMouseLeave={e => { e.target.style.background = '#ffffff'; e.target.style.color = '#475569'; }}
              >
                <MessageSquare size={14} /> Feedback
              </button>
            </div>
          </div>

          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
              © {year} Intelligent Deal Finder. All rights reserved.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
              Prices and availability subject to change. Not affiliated with any retailer.
            </p>
          </div>
        </div>
      </footer>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}
