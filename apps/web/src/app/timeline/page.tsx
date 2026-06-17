'use client';

import Link from 'next/link';
import { useState } from 'react';
import { timelineEpochs } from '../../data/heritageData';

export default function TimelinePage() {
  const [active, setActive] = useState(0);
  const epoch = timelineEpochs[active];

  return (
    <div className="heritage-shell">
      <Nav />
      <main>
        <section className="section-pad" style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container">
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 62px)', margin: 0 }}>Historical Timeline</h1>
            <p style={{ color: '#d8d2ca', fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
              A story-mode view of Sindh's cultural layers, from ancient urban civilization to digital preservation.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container">
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, marginBottom: 24 }}>
              {timelineEpochs.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  style={{
                    minWidth: 185,
                    textAlign: 'left',
                    border: active === index ? '2px solid #a44a3f' : '1px solid #e7dfd2',
                    background: active === index ? '#fff7ed' : '#fff',
                    borderRadius: 8,
                    padding: 14,
                    cursor: 'pointer',
                  }}
                >
                  <strong style={{ color: '#a44a3f' }}>{item.era}</strong>
                  <span style={{ display: 'block', marginTop: 6 }}>{item.title}</span>
                </button>
              ))}
            </div>

            <article className="heritage-card" style={{ padding: 28 }}>
              <p style={{ color: '#a44a3f', fontWeight: 900, margin: 0 }}>{epoch.era}</p>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', margin: '8px 0' }}>{epoch.title}</h2>
              <p style={{ color: '#78716c', fontWeight: 800 }}>{epoch.site}</p>
              <p style={{ color: '#57534e', fontSize: 18, lineHeight: 1.75, maxWidth: 850 }}>{epoch.detail}</p>
            </article>
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
          <Link className="heritage-link" href="/map">Map</Link>
          <Link className="heritage-link" href="/timeline">Timeline</Link>
          <Link className="heritage-link" href="/oral-histories">Oral Histories</Link>
        </div>
      </div>
    </nav>
  );
}
