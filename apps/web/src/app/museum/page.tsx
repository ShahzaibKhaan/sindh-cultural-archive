'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { heritageArtifacts } from '../../data/heritageData';

const museumRooms = [
  {
    id: 'river',
    name: 'River Shrine Gallery',
    theme: 'Indus River, pilgrimage, and living worship',
    communities: ['Hindu', 'Sufi'],
    ambience: '#20302d',
  },
  {
    id: 'desert',
    name: 'Thar Stone Corridor',
    theme: 'Jain temples, desert routes, and carved memory',
    communities: ['Jain'],
    ambience: '#4a342a',
  },
  {
    id: 'urban',
    name: 'Karachi Plurality Hall',
    theme: 'Christian, Sikh, Parsi, and urban minority institutions',
    communities: ['Christian', 'Sikh', 'Parsi'],
    ambience: '#243044',
  },
];

export default function MuseumPage() {
  const [activeRoomId, setActiveRoomId] = useState(museumRooms[0].id);
  const activeRoom = museumRooms.find((room) => room.id === activeRoomId) || museumRooms[0];
  const exhibits = useMemo(
    () => heritageArtifacts.filter((artifact) => activeRoom.communities.includes(artifact.community)),
    [activeRoom]
  );
  const [activeArtifactSlug, setActiveArtifactSlug] = useState(exhibits[0]?.slug || heritageArtifacts[0].slug);
  const activeArtifact = exhibits.find((artifact) => artifact.slug === activeArtifactSlug) || exhibits[0] || heritageArtifacts[0];

  const changeRoom = (roomId: string) => {
    const room = museumRooms.find((item) => item.id === roomId) || museumRooms[0];
    const firstArtifact = heritageArtifacts.find((artifact) => room.communities.includes(artifact.community));
    setActiveRoomId(room.id);
    if (firstArtifact) setActiveArtifactSlug(firstArtifact.slug);
  };

  return (
    <div className="heritage-shell">
      <Nav />
      <main>
        <section style={{ background: '#0f0c0b', color: '#fff' }}>
          <div className="heritage-container" style={{ padding: '46px 0 28px' }}>
            <p style={{ color: '#d4a373', fontWeight: 900, margin: '0 0 10px' }}>Virtual Museum Experience</p>
            <h1 style={{ fontSize: 'clamp(34px, 7vw, 76px)', lineHeight: 0.98, margin: 0, maxWidth: 900 }}>
              Walk through curated rooms of Sindh's shared heritage.
            </h1>
            <p style={{ color: '#d8d2ca', fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
              A museum-style exhibit viewer for examiners and visitors: room transitions, focused artifacts, preservation metadata, and direct archive links.
            </p>
          </div>
        </section>

        <section style={{ background: activeRoom.ambience, color: '#fff', transition: 'background 0.3s ease' }}>
          <div className="heritage-container museum-layout" style={{ padding: '28px 0 40px' }}>
            <aside className="museum-sidebar">
              <p style={{ color: '#d4a373', fontWeight: 900, margin: '0 0 12px' }}>Museum Rooms</p>
              {museumRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => changeRoom(room.id)}
                  className="museum-room-button"
                  style={{
                    borderColor: room.id === activeRoomId ? '#d4a373' : 'rgba(255,255,255,0.16)',
                    background: room.id === activeRoomId ? 'rgba(212,163,115,0.16)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <strong>{room.name}</strong>
                  <span>{room.theme}</span>
                </button>
              ))}
            </aside>

            <div className="museum-stage">
              <div className="museum-wall">
                {exhibits.map((artifact) => (
                  <button
                    key={artifact.slug}
                    onClick={() => setActiveArtifactSlug(artifact.slug)}
                    className="museum-frame"
                    style={{
                      borderColor: artifact.slug === activeArtifact.slug ? '#f5c77f' : 'rgba(255,255,255,0.24)',
                    }}
                  >
                    <img src={artifact.imageUrl} alt={artifact.title} />
                    <span>{artifact.title}</span>
                  </button>
                ))}
              </div>

              <article className="museum-focus">
                <img src={activeArtifact.imageUrl} alt={activeArtifact.title} />
                <div>
                  <p style={{ color: '#d4a373', fontWeight: 900, margin: 0 }}>{activeArtifact.community} Exhibit</p>
                  <h2 style={{ margin: '8px 0', fontSize: 'clamp(26px, 4vw, 42px)' }}>{activeArtifact.title}</h2>
                  <p style={{ color: '#e7dfd2', lineHeight: 1.7 }}>{activeArtifact.shortDescription}</p>
                  <div className="museum-meta">
                    <span>{activeArtifact.region}</span>
                    <span>{activeArtifact.year}</span>
                    <span>{activeArtifact.preservationStatus}</span>
                  </div>
                  <Link className="heritage-button" href={`/archive/${activeArtifact.slug}`}>
                    Open Full Archive Record
                  </Link>
                </div>
              </article>
            </div>
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
        <Link className="heritage-brand" href="/">
          <span className="heritage-logo">SC</span>
          <span style={{ color: '#d4a373', fontWeight: 900 }}>Sindh Culture</span>
        </Link>
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
