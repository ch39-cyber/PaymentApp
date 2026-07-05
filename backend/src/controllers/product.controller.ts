import { Request, Response } from 'express'
import Product from '../models/Product'
import { handleValidationErrors, sendResponse } from '../utils/response'
import { body } from 'express-validator'

export const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('category').isIn(['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Other']),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive number')
]

export const createProduct = async (req: Request, res: Response) => {
  if (!handleValidationErrors(req, res)) return

  try {
    const { name, description, price, category, stock, image } = req.body

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      seller: req.userId
    })

    await product.save()
    sendResponse(res, 201, true, 'Product created successfully', product)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, limit = 20, skip = 0 } = req.query

    let query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$text = { $search: search as string }
    }

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('seller', 'name email')

    const total = await Product.countDocuments(query)

    sendResponse(res, 200, true, 'Products fetched successfully', {
      products,
      total,
      limit: Number(limit),
      skip: Number(skip)
    })
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email')

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found')
    }

    sendResponse(res, 200, true, 'Product fetched successfully', product)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}