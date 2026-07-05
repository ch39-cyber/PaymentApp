import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../config/axios'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await apiClient.get(`/orders/${id}`)
      setOrder(response.data.data)
    } catch (error) {
      console.error('Failed to fetch order')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!order) return <div className="text-center py-12 text-red-500">Order not found</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Order Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Order #{order.orderId}</h2>
              <p className="text-gray-600">Status: <span className="font-semibold capitalize">{order.status}</span></p>
              <p className="text-gray-600">Payment: <span className="font-semibold capitalize">{order.paymentStatus}</span></p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Items</h3>
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between py-2 border-b">
                  <span>{item.productId?.name || 'Product'} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-1">Shipping Address:</p>
              <p className="font-semibold">{order.shippingAddress}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Total</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(order.totalAmount + 5 + (order.totalAmount * 0.1)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail