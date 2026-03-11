import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPriceAlerts, setPriceAlert } from '../services/user.service';
import toast from 'react-hot-toast';
import { Bell, BellRing, Target, DollarSign, Tag, CheckCircle2 } from 'lucide-react';

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchAlerts(); }, []);

  const fetchAlerts = async () => {
    try {
      const { data } = await getPriceAlerts();
      setAlerts(data);
    } catch {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.02em' }}>
          <Bell size={24} color="#0f172a" /> Price Alerts
        </h1>
        <p style={{ color: '#64748b' }}>Get notified when prices drop below your target</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[1,2].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />)}
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass" style={{ padding: 60, textAlign: 'center', background: '#ffffff', borderRadius: 16 }}>
          <BellRing size={48} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#0f172a', marginBottom: 8, fontSize: '1.25rem', fontWeight: 600 }}>No price alerts set</h3>
          <p style={{ color: '#64748b', marginBottom: 24 }}>
            Find a product you like and set a target price — we'll track it for you.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">Find Deals</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {alerts.map(a => (
            <div key={a._id} className="glass card-lift" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 20, background: '#ffffff', borderRadius: 12 }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: '50%', 
                background: a.triggered ? '#ecfdf5' : '#fffbeb', 
                border: `1px solid ${a.triggered ? '#a7f3d0' : '#fde68a'}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: a.triggered ? '#059669' : '#d97706' 
              }}>
                {a.triggered ? <CheckCircle2 size={24} /> : <Bell size={24} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: 8, fontSize: '1.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.productName}
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <DollarSign size={14} /> Current: <span style={{ color: '#0f172a', fontWeight: 600 }}>${a.currentPrice.toFixed(2)}</span>
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Target size={14} /> Target: <span style={{ color: '#059669', fontWeight: 600 }}>${a.targetPrice.toFixed(2)}</span>
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Tag size={12} /> {a.source}
                  </span>
                </div>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                background: a.triggered ? '#ecfdf5' : '#f8fafc',
                color: a.triggered ? '#059669' : '#475569',
                border: `1px solid ${a.triggered ? '#a7f3d0' : '#e2e8f0'}`,
              }}>
                {a.triggered ? 'Triggered' : 'Watching'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
