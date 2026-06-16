export default function SubmitArtifactPage() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', margin: 0 }}>
      {/* Navbar duplicate taake flow bana rahe */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🏛️ Sindh Heritage Vault</span>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Back to Home</a>
      </nav>

      {/* Form Container */}
      <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: 'calc(100% - 40px)' }}>
        <h2 style={{ color: '#1e3a8a', margin: '0 0 5px 0', fontSize: '22px' }}>➕ Add New Cultural Artifact</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 20px 0' }}>Submit minority heritage details for admin review.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Artifact Title / Site Name</label>
            <input type="text" placeholder="e.g., Sadhu Bela Temple" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Region</label>
              <input type="text" placeholder="e.g., Sukkur" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Community</label>
              <input type="text" placeholder="e.g., Hindu" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Image URL</label>
            <input type="url" placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Description / History</label>
            <textarea placeholder="Write historical context or significance..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '100px', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>

          <button type="button" style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}>
            Submit to Admin
          </button>
        </form>
      </div>
    </div>
  );
}