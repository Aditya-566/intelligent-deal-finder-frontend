import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPriceAlerts, setPriceAlert } from '../services/user.service';
import toast from 'react-hot-toast';

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
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
          🔔 Price Alerts
        </h1>
        <p style={{ color: '#64748b' }}>Get notified when prices drop to your target</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2].map(i => <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '16px' }} />)}
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔔</div>
          <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>No price alerts set</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Find a product you like and set a target price — we'll track it for you.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">Find Deals</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map(a => (
            <div key={a._id} className="glass" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '1.5rem' }}>{a.triggered ? '✅' : '🔔'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.productName}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Current: <span style={{ color: '#f1f5f9', fontWeight: 600 }}>${a.currentPrice.toFixed(2)}</span></span>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Target: <span style={{ color: '#10b981', fontWeight: 600 }}>${a.targetPrice.toFixed(2)}</span></span>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{a.source}</span>
                </div>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                background: a.triggered ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                color: a.triggered ? '#10b981' : '#f59e0b',
                border: `1px solid ${a.triggered ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
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
