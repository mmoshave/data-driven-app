import mongoose, { Schema, models, model } from 'mongoose'

const garageSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  engine: String,
  mileage: Number,
  image: String,
})

const GarageItem = models.GarageItem || model('GarageItem', garageSchema)
export default GarageItem
