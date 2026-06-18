'use client';

import Link from 'next/link';
import { useState } from 'react';
import { communities } from '../../data/heritageData';
import { askHeritageAi, friendlyAiError } from '../lib/ai-client';

export default function SubmitArtifactPage() {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [community, setCommunity] = useState('Hindu');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const improveDescription = async () => {
    if (!description.trim()) {
      setStatusMessage('Please write a description first.');
      return;
    }
    setAiLoading(true);
    try {
      setDescription(await askHeritageAi({ action: 'polish', text: description }));
    } catch (error) {
      setStatusMessage(friendlyAiError(error));
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !region || !community || !description) {
      setStatusMessage('Please fill all required fields.');
      return;
    }

    const newArtifact = {
      id: Date.now().toString(),
      title,
      region,
      community,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200',
      description,
      year: 'Recent Submission',
      approved: false,
    };

    const existing = JSON.parse(localStorage.getItem('sindh_heritage_vault') || '[]');
    existing.push(newArtifact);
    localStorage.setItem('sindh_heritage_vault', JSON.stringify(existing));

    setTitle('');
    setRegion('');
    setCommunity('Hindu');
    setImageUrl('');
    setDescription('');
    setStatusMessage('Submitted successfully. Your record is waiting for admin approval.');
  };

  return (
    <div className="heritage-shell">
      <Nav />
      <main>
        <section className="section-pad" style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container">
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 62px)', margin: 0 }}>Contribute a Heritage Record</h1>
            <p style={{ color: '#d8d2ca', fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
              Submit a site, story, or cultural memory for admin review. AI can help polish the description before submission.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container two-column">
            <form onSubmit={handleSubmit} className="heritage-card" style={{ padding: 24, display: 'grid', gap: 16 }}>
              {statusMessage && (
                <div style={{ background: '#fff7ed', borderLeft: '4px solid #a44a3f', padding: 14, color: '#1c1917' }}>
                  {statusMessage}
                </div>
              )}

              <label>
                <strong>Artifact or Site Name *</strong>
                <input className="heritage-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Sadhu Bela Temple" />
              </label>

              <div className="form-two">
                <label>
                  <strong>Region or City *</strong>
                  <input className="heritage-input" value={region} onChange={(event) => setRegion(event.target.value)} placeholder="Sukkur" />
                </label>
                <label>
                  <strong>Community *</strong>
                  <select className="heritage-select" value={community} onChange={(event) => setCommunity(event.target.value)}>
                    {communities.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>

              <label>
                <strong>Image URL</strong>
                <input className="heritage-input" type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://..." />
              </label>

              <label>
                <strong>Description and Historical Context *</strong>
                <textarea className="heritage-textarea" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write the story, location, significance, and current condition..." />
              </label>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button type="button" className="heritage-button secondary" onClick={improveDescription} disabled={aiLoading}>
                  {aiLoading ? 'Improving...' : 'AI Improve Description'}
                </button>
                <button type="submit" className="heritage-button">Submit to Admin Queue</button>
              </div>
            </form>

            <aside className="heritage-card" style={{ padding: 22 }}>
              <h2 style={{ marginTop: 0 }}>What makes a strong record?</h2>
              <p style={{ color: '#57534e', lineHeight: 1.7 }}>
                Add location, community, estimated period, current condition, and why the site matters. For your FYP presentation, this shows public participation and admin moderation.
              </p>
              <Link className="heritage-button" href="/admin-portal-sindh">Open Admin Review</Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="heritage-nav">
      <div className="heritage-container heritage-nav-inner">
        <Link className="heritage-brand" href="/"><span className="heritage-logo">SC</span><span style={{ color: '#d4a373', fontWeight: 900 }}>Sindh Culture</span></Link>
        <div className="heritage-links">
          <Link className="heritage-link" href="/archive">Archive</Link>
          <Link className="heritage-link" href="/museum">Museum</Link>
          <Link className="heritage-link" href="/map">Map</Link>
          <Link className="heritage-link" href="/timeline">Timeline</Link>
          <Link className="heritage-link" href="/oral-histories">Oral Histories</Link>
          <Link className="heritage-link" href="/admin-portal-sindh">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
