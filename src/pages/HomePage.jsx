import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ShoppingBag, Zap, Award, Activity, MousePointerClick } from 'lucide-react';

const CATEGORIES = ['All Categories', 'Electronics', 'Laptops', 'Phones', 'Headphones', 'Watches', 'Clothing', 'Books', 'Home'];
const SORT_OPTIONS = [
  { value: 'price', label: 'Lowest Price' },
  { value: 'dealScore', label: 'Best Deal Score' },
];

const POPULAR = ['iPhone 15 Pro', 'Sony WH-1000XM5', 'Samsung Galaxy S24', 'MacBook Air M2'];

const SOURCES = [
  { name: 'Amazon', icon: <ShoppingBag size={24} color="#f97316" />, color: '#ea580c', desc: 'World’s largest selection' },
  { name: 'Flipkart', icon: <ShoppingBag size={24} color="#3b82f6" />, color: '#2563eb', desc: 'Top tech & fashion' },
  { name: 'Myntra', icon: <ShoppingBag size={24} color="#ec4899" />, color: '#db2777', desc: 'Premium lifestyle' },
];

const HOW_IT_WORKS = [
  { icon: <Search size={28} color="#0f172a" />, title: '1. You Search', desc: 'Enter any product name into our engine. Laptops, shoes, appliances—anything.' },
  { icon: <Activity size={28} color="#0f172a" />, title: '2. We Scrape', desc: 'Our backend immediately pulls live price data across major e-commerce platforms.' },
  { icon: <Award size={28} color="#0f172a" />, title: '3. You Save', desc: 'We filter, rank and present the top 5 absolute best deals securely to you.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('dealScore');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams({ q: query, minPrice, maxPrice, category, brand, sortBy });
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      
      {/* ── Minimalist Hero ── */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '100px 24px 60px', textAlign: 'center' }}>
        <div className="fade-in-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#f1f5f9', color: '#475569', borderRadius: 20,
          padding: '6px 14px', fontSize: '0.8rem', fontWeight: 500, marginBottom: 24
        }}>
          <Zap size={14} /> Intelligent scraping engine is online
        </div>

        <h1 className="fade-in-up stagger-1" style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.1, color: '#0f172a', marginBottom: 20
        }}>
          Find the best deal.<br />
          <span style={{ color: '#64748b' }}>Fast and simple.</span>
        </h1>

        <p className="fade-in-up stagger-2" style={{
          color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 500, margin: '0 auto 40px'
        }}>
          Search once. We compare top retailers in real-time to find 
          you the lowest prices on the internet.
        </p>

        {/* ── Clean Search Bar ── */}
        <div className="glass fade-in-up stagger-3" style={{ padding: 24, borderRadius: 16, background: '#ffffff', textAlign: 'left', marginBottom: 32 }}>
          <form onSubmit={handleSearch}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexDirection: 'column', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="input-dark"
                  style={{ paddingLeft: 46, height: 52, fontSize: '1.05rem', background: '#f8fafc', borderColor: '#e2e8f0' }}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ height: 52, padding: '0 32px', fontSize: '1rem', borderRadius: 8 }}>
                Search
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(v => !v)}
              style={{
                background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s', padding: 0
              }}
            >
              <MousePointerClick size={14} /> {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>

            {showFilters && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginTop: 20 }}>
                <div>
                  <label style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Category</label>
                  <select className="input-dark" value={category} onChange={e => setCategory(e.target.value)} style={{ height: 40, background: '#f8fafc' }}>
                    {CATEGORIES.map(c => <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Brand</label>
                  <input type="text" className="input-dark" placeholder="e.g. Sony" value={brand} onChange={e => setBrand(e.target.value)} style={{ height: 40, background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Sort By</label>
                  <select className="input-dark" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ height: 40, background: '#f8fafc' }}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Max INR Budget</label>
                  <input type="number" className="input-dark" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} min={1} style={{ height: 40, background: '#f8fafc' }} />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Popular searches - clean tags */}
        <div className="fade-in-up stagger-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={14} /> Trending:
          </span>
          {POPULAR.map(s => (
             <button key={s} onClick={() => setQuery(s)}
             style={{
               background: '#f1f5f9', color: '#475569', border: 'none', padding: '4px 12px',
               borderRadius: 20, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
             }}
             onMouseEnter={e => { e.target.style.background = '#e2e8f0'; e.target.style.color = '#0f172a'; }}
             onMouseLeave={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#475569'; }}
           >
             {s}
           </button>
          ))}
        </div>
      </section>

      {/* ── Horizontal Scroll Section (Cylinder Effect) ── */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px 80px', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: 24 }}>Supported Retailers</h2>
        <div className="horizontal-scroll-container">
          {SOURCES.map(src => (
            <div key={src.name} className="horizontal-scroll-item glass card-lift" style={{ padding: '24px', borderRadius: 12 }}>
              <div style={{ marginBottom: 16 }}>{src.icon}</div>
              <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '1.1rem', marginBottom: 4 }}>{src.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{src.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Flat How It Works Section ── */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: 24 }}>Process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {HOW_IT_WORKS.map((step) => (
            <div key={step.title} style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ color: '#0f172a', fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>{step.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
