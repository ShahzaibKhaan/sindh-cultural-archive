export default function HomePage() {
  // Temporary data check karne ke liye (Database integration se pehle)
  const dummyArtifacts = [
    { id: '1', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A famous historic Indus River island temple complex near Sukkur, Sindh.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=500' },
    { id: '2', title: 'Gurdwara Pehli Patshahi', region: 'Karachi', community: 'Sikh', description: 'A historical Sikh worship place located in the heart of Sindh’s capital.', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=500' }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9f6f0', minHeight: '100vh', margin: 0 }}>
      
      {/* 🧭 NAVIGATION BAR (Responsive & Clean) */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', letterSpacing: '0.5px' }}>🏛️ Sindh Heritage Vault</span>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#fcd34d', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>🏠 Home</a>
          <a href="/submit-artifact" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>➕ Add Artifact</a>
          <a href="/admin-portal-sindh" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>🔐 Admin</a>
        </div>
      </nav>

      {/* 🏙️ HERO SECTION */}
      <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: 'calc(20px + 1.5vw)', fontWeight: '800', lineHeight: '1.2' }}>
          Digital Archive of Sindh’s Minority Cultural Heritage
        </h1>
        <p style={{ color: '#4b5563', margin: 0, fontSize: 'calc(14px + 0.3vw)', maxWidth: '600px', marginInline: 'auto' }}>
          Preserving history, temples, and traditions of Sindh's minority communities.
        </p>
      </div>

      {/* 🏛️ ARTIFACTS DISPLAY GRID */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e3a8a', borderBottom: '2px solid #1e3a8a', paddingBottom: '8px', fontSize: '22px', fontWeight: '700' }}>
          🏛️ Explored Cultural Heritage
        </h2>
        
        {/* Responsive Grid Setup */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {dummyArtifacts.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '18px', fontWeight: '700' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{item.region}</span>
                    <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{item.community}</span>
                  </div>
                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}