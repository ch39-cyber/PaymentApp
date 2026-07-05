import express from 'express'
import { createProduct, getProducts, getProductById, createProductValidation } from '../controllers/product.controller'
import { authenticate, authorize } from '../middleware/auth'

const router = express.Router()

router.post('/', authenticate, authorize(['seller', 'admin']), createProductValidation, createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)

export default router