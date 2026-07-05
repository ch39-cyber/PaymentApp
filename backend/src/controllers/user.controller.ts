import { Request, Response } from 'express'
import User from '../models/User'
import { sendResponse } from '../utils/response'

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return sendResponse(res, 404, false, 'User not found')
    }

    sendResponse(res, 200, true, 'Profile fetched successfully', user)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, profile } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, profile },
      { new: true, runValidators: true }
    )

    if (!user) {
      return sendResponse(res, 404, false, 'User not found')
    }

    sendResponse(res, 200, true, 'Profile updated successfully', user)
  } catch (error: any) {
    sendResponse(res, 500, false, error.message)
  }
}