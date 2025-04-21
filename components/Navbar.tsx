'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#0f172a',
      padding: '1rem 2rem',
      color: '#fff',
      boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      {/* Left: Logo */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
        <Link href="/" style={{
          textDecoration: 'none',
          color: '#38bdf8',
          transition: 'color 0.2s ease'
        }}>
          AutoVault
        </Link>
      </div>

      {/* Center: Nav links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flex: 1
      }}>
        {['/garage', '/wishlist', '/tips', '/brands'].map((path, i) => {
          const label = ['Garage', 'Wishlist', 'Tips', 'Brands'][i];
          return (
            <Link
              key={path}
              href={path}
              style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
              onMouseLeave={e => e.currentTarget.style.color = '#e2e8f0'}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right: Auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <SignedIn>
          <div
            style={{
              borderRadius: '50%',
              border: '2px solid #38bdf8',
              boxShadow: '0 0 0 0 #38bdf8',
              transition: 'box-shadow 0.2s ease',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px 2px #38bdf899')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 #38bdf8')}
          >
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button style={{
              background: 'linear-gradient(90deg, #1d4ed8, #0ea5e9)',
              color: '#fff',
              fontWeight: 600,
              padding: '0.6rem 1.5rem',
              borderRadius: '999px',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 12px #2563eb55',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px #0ea5e999';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px #2563eb55';
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}
