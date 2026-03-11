import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const STARS = [1, 2, 3, 4, 5];

export default function FeedbackModal({ onClose }) {
  const [form, setForm] = useState({ message: '', rating: 0, email: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return toast.error('Please enter a message');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/feedback`, form);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ color: '#f1f5f9', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>Thank you!</h3>
            <p style={{ color: '#64748b' }}>Your feedback means a lot to us.</p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: '20px' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: '#f1f5f9', fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', margin: 0 }}>
                💬 Share your feedback
              </h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Star rating */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '10px' }}>
                  How would you rate your experience?
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {STARS.map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '1.8rem', opacity: star <= form.rating ? 1 : 0.3,
                        transform: star <= form.rating ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.15s',
                      }}
                    >⭐</button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
                  Your message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you think, what could be better, or report a bug…"
                  rows={4}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '0.9rem',
                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Optional email */}
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
                  Email (optional — if you'd like a response)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '8px', padding: '12px', color: '#f1f5f9', fontSize: '0.9rem',
                    fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ alignSelf: 'flex-end', minWidth: '140px', justifyContent: 'center' }}
              >
                {loading ? '⏳ Sending...' : '🚀 Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
