'use client';

import { useState } from 'react';

export default function HomePage() {
  // Rich Extended Market-Ready Data
  const initialArtifacts = [
    { id: '1', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A breathtaking historic Indus River island temple complex near Sukkur, founded in 1889 by Swami Bakhandi Maharaj.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600', year: '1889' },
    { id: '2', title: 'Gurdwara Pehli Patshahi', region: 'Karachi', community: 'Sikh', description: 'A historical Sikh worship place located in the heart of Sindh’s capital, serving the local community for generations.', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=600', year: '1940s' },
    { id: '3', title: 'Shiva Temple, Johi', region: 'Dadu', community: 'Hindu', description: 'An architectural marvel featuring a unique pyramid-shaped dome structure, representing specialized local building crafts.', imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600', year: 'Centuries Old' },
    { id: '4', title: 'Jain Temple, Nagarparkar', region: 'Tharparkar', community: 'Jain', description: 'An ancient abandoned structure showcasing exquisite stone carvings deep within the Karoonjhar Mountains of Tharparkar.', imageUrl: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600', year: '14th Century' }
  ];

  // State Management for Interactive Features
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  // Search and Filter Logic
  const filteredArtifacts = initialArtifacts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedCommunity === 'All' || item.community === selectedCommunity;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f4f1ea', minHeight: '100vh', margin: 0, color: '#1f2937' }}>
      
      {/* 🧭 NAVIGATION BAR */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', sticky: 'top', zIndex: 100 }}>
        <span style={{ color: 'white', fontWeight: '800', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏛️ <span style={{ background: 'linear-gradient(45deg, #fcd34d, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sindh Heritage Vault</span>
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: '#fcd34d', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>🏠 Home</a>
          <a href="/public-archive" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>📜 Public Archive</a>
          <a href="/submit-artifact" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>➕ Add Asset</a>
          <a href="/admin-portal-sindh" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '15px', backgroundColor: '#b91c1c', padding: '4px 12px', borderRadius: '6px' }}>🔐 Admin</a>
        </div>
      </nav>

      {/* 🏙️ HERO BANNER */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'radial-gradient(circle, #1e3a8a 0%, #0f172a 100%)', color: 'white' }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: 'calc(24px + 1.8vw)', fontWeight: '900', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
          Digital Archive of Sindh’s Minority Cultural Heritage
        </h1>
        <p style={{ color: '#93c5fd', margin: '0 auto 30px auto', fontSize: 'calc(14px + 0.4vw)', maxWidth: '700px', lineHeight: '1.6' }}>
          Preserving history, sacred architecture, temples, and dying traditions of indigenous minority communities across Sindh, Pakistan.
        </p>

        {/* 📊 ANALYTICAL STATS COUNTER COMPONENT */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { label: 'Total Protected Sites', count: '142+' },
            { label: 'Communities Documented', count: '4' },
            { label: 'Verified Media Records', count: '1,280+' },
            { label: 'Active Researchers', count: '18' }
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', padding: '15px 25px', borderRadius: '12px', minWidth: '160px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#fcd34d' }}>{stat.count}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 SEARCH AND FILTER BAR CONTROLS */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 20px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Search Box */}
          <div style={{ width: '100%' }}>
            <input 
              type="text" 
              placeholder="🔍 Search artifacts by title, history, or region (e.g., Sukkur, Tharparkar)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '14px 20px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '16px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' }}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#4b5563', marginRight: '5px' }}>Filter Community:</span>
            {['All', 'Hindu', 'Sikh', 'Jain'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCommunity(tab)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  backgroundColor: selectedCommunity === tab ? '#1e3a8a' : '#f3f4f6',
                  color: selectedCommunity === tab ? 'white' : '#4b5563',
                  transition: 'all 0.2s'
                }}
              >
                {tab === 'All' ? '🌐 View All' : tab}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 🖼️ INTERACTIVE GALLERY GRID */}
      <div style={{ padding: '0 20px 60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', margin: 0 }}>
            🗂️ Explore Cultural Gallery ({filteredArtifacts.length})
          </h2>
        </div>

        {filteredArtifacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px', color: '#6b7280' }}>
            <p style={{ fontSize: '18px', margin: 0 }}>No historical sites found matching your current search criteria.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {filteredArtifacts.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedArtifact(item)}
                style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.shadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.shadow = '0 10px 15px -3px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#1e3a8a', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>
                    📅 {item.year}
                  </span>
                </div>
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '19px', fontWeight: '800' }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>📍 {item.region}</span>
                      <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>✨ {item.community}</span>
                    </div>
                    <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                  </div>
                  <div style={{ marginTop: '20px', borderTop: '1px solid #f3f4f6', paddingTop: '12px', color: '#1e3a8a', fontWeight: '700', fontSize: '13px', textAlign: 'right' }}>
                    Interactive View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🌌 LIGHTBOX MODAL COMPONENT (Popup Container) */}
      {selectedArtifact && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }} onClick={() => setSelectedArtifact(null)}>
          <div style={{ backgroundColor: 'white', maxWidth: '700px', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedArtifact(null)} style={{ position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: 'white', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</button>
            <img src={selectedArtifact.imageUrl} alt={selectedArtifact.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>📍 {selectedArtifact.region}</span>
                <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>✨ {selectedArtifact.community}</span>
                <span style={{ backgroundColor: '#f3f4f6', color: '#1f2937', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>📅 Origin: {selectedArtifact.year}</span>
              </div>
              <h2 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '26px', fontWeight: '800' }}>{selectedArtifact.title}</h2>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px', margin: 0 }}>{selectedArtifact.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}