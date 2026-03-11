import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="glass" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="skeleton" style={{ width: '90px', height: '90px', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="skeleton" style={{ height: '14px', width: '80%' }} />
              <div className="skeleton" style={{ height: '14px', width: '60%' }} />
              <div className="skeleton" style={{ height: '28px', width: '100px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="skeleton" style={{ height: '24px', width: '70px', borderRadius: '20px' }} />
                <div className="skeleton" style={{ height: '30px', width: '90px', borderRadius: '10px', marginLeft: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
