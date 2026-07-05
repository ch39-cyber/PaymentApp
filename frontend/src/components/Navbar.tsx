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
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-white">⚡</span>
            <span>NexusAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/products" className="hover:text-blue-200 transition">Products</Link>
            <Link to="/cart" className="hover:text-blue-200 transition flex items-center gap-1">🛒 Cart</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-blue-500 rounded">Home</Link>
            <Link to="/products" className="block px-4 py-2 hover:bg-blue-500 rounded">Products</Link>
            <Link to="/cart" className="block px-4 py-2 hover:bg-blue-500 rounded">Cart</Link>
            {token ? (
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 bg-red-500 rounded hover:bg-red-600">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-blue-500 rounded">Login</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-blue-500 rounded">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar