import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-blue-600">NexusAI</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">🛒 Cart</Link>

            {token ? (
              <div className="flex gap-4 items-center">
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">👤 Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 py-2">Home</Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-600 py-2">Products</Link>
            <Link to="/cart" className="block text-gray-700 hover:text-blue-600 py-2">Cart</Link>
            {token ? (
              <>
                <Link to="/profile" className="block text-gray-700 hover:text-blue-600 py-2">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left text-red-600 py-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-blue-600 py-2">Login</Link>
                <Link to="/register" className="block text-blue-600 py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar