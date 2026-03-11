import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All Categories', 'Electronics', 'Laptops', 'Phones', 'Headphones', 'Watches', 'Clothing', 'Books', 'Sports', 'Home'];
const SORT_OPTIONS = [
  { value: 'price', label: '💰 Lowest Price' },
  { value: 'dealScore', label: '🏆 Best Deal Score' },
];

const POPULAR = ['iPhone 15 Pro', 'Sony WH-1000XM5', 'Samsung Galaxy S24', 'boAt Airdopes', 'Nike Air Force 1', 'MacBook Air M2'];

const SOURCES = [
  { name: 'Amazon', logo: '🟠', color: '#FF9900', desc: 'Huge selection' },
  { name: 'Flipkart', logo: '🔵', color: '#2874F0', desc: 'Best Indian deals' },
  { name: 'Myntra', logo: '🩷', color: '#FF3F6C', desc: 'Fashion & lifestyle' },
];

const HOW_IT_WORKS = [
  { icon: '🔍', title: 'You Search', desc: 'Enter any product name — phone, laptop, sneakers, anything.' },
  { icon: '⚡', title: 'We Scrape', desc: 'Our AI scrapes Amazon, Flipkart & Myntra in real-time.' },
  { icon: '🏆', title: 'You Save', desc: 'Get the top 5 deals ranked by price and deal score.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
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
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div className="glow-orb" style={{ width: 700, height: 700, background: 'rgba(99,102,241,0.1)', top: -250, left: -250 }} />
      <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(139,92,246,0.07)', bottom: -150, right: -150 }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(255,63,108,0.05)', top: '40%', right: '10%' }} />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '80px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {/* Pill badge */}
          <div className="fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 20, padding: '6px 16px', fontSize: '0.82rem', color: '#a78bfa',
            marginBottom: 24, fontWeight: 500, letterSpacing: '0.02em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
            Live prices from 3 stores — updated every search
          </div>

          <h1 className="fade-in-up stagger-1" style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: '#f1f5f9',
          }}>
            Stop Overpaying.<br />
            <span className="gradient-text">Find Your Best Deal.</span>
          </h1>

          <p className="fade-in-up stagger-2" style={{
            color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 8px',
          }}>
            We compare <strong style={{ color: '#FF9900' }}>Amazon</strong>,{' '}
            <strong style={{ color: '#2874F0' }}>Flipkart</strong> &{' '}
            <strong style={{ color: '#FF3F6C' }}>Myntra</strong> in real-time so you  
            don't have to.
          </p>
        </div>

        {/* ── Search Card ── */}
        <div className="glass fade-in-up stagger-3" style={{ padding: 28, marginBottom: 28, borderRadius: 20 }}>
          <form onSubmit={handleSearch}>
            {/* Main search row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search any product — iPhone, shoes, laptop…"
                  className="input-dark"
                  style={{ paddingLeft: 48, fontSize: '1rem', height: 54 }}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ height: 54, padding: '0 28px', fontSize: '0.95rem', borderRadius: 12, whiteSpace: 'nowrap' }}>
                Find Deals →
              </button>
            </div>

            {/* Filter toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(v => !v)}
              style={{
                background: 'none', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8,
                color: '#6366f1', padding: '6px 14px', fontSize: '0.82rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: showFilters ? 16 : 0, transition: 'all 0.2s',
              }}
            >
              ⚙️ {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>

            {/* Collapsible filters */}
            {showFilters && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: 4 }}>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Category</label>
                  <select className="input-dark" value={category} onChange={e => setCategory(e.target.value)} style={{ height: 42 }}>
                    {CATEGORIES.map(c => <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Brand</label>
                  <input type="text" className="input-dark" placeholder="e.g. Sony" value={brand} onChange={e => setBrand(e.target.value)} style={{ height: 42 }} />
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Sort By</label>
                  <select className="input-dark" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ height: 42 }}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Max Price ($)</label>
                  <input type="number" className="input-dark" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} min={1} style={{ height: 42 }} />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Popular searches */}
        <div className="fade-in-up stagger-4" style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>🔥 Trending</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {POPULAR.map(s => (
              <button key={s} onClick={() => { setQuery(s); }}
                style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  color: '#94a3b8', padding: '5px 14px', borderRadius: 20,
                  fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500,
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.1)'; e.target.style.color = '#a78bfa'; e.target.style.borderColor = 'rgba(99,102,241,0.3)'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = '#94a3b8'; e.target.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >{s}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sources strip ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {SOURCES.map(src => (
            <div key={src.name} className="glass card-lift" style={{ padding: '20px 16px', textAlign: 'center', borderRadius: 16 }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{src.logo}</div>
              <div style={{ fontWeight: 700, color: src.color, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>{src.name}</div>
              <div style={{ color: '#475569', fontSize: '0.78rem', marginTop: 4 }}>{src.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 32 }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="glass" style={{ padding: '28px 20px', textAlign: 'center', borderRadius: 16, position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%',
                width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 700, color: '#fff',
              }}>{i + 1}</div>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{step.icon}</div>
              <h3 style={{ color: '#f1f5f9', fontFamily: 'Outfit, sans-serif', fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>{step.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { icon: '🛒', label: 'Stores Scraped', value: '3' },
            { icon: '💰', label: 'Avg. Savings', value: '28%' },
            { icon: '⚡', label: 'Search Time', value: '<8s' },
          ].map(stat => (
            <div key={stat.label} className="glass" style={{ padding: '24px 16px', textAlign: 'center', borderRadius: 16 }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f1f5f9', fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
