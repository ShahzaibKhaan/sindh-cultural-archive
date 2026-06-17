'use client';

import Link from 'next/link';
import { useState } from 'react';
import { heritageArtifacts, oralHistories, timelineEpochs } from '../data/heritageData';

const featured = heritageArtifacts.slice(0, 3);

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAiResponse('');
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'search', searchTerm: query }),
      });
      const data = await response.json();
      setAiResponse(response.ok ? data.text : data?.error?.message || 'AI request failed.');
    } catch (error: any) {
      setAiResponse(error.message || 'AI request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heritage-shell">
      <SiteNav />
      <main>
        <section style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container" style={{ minHeight: 'calc(100vh - 68px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.95fr)', gap: 28, alignItems: 'center', padding: '42px 0' }}>
            <div>
              <p style={{ color: '#d4a373', fontWeight: 900, margin: '0 0 12px' }}>Final Year Project</p>
              <h1 style={{ fontSize: 'clamp(38px, 7vw, 78px)', lineHeight: 0.96, margin: 0 }}>
                Digital Archive of Sindh's Minority Cultural Heritage
              </h1>
              <p style={{ color: '#d8d2ca', fontSize: 18, lineHeight: 1.75, maxWidth: 760 }}>
                A preservation platform for documenting, exploring, and presenting minority heritage sites through archive records, maps, timelines, oral histories, public contributions, and AI support.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
                <Link className="heritage-button" href="/archive">Explore Archive</Link>
                <Link className="heritage-button secondary" href="/submit-artifact">Contribute Record</Link>
              </div>
            </div>

            <div className="heritage-card" style={{ background: '#201a17', borderColor: '#3d322c', padding: 18 }}>
              <img src={featured[0].imageUrl} alt={featured[0].title} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ paddingTop: 16 }}>
                <p style={{ color: '#d4a373', fontWeight: 900, margin: 0 }}>Featured Record</p>
                <h2 style={{ color: '#fff', margin: '7px 0' }}>{featured[0].title}</h2>
                <p style={{ color: '#d8d2ca', lineHeight: 1.6 }}>{featured[0].shortDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container">
            <div className="heritage-grid" style={{ marginBottom: 30 }}>
              <Stat label="Heritage Records" value={heritageArtifacts.length.toString()} />
              <Stat label="Timeline Epochs" value={timelineEpochs.length.toString()} />
              <Stat label="Oral Histories" value={oralHistories.length.toString()} />
              <Stat label="AI Features" value="4" />
            </div>

            <div className="heritage-card" style={{ padding: 22 }}>
              <p style={{ color: '#a44a3f', fontWeight: 900, margin: 0 }}>Ask Sindh Heritage AI</p>
              <h2 style={{ margin: '8px 0 12px' }}>Research assistant for visitors and examiners</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 12 }}>
                <input
                  className="heritage-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about Sadhu Bela, Jain temples, Parsi heritage, preservation..."
                />
                <button className="heritage-button" onClick={askAi} disabled={loading}>
                  {loading ? 'Thinking...' : 'Ask AI'}
                </button>
              </div>
              {aiResponse && (
                <div style={{ marginTop: 16, borderLeft: '4px solid #a44a3f', background: '#fff7ed', padding: 16, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: '#eee6d9' }}>
          <div className="heritage-container">
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 46px)', marginTop: 0 }}>Main Modules</h2>
            <div className="heritage-grid">
              <Module title="All Heritage Records" href="/archive" body="Filter and search approved cultural records with AI support." />
              <Module title="Artifact Detail Pages" href="/archive/sadhu-bela-temple" body="View architecture, preservation status, metadata, sources, summary, and translation." />
              <Module title="Interactive Sindh Map" href="/map" body="Explore records by region through a visual map experience." />
              <Module title="Historical Timeline" href="/timeline" body="Story-mode timeline from ancient Sindh to modern preservation." />
              <Module title="Oral Histories" href="/oral-histories" body="Transcripts, summaries, and AI translation for community memories." />
              <Module title="Admin Review" href="/admin-portal-sindh" body="Approve submissions and polish descriptions with AI." />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="heritage-card" style={{ padding: 20 }}>
      <strong style={{ color: '#a44a3f', fontSize: 34 }}>{value}</strong>
      <span style={{ display: 'block', color: '#57534e', fontWeight: 800 }}>{label}</span>
    </div>
  );
}

function Module({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="heritage-card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#57534e', lineHeight: 1.65 }}>{body}</p>
      <strong style={{ color: '#a44a3f' }}>Open Module</strong>
    </Link>
  );
}

function SiteNav() {
  return (
    <nav className="heritage-nav">
      <div className="heritage-container heritage-nav-inner">
        <Link className="heritage-brand" href="/">
          <span className="heritage-logo">SC</span>
          <span>
            <span style={{ display: 'block', color: '#d4a373', fontWeight: 900 }}>Sindh Culture</span>
            <span style={{ display: 'block', color: '#a8a29e', fontSize: 12 }}>Digital Preservation Platform</span>
          </span>
        </Link>
        <div className="heritage-links">
          <Link className="heritage-link" href="/archive">Archive</Link>
          <Link className="heritage-link" href="/map">Map</Link>
          <Link className="heritage-link" href="/timeline">Timeline</Link>
          <Link className="heritage-link" href="/oral-histories">Oral Histories</Link>
          <Link className="heritage-link" href="/submit-artifact">Contribute</Link>
          <Link className="heritage-link" href="/admin-portal-sindh">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
