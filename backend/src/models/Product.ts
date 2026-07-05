import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: string
  seller: mongoose.Types.ObjectId
  image?: string
  stock: number
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a description']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Other']
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    image: String,
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1 })
productSchema.index({ seller: 1 })

export default mongoose.model<IProduct>('Product', productSchema)