import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../config/axios'

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const total = cart.reduce((sum: number, item: any) => sum + (item.quantity * 29.99), 0)

  const handleCheckout = async () => {
    setError('')
    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address')
      return
    }

    setLoading(true)
    try {
      const response = await apiClient.post('/orders', {
        items: cart,
        shippingAddress
      })
      localStorage.removeItem('cart')
      navigate(`/orders/${response.data.data._id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your full shipping address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            rows={4}
          />

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(total + 5 + (total * 0.1)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout