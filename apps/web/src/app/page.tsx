import { prisma } from '@repo/database';

async function getApprovedArtifacts() {
  return await prisma.artifact.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function HomePage() {
  const artifacts = await getApprovedArtifacts();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f6f0', minHeight: '100vh', margin: 0 }}>
      {/* 🧭 NAVIGATION BAR (Oopar Option) */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🏛️ Sindh Minority Heritage</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</a>
          <a href="/submit-artifact" style={{ color: '#fcd34d', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add Artifact (Form)</a>
          <a href="/admin-portal-sindh" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 'bold' }}>🔐 Admin Portal</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Digital Archive of Sindh’s Minority Cultural Heritage</h1>
        <p style={{ color: '#4b5563', margin: 0 }}>Preserving history, temples, and traditions of Sindh's minority communities.</p>
      </div>

      {/* Live Data Grid */}
      <div style={{ padding: '30px' }}>
        <h2 style={{ color: '#1e3a8a', borderBottom: '2px solid #1e3a8a', paddingBottom: '10px' }}>🏛️ Explored Cultural Heritage</h2>
        
        {artifacts.length === 0 ? (
          <p style={{ color: '#666', marginTop: '20px' }}>No approved artifacts to display yet. Use the Admin Portal to approve submitted items!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {artifacts.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>{item.title}</h3>
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {item.region} | {item.community}
                  </span>
                  <p style={{ color: '#4b5563', fontSize: '14px', marginTop: '12px' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}