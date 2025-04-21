'use client'
import { SignInButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  engine: string
  mileage: number
  image: string
}

export default function GaragePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    engine: '',
    mileage: '',
    image: '',
  })

  const fetchVehicles = async () => {
    const res = await fetch('/api/garage', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      setVehicles(data)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/garage/${editingId}` : '/api/garage'

    const cleanMileage = parseInt(formData.mileage.replace(/,/g, ''), 10)

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        mileage: cleanMileage,
        year: parseInt(formData.year, 10),
      }),
    })

    if (res.ok) {
      setFormData({ make: '', model: '', year: '', engine: '', mileage: '', image: '' })
      setEditingId(null)
      setShowForm(false)
      fetchVehicles()
    } else {
      alert(`${method} failed`)
    }
  }

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteTargetId) return
    const res = await fetch(`/api/garage/${deleteTargetId}`, { method: 'DELETE' })
    if (res.ok) fetchVehicles()
    else alert('Delete failed')
    setShowDeleteModal(false)
    setDeleteTargetId(null)
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle._id)
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year.toString(),
      engine: vehicle.engine,
      mileage: vehicle.mileage.toString(),
      image: vehicle.image,
    })
    setShowForm(true)
  }

  const buttonStyle = {
    padding: '0.55rem 1.3rem',
    borderRadius: '999px',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  }

  const hoverStyle = (bg: string) => ({
    background: bg,
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
  })

  return (
<main style={{ backgroundColor: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center', overflowX: 'hidden' }}>
<img
  src="/empty-garage.jpg"
  alt="Garage Background"
  style={{
    zIndex: 0,
    opacity: 0.12,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  }}
/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>My Garage</h1>

        <SignedOut>
          <div style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.5)', maxWidth: '400px', backdropFilter: 'blur(4px)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Welcome to AutoVault</h2>
              <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Your garage is empty. Sign in to start adding your rides.</p>
              <SignInButton>
                <button
                  style={{ ...buttonStyle, background: '#3b82f6', color: '#fff' }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle('#2563eb'))}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { background: '#3b82f6', transform: 'scale(1)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' })}
                >
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div style={{ textAlign: 'center', margin: '1rem' }}>
            <button
              onClick={() => { setFormData({ make: '', model: '', year: '', engine: '', mileage: '', image: '' }); setEditingId(null); setShowForm(true); }}
              style={{ ...buttonStyle, background: '#2563eb', color: '#fff' }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle('#1d4ed8'))}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: '#2563eb', transform: 'scale(1)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' })}
            >
              Add Vehicle
            </button>
          </div>

          {showForm && (
            <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '12px', maxWidth: '400px', margin: '1rem auto' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{editingId ? 'Edit Car' : 'Add New Car'}</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['make', 'model', 'year', 'engine', 'mileage', 'image'].map((field) => (
                  <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={(formData as any)[field]} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
                ))}
                <div>
                  <button type="submit" style={{ ...buttonStyle, background: '#3b82f6', color: '#fff', marginRight: '0.5rem' }}>Save</button>
                  <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#6b7280', color: '#fff' }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            {vehicles.map((v) => (
              <div key={v._id} style={{ background: '#fff', color: '#000', borderRadius: '12px', padding: '1rem', width: '220px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '360px' }}>
                <div onClick={() => setModalVehicle(v)} style={{ width: '100%', height: '120px', marginBottom: '0.75rem', cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={v.image} alt={v.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{v.make} {v.model} ({v.year})</h3>
                <p style={{ marginBottom: '0.25rem' }}>{v.engine} Engine</p>
                <p style={{ marginBottom: '0.75rem' }}>
  Mileage: {v.mileage ? v.mileage.toLocaleString() : "N/A"} miles
</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                  <button onClick={() => handleEdit(v)} style={{ ...buttonStyle, background: '#2563eb', color: '#fff' }}>Edit</button>
                  <button onClick={() => handleDeleteRequest(v._id)} style={{ ...buttonStyle, background: '#dc2626', color: '#fff' }}>Delete</button>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(`${v.make} ${v.model} ${v.year}`)}`} target="_blank" rel="noopener noreferrer">
                    <button style={{ ...buttonStyle, background: '#6b7280', color: '#fff' }}>Learn More</button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {modalVehicle && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', maxWidth: '400px', color: '#000', textAlign: 'center' }}>
                <img
                  src={modalVehicle.image}
                  alt="Car Detail"
                  style={{ maxWidth: '320px', width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '10px', display: 'block', margin: '0 auto' }}
                />
                <h2 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{modalVehicle.make} {modalVehicle.model} ({modalVehicle.year})</h2>
                <p><strong>Engine:</strong> {modalVehicle.engine}</p>
                <p><strong>Mileage:</strong> {modalVehicle.mileage.toLocaleString()} miles</p>
                <button onClick={() => setModalVehicle(null)} style={{ ...buttonStyle, background: '#2563eb', color: '#fff', marginTop: '1rem' }}>Close</button>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', color: '#fff', textAlign: 'center', maxWidth: '360px', boxShadow: '0 6px 24px rgba(0,0,0,0.5)' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Confirm Deletion</h2>
                <p style={{ marginBottom: '1.5rem' }}>Are you sure you want to delete the selected car?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button onClick={confirmDelete} style={{ ...buttonStyle, background: '#ef4444', color: '#fff' }}>Yes, Delete</button>
                  <button onClick={() => setShowDeleteModal(false)} style={{ ...buttonStyle, background: '#6b7280', color: '#fff' }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </SignedIn>
      </div>
    </main>
  )
}
