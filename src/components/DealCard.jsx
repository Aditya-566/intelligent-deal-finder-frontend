import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addBookmark } from '../services/user.service';
import toast from 'react-hot-toast';

const SOURCE_COLORS = {
  Amazon:   { bg: 'rgba(255,153,0,0.12)',  color: '#FF9900', border: 'rgba(255,153,0,0.3)',  emoji: '🛒' },
  Flipkart: { bg: 'rgba(40,116,240,0.12)', color: '#2874F0', border: 'rgba(40,116,240,0.3)', emoji: '🔵' },
  Myntra:   { bg: 'rgba(255,63,108,0.12)', color: '#FF3F6C', border: 'rgba(255,63,108,0.3)', emoji: '🩷' },
};


export default function DealCard({ product, rank }) {
  const { isAuthenticated } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const source = SOURCE_COLORS[product.source] || { bg: 'rgba(99,102,241,0.12)', color: '#6366f1', border: 'rgba(99,102,241,0.3)', emoji: '🛍️' };
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
      padding: '20px', position: 'relative', overflow: 'hidden',
      animationDelay: `${(rank - 1) * 0.1}s`, opacity: 0,
    }}>
      {/* Rank badge */}
      <div className={`rank-badge rank-${rank}`} style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
        {rank}
      </div>

      {/* Discount badge */}
      {discount > 0 && (
        <div style={{
          position: 'absolute', top: '16px', right: '52px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white', padding: '3px 10px', borderRadius: '20px',
          fontSize: '0.75rem', fontWeight: 700, zIndex: 2,
        }}>
          -{discount}% OFF
        </div>
      )}

      {/* Bookmark button */}
      <button
        onClick={handleBookmark}
        disabled={bookmarking}
        title={bookmarked ? 'Bookmarked' : 'Save to bookmarks'}
        style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 2,
          background: bookmarked ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${bookmarked ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '8px', padding: '6px 8px', cursor: 'pointer',
          fontSize: '16px', transition: 'all 0.2s',
        }}
      >
        {bookmarked ? '🔖' : '☆'}
      </button>

      <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
        {/* Product Image */}
        <div style={{
          width: '90px', height: '90px', flexShrink: 0,
          borderRadius: '12px', overflow: 'hidden',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.productName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <div style={{ display: product.imageUrl ? 'none' : 'flex', fontSize: '32px', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            {source.emoji}
          </div>
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '0.88rem', color: '#94a3b8', marginBottom: '6px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            lineHeight: 1.4,
          }}>
            {product.productName}
          </p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9', fontFamily: 'Outfit, sans-serif' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                {product.rating} {product.reviews ? `(${product.reviews.toLocaleString()})` : ''}
              </span>
            </div>
          )}

          {/* Source + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
              background: source.bg, color: source.color, border: `1px solid ${source.border}`,
            }}>
              {source.emoji} {product.source}
            </span>

            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none', marginLeft: 'auto' }}
            >
              View Deal →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
