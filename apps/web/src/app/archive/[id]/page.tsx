'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { getArtifactBySlug } from '../../../data/heritageData';
import { askHeritageAi, friendlyAiError } from '../../lib/ai-client';

type Props = {
  params: { id: string };
};

export default function ArtifactDetailPage({ params }: Props) {
  const artifact = getArtifactBySlug(params.id);
  const [aiText, setAiText] = useState('');
  const [loadingAction, setLoadingAction] = useState('');

  if (!artifact) notFound();

  const runAi = async (action: 'summary' | 'translate') => {
    setLoadingAction(action);
    setAiText('');
    try {
      setAiText(await askHeritageAi({ action, text: artifact.description }));
    } catch (error) {
      setAiText(friendlyAiError(error));
    } finally {
      setLoadingAction('');
    }
  };

  return (
    <div className="heritage-shell">
      <SimpleNav />
      <main>
        <section style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container" style={{ padding: '42px 0 34px' }}>
            <Link href="/archive" style={{ color: '#d4a373', textDecoration: 'none', fontWeight: 800 }}>Back to Archive</Link>
            <div className="detail-hero" style={{ marginTop: 22 }}>
              <div>
                <p style={{ color: '#d4a373', margin: '0 0 10px', fontWeight: 900 }}>{artifact.community} Heritage</p>
                <h1 style={{ fontSize: 'clamp(34px, 6vw, 66px)', lineHeight: 1, margin: 0 }}>{artifact.title}</h1>
                <p style={{ color: '#d8d2ca', fontSize: 18, lineHeight: 1.7 }}>{artifact.shortDescription}</p>
              </div>
              <img src={artifact.imageUrl} alt={artifact.title} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 8, border: '1px solid #3d322c' }} />
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container two-column">
            <article className="heritage-card" style={{ padding: 26 }}>
              <h2 style={{ marginTop: 0 }}>Historical Context</h2>
              <p style={{ color: '#57534e', lineHeight: 1.75 }}>{artifact.description}</p>
              <h3>Architecture</h3>
              <p style={{ color: '#57534e', lineHeight: 1.75 }}>{artifact.architecture}</p>
              <h3>Current Condition</h3>
              <p style={{ color: '#57534e', lineHeight: 1.75 }}>{artifact.currentCondition}</p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <button className="heritage-button" onClick={() => runAi('summary')} disabled={!!loadingAction}>
                  {loadingAction === 'summary' ? 'Generating...' : 'AI Summary'}
                </button>
                <button className="heritage-button secondary" onClick={() => runAi('translate')} disabled={!!loadingAction}>
                  {loadingAction === 'translate' ? 'Translating...' : 'AI Translation'}
                </button>
              </div>

              {aiText && (
                <div style={{ marginTop: 20, background: '#fff7ed', borderLeft: '4px solid #a44a3f', padding: 16, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                  {aiText}
                </div>
              )}
            </article>

            <aside className="heritage-card" style={{ padding: 22 }}>
              <h2 style={{ marginTop: 0 }}>Record Metadata</h2>
              <Info label="Region" value={artifact.region} />
              <Info label="District" value={artifact.district} />
              <Info label="Community" value={artifact.community} />
              <Info label="Period" value={artifact.year} />
              <Info label="Coordinates" value={artifact.coordinates} />
              <Info label="Status" value={artifact.preservationStatus} />
              <h3>Sources</h3>
              <ul style={{ paddingLeft: 18, color: '#57534e', lineHeight: 1.6 }}>
                {artifact.sources.map((source) => <li key={source}>{source}</li>)}
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderTop: '1px solid #e7dfd2', padding: '12px 0' }}>
      <span style={{ display: 'block', color: '#78716c', fontSize: 12, fontWeight: 800 }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SimpleNav() {
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
