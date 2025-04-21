'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditCarPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    engine: '',
    mileage: '',
    image: '',
  })

  useEffect(() => {
    const fetchVehicle = async () => {
      const res = await fetch(`/api/garage`)
      const vehicles = await res.json()
      const car = vehicles.find((v: any) => v._id === id)
      if (car) {
        setForm({
          make: car.make,
          model: car.model,
          year: car.year.toString(),
          engine: car.engine,
          mileage: car.mileage.toString(),
          image: car.image,
        })
      }
    }
    fetchVehicle()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/garage/${id}`, {
      method: 'PUT',
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
      alert('Update failed')
    }
  }

  return (
    <main style={{ background: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Edit Car</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '300px' }}>
        <input name="make" value={form.make} onChange={handleChange} placeholder="Make" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
        <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Year" required />
        <input name="engine" value={form.engine} onChange={handleChange} placeholder="Engine Size" required />
        <input name="mileage" type="number" value={form.mileage} onChange={handleChange} placeholder="Mileage" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit" style={{ background: '#3b82f6', color: '#fff', padding: '0.5rem', border: 'none' }}>Update Car</button>
      </form>
    </main>
  )
}
