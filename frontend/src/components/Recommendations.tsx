import { useState, useEffect } from 'react'
import { getAIRecommendations } from '../services/ai.service'

const Recommendations = ({ userId, limit = 5 }: { userId: string; limit?: number }) => {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [userId])

  const fetchRecommendations = async () => {
    setLoading(true)
    const data = await getAIRecommendations({ userId, limit })
    setRecommendations(data)
    setLoading(false)
  }

  if (loading) return <div>Loading recommendations...</div>

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Recommended For You 🤖</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {recommendations.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center">📦</div>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <p className="text-blue-600 font-bold">${product.price}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">{product.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommendations