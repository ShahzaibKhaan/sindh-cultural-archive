'use client';

import { useState } from 'react';
import { supabase } from '../app/lib/supabase-client'; // Apne client ka sahi path check karlein

export default function SindhMap() {
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSpotClick = async (spotId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cultural_spots')
      .select('*')
      .eq('spot_id', spotId)
      .single();

    if (error) {
      console.error("Error fetching spot data:", error);
      setSelectedSpot({
        name: spotId.toUpperCase(),
        description: "Is jagah ka data abhi database mein add nahi kia gaya."
      });
    } else {
      setSelectedSpot(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDE: MAP */}
      <div style={{ flex: 1, backgroundColor: '#1c1816', padding: '30px', borderRadius: '12px', border: '1px solid #3d322c', textAlign: 'center' }}>
        <h3 style={{ color: '#d4a373', marginTop: 0 }}>📍 Interactive Sindh Map</h3>
        <p style={{ color: '#7a7a7a', fontSize: '13px' }}>Kisi bhi sheher ya hotspot par click kar ke history dekhein</p>
        
        {/* Mock Interactive SVG Map */}
        <svg viewBox="0 0 400 400" style={{ width: '100%', maxHeight: '400px', marginTop: '20px' }}>
          {/* Background / Base Map Outline */}
          <rect width="400" height="400" fill="#26201d" rx="10" />
          
          {/* Hotspot 1: Karachi */}
          <circle 
            cx="100" cy="320" r="15" 
            fill="#d4a373" stroke="#fff" strokeWidth="2"
            style={{ cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => handleSpotClick('karachi')}
            className="map-pin"
          />
          <text x="100" y="350" fill="#b3b3b3" fontSize="12" textAnchor="middle">Karachi</text>

          {/* Hotspot 2: Larkana (Mohenjo-daro) */}
          <circle 
            cx="150" cy="120" r="15" 
            fill="#d4a373" stroke="#fff" strokeWidth="2"
            style={{ cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => handleSpotClick('larkana')}
          />
          <text x="150" y="95" fill="#b3b3b3" fontSize="12" textAnchor="middle">Larkana</text>

          {/* Hotspot 3: Thatta */}
          <circle 
            cx="160" cy="290" r="15" 
            fill="#d4a373" stroke="#fff" strokeWidth="2"
            style={{ cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => handleSpotClick('thatta')}
          />
          <text x="190" y="310" fill="#b3b3b3" fontSize="12" textAnchor="middle">Thatta</text>
        </svg>
      </div>

      {/* RIGHT SIDE: INFORMATION PANEL */}
      <div style={{ width: '350px', backgroundColor: '#14110f', padding: '25px', borderRadius: '12px', border: '1px solid #231c1a', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <p style={{ color: '#d4a373', textAlign: 'center' }}>Loading history...</p>
        ) : selectedSpot ? (
          <div>
            <span style={{ color: '#d4a373', fontSize: '12px', fontWeight: 'bold' }}>HISTORICAL ARCHIVE</span>
            <h2 style={{ color: '#fff', margin: '8px 0 15px 0' }}>{selectedSpot.name}</h2>
            {selectedSpot.famous_for && (
              <p style={{ fontSize: '13px', color: '#e63946', margin: '0 0 15px 0' }}>⭐ <b>Famous For:</b> {selectedSpot.famous_for}</p>
            )}
            <p style={{ color: '#b3b3b3', fontSize: '14px', lineHeight: '1.6' }}>{selectedSpot.description}</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#7a7a7a' }}>
            <span style={{ fontSize: '40px' }}>🏛️</span>
            <p>Map par kisi bhi spot ko select karein uski digital history explore karne ke liye.</p>
          </div>
        )}
      </div>

    </div>
  );
}