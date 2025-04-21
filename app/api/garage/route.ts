import { NextResponse } from 'next/server'
import GarageItem from '../../../models/GarageItem'
import { connectToDB } from '@/lib/mongodb'

// GET all vehicles
export async function GET() {
  await connectToDB()
  const items = await GarageItem.find()
  return NextResponse.json(items)
}

// POST a new vehicle
export async function POST(req: Request) {
  const body = await req.json()
  await connectToDB()

  const vehicle = await GarageItem.create(body)

  return NextResponse.json(vehicle, { status: 201 })
}

