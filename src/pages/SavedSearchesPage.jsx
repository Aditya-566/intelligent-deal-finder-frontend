import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedSearches, deleteSavedSearch } from '../services/user.service';
import toast from 'react-hot-toast';
import { Save, Trash2, Play, Search, FolderOpen, Tag, DollarSign, Calendar } from 'lucide-react';

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
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.02em' }}>
          <Save size={24} color="#0f172a" /> Saved Searches
        </h1>
        <p style={{ color: '#64748b' }}>Re-run your previous searches instantly</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />)}
        </div>
      ) : searches.length === 0 ? (
        <div className="glass" style={{ padding: 60, textAlign: 'center', background: '#ffffff', borderRadius: 16 }}>
          <Save size={48} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#0f172a', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>No saved searches yet</h3>
          <p style={{ color: '#64748b', marginBottom: 24 }}>Run a search and click "Save Search" to save it here.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Start Searching</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {searches.map(s => (
            <div key={s._id} className="glass card-lift" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 20, background: '#ffffff', borderRadius: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Search size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: 8, fontSize: '1.1rem' }}>{s.query}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={chipStyle}><DollarSign size={12} /> ${s.minPrice}–${s.maxPrice}</span>
                  {s.filters?.category && <span style={chipStyle}><FolderOpen size={12} /> {s.filters.category}</span>}
                  {s.filters?.brand && <span style={chipStyle}><Tag size={12} /> {s.filters.brand}</span>}
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={12} /> {new Date(s.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => runSearch(s)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: 8 }}>
                  <Play size={16} /> Run
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                  title="Delete Search"
                >
                  <Trash2 size={16} />
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
  display: 'inline-flex', alignItems: 'center', gap: 4,
  background: '#f1f5f9', border: '1px solid #e2e8f0',
  color: '#475569', padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500,
};
