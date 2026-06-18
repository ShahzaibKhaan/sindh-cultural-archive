'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { communities, heritageArtifacts } from '../../data/heritageData';
import { askHeritageAi, friendlyAiError } from '../lib/ai-client';

export default function ArchivePage() {
  const [query, setQuery] = useState('');
  const [community, setCommunity] = useState('All');
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return heritageArtifacts.filter((item) => {
      const matchesCommunity = community === 'All' || item.community === community;
      const searchable = `${item.title} ${item.region} ${item.community} ${item.description}`.toLowerCase();
      return matchesCommunity && (!q || searchable.includes(q));
    });
  }, [query, community]);

  const askAi = async () => {
    if (!query.trim()) return;
    setLoadingAi(true);
    setAiResponse('');
    try {
      setAiResponse(await askHeritageAi({ action: 'search', searchTerm: query }));
    } catch (error) {
      setAiResponse(friendlyAiError(error));
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="heritage-shell">
      <SiteNav />
      <main>
        <section className="section-pad" style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container">
            <p style={{ color: '#d4a373', fontWeight: 800, margin: '0 0 10px' }}>Digital Archive</p>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1, margin: 0, maxWidth: 860 }}>
              Explore Sindh's minority cultural heritage records.
            </h1>
            <p style={{ color: '#d8d2ca', fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
              Search documented sites by community, location, preservation status, and historical importance.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container">
            <div className="heritage-card" style={{ padding: 20, marginBottom: 24 }}>
              <div className="archive-search-row">
                <input
                  className="heritage-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Sadhu Bela, Jain temples, Karachi, Sufi..."
                />
                <select className="heritage-select" value={community} onChange={(event) => setCommunity(event.target.value)}>
                  {communities.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <button className="heritage-button" onClick={askAi} disabled={loadingAi}>
                  {loadingAi ? 'Thinking...' : 'Ask Heritage AI'}
                </button>
              </div>
              {aiResponse && (
                <div style={{ marginTop: 16, borderLeft: '4px solid #a44a3f', background: '#fff7ed', padding: 16, lineHeight: 1.65 }}>
                  <strong>AI Cultural Guide</strong>
                  <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{aiResponse}</div>
                </div>
              )}
            </div>

            <div className="heritage-grid">
              {filtered.map((item) => (
                <article className="heritage-card" key={item.id}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 210, objectFit: 'cover' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <span style={{ color: '#a44a3f', fontWeight: 800, fontSize: 13 }}>{item.community}</span>
                      <span style={{ color: '#78716c', fontSize: 13 }}>{item.preservationStatus}</span>
                    </div>
                    <h2 style={{ margin: '0 0 8px', color: '#1c1917', fontSize: 22 }}>{item.title}</h2>
                    <p style={{ color: '#57534e', lineHeight: 1.6, minHeight: 78 }}>{item.shortDescription}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                      <span style={{ color: '#78716c', fontSize: 13 }}>{item.region}</span>
                      <Link className="heritage-button" href={`/archive/${item.slug}`}>Read Story</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
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
          <Link className="heritage-link" href="/museum">Museum</Link>
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
