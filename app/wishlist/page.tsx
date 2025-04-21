'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const builds = [
  {
    id: 1,
    image: '/gtr-r35.jpeg',
    title: 'Nissan GT-R R35 (2017)',
    type: 'Track Build',
    desc: 'Lowered on coilovers, full titanium exhaust, tuned to 650hp.',
  },
  {
    id: 2,
    image: '/rx7-fd.jpeg',
    title: 'Mazda RX-7 FD (1994)',
    type: 'Show Car',
    desc: 'Widebody kit, candy red paint, custom interior and sound.',
  },
  {
    id: 3,
    image: '/supra-mk4.jpeg',
    title: 'Toyota Supra MK4 (1998)',
    type: 'Street Monster',
    desc: '2JZ with single turbo pushing 800hp on pump gas.',
  },
  {
    id: 4,
    image: '/mustang-gt.jpeg',
    title: 'Ford Mustang GT (2020)',
    type: 'Drift Build',
    desc: 'Angle kit, roll cage, hydraulic handbrake, 305 rear tires.',
  },
  {
    id: 5,
    image: '/civic-eg.jpeg',
    title: 'Honda Civic EG Hatch (1995)',
    type: 'Daily Driver',
    desc: 'K24 swap, slammed on white TE37s, clean JDM look.',
  },
  {
    id: 6,
    image: '/camaro-ss.jpeg',
    title: 'Chevy Camaro SS (2018)',
    type: 'Street/Strip',
    desc: 'Procharger setup, drag radials, full bolt-ons.',
  },
]

export default function WishlistPage() {
  const { user } = useUser()

  return (
    <main style={{ padding: '2rem', backgroundColor: '#0b1120', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem'
      }}>
        Car Builds Gallery
      </h1>

      <p style={{
        textAlign: 'center',
        color: '#94a3b8',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        Browse some iconic car builds for inspiration. No storage, just straight-up car love.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {builds.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '1rem',
              borderRadius: '1rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '160px',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '0.75rem',
            }}>
              <Image src={car.image} alt={car.title} layout="fill" objectFit="cover" />
            </div>

            <h2 style={{
              fontWeight: 'bold',
              fontSize: '1.15rem',
              marginBottom: '0.25rem'
            }}>
              {car.title}
            </h2>
            <p style={{
              color: '#38bdf8',
              fontSize: '0.9rem',
              marginBottom: '0.25rem'
            }}>
              {car.type}
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#cbd5e1',
              marginBottom: '0.75rem'
            }}>
              {car.desc}
            </p>

            <Link
              href={`https://www.google.com/search?q=${encodeURIComponent(car.title)}`}
              target="_blank"
              style={{
                display: 'inline-block',
                color: '#0ea5e9',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
