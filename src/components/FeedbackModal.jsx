import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MessageSquare, Star, X, CheckCircle2, Send } from 'lucide-react';

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
        position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="fade-in-up"
        style={{
          background: '#ffffff', border: '1px solid #e2e8f0',
          borderRadius: 16, padding: 32, width: '100%', maxWidth: 480,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#0f172a', fontFamily: 'Outfit, sans-serif', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>Thank you!</h3>
            <p style={{ color: '#64748b' }}>Your feedback means a lot to us.</p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: 24, width: '100%' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ color: '#0f172a', fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <MessageSquare size={20} color="#0f172a" /> Share feedback
              </h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', padding: 4, borderRadius: '50%' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              ><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Star rating */}
              <div>
                <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 12 }}>
                  How would you rate your experience?
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {STARS.map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: star <= form.rating ? '#f59e0b' : '#cbd5e1',
                        transition: 'all 0.15s', padding: 0
                      }}
                    >
                      <Star size={32} fill={star <= form.rating ? '#f59e0b' : 'none'} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                  Your message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you think, what could be better…"
                  rows={4}
                  style={{
                    width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 8, padding: 12, color: '#0f172a', fontSize: '0.9rem',
                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                    outline: 'none', transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0f172a'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Optional email */}
              <div>
                <label style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                  Email (optional — if you'd like a response)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  style={{
                    width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 8, padding: 12, color: '#0f172a', fontSize: '0.9rem',
                    fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0f172a'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', height: 48, marginTop: 8 }}
              >
                {loading ? 'Sending...' : 'Submit Feedback'} <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
