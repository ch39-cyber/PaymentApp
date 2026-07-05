export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,

  // Products
  PRODUCTS_LIST: `${API_BASE_URL}/products`,
  PRODUCTS_GET: (id: string) => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_CREATE: `${API_BASE_URL}/products`,

  // Orders
  ORDERS_CREATE: `${API_BASE_URL}/orders`,
  ORDERS_LIST: `${API_BASE_URL}/orders`,
  ORDERS_GET: (id: string) => `${API_BASE_URL}/orders/${id}`,

  // Users
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  USER_UPDATE: `${API_BASE_URL}/users/profile`,
}