'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
  const [form, setForm] = useState({ make: '', model: '', year: '', engine: '', mileage: '', image: '' })

  const getVehicles = async () => {
    const res = await fetch('/api/garage')
    const data = await res.json()
    setVehicles(data)
  }

  useEffect(() => {
    getVehicles()
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch('/api/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, year: Number(form.year), mileage: Number(form.mileage) }),
    })
    setForm({ make: '', model: '', year: '', engine: '', mileage: '', image: '' })
    getVehicles()
  }

  const deleteVehicle = async (id: string) => {
    await fetch(`/api/garage/${id}`, { method: 'DELETE' })
    getVehicles()
  }

  return (
    <main style={{ background: '#0b1120', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>My Garage</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {['make', 'model', 'year', 'engine', 'mileage', 'image'].map((field) => (
          <input
            key={field}
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            style={{ padding: '0.5rem', borderRadius: '4px', width: '150px' }}
            required
          />
        ))}
        <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem' }}>
          Add Car
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {vehicles.map((v) => (
          <div key={v._id} style={{ background: '#fff', color: '#000', padding: '1rem', borderRadius: '10px', width: '220px' }}>
            <div style={{ position: 'relative', width: '100%', height: '120px', marginBottom: '0.5rem' }}>
              <Image src={v.image} alt={v.model} fill style={{ objectFit: 'cover', borderRadius: '8px' }} />
            </div>
            <h3 style={{ marginBottom: 4 }}>{v.make} {v.model} ({v.year})</h3>
            <p style={{ margin: '0 0 0.25rem' }}>{v.engine} Engine</p>
            <p style={{ margin: '0 0 1rem' }}>Mileage: {v.mileage.toLocaleString()} miles</p>
            <button onClick={() => deleteVehicle(v._id)} style={{ background: '#ef4444', color: '#fff', padding: '0.4rem', width: '100%', marginBottom: '0.5rem' }}>Delete</button>
            <button style={{ background: '#6b7280', color: '#fff', padding: '0.4rem', width: '100%' }}>Learn More</button>
          </div>
        ))}
      </div>
    </main>
  )
}
