import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DealCard from '../components/DealCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { searchDeals } from '../services/search.service';
import { saveSearch } from '../services/user.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fromCache, setFromCache] = useState(false);
  const [totalFound, setTotalFound] = useState(0);
  const [saving, setSaving] = useState(false);

  const q = searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice') || 0;
  const maxPrice = searchParams.get('maxPrice') || 10000;
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const sortBy = searchParams.get('sortBy') || 'price';

  useEffect(() => {
    if (!q) { navigate('/'); return; }
    fetchResults();
  }, [q, minPrice, maxPrice, category, brand, sortBy]);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await searchDeals({ q, minPrice, maxPrice, category, brand, sortBy });
      setResults(data.results || []);
      setFromCache(data.fromCache);
      setTotalFound(data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSearch = async () => {
    if (!isAuthenticated) { toast.error('Sign in to save searches'); return; }
    setSaving(true);
    try {
      await saveSearch({ query: q, minPrice: Number(minPrice), maxPrice: Number(maxPrice), filters: { category, brand, sortBy } });
      toast.success('Search saved!');
    } catch (err) {
      toast.error('Failed to save search');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '0.9rem', padding: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ← Back to Search
            </button>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              Results for <span className="gradient-text">"{q}"</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
              {loading ? 'Scraping deals...' : `Showing top ${results.length} of ${totalFound} deals found`}
              {fromCache && !loading && <span style={{ marginLeft: '8px', color: '#10b981', fontSize: '0.78rem' }}>⚡ cached</span>}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={fetchResults} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              🔄 Refresh
            </button>
            <button onClick={handleSaveSearch} className="btn-primary" disabled={saving} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              {saving ? '...' : '💾 Save Search'}
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(category || brand || sortBy !== 'price') && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {category && <span style={chipStyle}>📁 {category}</span>}
            {brand && <span style={chipStyle}>🏷️ {brand}</span>}
            {sortBy === 'dealScore' && <span style={chipStyle}>🏆 Best Deal Score</span>}
            <span style={chipStyle}>💰 ${minPrice} – ${maxPrice}</span>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <>
          <div className="glass" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', border: '2px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>🔍 Scraping Amazon, Flipkart &amp; Myntra for the best deals…</span>
          </div>
          <LoadingSkeleton />
        </>
      ) : error ? (
        <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
          <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>Something went wrong</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>{error}</p>
          <button onClick={fetchResults} className="btn-primary">Try Again</button>
        </div>
      ) : results.length === 0 ? (
        <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>No deals found</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Try adjusting your budget or search terms.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Search Again</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((product, i) => (
            <DealCard key={product.productUrl || i} product={product} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const chipStyle = {
  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
  color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500,
};
