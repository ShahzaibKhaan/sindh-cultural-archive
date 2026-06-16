import { prisma } from '@repo/database'; // Aapke monorepo ke mutabiq database import

async function getApprovedArtifacts() {
  // Sirf woh artifacts laye ga jo admin ne approve kiye hain
  return await prisma.artifact.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function PublicArchivePage() {
  const artifacts = await getApprovedArtifacts();

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f9f6f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e3a8a', borderBottom: '2px solid #1e3a8a', paddingBottom: '10px' }}>
        🏛️ Digital Archive of Sindh’s Minority Cultural Heritage
      </h1>
      
      {artifacts.length === 0 ? (
        <p style={{ marginTop: '20px', color: '#666' }}>No cultural artifacts available in the public archive yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '25px' }}>
          {artifacts.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>{item.title}</h3>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  {item.region} | {item.community}
                </span>
                <p style={{ color: '#4b5563', fontSize: '14px', marginTop: '12px', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}