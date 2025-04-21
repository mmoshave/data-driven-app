'use client'
import Image from 'next/image'

export default function BrandsPage() {
  const brands = [
    {
      logo: '/ford.png',
      name: 'Ford',
      desc: 'Trusted for its toughness, innovation, and the legendary Mustang.',
      url: 'https://www.ford.com'
    },
    {
      logo: '/toyota.png',
      name: 'Toyota',
      desc: 'World-renowned for reliability, fuel efficiency, and longevity.',
      url: 'https://www.toyota.com'
    },
    {
      logo: '/bmw.png',
      name: 'BMW',
      desc: 'Premium German engineering built for driving performance.',
      url: 'https://www.bmwusa.com'
    },
    {
      logo: '/chevrolet.png',
      name: 'Chevrolet',
      desc: 'Iconic American brand known for muscle cars and value.',
      url: 'https://www.chevrolet.com'
    },
    {
      logo: '/tesla.png',
      name: 'Tesla',
      desc: 'Revolutionizing electric vehicles with high-tech and autonomy.',
      url: 'https://www.tesla.com'
    },
    {
      logo: '/honda.png',
      name: 'Honda',
      desc: 'Globally trusted for its dependable engines and practical design.',
      url: 'https://www.honda.com'
    },
    {
      logo: '/porsche.png',
      name: 'Porsche',
      desc: 'Luxury performance brand delivering precision and speed.',
      url: 'https://www.porsche.com'
    },
    {
      logo: '/audi.png',
      name: 'Audi',
      desc: 'German engineering excellence with a focus on innovation and design.',
      url: 'https://www.audiusa.com'
    },
    {
      logo: '/nissan.png',
      name: 'Nissan',
      desc: 'Known for innovation, sporty models, and efficient engineering.',
      url: 'https://www.nissanusa.com'
    }
  ]

  return (
    <main style={{
      backgroundColor: '#0b1120',
      color: '#fff',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }}>
        Explore Automotive Brands
      </h1>
      <p style={{
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '1rem',
        marginBottom: '2rem'
      }}>
        Discover top car brands and what makes them stand out.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {brands.map((brand, index) => (
          <a
            key={index}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              backgroundColor: '#111',
              padding: '2rem 1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)'
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain', margin: '0 auto' }}
                />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {brand.name}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {brand.desc}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
