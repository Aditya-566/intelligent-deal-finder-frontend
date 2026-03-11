import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedSearches, deleteSavedSearch } from '../services/user.service';
import toast from 'react-hot-toast';

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchSearches(); }, []);

  const fetchSearches = async () => {
    try {
      const { data } = await getSavedSearches();
      setSearches(data);
    } catch (err) {
      toast.error('Failed to load saved searches');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSavedSearch(id);
      setSearches(s => s.filter(x => x._id !== id));
      toast.success('Search deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const runSearch = (s) => {
    const params = new URLSearchParams({
      q: s.query,
      minPrice: s.minPrice,
      maxPrice: s.maxPrice,
      category: s.filters?.category || '',
      brand: s.filters?.brand || '',
      sortBy: s.filters?.sortBy || 'price',
    });
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
          💾 Saved Searches
        </h1>
        <p style={{ color: '#64748b' }}>Re-run your previous searches instantly</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '88px', borderRadius: '16px' }} />)}
        </div>
      ) : searches.length === 0 ? (
        <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
          <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>No saved searches yet</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Run a search and click "Save Search" to save it here.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Start Searching</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {searches.map(s => (
            <div key={s._id} className="glass glass-hover" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '1.5rem' }}>🔍</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>{s.query}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={chipStyle}>💰 ${s.minPrice}–${s.maxPrice}</span>
                  {s.filters?.category && <span style={chipStyle}>{s.filters.category}</span>}
                  {s.filters?.brand && <span style={chipStyle}>{s.filters.brand}</span>}
                  <span style={{ color: '#475569', fontSize: '0.75rem' }}>
                    {new Date(s.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => runSearch(s)} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                  ▶ Run
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.2s' }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const chipStyle = {
  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
  color: '#a78bfa', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem',
};
