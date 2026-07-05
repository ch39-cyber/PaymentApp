import Stripe from 'stripe'
import { Request, Response } from 'express'
import Order from '../models/Order'
import { sendResponse } from '../utils/response'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
})

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, orderId, currency = 'usd' } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId }
    })

    sendResponse(res, 200, true, 'Payment intent created', {
      clientSecret: paymentIntent.client_secret
    })
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, orderId } = req.body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'completed',
        status: 'confirmed'
      })

      sendResponse(res, 200, true, 'Payment confirmed', { status: 'succeeded' })
    } else {
      sendResponse(res, 400, false, 'Payment not completed', { status: paymentIntent.status })
    }
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any
      const orderId = paymentIntent.metadata.orderId

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'completed',
        status: 'confirmed'
      })
    }

    res.json({ received: true })
  } catch (error: any) {
    res.status(400).send(`Webhook Error: ${error.message}`)
  }
}