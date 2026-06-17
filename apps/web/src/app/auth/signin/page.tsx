'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { user, error: signInError } = await signIn(email, password);
    
    if (signInError) {
      setError(signInError.message || 'Failed to sign in');
    } else if (user) {
      router.push('/');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#14110f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, color: '#f8fafc' }}>
      <div style={{ maxWidth: '450px', width: '100%', padding: '40px', backgroundColor: '#1c1816', borderRadius: '12px', border: '1px solid #2e2520' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#d4a373', fontSize: '28px', margin: '0 0 8px 0' }}>🛫 Sign In</h1>
          <p style={{ color: '#a3a3a3', fontSize: '14px', margin: 0 }}>Access your heritage archive account</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cccaa7' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{ width: '100%', padding: '10px', backgroundColor: '#26201d', border: '1px solid #3d322c', borderRadius: '6px', color: '#e2e8f0', boxSizing: 'border-box', fontFamily: 'sans-serif', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cccaa7' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '10px', backgroundColor: '#26201d', border: '1px solid #3d322c', borderRadius: '6px', color: '#e2e8f0', boxSizing: 'border-box', fontFamily: 'sans-serif', fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#d4a373', color: '#14110f', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#a3a3a3', fontSize: '14px' }}>
          Don't have an account? <Link href="/auth/signup" style={{ color: '#d4a373', textDecoration: 'none', fontWeight: '600' }}>Sign up here</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/" style={{ color: '#7a7a7a', textDecoration: 'none', fontSize: '13px' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
