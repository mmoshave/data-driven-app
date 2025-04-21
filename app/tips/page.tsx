'use client'

import { FaOilCan, FaSnowflake, FaCarSide, FaBatteryFull, FaFilter, FaSoap, FaTools, FaLightbulb, FaTachometerAlt } from 'react-icons/fa'

const tips = [
  {
    icon: <FaOilCan size={20} />, 
    title: 'Change Oil Regularly',
    desc: 'Use manufacturer-recommended oil and follow service intervals.',
    extra: 'Fresh oil keeps your engine lubricated and running efficiently. Aim for every 3,000–7,500 miles depending on vehicle and oil type.',
  },
  {
    icon: <FaSnowflake size={20} />, 
    title: 'Check Coolant',
    desc: 'Top off or flush coolant to avoid overheating your engine.',
    extra: 'Coolant helps regulate engine temperature. Flush your system every 30,000–50,000 miles and check levels monthly.',
  },
  {
    icon: <FaCarSide size={20} />, 
    title: 'Tire Care',
    desc: 'Rotate tires every 5k-8k miles and check air pressure monthly.',
    extra: 'Properly inflated and rotated tires improve traction, extend tire life, and optimize fuel efficiency.',
  },
  {
    icon: <FaBatteryFull size={20} />, 
    title: 'Battery Maintenance',
    desc: 'Clean terminals and check battery health every 6–12 months.',
    extra: 'A weak battery can leave you stranded. Use a voltmeter to check charge and look for corrosion around terminals.',
  },
  {
    icon: <FaFilter size={20} />, 
    title: 'Air Filters',
    desc: 'Replace engine and cabin filters annually or as needed.',
    extra: 'Clean filters improve air quality and performance. Check them every 12,000–15,000 miles or if airflow seems reduced.',
  },
  {
    icon: <FaSoap size={20} />, 
    title: 'Wash & Protect',
    desc: 'Wash your car regularly and apply wax to preserve paint and prevent rust.',
    extra: 'Frequent washing removes salt, bugs, and grime that corrode paint. Wax every 3 months for maximum protection.',
  },
  {
    icon: <FaTachometerAlt size={20} />, 
    title: 'Check Engine Light',
    desc: 'Address warning lights promptly by consulting a mechanic or code reader.',
    extra: 'Ignoring this light can lead to serious engine issues. Always diagnose and resolve the root cause early.',
  },
  {
    icon: <FaLightbulb size={20} />, 
    title: 'Lights & Signals',
    desc: 'Inspect headlights, brake lights, and turn signals regularly.',
    extra: 'Replace burnt-out bulbs and clean lenses to maintain road visibility and safety.',
  },
  {
    icon: <FaTools size={20} />, 
    title: 'Coolant & Fluids',
    desc: 'Check transmission, brake, power steering, and windshield fluids.',
    extra: 'Keep fluid levels within recommended ranges to prevent wear and ensure proper operation of critical systems.',
  }
]

export default function TipsPage() {
  return (
    <main style={{
      backgroundColor: '#0b1120',
      color: '#fff',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
      }}>
        Maintenance Tips
      </h1>
      <p style={{
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '0.95rem',
        marginBottom: '2rem'
      }}>
        Keep your vehicle running like new with these essential care tips.
      </p>

      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        display: 'grid',
        gap: '1.5rem',
      }}>
        {tips.map((tip, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            backgroundColor: '#111',
            padding: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
            transition: 'transform 0.2s ease, background 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111')}
          >
            <div style={{ color: '#3b82f6', marginTop: '5px' }}>{tip.icon}</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{tip.title}</h3>
              <p style={{ color: '#ccc', marginBottom: '0.25rem' }}>{tip.desc}</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{tip.extra}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
