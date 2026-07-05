import express from 'express'
import { getRecommendations, trackAnalytics } from '../controllers/recommendation.controller'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.post('/', authenticate, getRecommendations)
router.post('/analytics/track', authenticate, trackAnalytics)

export default router