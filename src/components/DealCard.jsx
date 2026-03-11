import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addBookmark } from '../services/user.service';
import toast from 'react-hot-toast';
import { ShoppingBag, BookmarkPlus, BookmarkCheck, ExternalLink, Star } from 'lucide-react';

const SOURCE_COLORS = {
  Amazon:   { bg: '#fff7ed',  color: '#ea580c', border: '#ffedd5' },
  Flipkart: { bg: '#eff6ff', color: '#2563eb', border: '#dbeafe' },
  Myntra:   { bg: '#fdf2f8', color: '#db2777', border: '#fce7f3' },
};

export default function DealCard({ product, rank }) {
  const { isAuthenticated } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const source = SOURCE_COLORS[product.source] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Sign in to bookmark products'); return; }
    setBookmarking(true);
    try {
      await addBookmark({
        productName: product.productName,
        price: product.price,
        imageUrl: product.imageUrl,
        productUrl: product.productUrl,
        source: product.source,
        rating: product.rating,
        reviews: product.reviews,
        originalPrice: product.originalPrice,
      });
      setBookmarked(true);
      toast.success('Product bookmarked!');
    } catch (err) {
      if (err.response?.data?.message?.includes('already')) {
        setBookmarked(true);
        toast('Already bookmarked', { icon: '🔖' });
      } else {
        toast.error('Failed to bookmark');
      }
    } finally { setBookmarking(false); }
  };

  return (
    <div className="glass glass-hover fade-in-up" style={{
      padding: '24px', position: 'relative', overflow: 'hidden',
      animationDelay: `${(rank - 1) * 0.1}s`, opacity: 0,
      display: 'flex', flexDirection: 'column', gap: 16,
      '@media (minWidth: 640px)': { flexDirection: 'row', alignItems: 'center' }
    }}>
      {/* Rank badge */}
      <div className={`rank-badge rank-${rank}`} style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
        {rank}
      </div>

      {/* Discount badge */}
      {discount > 0 && (
        <div style={{
          position: 'absolute', top: 16, right: 60,
          background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0',
          padding: '4px 10px', borderRadius: 20,
          fontSize: '0.75rem', fontWeight: 600, zIndex: 2,
        }}>
          {discount}% OFF
        </div>
      )}

      {/* Bookmark button */}
      <button
        onClick={handleBookmark}
        disabled={bookmarking}
        title={bookmarked ? 'Bookmarked' : 'Save to bookmarks'}
        style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          background: bookmarked ? '#eef2ff' : '#ffffff',
          color: bookmarked ? '#4f46e5' : '#64748b',
          border: `1px solid ${bookmarked ? '#c7d2fe' : '#e2e8f0'}`,
          borderRadius: 8, padding: 6, cursor: 'pointer',
          transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {bookmarked ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
      </button>

      <div style={{ display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
        {/* Product Image */}
        <div style={{
          width: 100, height: 100, flexShrink: 0,
          borderRadius: 12, overflow: 'hidden',
          background: '#f8fafc', border: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8
        }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.productName}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <div style={{ display: product.imageUrl ? 'none' : 'flex', color: '#cbd5e1', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <ShoppingBag size={32} />
          </div>
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '0.95rem', color: '#0f172a', marginBottom: 8, fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
          }}>
            {product.productName}
          </h3>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
              ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Source Tag */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                background: source.bg, color: source.color, border: `1px solid ${source.border}`,
              }}>
                <ShoppingBag size={12} /> {product.source}
              </span>

              {/* Rating */}
              {product.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 500 }}>
                    {product.rating} <span style={{ color: '#94a3b8', fontWeight: 400 }}>{product.reviews ? `(${product.reviews.toLocaleString()})` : ''}</span>
                  </span>
                </div>
              )}
            </div>

            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none', borderRadius: 8 }}
            >
              View Deal <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
