import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All Categories', 'Electronics', 'Laptops', 'Phones', 'Headphones', 'Watches', 'Clothing', 'Home & Garden', 'Sports', 'Toys'];
const SORT_OPTIONS = [
  { value: 'price', label: '💰 Lowest Price' },
  { value: 'dealScore', label: '🏆 Best Deal Score' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('price');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams({ q: query, minPrice, maxPrice, category, brand, sortBy });
    navigate(`/results?${params.toString()}`);
  };

  const popularSearches = ['iPhone 15', 'Sony WH-1000XM5', 'Gaming Laptop', 'AirPods Pro', 'Samsung TV 4K', 'Nike Air Max'];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'rgba(99,102,241,0.12)', top: '-200px', left: '-200px' }} />
      <div className="glow-orb" style={{ width: '400px', height: '400px', background: 'rgba(139,92,246,0.08)', bottom: '-100px', right: '-100px' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', color: '#a78bfa',
            marginBottom: '24px', fontWeight: 500,
          }}>
            ✨ AI-Powered Deal Intelligence
          </div>

          <h1 className="fade-in-up stagger-1" style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', color: '#f1f5f9',
          }}>
            Find the Best Deals<br />
            <span className="gradient-text">Across the Web</span>
          </h1>

          <p className="fade-in-up stagger-2" style={{
            color: '#64748b', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto',
          }}>
            We scrape Amazon, eBay & Walmart in real‑time to return your top 5 deals — filtered by your budget.
          </p>
        </div>

        {/* Search Card */}
        <div className="glass fade-in-up stagger-3" style={{ padding: '32px', marginBottom: '32px' }}>
          <form onSubmit={handleSearch}>
            {/* Main search */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', pointerEvents: 'none' }}>
                🔍
              </span>
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for any product…"
                className="input-dark"
                style={{ paddingLeft: '48px', fontSize: '1.05rem', height: '54px' }}
                required
              />
            </div>

            {/* Budget slider */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500 }}>💵 Budget Range</label>
                <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.9rem' }}>
                  ${minPrice} — ${maxPrice === 10000 ? '10,000+' : maxPrice}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Min Price</label>
                  <input
                    type="range" min={0} max={5000} step={10}
                    value={minPrice}
                    onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
                  />
                  <input
                    type="number" min={0} max={maxPrice - 1} value={minPrice}
                    onChange={e => setMinPrice(Math.max(0, Math.min(Number(e.target.value), maxPrice - 1)))}
                    className="input-dark" style={{ marginTop: '8px', fontSize: '0.9rem', height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Max Price</label>
                  <input
                    type="range" min={10} max={10000} step={10}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
                  />
                  <input
                    type="number" min={minPrice + 1} max={10000} value={maxPrice}
                    onChange={e => setMaxPrice(Math.max(minPrice + 1, Math.min(10000, Number(e.target.value))))}
                    className="input-dark" style={{ marginTop: '8px', fontSize: '0.9rem', height: '40px' }}
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div>
                <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Category</label>
                <select className="input-dark" value={category} onChange={e => setCategory(e.target.value)} style={{ height: '42px' }}>
                  {CATEGORIES.map(c => <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Brand</label>
                <input type="text" className="input-dark" placeholder="e.g. Sony" value={brand} onChange={e => setBrand(e.target.value)} style={{ height: '42px' }} />
              </div>
              <div>
                <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Sort By</label>
                <select className="input-dark" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ height: '42px' }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '52px', fontSize: '1rem' }}>
              🔍 Find Best Deals
            </button>
          </form>
        </div>

        {/* Popular Searches */}
        <div className="fade-in-up stagger-4" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '12px' }}>🔥 Popular searches</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {popularSearches.map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8', padding: '6px 14px', borderRadius: '20px',
                  fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s',
                  fontWeight: 500,
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.1)'; e.target.style.color = '#a78bfa'; e.target.style.borderColor = 'rgba(99,102,241,0.3)'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.color = '#94a3b8'; e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="fade-in-up stagger-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '48px' }}>
          {[
            { icon: '🛒', label: 'Sites Scraped', value: '3+' },
            { icon: '💰', label: 'Avg. Savings', value: '23%' },
            { icon: '⚡', label: 'Search Time', value: '<5s' },
          ].map(stat => (
            <div key={stat.label} className="glass" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f1f5f9', fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
