export default function HomePage() {
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
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '32px' }}>Digital Archive of Sindh’s Minority Cultural Heritage</h1>
        <p style={{ color: '#4b5563', margin: 0, fontSize: '18px' }}>Preserving history, temples, and traditions of Sindh's minority communities.</p>
      </div>

      {/* Welcome Message */}
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#1e3a8a' }}>Welcome to the Repository</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
          Use the top navigation menu to explore the portal. You can submit new heritage items using the <strong>Add Artifact</strong> form, or manage approvals via the secure <strong>Admin Portal</strong>.
        </p>
      </div>
    </div>
  );
}