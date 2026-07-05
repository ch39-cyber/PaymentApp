import axios from 'axios'

const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000/api'

interface RecommendationRequest {
  userId: string
  productId?: string
  limit?: number
}

export const getAIRecommendations = async (data: RecommendationRequest) => {
  try {
    const response = await axios.post(`${apiUrl}/recommendations`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch recommendations')
    return []
  }
}

export const trackUserBehavior = async (eventType: string, data: any) => {
  try {
    await axios.post(`${apiUrl}/analytics/track`, {
      eventType,
      data,
      timestamp: new Date()
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  } catch (error) {
    console.error('Failed to track behavior')
  }
}