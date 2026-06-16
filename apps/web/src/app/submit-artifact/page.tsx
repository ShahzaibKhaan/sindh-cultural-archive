'use client';

import { useState } from 'react';

export default function SubmitArtifactPage() {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [community, setCommunity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !region || !community || !description) {
      setStatusMessage('❌ Please fill all required fields!');
      return;
    }

    // Default high-quality open-source fallback image if empty
    const finalImg = imageUrl || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600';

    const newArtifact = {
      id: Date.now().toString(),
      title,
      region,
      community,
      imageUrl: finalImg,
      description,
      year: 'Recent Submission',
      approved: false
    };

    // Get existing data from localStorage
    const existing = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    existing.push(newArtifact);
    localStorage.setItem('sindh_heritage_vault', JSON.stringify(existing));

    // Clear inputs & show success
    setTitle(''); setRegion(''); setCommunity(''); setImageUrl(''); setDescription('');
    setStatusMessage('✅ Submitted successfully! Awaiting Admin Approval.');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', margin: 0 }}>
      <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>🏛️ Sindh Heritage Vault</span>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Back to Home</a>
      </nav>

      <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: 'calc(100% - 40px)' }}>
        <h2 style={{ color: '#1e3a8a', margin: '0 0 5px 0', fontSize: '22px' }}>➕ Add New Cultural Artifact</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 20px 0' }}>Submit minority heritage details for admin review.</p>
        
        {statusMessage && (
          <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '15px', fontWeight: '600', backgroundColor: statusMessage.startsWith('❌') ? '#fee2e2' : '#d1fae5', color: statusMessage.startsWith('❌') ? '#991b1b' : '#065f46', fontSize: '14px' }}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Artifact Title / Site Name *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Sadhu Bela Temple" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Region / City *</label>
              <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g., Sukkur" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Community *</label>
              <input type="text" value={community} onChange={(e) => setCommunity(e.target.value)} placeholder="e.g., Hindu" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Image URL (Leave empty for fallback open-source image)</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Description & Historical Context *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write historical context or significance..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '100px', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
            Submit to Admin Queue
          </button>
        </form>
      </div>
    </div>
  );
}