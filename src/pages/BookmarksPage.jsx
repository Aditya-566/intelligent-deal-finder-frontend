import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, deleteBookmark } from '../services/user.service';
import toast from 'react-hot-toast';

const SOURCE_EMOJI = { Amazon: '🛒', eBay: '🏷️', Walmart: '🏪' };

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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
          🔖 Bookmarks
        </h1>
        <p style={{ color: '#64748b' }}>{bookmarks.length} saved product{bookmarks.length !== 1 ? 's' : ''}</p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '200px', borderRadius: '16px' }} />)}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔖</div>
          <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>No bookmarks yet</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Click the bookmark icon on any deal to save it here.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Find Deals</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {bookmarks.map(b => {
            const discount = b.originalPrice && b.originalPrice > b.price
              ? Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100) : 0;
            return (
              <div key={b._id} className="glass glass-hover" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Image */}
                <div style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt={b.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                  ) : (
                    <span style={{ fontSize: '3rem' }}>{SOURCE_EMOJI[b.source] || '🛍️'}</span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {b.productName}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>${b.price.toFixed(2)}</span>
                    {discount > 0 && (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>-{discount}%</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={b.productUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.82rem', textDecoration: 'none' }}>
                    {SOURCE_EMOJI[b.source]} View
                  </a>
                  <button
                    onClick={() => handleRemove(b._id)}
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    🗑
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
