'use client';

import { useState } from 'react';
import { useAuth } from '../app/lib/auth-context';
import Link from 'next/link';

export default function Navbar({ activeTab, setActiveTab }: any) {
  const { user, isAdmin, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav style={{ backgroundColor: '#0f0c0b', padding: '16px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #231c1a', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Left Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ backgroundColor: '#d4a373', color: '#14110f', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>🏛️</div>
        <div>
          <span style={{ color: '#d4a373', fontWeight: '700', fontSize: '19px', display: 'block', lineHeight: '1.1', letterSpacing: '0.3px' }}>Sindh Culture</span>
          <span style={{ color: '#7a7a7a', fontSize: '11px', fontFamily: 'sans-serif', display: 'block', marginTop: '2px' }}>Digital Archive</span>
        </div>
      </div>

      {/* Center Menu */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'sans-serif' }}>
        {[
          { id: 'Home', label: 'Home', icon: '🏠' },
          { id: 'User Stories', label: 'User Stories', icon: '📖' },
          { id: 'Blogs', label: 'Blogs', icon: '📄' },
          { id: 'Artifacts', label: 'Artifacts', icon: '🖼️' },
          ...(user ? [{ id: 'Submit Content', label: 'Submit Content', icon: '📤' }] : [])
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <a
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              href="#"
              style={{
                color: isSelected ? '#d4a373' : '#b3b3b3',
                textDecoration: 'none',
                fontWeight: isSelected ? '600' : '500',
                fontSize: '13.5px',
                padding: '10px 16px',
                borderRadius: '6px',
                backgroundColor: isSelected ? 'rgba(212,163,115,0.06)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                borderBottom: isSelected ? '2px solid #d4a373' : '2px solid transparent',
                cursor: 'pointer'
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </a>
          );
        })}
      </div>

      {/* Right Auth Controls */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontFamily: 'sans-serif' }}>
        {!user ? (
          <>
            <Link href="/auth/signin">
              <button style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🛫</span> Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button style={{ backgroundColor: '#d4a373', color: '#14110f', border: 'none', padding: '9px 18px', borderRadius: '6px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>👤</span> Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} style={{ backgroundColor: '#26201d', color: '#d4a373', border: '1px solid #3d322c', padding: '8px 14px', borderRadius: '6px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                👤 {user.email?.split('@')[0]}
              </button>
              
              {showUserMenu && (
                <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#1c1816', border: '1px solid #3d322c', borderRadius: '6px', padding: '8px 0', marginTop: '4px', minWidth: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                  <button onClick={signOut} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', color: '#e2e8f0', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'sans-serif' }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        
        {isAdmin && (
          <Link href="/admin-portal-sindh">
            <button style={{ backgroundColor: '#ef4444', color: 'white', padding: '9px 18px', borderRadius: '6px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer', border: 'none' }}>
              🔐 Admin
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
