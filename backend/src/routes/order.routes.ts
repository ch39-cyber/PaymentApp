import express from 'express'
import { createOrder, getOrders, getOrderById, createOrderValidation } from '../controllers/order.controller'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.post('/', authenticate, createOrderValidation, createOrder)
router.get('/', authenticate, getOrders)
router.get('/:id', authenticate, getOrderById)

export default router