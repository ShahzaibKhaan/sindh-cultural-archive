export default function SubmitArtifactPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>➕ Add New Cultural Artifact</h2>
      <p style={{ color: '#6b7280' }}>Submit minority heritage details for admin review.</p>
      {/* Aapka purana form yahan aa jayega */}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" placeholder="Artifact Title" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <textarea placeholder="Description" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }} />
        <button type="button" style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Submit to Admin</button>
      </form>
    </div>
  );
}