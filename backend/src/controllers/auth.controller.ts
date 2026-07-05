import { Request, Response } from 'express'
import User from '../models/User'
import { generateToken } from '../utils/jwt'
import { handleValidationErrors, sendResponse } from '../utils/response'
import { body } from 'express-validator'

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['customer', 'seller']).withMessage('Invalid role')
]

export const register = async (req: Request, res: Response) => {
  if (!handleValidationErrors(req, res)) return

  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return sendResponse(res, 400, false, 'Email already registered')
    }

    const user = new User({ name, email, password, role })
    await user.save()

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })

    sendResponse(res, 201, true, 'User registered successfully', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
]

export const login = async (req: Request, res: Response) => {
  if (!handleValidationErrors(req, res)) return

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return sendResponse(res, 401, false, 'Invalid credentials')
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return sendResponse(res, 401, false, 'Invalid credentials')
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })

    sendResponse(res, 200, true, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}