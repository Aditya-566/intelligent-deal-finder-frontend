import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, '@media (minWidth: 640px)': { flexDirection: 'row', alignItems: 'center' } }}>
          <div style={{ display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: 100, height: 100, borderRadius: 12, flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="skeleton" style={{ height: 16, width: '85%' }} />
              <div className="skeleton" style={{ height: 16, width: '60%' }} />
              <div className="skeleton" style={{ height: 32, width: 120, marginTop: 4 }} />
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <div className="skeleton" style={{ height: 26, width: 80, borderRadius: 20 }} />
                <div className="skeleton" style={{ height: 36, width: 100, borderRadius: 8, marginLeft: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
