'use client';

import Link from 'next/link';
import { useState } from 'react';
import { oralHistories } from '../../data/heritageData';
import { askHeritageAi, friendlyAiError } from '../lib/ai-client';

export default function OralHistoriesPage() {
  const [activeId, setActiveId] = useState(oralHistories[0].id);
  const [aiText, setAiText] = useState('');
  const [loading, setLoading] = useState(false);
  const active = oralHistories.find((item) => item.id === activeId) || oralHistories[0];

  const translate = async () => {
    setLoading(true);
    setAiText('');
    try {
      setAiText(await askHeritageAi({ action: 'translate', text: active.transcript }));
    } catch (error) {
      setAiText(friendlyAiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heritage-shell">
      <Nav />
      <main>
        <section className="section-pad" style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container">
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 62px)', margin: 0 }}>Oral History Collection</h1>
            <p style={{ color: '#d8d2ca', fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
              Preserve community memory through narrated accounts, transcripts, summaries, and AI-assisted translation.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container two-column">
            <div className="heritage-card" style={{ padding: 24 }}>
              <p style={{ color: '#a44a3f', fontWeight: 900, margin: 0 }}>{active.location} - {active.language}</p>
              <h2 style={{ fontSize: 34, margin: '8px 0' }}>{active.narrator}</h2>
              <p style={{ color: '#78716c', fontWeight: 800 }}>{active.duration}</p>
              <div style={{ height: 54, background: '#1f2937', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 16px', color: '#fff', margin: '18px 0' }}>
                Audio placeholder for recorded interview
              </div>
              <h3>Transcript</h3>
              <p style={{ color: '#57534e', lineHeight: 1.75 }}>{active.transcript}</p>
              <h3>Archive Summary</h3>
              <p style={{ color: '#57534e', lineHeight: 1.75 }}>{active.summary}</p>
              <button className="heritage-button" onClick={translate} disabled={loading}>
                {loading ? 'Translating...' : 'AI Translation'}
              </button>
              {aiText && (
                <div style={{ marginTop: 18, background: '#fff7ed', borderLeft: '4px solid #a44a3f', padding: 16, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                  {aiText}
                </div>
              )}
            </div>

            <aside style={{ display: 'grid', gap: 12 }}>
              {oralHistories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveId(item.id); setAiText(''); }}
                  className="heritage-card"
                  style={{ padding: 16, textAlign: 'left', cursor: 'pointer', border: item.id === activeId ? '2px solid #a44a3f' : '1px solid #e7dfd2' }}
                >
                  <strong>{item.narrator}</strong>
                  <span style={{ display: 'block', color: '#78716c', marginTop: 5 }}>{item.location} - {item.duration}</span>
                </button>
              ))}
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
        </div>
      </div>
    </nav>
  );
}
