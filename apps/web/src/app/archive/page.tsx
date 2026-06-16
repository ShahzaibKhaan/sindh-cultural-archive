'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../supabaseClient';

interface Artifact {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string; // 📸 Image URL string type
}

export default function ArchiveGallery() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArtifacts = async () => {
    setLoading(true);
    
    // Supabase se sirf approved records uthayenge
    const { data, error } = await supabase
      .from('Artifact')
      .select('*')
      .eq('approved', true);

    if (error) {
      console.error('Error fetching data:', error.message);
    } else if (data) {
      setArtifacts(data as Artifact[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  return (
    <div style={{ background: '#F5F2EB', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* 🗺️ INTEGRATED AJRAK BLUE NAVBAR */}
      <nav style={{ 
        background: "#1A2A6C", 
        padding: "15px 30px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ color: "#F5F2EB", fontWeight: "bold", fontSize: "18px" }}>
          Sindh Heritage Vault 🏛️
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/" style={{ color: "#F5F2EB", textDecoration: "none", fontWeight: "500", fontSize: "15px" }}>
            📝 Add Artifact (Public)
          </Link>
          <Link href="/archive" style={{ color: "#F5F2EB", textDecoration: "none", fontWeight: "500", fontSize: "15px" }}>
            🖼️ Public Archive
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1A2A6C', fontSize: '32px', marginBottom: '10px' }}>
            Sindh’s Minority Cultural Heritage Vault
          </h1>
          <p style={{ color: '#A38A73', fontSize: '18px' }}>
            Explore the preserved history, artifacts, and stories of minority communities in Sindh.
          </p>
        </header>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#1A2A6C', fontWeight: 'bold' }}>Loading sacred vault...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {artifacts.length === 0 ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>
                No verified artifacts found. Awaiting admin approval for newly submitted stories!
              </p>
            ) : (
              artifacts.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    background: 'white', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
                    borderTop: '5px solid #B22222',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>
                    {/* 📸 IMAGE RENDERING BLOCK CODE */}
                    {item.imageUrl ? (
                      <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '15px', background: '#eee' }}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            // Agar link toota hua ho toh broken text handle karega
                            (e.target as HTMLImageElement).style.display = 'none';
                            console.log("Image failed to load from URL:", item.imageUrl);
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '150px', background: '#EAEAEA', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', color: '#777', fontSize: '14px' }}>
                        No Image Available 📷
                      </div>
                    )}

                    <h3 style={{ color: '#1A2A6C', marginTop: '0', fontSize: '22px', marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ 
                      color: '#555', 
                      fontSize: '14px', 
                      lineHeight: '1.6', 
                      minHeight: '80px',
                      marginBottom: '20px',
                      wordBreak: 'break-word'
                    }}>
                      {item.description || 'No description provided for this heritage asset.'}
                    </p>
                  </div>
                  
                  <div style={{ 
                    paddingTop: '15px', 
                    borderTop: '1px solid #eee', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '12px', background: '#EAEAEA', padding: '6px 10px', borderRadius: '4px', color: '#333', fontWeight: 'bold' }}>
                      📍 {item.location || 'Unknown Origin'}
                    </span>
                    <button style={{ background: 'transparent', border: 'none', color: '#B22222', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                      Read Story →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}