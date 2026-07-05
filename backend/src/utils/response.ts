import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleValidationErrors = (req: Request, res: Response): boolean => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
    return false
  }
  return true
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  res.status(statusCode).json({
    success,
    message,
    ...(data && { data })
  })
}