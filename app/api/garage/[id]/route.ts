import { NextResponse } from 'next/server'
import GarageItem from '@/models/GarageItem'
import { connectToDB } from '@/lib/mongodb'

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()
  await connectToDB()
  const updated = await GarageItem.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: any) {
  await connectToDB()
  await GarageItem.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Deleted' })
}
