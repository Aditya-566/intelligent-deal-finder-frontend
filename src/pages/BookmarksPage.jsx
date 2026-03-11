import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, deleteBookmark } from '../services/user.service';
import toast from 'react-hot-toast';
import { Bookmark, Trash2, ShoppingBag, ExternalLink } from 'lucide-react';

const SOURCE_COLORS = {
  Amazon:   { bg: '#fff7ed',  color: '#ea580c', border: '#ffedd5' },
  Flipkart: { bg: '#eff6ff', color: '#2563eb', border: '#dbeafe' },
  Myntra:   { bg: '#fdf2f8', color: '#db2777', border: '#fce7f3' },
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchBookmarks(); }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await getBookmarks();
      setBookmarks(data);
    } catch {
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteBookmark(id);
      setBookmarks(b => b.filter(x => x._id !== id));
      toast.success('Bookmark removed');
    } catch {
      toast.error('Failed to remove');
    }
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.02em' }}>
          <Bookmark size={24} color="#0f172a" /> Bookmarks
        </h1>
        <p style={{ color: '#64748b' }}>{bookmarks.length} saved product{bookmarks.length !== 1 ? 's' : ''}</p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 260, borderRadius: 12 }} />)}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="glass" style={{ padding: 60, textAlign: 'center', background: '#ffffff', borderRadius: 16 }}>
          <Bookmark size={48} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#0f172a', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>No bookmarks yet</h3>
          <p style={{ color: '#64748b', marginBottom: 24 }}>Click the bookmark icon on any deal to save it here.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Find Deals</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {bookmarks.map(b => {
            const discount = b.originalPrice && b.originalPrice > b.price
              ? Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100) : 0;
            const source = SOURCE_COLORS[b.source] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };

            return (
              <div key={b._id} className="glass card-lift" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, background: '#ffffff', borderRadius: 12 }}>
                {/* Image */}
                <div style={{ width: '100%', height: 140, borderRadius: 8, overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', padding: 8 }}>
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt={b.productName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  ) : null}
                  <div style={{ display: b.imageUrl ? 'none' : 'flex', color: '#cbd5e1' }}>
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#0f172a', fontSize: '0.9rem', marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontWeight: 500, lineHeight: 1.4 }}>
                    {b.productName}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>₹{b.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    {discount > 0 && (
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, background: '#ecfdf5', padding: '2px 6px', borderRadius: 4 }}>-{discount}%</span>
                    )}
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 8px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 600,
                    background: source.bg, color: source.color, border: `1px solid ${source.border}`,
                  }}>
                    <ShoppingBag size={10} /> {b.source}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <a href={b.productUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, padding: 8, fontSize: '0.85rem', textDecoration: 'none' }}>
                    View <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => handleRemove(b._id)}
                    style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                    title="Remove Bookmark"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
