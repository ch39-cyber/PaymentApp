import { Request, Response } from 'express'
import Order from '../models/Order'
import Product from '../models/Product'
import { sendResponse, handleValidationErrors } from '../utils/response'
import { body } from 'express-validator'
import crypto from 'crypto'

export const createOrderValidation = [
  body('items').isArray().withMessage('Items must be an array'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required')
]

export const createOrder = async (req: Request, res: Response) => {
  if (!handleValidationErrors(req, res)) return

  try {
    const { items, shippingAddress } = req.body

    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        return sendResponse(res, 404, false, `Product ${item.productId} not found`)
      }

      if (product.stock < item.quantity) {
        return sendResponse(res, 400, false, `Insufficient stock for ${product.name}`)
      }

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      })

      totalAmount += product.price * item.quantity

      product.stock -= item.quantity
      await product.save()
    }

    const orderId = 'ORD-' + crypto.randomBytes(8).toString('hex').toUpperCase()

    const order = new Order({
      orderId,
      customer: req.userId,
      items: orderItems,
      totalAmount,
      shippingAddress
    })

    await order.save()
    await order.populate('items.productId', 'name price')

    sendResponse(res, 201, true, 'Order created successfully', order)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ customer: req.userId })
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 })

    sendResponse(res, 200, true, 'Orders fetched successfully', orders)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId', 'name price')

    if (!order) {
      return sendResponse(res, 404, false, 'Order not found')
    }

    if (order.customer.toString() !== req.userId) {
      return sendResponse(res, 403, false, 'Unauthorized')
    }

    sendResponse(res, 200, true, 'Order fetched successfully', order)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}