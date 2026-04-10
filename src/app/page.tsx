'use client';

import dynamicImport from 'next/dynamic';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamicImport(() => import('swagger-ui-react'), { ssr: false });

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('/api/swagger-auth', { credentials: 'include' });
        const data = await r.json();
        if (!cancelled && data.authenticated) setUnlocked(true);
      } catch {
        /* stay locked */
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError('');
      setSubmitting(true);
      try {
        const r = await fetch('/api/swagger-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Sign-in failed');
          return;
        }
        setUnlocked(true);
        setPassword('');
      } catch {
        setError('Network error');
      } finally {
        setSubmitting(false);
      }
    },
    [username, password]
  );

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#e0e0e0',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Loading…
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="swagger-gate-title"
          style={{
            width: '100%',
            maxWidth: 380,
            margin: 16,
            padding: 28,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h1
            id="swagger-gate-title"
            style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, color: '#fff' }}
          >
            API documentation
          </h1>
          <p style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
            Enter credentials to open Swagger UI.
          </p>
          <form onSubmit={onSubmit}>
            <label style={{ display: 'block', marginBottom: 14, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
              Username
              <input
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.25)',
                  color: '#fff',
                  fontSize: 15,
                  boxSizing: 'border-box',
                }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: 18, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.25)',
                  color: '#fff',
                  fontSize: 15,
                  boxSizing: 'border-box',
                }}
              />
            </label>
            {error ? (
              <p style={{ margin: '0 0 12px', fontSize: 13, color: '#f87171' }} role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: 'none',
                background: submitting ? 'rgba(99,102,241,0.5)' : '#6366f1',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: submitting ? 'wait' : 'pointer',
              }}
            >
              {submitting ? 'Signing in…' : 'Open docs'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI url="/api/openapi" docExpansion="list" defaultModelsExpandDepth={-1} />
    </div>
  );
}
