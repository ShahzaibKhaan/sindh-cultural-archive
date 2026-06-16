'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const baseArtifacts = [
    { id: '1', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A breathtaking historic Indus River island temple complex near Sukkur, founded in 1889 by Swami Bakhandi Maharaj.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600', year: '1889', approved: true },
    { id: '2', title: 'Gurdwara Pehli Patshahi', region: 'Karachi', community: 'Sikh', description: 'A historical Sikh worship place located in the heart of Sindh’s capital, serving the local community for generations.', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=600', year: '1940s', approved: true }
  ];

  const [artifacts, setArtifacts] = useState<any[]>(baseArtifacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    const approvedLocal = localData.filter((item: any) => item.approved === true);
    setArtifacts([...baseArtifacts, ...approvedLocal]);
  }, []);

  const filteredArtifacts = artifacts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedCommunity === 'All' || item.community === selectedCommunity;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f4f1ea', minHeight: '100vh', margin: 0, color: '#1f2937' }}>
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
        <span style={{ color: 'white', fontWeight: '800', fontSize: '22px' }}>🏛️ Sindh Heritage Vault</span>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#fcd34d', textDecoration: 'none', fontWeight: '700' }}>🏠 Home</a>
          <a href="/public-archive" style={{ color: 'white', textDecoration: 'none' }}>📜 Public Archive</a>
          <a href="/submit-artifact" style={{ color: 'white', textDecoration: 'none' }}>➕ Add Asset</a>
          <a href="/admin-portal-sindh" style={{ color: 'white', textDecoration: 'none', backgroundColor: '#b91c1c', padding: '4px 12px', borderRadius: '6px' }}>🔐 Admin</a>
        </div>
      </nav>

      <div style={{ textAlign: 'center', padding: '50px 20px', background: 'radial-gradient(circle, #1e3a8a 0%, #0f172a 100%)', color: 'white' }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: 'calc(22px + 1.5vw)', fontWeight: '900' }}>Digital Archive of Sindh’s Minority Cultural Heritage</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '900px', margin: '30px auto 0 auto' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '15px 25px', borderRadius: '12px', minWidth: '160px' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#fcd34d' }}>{artifacts.length}</div>
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Verified Dynamic Records</div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '15px 25px', borderRadius: '12px', minWidth: '160px' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#fcd34d' }}>Active</div>
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Open Access Status</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '30px auto 20px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="🔍 Search artifacts by title or region..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '16px', boxSizing: 'border-box', outline: 'none' }} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['All', 'Hindu', 'Sikh', 'Jain'].map((tab) => (
              <button key={tab} onClick={() => setSelectedCommunity(tab)} style={{ padding: '8px 18px', borderRadius: '30px', border: 'none', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedCommunity === tab ? '#1e3a8a' : '#f3f4f6', color: selectedCommunity === tab ? 'white' : '#4b5563' }}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredArtifacts.map((item) => (
            <div key={item.id} onClick={() => setSelectedArtifact(item)} style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '19px', fontWeight: '800' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>📍 {item.region}</span>
                    <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>✨ {item.community}</span>
                  </div>
                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArtifact && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }} onClick={() => setSelectedArtifact(null)}>
          <div style={{ backgroundColor: 'white', maxWidth: '600px', width: '100%', borderRadius: '16px', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <img src={selectedArtifact.imageUrl} alt="" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '25px' }}>
              <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>{selectedArtifact.title}</h2>
              <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '14px' }}>{selectedArtifact.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}