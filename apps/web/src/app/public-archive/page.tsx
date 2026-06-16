'use client';

import { useState, useEffect } from 'react';

export default function PublicArchivePage() {
  const baseArchive = [
    { id: '101', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A historic island temple complex situated in the middle of the Indus River near Sukkur.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=500' }
  ];

  const [archive, setArchive] = useState<any[]>(baseArchive);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    const approvedLocal = localData.filter((item: any) => item.approved === true);
    setArchive([...baseArchive, ...approvedLocal]);
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9f6f0', minHeight: '100vh', margin: 0 }}>
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🏛️ Sindh Public Vault</span>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Back to Home</a>
      </nav>

      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '26px', fontWeight: '800' }}>📜 Verified Public Cultural Archive</h1>
        <p style={{ color: '#4b5563', margin: 0, fontSize: '15px' }}>Official institutional records and preserved monuments.</p>
      </div>

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {archive.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '18px', fontWeight: '700' }}>{item.title}</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>📍 {item.region}</span>
                  <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>🤝 {item.community}</span>
                </div>
                <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}