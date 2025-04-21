'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function AddCarPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    engine: '',
    mileage: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        mileage: Number(form.mileage),
      }),
    })

    if (res.ok) {
      router.push('/garage')
    } else {
      alert('Failed to add vehicle.')
    }
  }

  return (
    <>
      <SignedOut>
        <div style={{ padding: '2rem' }}>
          <h2>You must be signed in to add a car.</h2>
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <main style={{ padding: '2rem', color: '#fff', background: '#0b1120', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Car</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
            <input name="make" placeholder="Make" onChange={handleChange} value={form.make} required />
            <input name="model" placeholder="Model" onChange={handleChange} value={form.model} required />
            <input name="year" type="number" placeholder="Year" onChange={handleChange} value={form.year} required />
            <input name="engine" placeholder="Engine Size" onChange={handleChange} value={form.engine} required />
            <input name="mileage" type="number" placeholder="Mileage" onChange={handleChange} value={form.mileage} required />
            <input name="image" placeholder="Image URL" onChange={handleChange} value={form.image} required />
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', padding: '0.5rem', border: 'none' }}>
              Add Car
            </button>
          </form>
        </main>
      </SignedIn>
    </>
  )
}
