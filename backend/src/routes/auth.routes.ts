import express from 'express'
import { register, login, registerValidation, loginValidation } from '../controllers/auth.controller'

const router = express.Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

export default router