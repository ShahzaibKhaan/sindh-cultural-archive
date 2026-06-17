'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type PendingRecord = {
  id: string;
  title: string;
  region: string;
  community: string;
  imageUrl: string;
  description: string;
  approved: boolean;
};

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [pendingList, setPendingList] = useState<PendingRecord[]>([]);
  const [aiLoadingId, setAiLoadingId] = useState('');

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin_sindh_123';

  const loadPending = () => {
    const currentData = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    setPendingList(currentData.filter((item: PendingRecord) => item.approved === false));
  };

  useEffect(() => {
    if (isUnlocked) loadPending();
  }, [isUnlocked]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === adminPassword) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Wrong password. Access denied.');
    }
  };

  const updateStorage = (next: PendingRecord[]) => {
    const allRecords = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    const nextIds = new Set(next.map((item) => item.id));
    const merged = allRecords
      .filter((item: PendingRecord) => item.approved !== false || nextIds.has(item.id))
      .map((item: PendingRecord) => next.find((nextItem) => nextItem.id === item.id) || item);
    localStorage.setItem('sindh_heritage_vault', JSON.stringify(merged));
  };

  const handleApprove = (id: string) => {
    const allRecords = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    const updated = allRecords.map((item: PendingRecord) => item.id === id ? { ...item, approved: true } : item);
    localStorage.setItem('sindh_heritage_vault', JSON.stringify(updated));
    setPendingList((items) => items.filter((item) => item.id !== id));
  };

  const handleReject = (id: string) => {
    const allRecords = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    localStorage.setItem('sindh_heritage_vault', JSON.stringify(allRecords.filter((item: PendingRecord) => item.id !== id)));
    setPendingList((items) => items.filter((item) => item.id !== id));
  };

  const polishRecord = async (record: PendingRecord) => {
    setAiLoadingId(record.id);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'polish', text: record.description }),
      });
      const data = await response.json();
      if (response.ok && data.text) {
        const next = pendingList.map((item) => item.id === record.id ? { ...item, description: data.text } : item);
        setPendingList(next);
        updateStorage(next);
      }
    } finally {
      setAiLoadingId('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="heritage-shell" style={{ display: 'grid', placeItems: 'center', padding: 20 }}>
        <form onSubmit={handleLogin} className="heritage-card" style={{ width: 'min(100%, 420px)', padding: 28, display: 'grid', gap: 15 }}>
          <Link href="/" style={{ color: '#a44a3f', textDecoration: 'none', fontWeight: 800 }}>Back to Home</Link>
          <h1 style={{ margin: 0 }}>Admin Login</h1>
          <p style={{ color: '#57534e', margin: 0 }}>Review public submissions before publishing them to the archive.</p>
          <input className="heritage-input" type="password" placeholder="Enter admin password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p style={{ color: '#b91c1c', margin: 0, fontWeight: 800 }}>{error}</p>}
          <button className="heritage-button" type="submit">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="heritage-shell">
      <nav className="heritage-nav">
        <div className="heritage-container heritage-nav-inner">
          <Link className="heritage-brand" href="/"><span className="heritage-logo">SC</span><span style={{ color: '#d4a373', fontWeight: 900 }}>Admin Portal</span></Link>
          <div className="heritage-links">
            <Link className="heritage-link" href="/archive">Archive</Link>
            <Link className="heritage-link" href="/submit-artifact">Contribute</Link>
            <button onClick={() => setIsUnlocked(false)} className="heritage-link" style={{ background: 'transparent', border: 0, cursor: 'pointer' }}>Lock</button>
          </div>
        </div>
      </nav>

      <main className="section-pad">
        <div className="heritage-container">
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 58px)', margin: 0 }}>Approval Queue</h1>
          <p style={{ color: '#57534e', fontSize: 17, lineHeight: 1.7 }}>
            Review community submissions, improve descriptions with AI, then approve or reject records.
          </p>

          <div className="heritage-grid" style={{ marginBottom: 24 }}>
            <Stat label="Pending Records" value={pendingList.length.toString()} />
            <Stat label="AI Admin Assistant" value="On" />
            <Stat label="Moderation Flow" value="Ready" />
          </div>

          {pendingList.length === 0 ? (
            <div className="heritage-card" style={{ padding: 28, textAlign: 'center', color: '#57534e' }}>
              No pending approvals. Submit a sample record from the contribution page to test the workflow.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {pendingList.map((item) => (
                <article className="heritage-card" key={item.id} style={{ padding: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0, 1fr)', gap: 16 }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, background: '#eee' }} />
                    <div>
                      <p style={{ color: '#a44a3f', margin: 0, fontWeight: 900 }}>{item.community} - {item.region}</p>
                      <h2 style={{ margin: '6px 0' }}>{item.title}</h2>
                      <p style={{ color: '#57534e', lineHeight: 1.6 }}>{item.description}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                    <button className="heritage-button secondary" onClick={() => polishRecord(item)} disabled={aiLoadingId === item.id}>
                      {aiLoadingId === item.id ? 'Polishing...' : 'AI Polish'}
                    </button>
                    <button className="heritage-button secondary" onClick={() => handleReject(item.id)}>Reject</button>
                    <button className="heritage-button" onClick={() => handleApprove(item.id)}>Approve</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="heritage-card" style={{ padding: 18 }}>
      <strong style={{ color: '#a44a3f', fontSize: 28 }}>{value}</strong>
      <span style={{ display: 'block', color: '#57534e', fontWeight: 800 }}>{label}</span>
    </div>
  );
}
