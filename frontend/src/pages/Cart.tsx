import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(storedCart)
  }, [])

  const updateQuantity = (index: number, quantity: number) => {
    const updatedCart = [...cart]
    if (quantity <= 0) {
      updatedCart.splice(index, 1)
    } else {
      updatedCart[index].quantity = quantity
    }
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cart.reduce((sum, item) => sum + (item.quantity * (item.price || 29.99)), 0)

  const handleCheckout = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to checkout')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-6 border-b last:border-b-0">
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-2xl">📦</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name || 'Product'}</h3>
                      <p className="text-gray-600">${item.price || 29.99}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        className="w-12 text-center border border-gray-300 rounded py-1"
                        min="0"
                      />
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${(item.quantity * (item.price || 29.99)).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:underline text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
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
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="block text-center mt-3 text-blue-600 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart