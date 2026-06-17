'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { user, error: signUpError } = await signUp(email, password);
    
    if (signUpError) {
      setError(signUpError.message || 'Failed to sign up');
    } else if (user) {
      setSuccess(true);
      setTimeout(() => router.push('/auth/signin'), 2000);
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#14110f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, color: '#f8fafc' }}>
        <div style={{ maxWidth: '450px', width: '100%', padding: '40px', backgroundColor: '#1c1816', borderRadius: '12px', border: '1px solid #2e2520', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ color: '#d4a373', fontSize: '24px', margin: '0 0 12px 0' }}>Account Created!</h2>
          <p style={{ color: '#a3a3a3', fontSize: '14px', margin: '0 0 24px 0' }}>Check your email to verify your account, then sign in.</p>
          <p style={{ color: '#7a7a7a', fontSize: '12px' }}>Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#14110f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, color: '#f8fafc' }}>
      <div style={{ maxWidth: '450px', width: '100%', padding: '40px', backgroundColor: '#1c1816', borderRadius: '12px', border: '1px solid #2e2520' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#d4a373', fontSize: '28px', margin: '0 0 8px 0' }}>👤 Create Account</h1>
          <p style={{ color: '#a3a3a3', fontSize: '14px', margin: 0 }}>Join our heritage preservation community</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cccaa7' }}>Password (min 6 characters)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '10px', backgroundColor: '#26201d', border: '1px solid #3d322c', borderRadius: '6px', color: '#e2e8f0', boxSizing: 'border-box', fontFamily: 'sans-serif', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cccaa7' }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#a3a3a3', fontSize: '14px' }}>
          Already have an account? <Link href="/auth/signin" style={{ color: '#d4a373', textDecoration: 'none', fontWeight: '600' }}>Sign in here</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/" style={{ color: '#7a7a7a', textDecoration: 'none', fontSize: '13px' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
