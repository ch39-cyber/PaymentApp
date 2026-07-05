import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface CartItem {
  productId: string
  quantity: number
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
      calculateTotal(JSON.parse(savedCart))
    }
  }, [])

  const calculateTotal = (cartItems: CartItem[]) => {
    const mockTotal = cartItems.reduce((sum, item) => sum + (item.quantity * 29.99), 0)
    setTotal(mockTotal)
  }

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.productId !== productId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    calculateTotal(updatedCart)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    calculateTotal(updatedCart)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/products" className="text-blue-600 hover:underline">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map(item => (
                <div key={item.productId} className="bg-white rounded-lg p-6 mb-4 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold">Product {item.productId.slice(0, 8)}</p>
                    <p className="text-gray-600">$29.99 each</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-semibold">${(item.quantity * 29.99).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart