'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { heritageArtifacts } from '../../data/heritageData';

const mapPoints = [
  { region: 'Karachi', x: 118, y: 332 },
  { region: 'Sukkur', x: 160, y: 96 },
  { region: 'Tharparkar', x: 280, y: 290 },
  { region: 'Sehwan', x: 188, y: 205 },
];

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState('Karachi');
  const records = useMemo(
    () => heritageArtifacts.filter((item) => item.region === selectedRegion),
    [selectedRegion]
  );

  return (
    <div className="heritage-shell">
      <Nav />
      <main>
        <section className="section-pad" style={{ background: '#14110f', color: '#fff' }}>
          <div className="heritage-container">
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 62px)', margin: 0 }}>Interactive Sindh Map</h1>
            <p style={{ color: '#d8d2ca', fontSize: 17, lineHeight: 1.7, maxWidth: 720 }}>
              Select a city or region to discover documented minority heritage records across Sindh.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="heritage-container two-column">
            <div className="heritage-card" style={{ padding: 22, background: '#201a17', color: '#fff' }}>
              <svg viewBox="0 0 400 420" style={{ width: '100%', minHeight: 360 }}>
                <rect x="0" y="0" width="400" height="420" rx="8" fill="#2b2420" />
                <path d="M165 35 C230 70 260 145 244 210 C286 238 322 285 300 348 C251 389 168 384 117 346 C70 311 83 250 111 212 C84 151 103 74 165 35 Z" fill="#705044" stroke="#d4a373" strokeWidth="3" />
                {mapPoints.map((point) => {
                  const isActive = selectedRegion === point.region;
                  return (
                    <g key={point.region} onClick={() => setSelectedRegion(point.region)} style={{ cursor: 'pointer' }}>
                      <circle cx={point.x} cy={point.y} r={isActive ? 18 : 13} fill={isActive ? '#f5c77f' : '#d4a373'} stroke="#fff" strokeWidth="2" />
                      <text x={point.x} y={point.y + 34} fill="#fff" fontSize="13" textAnchor="middle" fontWeight="700">{point.region}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <aside className="heritage-card" style={{ padding: 22 }}>
              <p style={{ color: '#a44a3f', fontWeight: 900, margin: 0 }}>Selected Region</p>
              <h2 style={{ marginTop: 6 }}>{selectedRegion}</h2>
              <p style={{ color: '#57534e', lineHeight: 1.6 }}>
                {records.length} verified record{records.length === 1 ? '' : 's'} connected to this location.
              </p>
              <div style={{ display: 'grid', gap: 12 }}>
                {records.map((item) => (
                  <Link href={`/archive/${item.slug}`} key={item.id} style={{ textDecoration: 'none', border: '1px solid #e7dfd2', borderRadius: 8, padding: 14, display: 'block' }}>
                    <strong>{item.title}</strong>
                    <span style={{ display: 'block', color: '#78716c', fontSize: 13, marginTop: 4 }}>{item.community} heritage - {item.preservationStatus}</span>
                  </Link>
                ))}
              </div>
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
