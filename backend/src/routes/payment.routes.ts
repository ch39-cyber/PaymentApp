import express from 'express'
import { createPaymentIntent, confirmPayment, handleWebhook } from '../controllers/payment.controller'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.post('/create-intent', authenticate, createPaymentIntent)
router.post('/confirm', authenticate, confirmPayment)
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook)

export default router