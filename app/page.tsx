'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Welcome to Your Car Guide</h1>

      <Image
        src="/hero.jpg"
        alt="Porsche Hero"
        width={880}
        height={1200}
        style={{ width: '60%', height: 'auto' }}
      />

      {/* Feature Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <FeatureCard title="My Garage" image="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=500&q=80" href="/garage" />
        <FeatureCard title="Maintenance Tips" image="/maintenance.jpg" href="/tips" />
        <FeatureCard title="Explore Brands" image="/brands.jpg" href="/brands" />
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#ccc' }}>
        This app helps you explore automotive essentials and manage your personal car inventory. Learn car basics, brands, and stay on top of maintenance, all in one place.
      </p>
    </main>
  )
}

function FeatureCard({ title, image, href }: { title: string, image: string, href: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: '240px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget as HTMLDivElement
          target.style.transform = 'scale(1.05)'
          target.style.boxShadow = '0 6px 16px rgba(255,255,255,0.3)'
        }}
        onMouseOut={(e) => {
          const target = e.currentTarget as HTMLDivElement
          target.style.transform = 'scale(1)'
          target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ position: 'relative', height: '180px' }}>
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ background: '#111', padding: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>{title}</div>
      </div>
    </Link>
  )
}
