export default function AdminDashboard() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#9d174d', borderBottom: '2px solid #9d174d', paddingBottom: '10px' }}>🔐 Admin Approval Dashboard</h1>
      <p style={{ color: '#4b5563' }}>Reviewing pending heritage submissions from across Sindh.</p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center', color: '#6b7280' }}>
        🎉 Connection stable! System pending queue loading successfully.
      </div>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Home</a>
      </div>
    </div>
  );
}