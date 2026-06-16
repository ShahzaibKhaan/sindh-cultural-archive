'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

//password
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('❌ Wrong Password! Access Denied.');
    }
  };

  const dummyPending = [
    { id: '3', title: 'Shiva Temple, Johi', community: 'Hindu', description: 'Unique pyramid-shaped architecture temple in Dadu district.' }
  ];

  // 🔒 LOCK SCREEN: Agar unlock nahi hua toh yeh dikhega
  if (!isUnlocked) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🔐</div>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Admin Authentication</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>This portal is secure. Enter the admin password to access the approval queue.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '16px', textAlign: 'center' }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '14px', margin: 0, fontWeight: '600' }}>{error}</p>}
            
            <button type="submit" style={{ padding: '12px', backgroundColor: '#9d174d', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'background 0.2s' }}>
              Unlock Dashboard
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Go Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  // 🔓 UNLOCKED DASHBOARD: Password sahi hone par yeh dikhega
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', margin: 0 }}>
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🔐 Admin Control (Unlocked)</span>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setIsUnlocked(false)} style={{ backgroundColor: '#4b5563', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Lock 🔒</button>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Home</a>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', width: 'calc(100% - 40px)' }}>
        <h1 style={{ color: '#9d174d', margin: '0 0 5px 0', fontSize: '26px', fontWeight: '800' }}>Approval Queue</h1>
        <p style={{ color: '#4b5563', margin: '0 0 20px 0', fontSize: '15px' }}>Verify and approve user submissions before they go public on the live archive.</p>
        
        {dummyPending.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '5px solid #9d174d' }}>
            <div style={{ flexGrow: 1 }}>
              <span style={{ backgroundColor: '#fce7f3', color: '#9d174d', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{item.community}</span>
              <h3 style={{ margin: '5px 0', color: '#111827', fontSize: '18px' }}>{item.title}</h3>
              <p style={{ color: '#4b5563', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>{item.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Reject</button>
              <button style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 24px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Approve & Publish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}