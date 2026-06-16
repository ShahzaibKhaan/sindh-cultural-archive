export default function PublicArchivePage() {
  // Temporary database-safe dummy data layout check karne ke liye
  const dummyArchive = [
    { id: '101', title: 'Sadhu Bela Temple', region: 'Sukkur', community: 'Hindu', description: 'A historic island temple complex situated in the middle of the Indus River near Sukkur.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=500' },
    { id: '102', title: 'Gurdwara Pehli Patshahi', region: 'Karachi', community: 'Sikh', description: 'A prominent and historically significant Sikh worship place located in Karachi, Sindh.', imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=500' },
    { id: '103', title: 'Shiva Temple, Johi', region: 'Dadu', community: 'Hindu', description: 'An architectural marvel featuring a unique pyramid-shaped dome structure in Dadu district.', imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=500' }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9f6f0', minHeight: '100vh', margin: 0 }}>
      
      {/* 🧭 NAVIGATION BAR */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🏛️ Sindh Heritage Vault</span>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Back to Home</a>
      </nav>

      {/* 📂 HEADER SECTION */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: 'calc(22px + 1vw)', fontWeight: '800' }}>
          📜 Public Cultural Archive
        </h1>
        <p style={{ color: '#4b5563', margin: 0, fontSize: '15px', maxWidth: '600px', marginInline: 'auto', lineHeight: '1.5' }}>
          Explore the verified records, historical monuments, and sacred spaces preserving the diverse minority heritage of Sindh.
        </p>
      </div>

      {/* 🗂️ ARCHIVE GRID */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '10px' }}>
          {dummyArchive.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              
              {/* Image Section */}
              <div style={{ position: 'relative' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '210px', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(30, 58, 138, 0.9)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                  ID: #{item.id}
                </span>
              </div>

              {/* Content Section */}
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '18px', fontWeight: '700' }}>{item.title}</h3>
                  
                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      📍 {item.region}
                    </span>
                    <span style={{ backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      🤝 {item.community}
                    </span>
                  </div>

                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {item.description}
                  </p>
                </div>

                {/* Card Footer (Optional action/view details button placeholder) */}
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ color: '#1e3a8a', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>View Full History →</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}