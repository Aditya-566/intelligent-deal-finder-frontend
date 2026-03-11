import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DealCard from '../components/DealCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { searchDeals } from '../services/search.service';
import { saveSearch } from '../services/user.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, RefreshCw, Save, FolderOpen, Tag, Award, IndianRupee, Search, Frown, Zap } from 'lucide-react';

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
  const maxPrice = searchParams.get('maxPrice') || 100000;
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

  const chipStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#f1f5f9', color: '#475569', padding: '6px 14px',
    borderRadius: 20, fontSize: '0.8rem', fontWeight: 500, border: '1px solid #e2e8f0',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <button 
                onClick={() => navigate('/')} 
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem', padding: 0, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#0f172a'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >
                <ArrowLeft size={16} /> Back to Search
              </button>
              
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: 6, letterSpacing: '-0.02em' }}>
                Results for "{q}"
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                {loading ? 'Analyzing live prices...' : `Showing top ${results.length} of ${totalFound} deals found`}
                {fromCache && !loading && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#059669', fontSize: '0.75rem', background: '#ecfdf5', padding: '2px 8px', borderRadius: 12 }}>
                    <Zap size={10} fill="#059669" /> Cached
                  </span>
                )}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={fetchResults} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', background: '#ffffff' }}>
                <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
              </button>
              <button onClick={handleSaveSearch} className="btn-primary" disabled={saving} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save Search'}
              </button>
            </div>
          </div>

          {/* Active filters */}
          {(category || brand || sortBy !== 'price') && (
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {category && <span style={chipStyle}><FolderOpen size={14} /> {category}</span>}
              {brand && <span style={chipStyle}><Tag size={14} /> {brand}</span>}
              {sortBy === 'dealScore' && <span style={chipStyle}><Award size={14} /> Best Deal Score</span>}
              <span style={chipStyle}><IndianRupee size={14} /> {minPrice} – {maxPrice}</span>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <>
            <div className="glass" style={{ padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, borderRadius: 12, background: '#ffffff' }}>
              <div style={{ width: 20, height: 20, border: '2px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>
                Querying Amazon, Flipkart & Myntra for live pricing...
              </span>
            </div>
            <LoadingSkeleton />
          </>
        ) : error ? (
          <div className="glass" style={{ padding: '60px 40px', textAlign: 'center', background: '#ffffff', borderRadius: 16 }}>
            <Frown size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#0f172a', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>Request Failed</h3>
            <p style={{ color: '#64748b', marginBottom: 24 }}>{error}</p>
            <button onClick={fetchResults} className="btn-primary">Try Again</button>
          </div>
        ) : results.length === 0 ? (
          <div className="glass" style={{ padding: '60px 40px', textAlign: 'center', background: '#ffffff', borderRadius: 16 }}>
            <Search size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#0f172a', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>No deals found</h3>
            <p style={{ color: '#64748b', marginBottom: 24 }}>Try adjusting your budget or broadening your search terms.</p>
            <button onClick={() => navigate('/')} className="btn-primary">Search Again</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {results.map((product, i) => (
              <DealCard key={product.productUrl || i} product={product} rank={i + 1} />
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
    </div>
  );
}
