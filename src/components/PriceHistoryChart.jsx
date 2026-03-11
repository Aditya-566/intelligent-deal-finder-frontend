import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass" style={{ padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: '#6366f1', fontWeight: 700, fontSize: '1rem' }}>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function PriceHistoryChart({ pricePoints }) {
  if (!pricePoints || pricePoints.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#64748b', fontSize: '0.9rem' }}>
        📊 Not enough price history data yet. Check back after more searches!
      </div>
    );
  }

  const data = pricePoints.map(p => ({
    date: new Date(p.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: p.price,
  }));

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone" dataKey="price"
            stroke="#6366f1" strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6, fill: '#8b5cf6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
