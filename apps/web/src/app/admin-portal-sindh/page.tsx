'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../supabaseClient';

interface Artifact {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  approved: boolean;
}

export default function SuperAdminPanel() {
  const [pendingArtifacts, setPendingArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // 🔒 Security States
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Aapka Secret Admin Password (Ise live karne se pehle apni marzi se badal sakte hain)
const ADMIN_SECRET_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_SECRET_PASSWORD;

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_SECRET_PASSWORD) {
      setIsAuthorized(true);
      fetchPendingData();
    } else {
      alert('Wrong Access Key! Authorities Denied! ❌');
    }
  };

  const fetchPendingData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Artifact')
      .select('*')
      .eq('approved', false);

    if (error) {
      console.error(error.message);
    } else if (data) {
      setPendingArtifacts(data as Artifact[]);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    const { error } = await supabase
      .from('Artifact')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      alert('Error approving: ' + error.message);
    } else {
      alert('Post successfully approved and live! ✅');
      setPendingArtifacts(pendingArtifacts.filter(item => item.id !== id));
    }
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this submission?')) return;
    
    setActionLoading(id);
    const { error } = await supabase
      .from('Artifact')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting: ' + error.message);
    } else {
      alert('Submission rejected and permanently deleted! ❌');
      setPendingArtifacts(pendingArtifacts.filter(item => item.id !== id));
    }
    setActionLoading(null);
  };

  // 🛡️ Layer 1: Agar password sahi nahi hai toh login form dikhao
  if (!isAuthorized) {
    return (
      <div style={{ background: '#0F172A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
        <form onSubmit={checkPassword} style={{ background: '#1E293B', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', width: '100%', maxWidth: '400px', textAlign: 'center', borderTop: '5px solid #EF4444' }}>
          <h2 style={{ marginTop: 0, color: '#F3F4F6' }}>🔒 Admin Gateway</h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '25px' }}>Enter secret security key to access the cultural vault control room.</p>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #4B5563', background: '#0F172A', color: 'white', boxSizing: 'border-box', marginBottom: '20px', fontSize: '16px', textAlign: 'center' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
            Verify Authority
          </button>
        </form>
      </div>
    );
  }

  // 🛡️ Layer 2: Password sahi hone par asli dashboard dikhao
  return (
    <div style={{ background: '#111827', minHeight: '100vh', fontFamily: 'sans-serif', color: '#F9FAFB', margin: 0, padding: 0 }}>
      <nav style={{ background: '#1F2937', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #EF4444' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#F3F4F6' }}>🏛️ Shahzaib's Control Room (Super Admin)</h1>
          <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>Sindh Minority Cultural Heritage Gateway</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', border: '1px solid #4B5563', padding: '8px 15px', borderRadius: '6px' }}>Public Form</Link>
          <Link href="/archive" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', border: '1px solid #4B5563', padding: '8px 15px', borderRadius: '6px' }}>Live View</Link>
        </div>
      </nav>

      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '30px' }}>
          Pending Approvals Queue ({pendingArtifacts.length})
        </h2>

        {loading ? (
          <p style={{ color: '#9CA3AF', textAlign: 'center' }}>Connecting to secure database vault...</p>
        ) : pendingArtifacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', background: '#1F2937', borderRadius: '12px', border: '1px dashed #4B5563' }}>
            <h3 style={{ color: '#10B981', marginTop: 0 }}>All Clean! 🎉</h3>
            <p style={{ color: '#9CA3AF', margin: 0 }}>No pending posts at the moment. Your archive is fully moderated.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
            {pendingArtifacts.map((item) => (
              <div key={item.id} style={{ background: '#1F2937', borderRadius: '12px', padding: '20px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                  )}
                  <h3 style={{ color: '#F9FAFB', margin: '0 0 10px 0' }}>{item.title}</h3>
                  <span style={{ fontSize: '12px', background: '#374151', padding: '4px 8px', borderRadius: '4px', color: '#F3F4F6', fontWeight: 'bold' }}>📍 {item.location}</span>
                  <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.5', marginTop: '15px', wordBreak: 'break-word' }}>{item.description}</p>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #374151' }}>
                  <button
                    disabled={actionLoading !== null}
                    onClick={() => handleApprove(item.id)}
                    style={{ flex: 1, padding: '10px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {actionLoading === item.id ? '...' : 'Approve ✅'}
                  </button>
                  <button
                    disabled={actionLoading !== null}
                    onClick={() => handleReject(item.id)}
                    style={{ flex: 1, padding: '10px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {actionLoading === item.id ? '...' : 'Reject ❌'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}