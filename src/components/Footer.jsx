import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedbackModal from './FeedbackModal';

export default function Footer() {
  const [showFeedback, setShowFeedback] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer style={{
        background: '#0a0a14',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        padding: '32px 24px',
        marginTop: 'auto',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🔍</span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>
                Intelligent Deal Finder
              </span>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/privacy-policy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#94a3b8'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#94a3b8'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                Terms of Service
              </Link>
              <button
                onClick={() => setShowFeedback(true)}
                style={{
                  background: 'none', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '6px',
                  color: '#6366f1', fontSize: '0.85rem', padding: '4px 12px', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.1)'; }}
                onMouseLeave={e => { e.target.style.background = 'none'; }}
              >
                💬 Feedback
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <p style={{ color: '#334155', fontSize: '0.8rem' }}>
              © {year} Intelligent Deal Finder. Prices and availability subject to change. Not affiliated with any retailer.
            </p>
          </div>
        </div>
      </footer>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}
